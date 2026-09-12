const REFRESH_MS = 8000;

const labels = [
  "Health & safety",
  "Transport",
  "Beach",
  "Amenities",
  "Hospital",
  "Food",
];

export function paintScores() {
  document.querySelectorAll("[data-scores]").forEach((el) => {
    const nums = el.dataset.scores.split(",").map(Number);
    el.innerHTML = nums
      .map((n, i) => {
        const tone = n >= 4 ? "good" : n === 3 ? "ok" : "poor";
        const dots = [1, 2, 3, 4, 5]
          .map(
            (d) => `<span class="dot${d <= n ? " on-" + tone : ""}"></span>`,
          )
          .join("");
        return `<div class="score"><span>${labels[i]}</span><span class="dots">${dots}</span><b>${n}/5</b></div>`;
      })
      .join("");
  });
}

function votesUrl(pool, name) {
  const params = new URLSearchParams();
  if (pool) params.set("pool", pool);
  if (name) params.set("name", name);
  const query = params.toString();
  return query ? `/api/votes?${query}` : "/api/votes";
}

function setStatus(el, message) {
  if (!el) return;
  el.textContent = message || "";
  el.hidden = !message;
}

export function setupVotes({ storageKey, pool, mode }) {
  const nameInput = document.querySelector("#voter-name");
  const statusEl = document.querySelector("#vote-status");
  const cards = [...document.querySelectorAll("[data-place]")];
  const isGroup = mode === "group";

  cards.forEach((card) => {
    const bar = document.createElement("div");
    bar.className = "vote-bar";
    bar.innerHTML = isGroup
      ? `
        <button type="button" class="vote-btn vote-plus" data-vote="1" aria-label="Choose this location" disabled>+</button>
        <span class="vote-total">0</span>
        <span class="vote-rank" hidden></span>
        <span class="vote-who" hidden></span>
      `
      : `
        <button type="button" class="vote-btn vote-minus" data-vote="-1" aria-label="Minus one" disabled>−</button>
        <span class="vote-total">0</span>
        <button type="button" class="vote-btn vote-plus" data-vote="1" aria-label="Plus one" disabled>+</button>
        <span class="vote-who" hidden></span>
      `;
    card.appendChild(bar);
  });

  function currentName() {
    return (nameInput?.value || "").trim();
  }

  function setBusy(busy) {
    cards.forEach((card) => {
      card.querySelectorAll(".vote-btn").forEach((btn) => {
        btn.disabled = busy || !currentName();
      });
    });
  }

  function paintWho(who, list) {
    who.replaceChildren();
    list.forEach((entry) => {
      const mark = document.createElement("span");
      const value = Number(entry.vote);
      if (isGroup) {
        const first = value === 2;
        mark.className = `vote-initial ${first ? "first" : "second"}`;
        mark.title = first ? "First choice" : "Second choice";
      } else {
        const plus = value === 1;
        mark.className = `vote-initial ${plus ? "plus" : "minus"}`;
        mark.title = plus ? "Plus" : "Minus";
      }
      mark.textContent = entry.initial || "?";
      who.appendChild(mark);
    });
    who.hidden = list.length === 0;
  }

  function paint(data) {
    const totals = data.totals || {};
    const mine = data.mine || {};
    const voters = data.voters || {};
    cards.forEach((card) => {
      const place = card.dataset.place;
      const total = Number(totals[place] || 0);
      const myVote = Number(mine[place] || 0);
      const list = voters[place] || [];
      card.querySelector(".vote-total").textContent = String(total);
      if (isGroup) {
        card
          .querySelector(".vote-plus")
          .classList.toggle("is-mine", myVote === 1 || myVote === 2);
        const rank = card.querySelector(".vote-rank");
        if (myVote === 2) {
          rank.textContent = "Your 1st choice";
          rank.hidden = false;
        } else if (myVote === 1) {
          rank.textContent = "Your 2nd choice";
          rank.hidden = false;
        } else {
          rank.textContent = "";
          rank.hidden = true;
        }
      } else {
        card
          .querySelector(".vote-minus")
          .classList.toggle("is-mine", myVote === -1);
        card.querySelector(".vote-plus").classList.toggle("is-mine", myVote === 1);
      }
      paintWho(card.querySelector(".vote-who"), list);
    });
  }

  function myChoices(data) {
    const mine = data?.mine || {};
    const first = cards.find((card) => Number(mine[card.dataset.place]) === 2);
    const second = cards.find((card) => Number(mine[card.dataset.place]) === 1);
    return {
      first: first?.dataset.place || "",
      second: second?.dataset.place || "",
      count: Number(Boolean(first)) + Number(Boolean(second)),
    };
  }

  let lastData = { totals: {}, mine: {}, voters: {} };

  async function loadVotes() {
    const name = currentName();
    const res = await fetch(votesUrl(pool, name), { cache: "no-store" });
    if (!res.ok) throw new Error("load failed");
    lastData = await res.json();
    paint(lastData);
  }

  async function castVote(place, nextVote) {
    const name = currentName();
    if (!name) {
      nameInput?.focus();
      return;
    }
    setBusy(true);
    setStatus(statusEl, "");
    try {
      const res = await fetch("/api/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          place,
          vote: nextVote,
          ...(pool ? { pool } : {}),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus(
          statusEl,
          data.error || "Could not save that vote. Clear one pick to change.",
        );
        nameInput?.classList.add("voter-error");
        return;
      }
      lastData = data;
      paint(lastData);
    } catch {
      nameInput?.classList.add("voter-error");
      setStatus(statusEl, "Could not save that vote.");
    } finally {
      setBusy(false);
    }
  }

  cards.forEach((card) => {
    card.querySelectorAll(".vote-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const place = card.dataset.place;
        if (isGroup) {
          const mine = Number(lastData.mine?.[place] || 0);
          if (mine === 1 || mine === 2) {
            castVote(place, 0);
            return;
          }
          const { first, count } = myChoices(lastData);
          if (count >= 2) {
            setStatus(
              statusEl,
              "You already have a first and second choice. Clear one to change.",
            );
            return;
          }
          castVote(place, first ? 1 : 2);
          return;
        }
        const wanted = Number(btn.dataset.vote);
        const already = btn.classList.contains("is-mine");
        castVote(place, already ? 0 : wanted);
      });
    });
  });

  if (nameInput) {
    const saved = localStorage.getItem(storageKey) || "";
    if (saved) nameInput.value = saved;

    nameInput.addEventListener("input", () => {
      nameInput.classList.remove("voter-error");
      setStatus(statusEl, "");
      localStorage.setItem(storageKey, currentName());
      setBusy(false);
    });
    nameInput.addEventListener("change", () => {
      loadVotes().catch(() => {});
    });
  }

  setBusy(false);
  loadVotes().catch(() => {});
  setInterval(() => {
    loadVotes().catch(() => {});
  }, REFRESH_MS);
}
