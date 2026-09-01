/**
 * Properties.tsx – Stránka s nabídkou nemovitostí
 * Design: Modern Geometric Prestige
 * Colors: Navy #0D1B2A | Gold #D4A843
 * Fonts: Cormorant Garamond (headings) | Outfit (body)
 *
 * Nemovitosti jsou načítány z Markdown souborů v src/content/nemovitosti/
 * Správa přes Decap CMS admin panel na /admin
 */

import { useState } from "react";
import { Link } from "wouter";
import {
  BedDouble,
  Square,
  ChevronLeft,
  Phone,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
} from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { useLocation } from "wouter";

const PROPERTIES_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663470378961/YJPp8FK3JAb3Rh4YUTwsLp/properties-hero-bMLcieVpT2hZgyG84PeEP3.webp";

const BADGE_COLORS: Record<string, string> = {
  "Nová nabídka": "oklch(0.72 0.12 75)",
  "Exkluzivní": "oklch(0.18 0.04 240)",
  "Volné ihned": "oklch(0.55 0.15 145)",
  "Investiční příležitost": "oklch(0.45 0.18 260)",
  "Snížená cena": "oklch(0.55 0.2 30)",
};

const AGENT_EMAILS: Record<string, string> = {
  "Ing. Vít Hovjadský": "hovjadsky@gmail.com",
  "Ing. Petra Koudelková": "koudelkova@gmail.com",
};

const TYPES = ["Vše", "Byty", "Domy", "Komerční", "Pozemky"];
const STATUSES = ["Vše", "Prodej", "Pronájem"];

