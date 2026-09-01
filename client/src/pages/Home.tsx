/**
 * Home.tsx – Landing page pro Hovjadský - Reality
 * Design: Modern Geometric Prestige
 * Colors: Navy #0D1B2A (oklch 0.18 0.04 240) | Gold #D4A843 (oklch 0.72 0.12 75)
 * Fonts: Cormorant Garamond (headings) | Outfit (body)
 */

import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Link } from "wouter";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Home as HomeIcon,
  Building2,
  Key,
  TrendingUp,
  Shield,
  Star,
  Menu,
  X,
} from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663470378961/YJPp8FK3JAb3Rh4YUTwsLp/hero-bg-RveV5qTzEJjpdfmtAgjd5t.webp";

const SERVICES = [
  {
    icon: HomeIcon,
    title: "Prodej nemovitostí",
    desc: "Zajistíme maximální výnos z prodeje vaší nemovitosti. Od profesionální fotodokumentace přes právní servis až po předání klíčů.",
  },
  {
    icon: Key,
    title: "Pronájem",
    desc: "Zprostředkujeme spolehlivé nájemníky a postaráme se o veškerou administrativu. Váš majetek je v bezpečných rukou.",
  },
  {
    icon: Building2,
    title: "Koupě nemovitosti",
    desc: "Pomůžeme vám najít ideální nemovitost odpovídající vašim požadavkům a finančním možnostem. Bezpečně a transparentně.",
  },
  {
    icon: TrendingUp,
    title: "Výkup nemovitostí",
    desc: "Vykoupíme vaši nemovitost za nejlepší možnou cenu. Rychlé jednání, výplata peněz v nejkratší možné době – bez zbytečných průtahů.",
  },
  {
    icon: Shield,
    title: "Právní servis",
    desc: "Kompletní právní zajištění každé transakce. Spolupracujeme s předními advokátními kancelářemi specializovanými na realitní právo.",
  },
  {
    icon: Star,
    title: "Správa nemovitostí",
    desc: "Profesionální správa bytových domů, komerčních prostor i rodinných domů. Bez starostí, s maximálním výnosem.",
  },
];

const AGENTS = [
  {
    name: "Ing. Vít Hovjadský",
    role: "Realitní makléř",
    phone: "+420 603 442 763",
    email: "vhovjadsky@seznam.cz",
    specialization: "Prodej a pronájem nemovitostí",
  },
];

