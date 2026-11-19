// Pull price tables from Sanity into the existing markup on /rates and /membership.
//
// Each table wrapper in the HTML is tagged with its document id:
//   <div data-sanity-doc="summerRates"> … <h3> … <p> … <tbody> … </div>
// The script queries only the documents tagged on the current page.
//
// Fallback: the hardcoded HTML is the first paint and the fallback. A section is
// re-rendered only when its document is published, and any field missing from
// the document keeps what the HTML already shows. An empty field is treated as
// the editor's choice: empty label → default label, empty price → "--",
// empty description → nothing.

const SANITY_URL = "https://a7aw6fco.apicdn.sanity.io/v2025-10-22/data/query/production"; // apicdn = useCdn: true

// ---------------------------------------------------------------------------
// Per-document config: row prefixes, default labels, price column suffixes.
// A price field is `${prefix}${suffix}`; single-price tables use suffix "".
// Rows are [prefix, defaultLabel, options?]. Options:
//   hideWhenNoPrice: omit the row while every price is empty/missing.
// ---------------------------------------------------------------------------
const SEASON = ["Weekday", "Weekend"];
const SPECIAL = ["9", "18"];
const SINGLE = [""];

const BASE_SEASON_ROWS = [
  ["holes9", "9 Holes"],
  ["holes18", "18 Holes"],
];