export default function Properties() {
  const properties = useProperties();
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Vše");
  const [statusFilter, setStatusFilter] = useState("Vše");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = properties.filter((p) => {
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
              Hovjadský - Reality
            </span>
          </div>
          <a
            href="tel:+420603442763"
            className="hidden md:flex items-center gap-2 text-sm hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif" }}
          >
            <Phone size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
            +420 603 442 763
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
          <p style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'Outfit', sans-serif", fontSize: "1rem", maxWidth: "480px" }}>
            Prohlédněte si naši aktuální nabídku nemovitostí ve Frýdku-Místku a okolí.
          </p>
        </div>
      </section>

      {/* ── FILTERS ── */}
      <section
        className="sticky top-16 z-40 py-4"
        style={{
          background: "white",
          borderBottom: "1px solid oklch(0.92 0.004 286.32)",
          boxShadow: "0 2px 12px rgba(13,27,42,0.06)",
        }}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "oklch(0.55 0.016 285.938)" }} />
              <input
                type="text"
                placeholder="Hledat nemovitost nebo lokalitu…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm outline-none transition-all"
                style={{
                  border: "1px solid oklch(0.92 0.004 286.32)",
                  fontFamily: "'Outfit', sans-serif",
                  color: "oklch(0.235 0.015 65)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                onBlur={(e) => (e.target.style.borderColor = "oklch(0.92 0.004 286.32)")}
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all"
              style={{
                border: showFilters ? "1px solid oklch(0.72 0.12 75)" : "1px solid oklch(0.92 0.004 286.32)",
                background: showFilters ? "rgba(212,168,67,0.08)" : "transparent",
                color: showFilters ? "oklch(0.55 0.12 75)" : "oklch(0.4 0.015 65)",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <SlidersHorizontal size={15} />
              Filtry
              {(typeFilter !== "Vše" || statusFilter !== "Vše") && (
                <span
                  className="w-5 h-5 flex items-center justify-center text-xs font-bold"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.18 0.04 240)", borderRadius: "50%" }}
                >
                  {[typeFilter !== "Vše", statusFilter !== "Vše"].filter(Boolean).length}
                </span>
              )}
            </button>

            {/* Result count */}
            <span className="text-sm ml-auto" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
              {filtered.length} {filtered.length === 1 ? "nemovitost" : filtered.length < 5 ? "nemovitosti" : "nemovitostí"}
            </span>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-6 mt-4 pt-4" style={{ borderTop: "1px solid oklch(0.92 0.004 286.32)" }}>
              <div>
                <div className="text-xs font-medium tracking-wide uppercase mb-2" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                  Typ
                </div>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className="px-3 py-1.5 text-xs font-medium transition-all"
                      style={{
                        border: typeFilter === t ? "1px solid oklch(0.72 0.12 75)" : "1px solid oklch(0.92 0.004 286.32)",
                        background: typeFilter === t ? "oklch(0.72 0.12 75)" : "transparent",
                        color: typeFilter === t ? "oklch(0.18 0.04 240)" : "oklch(0.4 0.015 65)",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: typeFilter === t ? 600 : 400,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium tracking-wide uppercase mb-2" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                  Status
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className="px-3 py-1.5 text-xs font-medium transition-all"
                      style={{
                        border: statusFilter === s ? "1px solid oklch(0.72 0.12 75)" : "1px solid oklch(0.92 0.004 286.32)",
                        background: statusFilter === s ? "oklch(0.72 0.12 75)" : "transparent",
                        color: statusFilter === s ? "oklch(0.18 0.04 240)" : "oklch(0.4 0.015 65)",
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: statusFilter === s ? 600 : 400,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {(typeFilter !== "Vše" || statusFilter !== "Vše") && (
                <button
                  onClick={() => { setTypeFilter("Vše"); setStatusFilter("Vše"); }}
                  className="flex items-center gap-1 text-xs self-end mb-1 transition-colors"
                  style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}
                >
                  <X size={12} /> Zrušit filtry
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-12">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div
                className="text-5xl mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "oklch(0.72 0.12 75)" }}
              >
                ∅
              </div>
              <p style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                Žádné nemovitosti neodpovídají zadaným filtrům.
              </p>
              <button
                onClick={() => { setSearch(""); setTypeFilter("Vše"); setStatusFilter("Vše"); }}
                className="mt-4 text-sm underline transition-colors"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
              >
                Zobrazit vše
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group cursor-pointer transition-all duration-300"
                  style={{
                    background: "white",
                    border: "1px solid oklch(0.92 0.004 286.32)",
                    boxShadow: "0 2px 8px rgba(13,27,42,0.04)",
                  }}
                  onClick={() => navigate(`/nemovitosti/${p.id}`)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(13,27,42,0.12)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,168,67,0.4)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(13,27,42,0.04)";
                    (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.92 0.004 286.32)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: "200px" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Status badge */}
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold"
                      style={{
                        background: p.status === "Prodej" ? "oklch(0.18 0.04 240)" : "oklch(0.45 0.18 260)",
                        color: "white",
                        fontFamily: "'Outfit', sans-serif",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {p.status}
                    </div>
                    {/* Optional badge */}
                    {p.badge && (
                      <div
                        className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold"
                        style={{
                          background: BADGE_COLORS[p.badge] ?? "oklch(0.72 0.12 75)",
                          color: p.badge === "Nová nabídka" || p.badge === "Snížená cena" ? "oklch(0.18 0.04 240)" : "white",
                          fontFamily: "'Outfit', sans-serif",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {p.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3
                        className="leading-tight"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 600,
                          fontSize: "1.2rem",
                          color: "oklch(0.18 0.04 240)",
                        }}
                      >
                        {p.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <MapPin size={13} style={{ color: "oklch(0.72 0.12 75)", flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                        {p.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {p.rooms > 0 && (
                        <div className="flex items-center gap-1.5">
                          <BedDouble size={13} style={{ color: "oklch(0.72 0.12 75)" }} />
                          <span className="text-xs" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                            {p.rooms} {p.rooms === 1 ? "pokoj" : p.rooms < 5 ? "pokoje" : "pokojů"}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Square size={13} style={{ color: "oklch(0.72 0.12 75)" }} />
                        <span className="text-xs" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                          {p.area} m²
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontWeight: 700,
                          fontSize: "1.3rem",
                          color: "oklch(0.18 0.04 240)",
                        }}
                      >
                        {p.price}
                      </span>
                      <span className="text-xs" style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}>
                        Detail →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>



      {/* ── FOOTER ── */}
      <footer
        className="py-8 mt-8"
        style={{
          background: "oklch(0.13 0.03 240)",
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
              Hovjadský - Reality
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem" }}>
            © 2025 Hovjadský - Reality | Všechna práva vyhrazena
          </p>
        </div>
      </footer>
    </div>
  );
}