const STATS = [
  { value: "98 %", label: "Spokojených klientů" },
  { value: "10+", label: "Let zkušeností" },
  { value: "100 %", label: "Transparentní jednání" },
  { value: "24/7", label: "Dostupnost pro klienty" },
];

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, handleFormSubmit] = useForm("xykonejo");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── NAVIGATION ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(13,27,42,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,168,67,0.2)" : "none",
        }}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{ background: "oklch(0.72 0.12 75)" }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: "oklch(0.18 0.04 240)", fontSize: "1rem" }}>R</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.2rem", color: "white", letterSpacing: "0.05em" }}>
              Hovjadský - Reality
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[["O nás", "about"], ["Služby", "services"], ["Makléř", "team"], ["Kontakt", "contact"]].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {label}
              </button>
            ))}

            <Link href="/nemovitosti">
              <button className="btn-gold" style={{ padding: "0.5rem 1.5rem" }}>
                Nabídka nemovitostí
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "oklch(0.18 0.04 240)", borderTop: "1px solid rgba(212,168,67,0.2)" }}>
            <div className="container py-4 flex flex-col gap-4">
              {[["O nás", "about"], ["Služby", "services"], ["Makléř", "team"], ["Kontakt", "contact"]].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-white/80 hover:text-white text-left text-sm font-medium tracking-wide py-1"
                >
                  {label}
                </button>
              ))}
              <Link href="/nemovitosti">
                <button className="btn-gold w-full mt-2">Nabídka nemovitostí</button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-start overflow-hidden"
        style={{ background: "oklch(0.18 0.04 240)" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            opacity: 0.45,
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(13,27,42,0.92) 40%, rgba(13,27,42,0.4) 100%)",
          }}
        />

        {/* Content */}
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up animate-delay-100">
              <span
                className="inline-block text-xs font-medium tracking-widest uppercase mb-6"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
              >
                Realitní kancelář
              </span>
            </div>
            <h1
              className="animate-fade-in-up animate-delay-200 mb-6 leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Váš domov.<br />
              <span style={{ color: "oklch(0.72 0.12 75)", fontStyle: "italic" }}>Moje práce.</span>
            </h1>
            <p
              className="animate-fade-in-up animate-delay-300 mb-10 text-white/75 leading-relaxed"
              style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", maxWidth: "520px" }}
            >
              Nezávislý realitní makléř s osobním přístupem. Provázím vás celým procesem koupě, prodeje i pronájmu — bez zbytečných prostředníků, s plnou péčí od první schůzky až po předání klíčů.
            </p>
            <div className="animate-fade-in-up animate-delay-400 flex flex-wrap gap-4">
              <Link href="/nemovitosti">
                <button className="btn-gold">Prohlédnout nabídku</button>
              </Link>
              <button className="btn-outline-gold" onClick={() => scrollTo("contact")}>
                Kontaktovat nás
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors animate-bounce"
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem" }}>Scroll</span>
          <ChevronDown size={16} />
        </button>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "oklch(0.72 0.12 75)" }}>
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: "2rem",
                    color: "oklch(0.18 0.04 240)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: "oklch(0.22 0.04 240)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginTop: "0.25rem",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24" style={{ background: "oklch(0.97 0.005 240)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <span className="gold-line mb-4" />
              <span
                className="block text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
              >
                O nás
              </span>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "oklch(0.18 0.04 240)",
                  lineHeight: 1.15,
                }}
              >
                Nezávislý makléř<br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>na vaší straně</span>
              </h2>
              <p className="mb-4 leading-relaxed" style={{ color: "oklch(0.38 0.02 240)", fontSize: "1rem" }}>
                Jsem nezávislý realitní makléř působící v Českém Těšíně a okolí. Nezastupuji žádnou velkou kancelář — pracuji přímo pro vás, bez provizí skrytých v ceně a bez tlaku na rychlý prodej za každou cenu.
              </p>
              <p className="mb-8 leading-relaxed" style={{ color: "oklch(0.38 0.02 240)", fontSize: "1rem" }}>
                Každý případ řeším osobně — od první konzultace přes přípravu smluv až po předání klíčů. Díky tomu máte vždy přehled o tom, co se děje, a můžete počítat s rychlou a přímou komunikací.
              </p>
              <button className="btn-gold" onClick={() => scrollTo("services")}>
                Naše služby
              </button>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        className="py-24"
        style={{ background: "oklch(0.18 0.04 240)" }}
      >
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <span className="gold-line mx-auto mb-4" />
            <span
              className="block text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
            >
              Co nabízíme
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "white",
                lineHeight: 1.15,
              }}
            >
              Komplexní realitní<br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>služby pro vás</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.title}>
                <div
                  className="p-8 h-full group transition-all duration-300 hover:border-gold"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,168,67,0.5)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(212,168,67,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-5"
                    style={{ background: "rgba(212,168,67,0.12)" }}
                  >
                    <s.icon size={22} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      fontSize: "1.3rem",
                      color: "white",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24" style={{ background: "oklch(0.97 0.005 240)" }}>
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <span className="gold-line mx-auto mb-4" />
            <span
              className="block text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
            >
              Váš makléř
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.04 240)",
                lineHeight: 1.15,
              }}
            >
              Jeden člověk.<br />
              <span style={{ fontStyle: "italic", fontWeight: 400 }}>plná odpovědnost</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AGENTS.map((agent, i) => (
              <AnimatedSection key={agent.name}>
                <div
                  className="property-card bg-white overflow-hidden"
                  style={{
                    boxShadow: "0 4px 24px rgba(13,27,42,0.08)",
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  <div className="p-5">
                    <div
                      className="text-xs font-medium tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {agent.role}
                    </div>
                    <h3
                      className="mb-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 600,
                        fontSize: "1.15rem",
                        color: "oklch(0.18 0.04 240)",
                      }}
                    >
                      {agent.name}
                    </h3>
                    <p
                      className="text-xs mb-4"
                      style={{ color: "oklch(0.52 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {agent.specialization}
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={`tel:${agent.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity"
                        style={{ color: "oklch(0.38 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        <Phone size={12} style={{ color: "oklch(0.72 0.12 75)" }} />
                        {agent.phone}
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity break-all"
                        style={{ color: "oklch(0.38 0.02 240)", fontFamily: "'Outfit', sans-serif" }}
                      >
                        <Mail size={12} style={{ color: "oklch(0.72 0.12 75)" }} />
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: "oklch(0.72 0.12 75)" }}
      >
        <div className="container relative z-10 text-center">
          <AnimatedSection>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "oklch(0.18 0.04 240)",
              }}
            >
              Prodáváte, kupujete nebo pronajímáte?
            </h2>
            <p
              className="mb-8 mx-auto"
              style={{
                color: "oklch(0.22 0.04 240)",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1rem",
                maxWidth: "500px",
              }}
            >
              Ozvi se mi — první konzultace je zdarma a bez závazků. Společně najdeme nejlepší řešení pro vaši situaci.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/nemovitosti">
                <button
                  className="font-semibold tracking-wide uppercase text-sm px-8 py-3 transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "oklch(0.18 0.04 240)",
                    color: "white",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  Nabídka nemovitostí
                </button>
              </Link>
              <button
                className="font-semibold tracking-wide uppercase text-sm px-8 py-3 transition-all duration-200 hover:bg-navy/10"
                style={{
                  border: "2px solid oklch(0.18 0.04 240)",
                  color: "oklch(0.18 0.04 240)",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.05em",
                  background: "transparent",
                }}
                onClick={() => scrollTo("contact")}
              >
                Konzultace zdarma
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24" style={{ background: "oklch(0.18 0.04 240)" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact info */}
            <AnimatedSection>
              <span className="gold-line mb-4" />
              <span
                className="block text-xs font-medium tracking-widest uppercase mb-3"
                style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
              >
                Kontakt
              </span>
              <h2
                className="mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "white",
                  lineHeight: 1.2,
                }}
              >
                Jsme tu pro vás.<br />
                <span style={{ fontStyle: "italic", fontWeight: 400 }}>Ozvěte se nám.</span>
              </h2>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(212,168,67,0.12)" }}
                  >
                    <MapPin size={18} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Adresa
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}>
                    Čapkova 9/4, Český Těšín 737 01
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(212,168,67,0.12)" }}
                  >
                    <Phone size={18} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Telefon
                    </div>
                    <a
                      href="tel:+420603442763"
                      style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}
                      className="hover:text-white transition-colors"
                    >
                      +420 603 442 763
                    </a>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                      Po–Pá 8:00–18:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(212,168,67,0.12)" }}
                  >
                    <Mail size={18} style={{ color: "oklch(0.72 0.12 75)" }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-medium tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.72 0.12 75)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      E-mail
                    </div>
                    <a
                      href="mailto:vhovjadsky@seznam.cz"
                      style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}
                      className="hover:text-white transition-colors"
                    >
                      vhovjadsky@seznam.cz
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection>
              {formState.succeeded ? (
                <div
                  className="p-8 flex flex-col items-center justify-center text-center"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", minHeight: "400px" }}
                >
                  <div style={{ color: "oklch(0.72 0.12 75)", fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: "1.5rem", color: "white", marginBottom: "0.5rem" }}>
                    Zpráva odeslána!
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Outfit', sans-serif" }}>
                    Děkujeme za zprávu. Ozveme se vám co nejdříve.
                  </p>
                </div>
              ) : (
              <form
                className="p-8"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onSubmit={handleFormSubmit}
              >
                <h3
                  className="mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: "1.5rem",
                    color: "white",
                  }}
                >
                  Napište nám
                </h3>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block text-xs font-medium tracking-wide uppercase mb-2"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Jméno
                    </label>
                    <input
                      type="text"
                      name="jmeno"
                      placeholder="Jan Novák"
                      required
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-medium tracking-wide uppercase mb-2"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="telefon"
                      placeholder="+420 xxx xxx xxx"
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        color: "white",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-xs font-medium tracking-wide uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jan@example.cz"
                    required
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                  <ValidationError field="email" errors={formState.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <div className="mb-6">
                  <label
                    className="block text-xs font-medium tracking-wide uppercase mb-2"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}
                  >
                    Zpráva
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Jak vám můžeme pomoci?"
                    required
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "white",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.72 0.12 75)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                  />
                  <ValidationError field="message" errors={formState.errors} className="text-red-400 text-xs mt-1" />
                </div>

                <button type="submit" className="btn-gold w-full" disabled={formState.submitting}>
                  {formState.submitting ? "Odesílám..." : "Odeslat zprávu"}
                </button>
              </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8"
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
          <div className="flex gap-6">
            {["Ochrana osobních údajů", "Podmínky"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs hover:text-white transition-colors"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'Outfit', sans-serif" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
