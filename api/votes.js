import { createClient } from "redis";

const PLACES = new Set([
  "calella",
  "malgrat-de-mar",
  "santa-susanna",
  "lloret-de-mar",
  "tossa-de-mar",
  "fuengirola",
  "salou",
  "oropesa-del-mar",
  "cala-millor",
  "sa-coma",
  "cala-d-or",
  "cala-ratjada",
  "cales-de-mallorca",
  "callao-salvaje",
  "nuevo-horizonte",
  "adelianos-kampos",
  "dassia",
  "side",
  "alanya",
  "kemer",
  "marmaris",
  "oludeniz",
  "sousse",
  "djerba",
  "agadir",
  "durres",
  "sunny-beach",
]);

const GROUP_PLACES = new Set([
  "fuengirola",
  "adelianos-kampos",
  "calella",
  "malgrat-de-mar",
  "cala-millor",
  "sa-coma",
  "marmaris",
]);

const POOLS = {
  committee: {
    hash: "location-votes",
    places: PLACES,
    allowed: new Set([1, -1]),
  },
  group: {
    hash: "location-votes-group",
    places: GROUP_PLACES,
    allowed: new Set([1, 2]),
  },
};

let cached;

async function redis() {
  if (cached?.isOpen) return cached;
  const url =
    process.env.REDIS_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  if (!url) {
    throw new Error("Redis is not configured");
  }
  cached = createClient({ url });
  cached.on("error", () => {});
  await cached.connect();
  return cached;
}

function nameKey(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .slice(0, 40);
}

function fieldKey(voter, place) {
  return `${voter}::${place}`;
}

function firstLetter(name) {
  const match = String(name || "").trim().match(/[a-z0-9]/i);
  return match ? match[0].toUpperCase() : "?";
}

function resolvePool(raw) {
  return String(raw || "").toLowerCase() === "group" ? "group" : "committee";
}

function voterChoices(entries, voter, places, allowed) {
  const mine = {};
  for (const [field, raw] of Object.entries(entries || {})) {
    if (!field.startsWith(`${voter}::`)) continue;
    const place = field.slice(voter.length + 2);
    if (!places.has(place)) continue;
    const value = Number(raw);
    if (!allowed.has(value)) continue;
    mine[place] = value;
  }
  return mine;
}

function summarise(entries, voter, places, allowed) {
  const totals = {};
  const mine = {};
  const voters = {};
  for (const place of places) {
    totals[place] = 0;
    voters[place] = [];
  }
  for (const [field, raw] of Object.entries(entries || {})) {
    const sep = field.lastIndexOf("::");
    if (sep < 1) continue;
    const who = field.slice(0, sep);
    const place = field.slice(sep + 2);
    if (!places.has(place)) continue;
    const value = Number(raw);
    if (!allowed.has(value)) continue;
    totals[place] += value;
    voters[place].push({ initial: firstLetter(who), vote: value });
    if (voter && who === voter) mine[place] = value;
  }
  for (const place of places) {
    voters[place].sort((a, b) => {
      if (b.vote !== a.vote) return b.vote - a.vote;
      return a.initial.localeCompare(b.initial);
    });
  }
  return { totals, mine, voters };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const db = await redis();

    if (req.method === "GET") {
      const poolName = resolvePool(req.query.pool);
      const config = POOLS[poolName];
      const voter = nameKey(req.query.name);
      const entries = (await db.hGetAll(config.hash)) || {};
      return res
        .status(200)
        .json(summarise(entries, voter, config.places, config.allowed));
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const poolName = resolvePool(body.pool);
      const config = POOLS[poolName];
      const voter = nameKey(body.name);
      const place = String(body.place || "");
      const vote = Number(body.vote);

      if (!voter) {
        return res.status(400).json({ error: "Enter your name before voting." });
      }
      if (!config.places.has(place)) {
        return res.status(400).json({ error: "Unknown place." });
      }

      if (poolName === "group") {
        if (vote !== 1 && vote !== 2 && vote !== 0) {
          return res.status(400).json({
            error: "Vote must be first choice, second choice, or clear.",
          });
        }
      } else if (vote !== 1 && vote !== -1 && vote !== 0) {
        return res.status(400).json({ error: "Vote must be +1, −1, or 0." });
      }

      const field = fieldKey(voter, place);

      if (vote === 0) {
        await db.hDel(config.hash, field);
      } else if (poolName === "group") {
        const current = (await db.hGetAll(config.hash)) || {};
        const mine = voterChoices(
          current,
          voter,
          config.places,
          config.allowed,
        );
        const others = Object.entries(mine).filter(([id]) => id !== place);
        if (!mine[place] && others.length >= 2) {
          return res.status(400).json({
            error:
              "You already have a first and second choice. Clear one to change.",
          });
        }
        if (others.some(([, value]) => value === vote)) {
          return res.status(400).json({
            error:
              vote === 2
                ? "You already have a first choice."
                : "You already have a second choice.",
          });
        }
        await db.hSet(config.hash, field, String(vote));
      } else {
        await db.hSet(config.hash, field, String(vote));
      }

      const entries = (await db.hGetAll(config.hash)) || {};
      return res
        .status(200)
        .json(summarise(entries, voter, config.places, config.allowed));
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    const message =
      error instanceof Error && error.message === "Redis is not configured"
        ? "Voting is not connected yet."
        : "Could not save the vote.";
    return res.status(500).json({ error: message });
  }
}
