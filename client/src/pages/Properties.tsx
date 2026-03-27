/**
 * Properties.tsx – Stránka s nabídkou nemovitostí
 * Design: Modern Geometric Prestige
 * Colors: Navy #0D1B2A | Gold #D4A843
 * Fonts: Cormorant Garamond (headings) | Outfit (body)
 */

import { useState } from "react";
import { Link } from "wouter";
import {
  MapPin,
  BedDouble,
  Square,
  ChevronLeft,
  Phone,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const PROPERTIES_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663470378961/YJPp8FK3JAb3Rh4YUTwsLp/properties-hero-bMLcieVpT2hZgyG84PeEP3.webp";
const CARD1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663470378961/YJPp8FK3JAb3Rh4YUTwsLp/property-card-1-7KDphvxP8M2bZThVe2GX2j.webp";
const CARD2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663470378961/YJPp8FK3JAb3Rh4YUTwsLp/property-card-2-fL9WkJyph9b2XrxpXpueKJ.webp";

const PROPERTIES = [
  {
    id: 1,
    title: "Luxusní vila s bazénem",
    location: "Praha – západ, Průhonice",
    price: "28 500 000 Kč",
    priceNum: 28500000,
    type: "Dům",
    status: "Prodej",
    rooms: 6,
    area: 380,
    image: CARD1,
    badge: "Nová nabídka",
    badgeColor: "oklch(0.72 0.12 75)",
    description: "Reprezentativní vila s bazénem a udržovanou zahradou, 380 m² obytné plochy, garáž pro 2 auta.",
    agent: "Ing. Petra Nováková",
    agentPhone: "+420 602 111 222",
  },
  {
    id: 2,
    title: "Penthouse s výhledem na Prahu",
    location: "Praha 2 – Vinohrady",
    price: "19 900 000 Kč",
    priceNum: 19900000,
    type: "Byt",
    status: "Prodej",
    rooms: 4,
    area: 165,
    image: CARD2,
    badge: "Exkluzivní",
    badgeColor: "oklch(0.18 0.04 240)",
    description: "Unikátní penthouse s panoramatickým výhledem na Prahu, terasa 45 m², luxusní vybavení.",
    agent: "Bc. Jana Horáková",
    agentPhone: "+420 604 555 666",
  },
  {
    id: 3,
    title: "Moderní rodinný dům",
    location: "Praha – východ, Říčany",
    price: "14 200 000 Kč",
    priceNum: 14200000,
    type: "Dům",
    status: "Prodej",
    rooms: 5,
    area: 240,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    badge: null,
    badgeColor: "",
    description: "Novostavba rodinného domu, 240 m², energetická třída A, velká zahrada 800 m².",
    agent: "Bc. Martin Blažek",
    agentPhone: "+420 605 777 888",
  },
  {
    id: 4,
    title: "Byt 3+kk v centru Prahy",
    location: "Praha 1 – Staré Město",
    price: "12 500 000 Kč",
    priceNum: 12500000,
    type: "Byt",
    status: "Prodej",
    rooms: 3,
    area: 98,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    badge: null,
    badgeColor: "",
    description: "Prostorný byt v historickém centru, po kompletní rekonstrukci, vysoké stropy, parkety.",
    agent: "Bc. Jana Horáková",
    agentPhone: "+420 604 555 666",
  },
  {
    id: 5,
    title: "Kancelářský prostor",
    location: "Praha 4 – Pankrác",
    price: "85 000 Kč/měs.",
    priceNum: 85000,
    type: "Komerční",
    status: "Pronájem",
    rooms: 0,
    area: 320,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    badge: "Volné ihned",
    badgeColor: "oklch(0.55 0.15 145)",
    description: "Moderní kancelářský prostor v prestižní lokalitě, open space + 4 kanceláře, recepce.",
    agent: "Mgr. Tomáš Kovář",
    agentPhone: "+420 603 333 444",
  },
  {
    id: 6,
    title: "Byt 2+kk k pronájmu",
    location: "Praha 6 – Dejvice",
    price: "28 000 Kč/měs.",
    priceNum: 28000,
    type: "Byt",
    status: "Pronájem",
    rooms: 2,
    area: 62,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    badge: null,
    badgeColor: "",
    description: "Útulný byt v klidné části Dejvic, zrekonstruovaná kuchyně, balkon, sklep.",
    agent: "Bc. Jana Horáková",
    agentPhone: "+420 604 555 666",
  },
  {
    id: 7,
    title: "Investiční bytový dům",
    location: "Praha 3 – Žižkov",
    price: "42 000 000 Kč",
    priceNum: 42000000,
    type: "Komerční",
    status: "Prodej",
    rooms: 12,
    area: 860,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop",
    badge: "Investiční příležitost",
    badgeColor: "oklch(0.45 0.18 260)",
    description: "Výnosný bytový dům se 6 byty a 2 komerčními prostory, plně obsazeno, výnos 5,2 % p.a.",
    agent: "Mgr. Tomáš Kovář",
    agentPhone: "+420 603 333 444",
  },
  {
    id: 8,
    title: "Rodinný dům se zahradou",
    location: "Praha – západ, Černošice",
    price: "9 800 000 Kč",
    priceNum: 9800000,
    type: "Dům",
    status: "Prodej",
    rooms: 4,
    area: 180,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
    badge: null,
    badgeColor: "",
    description: "Rodinný dům v klidné lokalitě u Prahy, zahrada 600 m², garáž, sklep, podkroví.",
    agent: "Bc. Martin Blažek",
    agentPhone: "+420 605 777 888",
  },
];

const TYPES = ["Vše", "Byt", "Dům", "Komerční"];
const STATUSES = ["Vše", "Prodej", "Pronájem"];

export default function Properties() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Vše");
  const [statusFilter, setStatusFilter] = useState("Vše");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<(typeof PROPERTIES)[0] | null>(null);

  const filtered = PROPERTIES.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "Vše" || p.type === typeFilter;
    const matchStatus = statusFilter === "Vše" || p.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.005 240)", fontFamily: "'Outfit', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "oklch(0.18 0.04 240)",
          borderBottom: "1px solid rgba(212,168,67,0.2)",
        }}
      >
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <ChevronLeft size={16} />
              <span style={{ fontFamily: "'Outfit', sans-serif" }}>Zpět na hlavní stránku</span>
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{ background: "oklch(0.72 0.12 75)" }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "oklch(0.18 0.04 240)", fontSize: "0.9rem" }}>R</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem", color: "white" }}>
              Reality Praha
            </span>
          </div>
          <a
            href="tel:+420800123456"
            className="hidden md:flex items-center gap-2 text-sm hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif" }}
          >
            <Phone size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
            +420 800 123 456
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative py-20 overflow-hidden"
        style={{ background: "oklch(0.18 0.04 240)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${PROPERTIES_HERO})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(13,27,42,0.9) 50%, rgba(13,27,42,0.5))" }}
        />
        <div className="container relative z-10">
          <span
            className="block text-xs font-medium tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
          >
            Aktuální nabídka
          </span>
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "white",
              lineHeight: 1.1,
            }}
          >
            Nabídka nemovitostí
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Outfit', sans-serif", fontSize: "1rem", maxWidth: "500px" }}>
            Vybírejte z naší pečlivě sestavené nabídky prémiových nemovitostí v Praze a okolí.
          </p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section
        className="sticky top-16 z-40 py-4"
        style={{
          background: "white",
          borderBottom: "1px solid oklch(0.88 0.01 240)",
          boxShadow: "0 2px 12px rgba(13,27,42,0.06)",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.52 0.02 240)" }} />
              <input
                type="text"
                placeholder="Hledat nemovitost nebo lokalitu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm outline-none transition-all"
                style={{
                  border: "1px solid oklch(0.88 0.01 240)",
                  fontFamily: "'Outfit', sans-serif",
                  color: "oklch(0.18 0.04 240)",
                  background: "oklch(0.97 0.005 240)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.01 240)")}
              />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              className="md:hidden flex items-center gap-2 text-sm px-4 py-2.5"
              style={{
                border: "1px solid oklch(0.88 0.01 240)",
                fontFamily: "'Outfit', sans-serif",
                color: "oklch(0.38 0.02 240)",
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={14} />
              Filtry
            </button>

            {/* Filters */}
            <div className={`flex flex-wrap gap-3 ${showFilters ? "flex" : "hidden md:flex"}`}>
              <div className="flex gap-1">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="px-3 py-2 text-xs font-medium tracking-wide transition-all"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: typeFilter === t ? "oklch(0.18 0.04 240)" : "transparent",
                      color: typeFilter === t ? "white" : "oklch(0.52 0.02 240)",
                      border: typeFilter === t ? "1px solid oklch(0.18 0.04 240)" : "1px solid oklch(0.88 0.01 240)",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="px-3 py-2 text-xs font-medium tracking-wide transition-all"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      background: statusFilter === s ? "oklch(0.72 0.12 75)" : "transparent",
                      color: statusFilter === s ? "oklch(0.18 0.04 240)" : "oklch(0.52 0.02 240)",
                      border: statusFilter === s ? "1px solid oklch(0.72 0.12 75)" : "1px solid oklch(0.88 0.01 240)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="ml-auto text-sm hidden md:block"
              style={{ color: "oklch(0.52 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
            >
              {filtered.length} nemovitostí
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPERTY GRID ── */}
      <section className="py-12">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: "oklch(0.52 0.02 240)", fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem" }}>
                Žádné nemovitosti neodpovídají vašim kritériím.
              </p>
              <button
                className="mt-4 text-sm underline"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
                onClick={() => { setSearch(""); setTypeFilter("Vše"); setStatusFilter("Vše"); }}
              >
                Zrušit filtry
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="property-card bg-white overflow-hidden cursor-pointer"
                  style={{ boxShadow: "0 2px 16px rgba(13,27,42,0.07)" }}
                  onClick={() => setSelected(p)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {/* Status badge */}
                    <div
                      className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-wide"
                      style={{
                        background: p.status === "Prodej" ? "oklch(0.18 0.04 240)" : "oklch(0.55 0.15 145)",
                        color: "white",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {p.status}
                    </div>
                    {/* Custom badge */}
                    {p.badge && (
                      <div
                        className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold tracking-wide"
                        style={{
                          background: p.badgeColor,
                          color: p.badgeColor === "oklch(0.72 0.12 75)" ? "oklch(0.18 0.04 240)" : "white",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        {p.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div
                      className="flex items-center gap-1 text-xs mb-2"
                      style={{ color: "oklch(0.52 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      <MapPin size={11} />
                      {p.location}
                    </div>
                    <h3
                      className="mb-2 leading-snug"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "oklch(0.18 0.04 240)",
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      {p.rooms > 0 && (
                        <div className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.52 0.02 240)" }}>
                          <BedDouble size={12} />
                          <span>{p.rooms} pokoje</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-xs" style={{ color: "oklch(0.52 0.02 240)" }}>
                        <Square size={12} />
                        <span>{p.area} m²</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div
                      className="font-semibold"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        color: "oklch(0.72 0.12 75)",
                      }}
                    >
                      {p.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── DETAIL MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(13,27,42,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center transition-colors"
              style={{ background: "rgba(13,27,42,0.1)" }}
              onClick={() => setSelected(null)}
            >
              <X size={16} />
            </button>

            {/* Image */}
            <div className="relative" style={{ height: "280px" }}>
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{ background: "linear-gradient(to top, rgba(255,255,255,1), transparent)" }}
              />
              <div
                className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold"
                style={{
                  background: selected.status === "Prodej" ? "oklch(0.18 0.04 240)" : "oklch(0.55 0.15 145)",
                  color: "white",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {selected.status}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 pt-4">
              <div
                className="flex items-center gap-1 text-xs mb-2"
                style={{ color: "oklch(0.52 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
              >
                <MapPin size={12} />
                {selected.location}
              </div>
              <h2
                className="mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  color: "oklch(0.18 0.04 240)",
                  lineHeight: 1.2,
                }}
              >
                {selected.title}
              </h2>
              <div
                className="text-2xl font-bold mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: "oklch(0.72 0.12 75)",
                }}
              >
                {selected.price}
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 mb-6 py-4"
                style={{ borderTop: "1px solid oklch(0.88 0.01 240)", borderBottom: "1px solid oklch(0.88 0.01 240)" }}
              >
                <div className="text-center">
                  <div
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.5rem", color: "oklch(0.18 0.04 240)" }}
                  >
                    {selected.area}
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "oklch(0.52 0.02 240)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    m² plochy
                  </div>
                </div>
                {selected.rooms > 0 && (
                  <div className="text-center">
                    <div
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.5rem", color: "oklch(0.18 0.04 240)" }}
                    >
                      {selected.rooms}
                    </div>
                    <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "oklch(0.52 0.02 240)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Pokoje
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: "1.5rem", color: "oklch(0.18 0.04 240)" }}
                  >
                    {selected.type}
                  </div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: "oklch(0.52 0.02 240)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Typ
                  </div>
                </div>
              </div>

              <p
                className="mb-6 leading-relaxed"
                style={{ color: "oklch(0.38 0.02 240)", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}
              >
                {selected.description}
              </p>

              {/* Agent */}
              <div
                className="p-4 mb-6"
                style={{ background: "oklch(0.97 0.005 240)", border: "1px solid oklch(0.88 0.01 240)" }}
              >
                <div
                  className="text-xs font-medium tracking-widest uppercase mb-1"
                  style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
                >
                  Odpovědný makléř
                </div>
                <div
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem", color: "oklch(0.18 0.04 240)" }}
                >
                  {selected.agent}
                </div>
                <a
                  href={`tel:${selected.agentPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 mt-1 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: "oklch(0.38 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
                >
                  <Phone size={13} style={{ color: "oklch(0.72 0.12 75)" }} />
                  {selected.agentPhone}
                </a>
              </div>

              <div className="flex gap-3">
                <a
                  href={`tel:${selected.agentPhone.replace(/\s/g, "")}`}
                  className="btn-gold flex-1 text-center"
                  style={{ display: "block", textDecoration: "none" }}
                >
                  Zavolat makléři
                </a>
                <button
                  className="btn-outline-gold flex-1"
                  onClick={() => setSelected(null)}
                >
                  Zavřít
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer
        className="py-8 mt-8"
        style={{
          background: "oklch(0.18 0.04 240)",
          borderTop: "1px solid rgba(212,168,67,0.15)",
        }}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 flex items-center justify-center"
              style={{ background: "oklch(0.72 0.12 75)" }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "oklch(0.18 0.04 240)", fontSize: "0.8rem" }}>R</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1rem", color: "white" }}>
              Reality Praha
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem" }}>
            © 2025 Reality Praha s.r.o. | Všechna práva vyhrazena
          </p>
          <Link href="/">
            <button
              className="text-xs hover:text-white transition-colors"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
            >
              ← Zpět na hlavní stránku
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
