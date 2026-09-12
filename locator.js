const MAPS = {
  spain: {
    west: -9.5,
    east: 4.4,
    south: 35.9,
    north: 43.85,
    width: 280,
    height: 168,
    land: [
      [
        [-5.35, 36.02],
        [-5.9, 36.1],
        [-6.5, 36.75],
        [-7.35, 37.18],
        [-7.05, 38.05],
        [-6.85, 39.35],
        [-6.7, 40.35],
        [-6.95, 41.15],
        [-8.05, 41.88],
        [-8.75, 42.15],
        [-8.95, 42.88],
        [-8.4, 43.37],
        [-7.15, 43.55],
        [-5.85, 43.58],
        [-4.55, 43.4],
        [-2.95, 43.35],
        [-1.79, 43.38],
        [-0.85, 42.82],
        [0.75, 42.7],
        [1.85, 42.48],
        [2.9, 42.5],
        [3.32, 42.32],
        [3.05, 41.75],
        [2.18, 41.38],
        [1.25, 41.08],
        [0.15, 40.05],
        [-0.32, 39.47],
        [-0.45, 38.28],
        [-0.75, 37.58],
        [-2.05, 36.78],
        [-3.65, 36.72],
        [-4.55, 36.52],
        [-5.05, 36.28],
      ],
      [
        [2.32, 39.58],
        [2.72, 39.32],
        [3.18, 39.3],
        [3.48, 39.52],
        [3.47, 39.82],
        [3.05, 39.95],
        [2.48, 39.82],
      ],
      [
        [3.8, 39.88],
        [4.27, 39.86],
        [4.3, 40.02],
        [3.82, 40.08],
      ],
      [
        [1.22, 38.84],
        [1.58, 38.86],
        [1.45, 39.08],
        [1.18, 39.0],
      ],
    ],
  },
  greece: {
    west: 19.2,
    east: 28.3,
    south: 34.7,
    north: 41.8,
    width: 280,
    height: 200,
    land: [
      [
        [20.0, 39.7],
        [20.35, 41.1],
        [21.3, 40.85],
        [22.55, 40.55],
        [23.4, 40.4],
        [24.4, 40.95],
        [26.1, 40.95],
        [26.35, 41.7],
        [26.6, 41.35],
        [26.05, 40.55],
        [24.95, 40.15],
        [24.0, 39.95],
        [23.35, 40.15],
        [22.95, 39.35],
        [23.65, 38.35],
        [24.05, 38.15],
        [23.0, 38.2],
        [22.4, 38.3],
        [21.75, 38.25],
        [21.1, 37.65],
        [22.15, 36.8],
        [22.55, 36.4],
        [23.15, 36.45],
        [22.95, 36.75],
        [21.7, 37.05],
        [21.55, 38.15],
        [20.75, 38.85],
        [20.0, 39.15],
      ],
      [
        [23.5, 35.2],
        [24.15, 35.18],
        [24.85, 35.32],
        [25.75, 35.2],
        [26.3, 35.18],
        [26.25, 35.35],
        [25.15, 35.42],
        [24.45, 35.52],
        [23.65, 35.4],
      ],
      [
        [25.85, 37.7],
        [26.55, 37.95],
        [27.25, 37.85],
        [27.15, 36.85],
        [26.45, 36.4],
        [25.95, 36.7],
      ],
      [
        [19.75, 39.55],
        [20.15, 39.85],
        [20.12, 39.38],
        [19.7, 39.38],
      ],
    ],
  },
  turkey: {
    west: 25.8,
    east: 44.8,
    south: 35.85,
    north: 42.3,
    width: 280,
    height: 108,
    land: [
      [
        [26.1, 39.95],
        [26.4, 41.7],
        [27.5, 41.2],
        [29.1, 41.25],
        [31.2, 41.15],
        [33.5, 42.0],
        [35.4, 42.05],
        [38.0, 41.0],
        [40.2, 41.15],
        [41.6, 41.55],
        [43.4, 41.3],
        [44.3, 41.05],
        [44.1, 39.7],
        [43.6, 37.3],
        [40.2, 36.85],
        [36.2, 36.05],
        [34.3, 36.2],
        [32.3, 36.2],
        [30.7, 36.25],
        [29.1, 36.2],
        [28.25, 36.65],
        [27.25, 37.25],
        [27.15, 38.4],
        [26.4, 38.3],
        [26.15, 39.5],
      ],
    ],
  },
  tunisia: {
    west: 7.5,
    east: 11.6,
    south: 30.2,
    north: 37.4,
    width: 160,
    height: 220,
    land: [
      [
        [8.7, 36.9],
        [9.85, 37.35],
        [10.3, 36.85],
        [11.1, 36.85],
        [11.05, 35.55],
        [11.15, 34.65],
        [10.35, 33.75],
        [11.05, 33.85],
        [11.15, 33.55],
        [10.75, 33.25],
        [10.15, 32.4],
        [10.35, 30.3],
        [9.55, 30.25],
        [8.35, 30.25],
        [8.25, 32.5],
        [8.4, 34.4],
        [8.15, 35.2],
        [8.6, 36.2],
      ],
    ],
  },
  morocco: {
    west: -13.2,
    east: -0.95,
    south: 27.6,
    north: 36.0,
    width: 260,
    height: 180,
    land: [
      [
        [-5.9, 35.85],
        [-5.3, 35.55],
        [-2.95, 35.15],
        [-2.2, 34.95],
        [-1.35, 34.4],
        [-1.15, 32.5],
        [-1.35, 30.9],
        [-4.2, 30.1],
        [-6.5, 29.4],
        [-8.7, 28.4],
        [-10.1, 29.1],
        [-9.55, 30.4],
        [-9.75, 31.55],
        [-8.8, 33.25],
        [-6.9, 34.05],
        [-6.3, 35.2],
        [-5.95, 35.78],
      ],
    ],
  },
  albania: {
    west: 19.2,
    east: 21.15,
    south: 39.55,
    north: 42.7,
    width: 150,
    height: 220,
    land: [
      [
        [19.4, 41.85],
        [19.5, 42.55],
        [20.35, 42.55],
        [20.55, 42.1],
        [20.8, 40.85],
        [21.0, 40.55],
        [20.65, 39.7],
        [20.0, 39.7],
        [19.5, 40.15],
        [19.35, 40.55],
        [19.45, 41.3],
      ],
    ],
  },
  bulgaria: {
    west: 22.3,
    east: 28.65,
    south: 41.2,
    north: 44.25,
    width: 260,
    height: 130,
    land: [
      [
        [22.55, 43.9],
        [23.0, 44.15],
        [25.5, 43.75],
        [26.4, 44.05],
        [28.05, 43.55],
        [28.6, 43.4],
        [27.9, 42.5],
        [27.55, 41.95],
        [26.4, 41.35],
        [24.7, 41.35],
        [23.3, 41.4],
        [22.55, 42.3],
        [22.4, 43.2],
      ],
    ],
  },
  canaries: {
    west: -18.2,
    east: -13.25,
    south: 27.55,
    north: 29.5,
    width: 280,
    height: 130,
    land: [
      [
        [-18.15, 27.7],
        [-17.88, 27.64],
        [-17.88, 27.85],
        [-18.15, 27.85],
      ],
      [
        [-17.98, 28.45],
        [-17.72, 28.45],
        [-17.72, 28.86],
        [-17.98, 28.86],
      ],
      [
        [-17.35, 28.02],
        [-17.08, 28.02],
        [-17.08, 28.22],
        [-17.35, 28.22],
      ],
      [
        [-16.92, 28.0],
        [-16.48, 27.98],
        [-16.18, 28.15],
        [-16.48, 28.58],
        [-16.85, 28.55],
      ],
      [
        [-15.85, 27.73],
        [-15.35, 27.73],
        [-15.35, 28.18],
        [-15.7, 28.18],
      ],
      [
        [-14.55, 28.05],
        [-13.83, 28.05],
        [-13.83, 28.75],
        [-14.33, 28.75],
      ],
      [
        [-13.88, 28.85],
        [-13.43, 28.85],
        [-13.43, 29.25],
        [-13.88, 29.25],
      ],
    ],
  },
};

