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

const HASH_KEY = "location-votes";

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

function summarise(entries, voter) {
  const totals = {};
  const mine = {};
  for (const place of PLACES) {
    totals[place] = 0;
  }
  for (const [field, raw] of Object.entries(entries || {})) {
    const sep = field.lastIndexOf("::");
    if (sep < 1) continue;
    const who = field.slice(0, sep);
    const place = field.slice(sep + 2);
    if (!PLACES.has(place)) continue;
    const value = Number(raw);
    if (value !== 1 && value !== -1) continue;
    totals[place] += value;
    if (voter && who === voter) mine[place] = value;
  }
  return { totals, mine };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  try {
    const db = await redis();

    if (req.method === "GET") {
      const voter = nameKey(req.query.name);
      const entries = (await db.hGetAll(HASH_KEY)) || {};
      return res.status(200).json(summarise(entries, voter));
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const voter = nameKey(body.name);
      const place = String(body.place || "");
      const vote = Number(body.vote);

      if (!voter) {
        return res.status(400).json({ error: "Enter your name before voting." });
      }
      if (!PLACES.has(place)) {
        return res.status(400).json({ error: "Unknown place." });
      }
      if (vote !== 1 && vote !== -1 && vote !== 0) {
        return res.status(400).json({ error: "Vote must be +1, −1, or 0." });
      }

      const field = fieldKey(voter, place);
      if (vote === 0) {
        await db.hDel(HASH_KEY, field);
      } else {
        await db.hSet(HASH_KEY, field, String(vote));
      }

      const entries = (await db.hGetAll(HASH_KEY)) || {};
      return res.status(200).json(summarise(entries, voter));
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