const PRICE_TABLES = {
  springRates: { columns: SEASON, rows: BASE_SEASON_ROWS },
  winterRates: { columns: SEASON, rows: BASE_SEASON_ROWS },
  summerRates: {
    columns: SEASON,
    rows: [
      ...BASE_SEASON_ROWS,
      ["twilight9", "Twilight 9 Holes"],
      ["twilight18", "Twilight 18 Holes"],
      ["holes36", "36 Holes, Same Day"],
    ],
  },
  specialRates: {
    columns: SPECIAL,
    rows: [
      ["seniorMondays", "Senior Mondays"],
      ["ladiesDay", "Ladies Day Tuesdays"],
      ["sameDayReplay", "Same Day Replay"],
    ],
  },
  membershipRates: {
    columns: SINGLE,
    rows: [
      ["annualSingle", "Annual Single Membership"],
      ["monthlySingle", "Monthly Single Membership"],
      ["annualCouples", "Annual Couples Membership"],
      ["monthlyCouples", "Monthly Couples Membership"],
      // New row: hidden until editors publish a price for it.
      ["firstTimeFoursome", "First Time Foursome Special", { hideWhenNoPrice: true }],
    ],
  },
  addOns: {
    columns: SINGLE,
    rows: [
      ["rangePassSingle", "Season Range Pass (Single)"],
      ["rangePassCouple", "Season Range Pass (Couple)"],
    ],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const isMissing = (v) => v === undefined || v === null;

function el(tag, attrs = {}, text) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatPrice(value) {
  const v = String(value ?? "").trim();
  if (!v) return "--";
  return v.startsWith("$") ? v : `$${v}`;
}

// Read the current hardcoded rows so they can serve as per-field fallbacks.
function readFallbackRows(tbody) {
  return [...tbody.querySelectorAll("tr")].map((tr) => ({
    label: tr.querySelector(".th-wrap")?.textContent.trim() ?? "",
    def: tr.querySelector(".note")?.textContent.trim() ?? "",
    prices: [...tr.querySelectorAll("td")].map((td) => td.textContent.trim()),
  }));
}

// ---------------------------------------------------------------------------
// Row mapping: one helper for all six tables
// ---------------------------------------------------------------------------
function mapRows(doc, config, fallbackRows) {
  return config.rows.flatMap(([prefix, defaultLabel, options = {}], i) => {
    const fallback = fallbackRows[i] || { label: defaultLabel, def: "", prices: [] };

    const rawLabel = doc[`${prefix}Label`];
    const label = isMissing(rawLabel)
      ? fallback.label
      : String(rawLabel).trim() || defaultLabel;

    const rawDef = doc[`${prefix}Def`];
    let def = isMissing(rawDef) ? fallback.def : String(rawDef).trim();
    // Some labels already carry the note, e.g. "Twilight 9 Holes (After 3pm)".
    if (def && label.toLowerCase().includes(def.toLowerCase())) def = "";

    const prices = config.columns.map((suffix, c) => {
      const raw = doc[`${prefix}${suffix}`];
      return isMissing(raw) ? fallback.prices[c] || "--" : formatPrice(raw);
    });

    if (options.hideWhenNoPrice && prices.every((p) => p === "--")) return [];
    return [{ label, def, prices }];
  });
}

function renderRows(tbody, rows) {
  tbody.replaceChildren(
    ...rows.map(({ label, def, prices }) => {
      const th = el("th", { scope: "row" });
      th.append(el("div", { class: "th-wrap" }, label));
      if (def) th.append(el("div", { class: "note" }, def));
      const tr = el("tr");
      tr.append(th, ...prices.map((p) => el("td", {}, p)));
      return tr;
    })
  );
}

// ---------------------------------------------------------------------------
// Portable Text: one shared renderer for every description
// ---------------------------------------------------------------------------
const BLOCK_TAGS = { normal: "p", h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6", blockquote: "blockquote" };
const DECORATOR_TAGS = { strong: "strong", em: "em", underline: "u", code: "code", "strike-through": "s" };

function renderLink(href) {
  const url = String(href || "").trim();
  // Only allow safe schemes.
  if (!/^(https?:|mailto:|tel:|\/|#)/i.test(url)) return el("span");
  const a = el("a", { href: url, class: "link" });
  if (/^tel:/i.test(url)) a.classList.add("phone-link", "no-underline"); // matches existing pro shop link styling
  if (/^https?:/i.test(url) && new URL(url).hostname !== location.hostname) {
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  }
  // tel:, mailto: and on-site links open in the same tab.
  return a;
}

function renderSpan(span, markDefs) {
  let node = document.createTextNode(span.text || "");
  for (const mark of span.marks || []) {
    let wrapper;
    if (DECORATOR_TAGS[mark]) {
      wrapper = el(DECORATOR_TAGS[mark]);
    } else {
      const def = markDefs.find((d) => d._key === mark);
      if (def && def._type === "link") wrapper = renderLink(def.href);
    }
    if (wrapper) {
      wrapper.append(node);
      node = wrapper;
    }
  }
  return node;
}

function renderBlockChildren(block) {
  const markDefs = block.markDefs || [];
  return (block.children || []).map((child) =>
    child._type === "span" ? renderSpan(child, markDefs) : document.createTextNode("")
  );
}

// Returns an array of DOM nodes (empty for an empty description).
function renderPortableText(blocks) {
  const out = [];
  let list = null;
  for (const block of blocks || []) {
    if (block._type !== "block") continue;
    if (block.listItem) {
      const tag = block.listItem === "number" ? "ol" : "ul";
      if (!list || list.tagName.toLowerCase() !== tag) {
        list = el(tag);
        out.push(list);
      }
      const li = el("li");
      li.append(...renderBlockChildren(block));
      list.append(li);
      continue;
    }
    list = null;
    const node = el(BLOCK_TAGS[block.style] || "p");
    node.append(...renderBlockChildren(block));
    if (node.textContent.trim()) out.push(node);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Section rendering
// ---------------------------------------------------------------------------
// "Summer Rates (April 1st - Oct 31st)" → title + dates on their own line,
// matching the existing <h3>Summer Rates <br class="br" />(…)</h3> layout.
function renderHeading(h3, heading) {
  const match = /^([\s\S]*?)\s*(\([^)]*\))$/.exec(heading);
  if (match && match[1]) {
    h3.replaceChildren(match[1], " ", el("br", { class: "br" }), match[2]);
  } else {
    h3.replaceChildren(heading);
  }
}

// Replace the description <p>s that follow the <h3> with the rendered blocks.
function renderDescription(h3, blocks) {
  let next = h3.nextElementSibling;
  while (next && next.tagName === "P") {
    const remove = next;
    next = next.nextElementSibling;
    remove.remove();
  }
  h3.after(...renderPortableText(blocks));
}

function renderSection(wrapper, doc, config) {
  const h3 = wrapper.querySelector("h3");
  const tbody = wrapper.querySelector("tbody");

  const heading = String(doc.heading ?? "").trim();
  if (h3 && heading) renderHeading(h3, heading);

  if (h3 && !isMissing(doc.description)) renderDescription(h3, doc.description);

  if (tbody) renderRows(tbody, mapRows(doc, config, readFallbackRows(tbody)));
}

// ---------------------------------------------------------------------------
// Fetch + wire up
// ---------------------------------------------------------------------------
async function fetchDocs(ids) {
  const query = `*[_id in ${JSON.stringify(ids)}]{ ... }`;
  const url = `${SANITY_URL}?query=${encodeURIComponent(query)}&perspective=published`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Sanity request failed (${response.status})`);
  const { result = [] } = await response.json();
  return Object.fromEntries(
    result.filter((d) => !d._id.startsWith("drafts.")).map((d) => [d._id, d])
  );
}

async function loadPrices() {
  const wrappers = [...document.querySelectorAll("[data-sanity-doc]")];
  const ids = [...new Set(wrappers.map((w) => w.dataset.sanityDoc))].filter(
    (id) => PRICE_TABLES[id]
  );
  if (!ids.length) return;

  const docs = await fetchDocs(ids);
  for (const wrapper of wrappers) {
    const id = wrapper.dataset.sanityDoc;
    if (docs[id] && PRICE_TABLES[id]) renderSection(wrapper, docs[id], PRICE_TABLES[id]);
  }
}

loadPrices().catch((err) => console.error("Sanity prices:", err));
