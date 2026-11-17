// Rates page: pull greens fees from Sanity and render them into the existing
// tables. The hardcoded markup in rates.html is the first paint and the
// fallback. A table is re-rendered only when its Sanity document exists, and
// any field missing from that document falls back to the values below.

const RATES_QUERY =
  '*[_id in ["springRates","summerRates","winterRates","specialRates"]]{ ... }';

// apicdn = Sanity's cached CDN endpoint (equivalent to useCdn: true).
const RATES_URL =
  "https://a7aw6fco.apicdn.sanity.io/v2025-10-22/data/query/production" +
  `?query=${encodeURIComponent(RATES_QUERY)}&perspective=published`;

const PHONE_LINK_HTML =
  ' <a href="tel:5733466117" class="link phone-link no-underline">(573) 346-6117</a>.';

// Column suffixes per table type, in display order.
const SEASON_COLUMNS = ["Weekday", "Weekend"];
const SPECIAL_COLUMNS = ["9", "18"];

// Row definitions + today's hardcoded values (keep in sync with rates.html).
const RATE_TABLES = {
  springRates: {
    heading: "Spring Rates",
    description: "(March 1st - 31st) All rates include cart.",
    columns: SEASON_COLUMNS,
    rows: [
      { key: "holes9", label: "9 Holes", prices: ["$30", "$40"] },
      { key: "holes18", label: "18 Holes", prices: ["$45", "$60"] },
    ],
  },
  summerRates: {
    heading: "Summer Rates",
    description: "(April 1st - Oct 31st) All rates include cart.",
    columns: SEASON_COLUMNS,
    rows: [
      { key: "holes9", label: "9 Holes", prices: ["$40", "$50"] },
      { key: "holes18", label: "18 Holes", prices: ["$65", "$85"] },
      { key: "twilight9", label: "Twilight 9 Holes", def: "After 3pm", prices: ["$25", "$25"] },
      { key: "twilight18", label: "Twilight 18 Holes", def: "After 3pm", prices: ["$40", "$40"] },
      { key: "holes36", label: "36 Holes, Same Day", prices: ["$100", "$130"] },
    ],
  },
  winterRates: {
    heading: "Winter Rates",
    description:
      "(Nov 1st - Feb 29th) All rates include cart. Rates will vary based on " +
      "weather and course conditions. Call pro shop for latest rates.",
    phoneLink: true,
    columns: SEASON_COLUMNS,
    rows: [
      { key: "holes9", label: "9 Holes", prices: ["$25", "$30"] },
      { key: "holes18", label: "18 Holes", prices: ["$40", "$50"] },
    ],
  },
  specialRates: {
    heading: "Special Rates",
    description: "",
    columns: SPECIAL_COLUMNS,
    rows: [
      { key: "seniorMondays", label: "Senior Mondays", prices: ["$30", "$45"] },
      { key: "ladiesDay", label: "Ladies Day Tuesdays", prices: ["$25", "$45"] },
      {
        key: "sameDayReplay",
        label: "Same Day Replay",
        def: "booked same day after 1st round",
        prices: ["$20", "$30"],
      },
    ],
  },
};

// A field that is absent (undefined/null) falls back; an empty string is the
// editor's choice and is kept.
function pick(doc, field, fallback) {
  const value = doc[field];
  return value === undefined || value === null ? fallback : String(value).trim();
}

function formatPrice(value) {
  if (!value) return "--";
  return value.startsWith("$") ? value : `$${value}`;
}

// Map a Sanity doc onto a table definition, field by field.
function resolveTable(doc, table) {
  return {
    heading: pick(doc, "heading", table.heading) || table.heading,
    description: pick(doc, "description", table.description),
    rows: table.rows.map((row) => {
      const label = pick(doc, `${row.key}Label`, row.label) || row.label;
      let def = pick(doc, `${row.key}Def`, row.def || "");
      // Editors sometimes put the note in the label, e.g.
      // "Twilight 9 Holes (After 3pm)". Don't show it twice.
      if (def && label.toLowerCase().includes(def.toLowerCase())) def = "";
      return {
        label,
        def,
        prices: table.columns.map((col, i) =>
          formatPrice(pick(doc, `${row.key}${col}`, row.prices[i]))
        ),
      };
    }),
  };
}

// Season dates may live in the heading ("Summer Rates (April 1st - Oct 31st)")
// or lead the description ("(April 1st - Oct 31st) All rates include cart.").
// Either way they render after a <br> in the <h3>, matching the current layout.
function splitHeading(heading, description) {
  const inHeading = /^([\s\S]*?)\s*(\([^)]*\))\s*$/.exec(heading);
  if (inHeading) {
    return { title: inHeading[1], dates: inHeading[2], notes: (description || "").trim() };
  }
  const inDescription = /^\s*(\([^)]*\))\s*([\s\S]*)$/.exec(description || "");
  if (inDescription) {
    return { title: heading, dates: inDescription[1], notes: inDescription[2].trim() };
  }
  return { title: heading, dates: "", notes: (description || "").trim() };
}

// Matches the pro shop number however it's typed: (573) 346-6117, 573-346-6117, 5733466117…
const PHONE_PATTERN = /\(?573\)?[\s.-]*346[\s.-]*6117/;

// Build the notes <p>. If the text already mentions the pro shop number, turn
// that mention into the tel: link; otherwise append the link.
function buildNotes(notes, withPhoneLink) {
  const p = el("p");
  const match = withPhoneLink ? PHONE_PATTERN.exec(notes) : null;
  if (match) {
    p.append(notes.slice(0, match.index));
    p.insertAdjacentHTML("beforeend", PHONE_LINK_HTML.trim().replace(/\.$/, ""));
    p.append(notes.slice(match.index + match[0].length));
  } else {
    p.append(notes);
    if (withPhoneLink) p.insertAdjacentHTML("beforeend", PHONE_LINK_HTML);
  }
  return p;
}

function el(tag, attrs = {}, text) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderTable(wrapper, data, table) {
  const preface = wrapper.querySelector(".table-preface .col-12");
  const tbody = wrapper.querySelector("tbody");
  if (!preface || !tbody) return;

  const { title, dates, notes } = splitHeading(data.heading, data.description);

  // Heading
  const h3 = el("h3", {}, title);
  if (dates) {
    h3.append(" ", el("br", { class: "br" }), dates);
  }

  // Notes paragraph (the tel: link is hardcoded, never taken from Sanity)
  const p = notes || table.phoneLink ? buildNotes(notes, table.phoneLink) : null;

  preface.replaceChildren(...[h3, p].filter(Boolean));

  // Rows
  tbody.replaceChildren(
    ...data.rows.map((row) => {
      const th = el("th", { scope: "row" });
      th.append(el("div", { class: "th-wrap" }, row.label));
      if (row.def) th.append(el("div", { class: "note" }, row.def));

      const tr = el("tr");
      tr.append(th, ...row.prices.map((price) => el("td", {}, price)));
      return tr;
    })
  );
}

async function loadRates() {
  const response = await fetch(RATES_URL);
  if (!response.ok) throw new Error(`Sanity request failed (${response.status})`);
  const { result = [] } = await response.json();
  const docsById = Object.fromEntries(result.map((doc) => [doc._id, doc]));

  document.querySelectorAll("[data-rates]").forEach((wrapper) => {
    const id = wrapper.dataset.rates;
    const table = RATE_TABLES[id];
    const doc = docsById[id];
    if (!table || !doc) return; // not published yet: keep hardcoded markup
    renderTable(wrapper, resolveTable(doc, table), table);
  });
}

loadRates().catch((err) => console.error("Rates:", err));
