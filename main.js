import "./style.css";

const STORAGE_KEY = "committee-voter-name";
const REFRESH_MS = 8000;

const labels = [
  "Health & safety",
  "Transport",
  "Beach",
  "Amenities",
  "Hospital",
  "Food",
];

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

const nameInput = document.querySelector("#voter-name");
const cards = [...document.querySelectorAll("[data-place]")];

cards.forEach((card) => {
  const bar = document.createElement("div");
  bar.className = "vote-bar";
  bar.innerHTML = `
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
    card.querySelector(".vote-minus").classList.toggle("is-mine", myVote === -1);
    card.querySelector(".vote-plus").classList.toggle("is-mine", myVote === 1);
    const who = card.querySelector(".vote-who");
    who.replaceChildren();
    list.forEach((entry) => {
      const mark = document.createElement("span");
      const plus = Number(entry.vote) === 1;
      mark.className = `vote-initial ${plus ? "plus" : "minus"}`;
      mark.textContent = entry.initial || "?";
      mark.title = plus ? "Plus" : "Minus";
      who.appendChild(mark);
    });
    who.hidden = list.length === 0;
  });
}

async function loadVotes() {
  const name = currentName();
  const url = name
    ? `/api/votes?name=${encodeURIComponent(name)}`
    : "/api/votes";
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("load failed");
  paint(await res.json());
}

async function castVote(place, nextVote) {
  const name = currentName();
  if (!name) {
    nameInput?.focus();
    return;
  }
  setBusy(true);
  try {
    const res = await fetch("/api/votes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, place, vote: nextVote }),
    });
    if (!res.ok) throw new Error("vote failed");
    paint(await res.json());
  } catch {
    nameInput?.classList.add("voter-error");
  } finally {
    setBusy(false);
  }
}

cards.forEach((card) => {
  card.querySelectorAll(".vote-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wanted = Number(btn.dataset.vote);
      const already = btn.classList.contains("is-mine");
      castVote(card.dataset.place, already ? 0 : wanted);
    });
  });
});

if (nameInput) {
  const saved = localStorage.getItem(STORAGE_KEY) || "";
  if (saved) nameInput.value = saved;

  nameInput.addEventListener("input", () => {
    nameInput.classList.remove("voter-error");
    localStorage.setItem(STORAGE_KEY, currentName());
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