const PLACES = {
  calella: { map: "spain", lat: 41.6136, lon: 2.6542, label: "North-east Spain" },
  "malgrat-de-mar": {
    map: "spain",
    lat: 41.6457,
    lon: 2.7426,
    label: "North-east Spain",
  },
  "santa-susanna": {
    map: "spain",
    lat: 41.6214,
    lon: 2.7081,
    label: "North-east Spain",
  },
  "lloret-de-mar": {
    map: "spain",
    lat: 41.6997,
    lon: 2.8469,
    label: "North-east Spain",
  },
  "tossa-de-mar": {
    map: "spain",
    lat: 41.7203,
    lon: 2.9314,
    label: "North-east Spain",
  },
  fuengirola: { map: "spain", lat: 36.5397, lon: -4.6247, label: "South Spain" },
  salou: { map: "spain", lat: 41.0766, lon: 1.1316, label: "East Spain" },
  "oropesa-del-mar": {
    map: "spain",
    lat: 40.0922,
    lon: 0.1347,
    label: "East Spain",
  },
  "cala-millor": { map: "spain", lat: 39.5978, lon: 3.3856, label: "Mallorca" },
  "sa-coma": { map: "spain", lat: 39.5947, lon: 3.3792, label: "Mallorca" },
  "cala-d-or": { map: "spain", lat: 39.3736, lon: 3.2319, label: "Mallorca" },
  "cala-ratjada": { map: "spain", lat: 39.7161, lon: 3.4569, label: "Mallorca" },
  "cales-de-mallorca": {
    map: "spain",
    lat: 39.4297,
    lon: 3.28,
    label: "Mallorca",
  },
  "callao-salvaje": {
    map: "canaries",
    lat: 28.057,
    lon: -16.737,
    label: "Tenerife",
  },
  "nuevo-horizonte": {
    map: "canaries",
    lat: 28.433,
    lon: -13.863,
    label: "Fuerteventura",
  },
  "adelianos-kampos": {
    map: "greece",
    lat: 35.37,
    lon: 24.548,
    label: "Crete, Greece",
  },
  dassia: { map: "greece", lat: 39.677, lon: 19.879, label: "Corfu, Greece" },
  side: { map: "turkey", lat: 36.7667, lon: 31.3889, label: "South Turkey" },
  alanya: { map: "turkey", lat: 36.5439, lon: 31.9997, label: "South Turkey" },
  kemer: { map: "turkey", lat: 36.5978, lon: 30.5606, label: "South Turkey" },
  marmaris: { map: "turkey", lat: 36.8549, lon: 28.271, label: "South-west Turkey" },
  oludeniz: { map: "turkey", lat: 36.547, lon: 29.1217, label: "South-west Turkey" },
  sousse: { map: "tunisia", lat: 35.825, lon: 10.637, label: "Tunisia" },
  djerba: { map: "tunisia", lat: 33.808, lon: 10.845, label: "Tunisia" },
  agadir: { map: "morocco", lat: 30.4278, lon: -9.5981, label: "Morocco" },
  durres: { map: "albania", lat: 41.3231, lon: 19.4547, label: "Albania" },
  "sunny-beach": {
    map: "bulgaria",
    lat: 42.6931,
    lon: 27.71,
    label: "East Bulgaria",
  },
};

