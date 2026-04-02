/**
 * PropertyDetail.tsx – Detailní stránka nemovitosti
 * Design: Modern Geometric Prestige
 * Colors: Navy #0D1B2A | Gold #D4A843
 * Fonts: Cormorant Garamond (headings) | Outfit (body)
 */

import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  BedDouble,
  Square,
  ChevronLeft as ArrowLeft,
  ChevronRight as ArrowRight,
  X,
  Check,
  Home as HomeIcon,
  Building2,
  Send,
} from "lucide-react";
import { useProperty } from "@/hooks/useProperties";
import ShareBar from "@/components/ShareBar";

const AGENT_EMAILS: Record<string, string> = {
  "Ing. Vít Hovjadský": "hovjadsky@gmail.com",
  "Ing. Petra Koudelková": "koudelkova@gmail.com",
};

const STATUS_COLOR: Record<string, string> = {
  "Prodej": "oklch(0.18 0.04 240)",
  "Pronájem": "oklch(0.45 0.18 260)",
  "Prodáno": "oklch(0.45 0.15 145)",
};

const BADGE_COLORS: Record<string, string> = {
  "Nová nabídka": "oklch(0.72 0.12 75)",
  "Exkluzivní": "oklch(0.18 0.04 240)",
  "Volné ihned": "oklch(0.55 0.15 145)",
  "Investiční příležitost": "oklch(0.45 0.18 260)",
  "Snížená cena": "oklch(0.55 0.2 30)",
};

export default function PropertyDetail() {
  const params = useParams<{ id: string }>();
  const property = useProperty(params.id ?? "");

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  // Sestavit kompletní galerii (hlavní foto + galerie)
  const allImages = property
    ? [property.image, ...property.gallery.filter((g) => g !== property.image)]
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [params.id]);

  // Klávesové ovládání lightboxu
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % allImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length);
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, allImages.length]);

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "oklch(0.97 0.005 240)" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: "oklch(0.72 0.12 75)" }}>404</div>
        <p className="mb-6" style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.55 0.016 285.938)" }}>
          Nemovitost nebyla nalezena.
        </p>
        <Link href="/nemovitosti">
          <button className="btn-gold">Zpět na nabídku</button>
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
          <Link href="/nemovitosti">
            <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
              <ChevronLeft size={16} />
              <span style={{ fontFamily: "'Outfit', sans-serif" }}>Zpět na nabídku</span>
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ background: "oklch(0.72 0.12 75)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "oklch(0.18 0.04 240)", fontSize: "0.9rem" }}>R</span>
            </div>
            <Link href="/">
              <span className="cursor-pointer" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.1rem", color: "white" }}>
                RplusP real s.r.o.
              </span>
            </Link>
          </div>
          <a
            href={`tel:${property.agentPhone.replace(/\s/g, "")}`}
            className="hidden md:flex items-center gap-2 text-sm hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'Outfit', sans-serif" }}
          >
            <Phone size={14} style={{ color: "oklch(0.72 0.12 75)" }} />
            {property.agentPhone}
          </a>
        </div>
      </nav>

      {/* ── HERO GALLERY ── */}
      <section style={{ background: "oklch(0.18 0.04 240)" }}>
        {/* Main image */}
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{ height: "clamp(320px, 55vw, 560px)" }}
          onClick={() => openLightbox(galleryIndex)}
        >
          <img
            src={allImages[galleryIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(13,27,42,0.7) 100%)" }}
          />

          {/* Badges */}
          <div className="absolute top-5 left-5 flex gap-2 flex-wrap">
            <span
              className="px-3 py-1.5 text-xs font-semibold"
              style={{
                background: STATUS_COLOR[property.status] ?? "oklch(0.18 0.04 240)",
                color: "white",
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              {property.status}
            </span>
            {property.badge && (
              <span
                className="px-3 py-1.5 text-xs font-semibold"
                style={{
                  background: BADGE_COLORS[property.badge] ?? "oklch(0.72 0.12 75)",
                  color: property.badge === "Nová nabídka" || property.badge === "Snížená cena" ? "oklch(0.18 0.04 240)" : "white",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                {property.badge}
              </span>
            )}
          </div>

          {/* Gallery nav arrows (only if multiple images) */}
          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all"
                style={{ background: "rgba(13,27,42,0.6)", color: "white" }}
                onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + allImages.length) % allImages.length); }}
              >
                <ArrowLeft size={20} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all"
                style={{ background: "rgba(13,27,42,0.6)", color: "white" }}
                onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % allImages.length); }}
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}

          {/* Image counter */}
          {allImages.length > 1 && (
            <div
              className="absolute bottom-4 right-4 px-3 py-1 text-xs"
              style={{ background: "rgba(13,27,42,0.7)", color: "white", fontFamily: "'Outfit', sans-serif" }}
            >
              {galleryIndex + 1} / {allImages.length}
            </div>
          )}

          {/* Click to enlarge hint */}
          <div
            className="absolute bottom-4 left-4 text-xs"
            style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Outfit', sans-serif" }}
          >
            Kliknutím zvětšíte
          </div>
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div
            className="flex gap-2 overflow-x-auto px-4 py-3"
            style={{ background: "oklch(0.15 0.035 240)" }}
          >
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setGalleryIndex(idx)}
                className="flex-shrink-0 overflow-hidden transition-all"
                style={{
                  width: "80px",
                  height: "56px",
                  border: idx === galleryIndex ? "2px solid oklch(0.72 0.12 75)" : "2px solid transparent",
                  opacity: idx === galleryIndex ? 1 : 0.55,
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ── CONTENT ── */}
      <div className="container py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left: main content */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Title & price */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}>
                <Link href="/"><span className="hover:text-amber-600 cursor-pointer transition-colors">Domů</span></Link>
                <span>/</span>
                <Link href="/nemovitosti"><span className="hover:text-amber-600 cursor-pointer transition-colors">Nabídka</span></Link>
                <span>/</span>
                <span style={{ color: "oklch(0.72 0.12 75)" }}>{property.title}</span>
              </div>

              <h1
                className="mb-3 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "oklch(0.18 0.04 240)",
                }}
              >
                {property.title}
              </h1>

              <div className="flex items-center gap-2 mb-5">
                <MapPin size={15} style={{ color: "oklch(0.72 0.12 75)" }} />
                <span style={{ color: "oklch(0.4 0.015 65)", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}>
                  {property.location}
                </span>
              </div>

              {/* Key stats row */}
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-px"
                style={{ background: "oklch(0.92 0.004 286.32)", border: "1px solid oklch(0.92 0.004 286.32)" }}
              >
                {[
                  { label: "Cena", value: property.price, icon: null, highlight: true },
                  { label: "Plocha", value: `${property.area} m²`, icon: <Square size={14} /> },
                  ...(property.rooms > 0 ? [{ label: "Pokoje", value: String(property.rooms), icon: <BedDouble size={14} /> }] : []),
                  { label: "Typ", value: property.type, icon: <Building2 size={14} /> },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-4 flex flex-col gap-1"
                    style={{ background: stat.highlight ? "oklch(0.18 0.04 240)" : "white" }}
                  >
                    <div
                      className="flex items-center gap-1.5 text-xs uppercase tracking-wide"
                      style={{
                        color: stat.highlight ? "oklch(0.72 0.12 75)" : "oklch(0.55 0.016 285.938)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {stat.icon}
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontFamily: stat.highlight ? "'Cormorant Garamond', serif" : "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: stat.highlight ? "1.4rem" : "1rem",
                        color: stat.highlight ? "white" : "oklch(0.18 0.04 240)",
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full description */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="gold-line" style={{ width: "32px" }} />
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "oklch(0.18 0.04 240)",
                  }}
                >
                  Popis nemovitosti
                </h2>
              </div>
              <div
                className="leading-relaxed whitespace-pre-line"
                style={{
                  color: "oklch(0.38 0.02 240)",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.97rem",
                  lineHeight: 1.8,
                }}
              >
                {property.fullDescription}
              </div>
            </div>

            {/* Features / vybavení */}
            {property.features.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="gold-line" style={{ width: "32px" }} />
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "oklch(0.18 0.04 240)",
                    }}
                  >
                    Vybavení a vlastnosti
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 px-3" style={{ background: "white", border: "1px solid oklch(0.92 0.004 286.32)" }}>
                      <div
                        className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(212,168,67,0.15)" }}
                      >
                        <Check size={12} style={{ color: "oklch(0.72 0.12 75)" }} />
                      </div>
                      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "oklch(0.38 0.02 240)" }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery grid (if more than 1 image) */}
            {allImages.length > 1 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="gold-line" style={{ width: "32px" }} />
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 700,
                      fontSize: "1.5rem",
                      color: "oklch(0.18 0.04 240)",
                    }}
                  >
                    Fotogalerie
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      className="overflow-hidden group"
                      style={{ aspectRatio: "4/3" }}
                      onClick={() => openLightbox(idx)}
                    >
                      <img
                        src={img}
                        alt={`${property.title} – foto ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="flex flex-col gap-6">

            {/* Agent card */}
            <div
              className="p-6"
              style={{
                background: "oklch(0.18 0.04 240)",
                border: "1px solid rgba(212,168,67,0.2)",
              }}
            >
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
              >
                Kontaktní makléř
              </div>
              <div
                className="mb-1"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "white",
                }}
              >
                {property.agent}
              </div>
              <div className="mb-5" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem" }}>
                Realitní makléř · RplusP real s.r.o.
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:${property.agentPhone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all"
                  style={{ background: "oklch(0.72 0.12 75)", color: "oklch(0.18 0.04 240)", fontFamily: "'Outfit', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.78 0.12 75)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.72 0.12 75)")}
                >
                  <Phone size={15} />
                  {property.agentPhone}
                </a>
                <a
                  href={`mailto:${AGENT_EMAILS[property.agent] ?? "info@rpluspreal.cz"}?subject=Zájem o nemovitost: ${encodeURIComponent(property.title)}`}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all"
                  style={{ border: "1px solid rgba(212,168,67,0.4)", color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.72 0.12 75)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,168,67,0.4)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.8)";
                  }}
                >
                  <Mail size={15} />
                  {AGENT_EMAILS[property.agent] ?? "info@rpluspreal.cz"}
                </a>
              </div>
            </div>

            {/* Share bar */}
            <div
              className="p-6"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.004 286.32)",
              }}
            >
              <ShareBar
                title={property.title}
                url={typeof window !== "undefined" ? window.location.href : ""}
                description={property.description}
              />
            </div>

            {/* Contact form */}
            <div
              className="p-6"
              style={{
                background: "white",
                border: "1px solid oklch(0.92 0.004 286.32)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="gold-line" style={{ width: "24px" }} />
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    color: "oklch(0.18 0.04 240)",
                  }}
                >
                  Mám zájem o tuto nemovitost
                </h3>
              </div>

              {formSent ? (
                <div className="text-center py-6">
                  <div
                    className="w-12 h-12 flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(212,168,67,0.12)" }}
                  >
                    <Check size={22} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: "oklch(0.38 0.02 240)", fontSize: "0.9rem" }}>
                    Zpráva odeslána. Makléř vás brzy kontaktuje.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                  {[
                    { label: "Jméno a příjmení", name: "name", type: "text", placeholder: "Jan Novák", required: true },
                    { label: "Telefon", name: "phone", type: "tel", placeholder: "+420 xxx xxx xxx", required: false },
                    { label: "E-mail", name: "email", type: "email", placeholder: "jan@example.cz", required: true },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        className="block text-xs font-medium tracking-wide uppercase mb-1.5"
                        style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-3 py-2.5 text-sm outline-none transition-all"
                        style={{
                          border: "1px solid oklch(0.92 0.004 286.32)",
                          color: "oklch(0.235 0.015 65)",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                        onBlur={(e) => (e.target.style.borderColor = "oklch(0.92 0.004 286.32)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-xs font-medium tracking-wide uppercase mb-1.5"
                      style={{ color: "oklch(0.55 0.016 285.938)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Zpráva
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`Mám zájem o nemovitost: ${property.title}`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm outline-none transition-all resize-none"
                      style={{
                        border: "1px solid oklch(0.92 0.004 286.32)",
                        color: "oklch(0.235 0.015 65)",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.92 0.004 286.32)")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold transition-all"
                    style={{
                      background: "oklch(0.18 0.04 240)",
                      color: "white",
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "0.04em",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.72 0.12 75)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.18 0.04 240)")}
                  >
                    <Send size={14} />
                    Odeslat poptávku
                  </button>
                </form>
              )}
            </div>

            {/* Back to listing */}
            <Link href="/nemovitosti">
              <button
                className="w-full flex items-center justify-center gap-2 py-3 text-sm transition-all"
                style={{
                  border: "1px solid oklch(0.92 0.004 286.32)",
                  color: "oklch(0.4 0.015 65)",
                  fontFamily: "'Outfit', sans-serif",
                  background: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.72 0.12 75)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.55 0.12 75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.92 0.004 286.32)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.4 0.015 65)";
                }}
              >
                <HomeIcon size={14} />
                Zobrazit všechny nemovitosti
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-10 transition-colors"
            style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
            onClick={() => setLightboxOpen(false)}
          >
            <X size={20} />
          </button>

          {allImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + allImages.length) % allImages.length); }}
              >
                <ArrowLeft size={22} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center z-10 transition-colors"
                style={{ background: "rgba(255,255,255,0.1)", color: "white" }}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % allImages.length); }}
              >
                <ArrowRight size={22} />
              </button>
            </>
          )}

          <img
            src={allImages[lightboxIndex]}
            alt={`${property.title} – foto ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 text-xs"
            style={{ background: "rgba(255,255,255,0.15)", color: "white", fontFamily: "'Outfit', sans-serif" }}
          >
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

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
            <div className="w-6 h-6 flex items-center justify-center" style={{ background: "oklch(0.72 0.12 75)" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "oklch(0.18 0.04 240)", fontSize: "0.8rem" }}>R</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1rem", color: "white" }}>
              RplusP real s.r.o.
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem" }}>
            © 2025 RplusP real s.r.o. | Všechna práva vyhrazena
          </p>
        </div>
      </footer>
    </div>
  );
}