function project(lon, lat, map) {
  const x = ((lon - map.west) / (map.east - map.west)) * map.width;
  const y = ((map.north - lat) / (map.north - map.south)) * map.height;
  return [x, y];
}

function pathFromRing(ring, map) {
  return ring
    .map((point, index) => {
      const [x, y] = project(point[0], point[1], map);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function renderMap(place, info) {
  const map = MAPS[info.map];
  const [pinX, pinY] = project(info.lon, info.lat, map);
  const land = map.land
    .map(
      (ring) =>
        `<path d="${pathFromRing(ring, map)} Z" />`,
    )
    .join("");
  const title = `${place} on a map of ${info.label}`;
  return `
    <figure class="locator">
      <svg class="locator-map" viewBox="0 0 ${map.width} ${map.height}" role="img" aria-label="${title}">
        <title>${title}</title>
        <rect width="${map.width}" height="${map.height}" class="locator-sea" />
        <g class="locator-land">${land}</g>
        <g class="locator-pin" transform="translate(${pinX.toFixed(1)} ${pinY.toFixed(1)})">
          <circle class="locator-pin-halo" r="9" />
          <circle class="locator-pin-dot" r="4.5" />
        </g>
      </svg>
      <figcaption>${info.label}</figcaption>
    </figure>
  `;
}

export function paintLocators() {
  document.querySelectorAll("[data-place]").forEach((card) => {
    if (card.querySelector(".locator")) return;
    const place = card.dataset.place;
    const info = PLACES[place];
    if (!info) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = renderMap(place, info);
    const figure = wrap.firstElementChild;
    const where = card.querySelector(".where");
    if (where) where.after(figure);
    else {
      const title = card.querySelector("h3");
      title?.after(figure);
    }
  });
}
