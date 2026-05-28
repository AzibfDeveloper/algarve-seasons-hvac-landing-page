/*
 * BRAND-ALIGNED — Algarve Seasons
 * Primary blue #1E73BE | Sky blue #71BBEC | Off-white #F9F9F9 | Charcoal #222
 * Headings: Josefin Sans 700 (uppercase) | Body: Open Sans
 * Real logo in header & footer. Logo seasonal accents (sun/leaf/snow) used
 * sparingly on category icons.
 */

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Thermometer,
  Wind,
  Wrench,
  Building2,
  Zap,
  Droplets,
  Sun,
  Shield,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

// ── Brand assets ────────────────────────────────────────────────────────────
const LOGO = "/manus-storage/algarve-seasons-logo_cde17606.png";

// ── Image URLs ──────────────────────────────────────────────────────────────
const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663308749066/RyfrdaqnEjbbrx7XdMbdAQ/hvac-hero-LQEKLqjrzSb3Y9zYHknrji.webp";
const DAIKIN_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663308749066/RyfrdaqnEjbbrx7XdMbdAQ/hvac-daikin-install-Gq3H5ioHVrgihd3tqgooDj.webp";
const VILLA_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663308749066/RyfrdaqnEjbbrx7XdMbdAQ/hvac-coastal-villa-gkFAgkdmAmW5gMfs5LkdSy.webp";
const HEATPUMP_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663308749066/RyfrdaqnEjbbrx7XdMbdAQ/hvac-heat-pump-4uF3gg7EVxQ3pBuf383YK9.webp";

// ── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Counter animation ────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          let start = 0;
          const duration = 1400;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-[#E5E7EB] py-5 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="font-semibold text-[#1E73BE] text-base leading-snug"
          style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.01em" }}
        >
          {q}
        </span>
        <span className="shrink-0 text-[#1E73BE] mt-0.5">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-[#333333] text-sm leading-relaxed gold-border-left">
          {a}
        </p>
      )}
    </div>
  );
}

// ── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({
  icon: Icon,
  title,
  desc,
  accent = "#1E73BE",
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm border border-[#E5E7EB] hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
      <div
        className="w-11 h-11 rounded-md flex items-center justify-center mb-4 transition-colors duration-200"
        style={{ backgroundColor: `${accent}1A` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>
      <h3
        className="text-[#1E73BE] font-bold text-base mb-2 uppercase tracking-wide"
        style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.04em" }}
      >
        {title}
      </h3>
      <p className="text-[#555555] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Review Card ──────────────────────────────────────────────────────────────
function ReviewCard({
  name,
  location,
  text,
}: {
  name: string;
  location: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm border border-[#E5E7EB]">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-[#E89B2A] text-[#E89B2A]"
          />
        ))}
      </div>
      <p className="text-[#333333] text-sm leading-relaxed mb-4 gold-border-left">
        "{text}"
      </p>
      <div>
        <p className="font-semibold text-[#1E73BE] text-sm">{name}</p>
        <p className="text-[#6B7280] text-xs">{location}</p>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Nav scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Reveal refs
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();
  const r4 = useReveal();
  const r5 = useReveal();
  const r6 = useReveal();
  const r7 = useReveal();
  const r8 = useReveal();
  const r9 = useReveal();
  const r10 = useReveal();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-[#222222]">
      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md border-b border-[#E5E7EB]"
            : "bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]/50"
        }`}
      >
        <div className="container flex items-center justify-between h-20">
          {/* Real Algarve Seasons logo */}
          <a href="https://algarveseasons.com" className="flex items-center">
            <img
              src={LOGO}
              alt="Algarve Seasons — Air Conditioning & Renewable Energies"
              className="h-12 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 text-sm text-[#333333]">
            {[
              ["Services", "services"],
              ["Daikin", "daikin"],
              ["Heat Pumps", "heat-pumps"],
              ["Process", "process"],
              ["Areas", "areas"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-semibold uppercase tracking-wide text-xs hover:text-[#1E73BE] transition-colors duration-150 relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#1E73BE] after:transition-all hover:after:w-full"
                style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.1em" }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+351910675168"
              className="flex items-center gap-1.5 text-[#1E73BE] hover:text-[#155A95] text-sm font-semibold transition-colors"
            >
              <Phone size={15} />
              +351 910 675 168
            </a>
            <button
              onClick={() => scrollTo("quote")}
              className="btn-gold text-xs py-2.5 px-5"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#1E73BE]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 flex flex-col gap-3 shadow-lg">
            {[
              ["Services", "services"],
              ["Daikin", "daikin"],
              ["Heat Pumps", "heat-pumps"],
              ["Process", "process"],
              ["Areas", "areas"],
              ["FAQ", "faq"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-[#333333] hover:text-[#1E73BE] text-left text-sm py-1 font-semibold uppercase tracking-wide"
                style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.1em" }}
              >
                {label}
              </button>
            ))}
            <a href="tel:+351910675168" className="flex items-center gap-2 text-[#1E73BE] text-sm font-semibold">
              <Phone size={14} /> +351 910 675 168
            </a>
            <button
              onClick={() => scrollTo("quote")}
              className="btn-gold text-xs py-3 w-full mt-1"
            >
              Get a Free Quote
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0E2A47]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Algarve Seasons technician installing Daikin air conditioning in an Algarve home"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A47]/95 via-[#0E2A47]/70 to-[#0E2A47]/25" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#71BBEC]/15 border border-[#71BBEC]/40 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#71BBEC] animate-pulse" />
              <span
                className="text-[#71BBEC] text-xs font-semibold tracking-widest uppercase"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                Daikin Certified Installers · Algarve
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, letterSpacing: "0.005em" }}
            >
              HVAC Installation
              <br />
              <span className="text-[#71BBEC]">in the Algarve</span>
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
              Algarve Seasons installs efficient HVAC, Daikin air conditioning, and heat pump
              systems for homes, villas, apartments, rental properties, and businesses across the
              Algarve. From system sizing and installation to maintenance and aftercare, we help
              you choose a reliable climate-control solution for year-round comfort.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button onClick={() => scrollTo("quote")} className="btn-gold text-sm">
                Get a Free HVAC Quote
              </button>
              <a href="tel:+351910675168" className="btn-white-outline text-sm text-center">
                <span className="flex items-center justify-center gap-2">
                  <Phone size={16} /> Call +351 910 675 168
                </span>
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Daikin air conditioning specialists",
                "BTU sizing & site surveys",
                "Homes, villas & businesses",
                "Maintenance & aftercare",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-white/70 text-sm">
                  <CheckCircle2 size={14} className="text-[#71BBEC] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-xs">
          <span style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.2em" }}>
            SCROLL
          </span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────────────────── */}
      <section className="bg-[#1E73BE] py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { n: 500, s: "+", label: "Installations Completed" },
              { n: 15, s: "+", label: "Years in the Algarve" },
              { n: 98, s: "%", label: "Customer Satisfaction" },
              { n: 24, s: "/7", label: "Emergency Support" },
            ].map(({ n, s, label }) => (
              <div key={label}>
                <div
                  className="text-4xl font-bold mb-1"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  <AnimatedNumber target={n} suffix={s} />
                </div>
                <div
                  className="text-white/85 text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.15em" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ──────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-[#F9F9F9]">
        <div className="container">
          <div ref={r1} className="reveal max-w-2xl mb-12">
            <p className="eyebrow text-[#1E73BE] mb-3">Our Services</p>
            <h2
              className="text-[#1E73BE] text-3xl sm:text-4xl mb-4 uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
            >
              Professional HVAC Systems for Algarve Homes and Businesses
            </h2>
            <p className="text-[#444444] leading-relaxed">
              HVAC covers the systems that keep your property comfortable, ventilated, and
              energy-efficient throughout the year. In the Algarve, that means more than summer
              cooling. A well-designed system can also support efficient winter heating, humidity
              control, better indoor air quality, and reliable performance during peak rental or
              hospitality seasons.
            </p>
          </div>

          <div ref={r2} className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ServiceCard
              icon={Wind}
              title="Air Conditioning Installation"
              desc="New AC systems for rooms, apartments, villas, offices, and commercial spaces. Correct sizing and professional installation for lasting performance."
              accent="#71BBEC"
            />
            <ServiceCard
              icon={Wrench}
              title="HVAC Replacement"
              desc="Upgrade old or inefficient systems with modern, quieter, more energy-efficient alternatives. We handle removal, installation, and commissioning."
              accent="#1E73BE"
            />
            <ServiceCard
              icon={Thermometer}
              title="Heat Pump Installation"
              desc="Efficient heating and cooling solutions for Algarve homes and businesses. Ideal for year-round comfort with lower running costs."
              accent="#E89B2A"
            />
            <ServiceCard
              icon={Shield}
              title="HVAC Maintenance"
              desc="Seasonal servicing to protect performance, efficiency, hygiene, and warranty. Planned maintenance reduces breakdowns during peak season."
              accent="#2E7D32"
            />
            <ServiceCard
              icon={Wrench}
              title="HVAC Repairs"
              desc="Diagnosis and repair support for air conditioning and climate-control faults. Fast response to keep your property comfortable."
              accent="#C0392B"
            />
            <ServiceCard
              icon={Droplets}
              title="Ventilation & Humidity Control"
              desc="Improve indoor comfort, air movement, and moisture management. Particularly important for coastal Algarve properties."
              accent="#71BBEC"
            />
            <ServiceCard
              icon={Building2}
              title="Commercial HVAC"
              desc="Climate-control solutions for offices, hospitality, restaurants, rental properties, and property managers across the Algarve."
              accent="#1E73BE"
            />
            <ServiceCard
              icon={Zap}
              title="BTU Sizing Support"
              desc="Correct BTU sizing prevents underpowered or oversized systems. We assess room size, insulation, sun exposure, and usage before recommending a system."
              accent="#E89B2A"
            />
          </div>
        </div>
      </section>

      {/* ── DAIKIN SECTION ─────────────────────────────────────────────────── */}
      <section id="daikin" className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div ref={r3} className="reveal relative">
              <img
                src={DAIKIN_IMG}
                alt="Daikin air conditioning unit installed in a luxury Algarve villa with sea view"
                className="rounded-md shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#1E73BE] text-white rounded-md px-5 py-3 shadow-lg">
                <p
                  className="text-[10px] text-white/70 mb-0.5 uppercase tracking-widest"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
                >
                  Preferred Brand
                </p>
                <p
                  className="font-bold text-lg text-white uppercase"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  Daikin Certified
                </p>
              </div>
            </div>

            {/* Content */}
            <div ref={r4} className="reveal">
              <p className="eyebrow text-[#1E73BE] mb-3">Daikin Specialists</p>
              <h2
                className="text-[#1E73BE] text-3xl sm:text-4xl mb-5 uppercase"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
              >
                Daikin Air Conditioning Installation in the Algarve
              </h2>
              <p className="text-[#444444] leading-relaxed mb-5">
                Algarve Seasons assesses room size, insulation, layout, usage, sun exposure, and
                budget before recommending a Daikin system. Correct unit placement, pipework,
                drainage, electrical safety, and commissioning matter for long-term performance —
                and that is where our experience makes the difference.
              </p>
              <p className="text-[#444444] leading-relaxed mb-6">
                Daikin is positioned as a premium, efficient, and reliable option for Algarve
                properties. Whether you need a wall-mounted split unit for a bedroom, a multi-split
                system for a villa, or a ducted solution for a commercial space, we can advise on
                the right configuration for your property and usage.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "Wall-mounted split units for rooms and apartments",
                  "Multi-split systems for villas and larger properties",
                  "Ducted systems for seamless commercial installations",
                  "Daikin heat pump air conditioning for year-round comfort",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={17}
                      className="text-[#1E73BE] shrink-0 mt-0.5"
                    />
                    <span className="text-[#333333] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("quote")}
                className="btn-gold flex items-center gap-2 text-xs"
              >
                Ask About Daikin Installation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HEAT PUMPS ─────────────────────────────────────────────────────── */}
      <section id="heat-pumps" className="py-20 bg-[#F9F9F9]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div ref={r5} className="reveal order-2 lg:order-1">
              <p className="eyebrow text-[#1E73BE] mb-3">Heating &amp; Cooling</p>
              <h2
                className="text-[#1E73BE] text-3xl sm:text-4xl mb-5 uppercase"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
              >
                Heat Pump Installation for Year-Round Comfort
              </h2>
              <p className="text-[#444444] leading-relaxed mb-5">
                Heat pumps can provide efficient heating and cooling, making them well suited to
                Algarve properties that need comfort during hot summers and mild but humid winters.
                Algarve Seasons can advise whether a heat pump, air conditioning system, or
                integrated renewable-energy setup is the best fit for your property.
              </p>
              <p className="text-[#444444] leading-relaxed mb-6">
                Many modern systems provide both cooling and heating. Rather than choosing between
                air conditioning and a heat pump, a site survey helps identify which configuration
                delivers the best comfort, efficiency, and value for your specific building and
                usage pattern.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Sun, accent: "#E89B2A", label: "Summer Cooling", desc: "Efficient cooling during Algarve's hot months" },
                  { icon: Thermometer, accent: "#C0392B", label: "Winter Heating", desc: "Comfortable warmth through humid winters" },
                  { icon: Zap, accent: "#1E73BE", label: "Energy Efficient", desc: "Lower running costs than conventional heating" },
                  { icon: Droplets, accent: "#71BBEC", label: "Humidity Control", desc: "Manage moisture for coastal properties" },
                ].map(({ icon: Icon, accent, label, desc }) => (
                  <div key={label} className="bg-white rounded-md p-4 border border-[#E5E7EB]">
                    <Icon size={20} style={{ color: accent }} className="mb-2" />
                    <p
                      className="font-bold text-[#1E73BE] text-xs mb-1 uppercase tracking-wide"
                      style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.06em" }}
                    >
                      {label}
                    </p>
                    <p className="text-[#666666] text-xs leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("quote")}
                className="btn-gold flex items-center gap-2 text-xs"
              >
                Enquire About Heat Pumps <ArrowRight size={16} />
              </button>
            </div>

            {/* Image */}
            <div ref={r6} className="reveal order-1 lg:order-2 relative">
              <img
                src={HEATPUMP_IMG}
                alt="Daikin Altherma heat pump installed outside a modern Algarve home"
                className="rounded-md shadow-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ALGARVE CLIMATE ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0E2A47] relative overflow-hidden">
        {/* Background villa image */}
        <div className="absolute inset-0">
          <img
            src={VILLA_IMG}
            alt="Algarve villa with HVAC outdoor unit in Mediterranean garden"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A47]/70 to-[#0E2A47]/90" />
        </div>
        <div className="container relative z-10">
          <div ref={r7} className="reveal max-w-2xl mb-12">
            <p className="eyebrow text-[#71BBEC] mb-3">Local Expertise</p>
            <h2
              className="text-white text-3xl sm:text-4xl mb-4 uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
            >
              Designed for the Algarve Climate
            </h2>
            <p className="text-white/75 leading-relaxed">
              The Algarve's climate presents specific challenges that generic HVAC advice does not
              address. Our local experience means we understand what works — and what to avoid —
              for properties in this region.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Sun,
                accent: "#E89B2A",
                title: "Hot Algarve Summers",
                desc: "Proper BTU sizing prevents underpowered systems and excessive energy consumption during peak summer heat.",
              },
              {
                icon: Droplets,
                accent: "#71BBEC",
                title: "Humid Winters",
                desc: "HVAC supports heating, dehumidification, and comfort beyond summer cooling — important for year-round Algarve living.",
              },
              {
                icon: Wind,
                accent: "#B6DBF3",
                title: "Coastal Salt Air",
                desc: "Outdoor units need thoughtful placement and maintenance to reduce corrosion risk from coastal salt-laden air.",
              },
              {
                icon: Building2,
                accent: "#71BBEC",
                title: "Rental Villas",
                desc: "Reliable systems and planned servicing reduce guest complaints during peak rental season and protect your investment.",
              },
              {
                icon: Zap,
                accent: "#E89B2A",
                title: "Solar Integration",
                desc: "HVAC can be discussed alongside solar PV and battery storage for energy resilience and lower running costs.",
              },
              {
                icon: Shield,
                accent: "#2E7D32",
                title: "Long-Term Reliability",
                desc: "We recommend systems and installation approaches that hold up to the Algarve environment over many years.",
              },
            ].map(({ icon: Icon, accent, title, desc }) => (
              <div
                key={title}
                className="bg-white/8 border border-white/15 rounded-md p-5 hover:bg-white/12 transition-colors duration-200 backdrop-blur-sm"
              >
                <Icon size={22} style={{ color: accent }} className="mb-3" />
                <h3
                  className="text-white font-bold text-base mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.04em" }}
                >
                  {title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ───────────────────────────────────────────── */}
      <section id="process" className="py-20 bg-white">
        <div className="container">
          <div ref={r8} className="reveal text-center max-w-xl mx-auto mb-14">
            <p className="eyebrow text-[#1E73BE] mb-3">How It Works</p>
            <h2
              className="text-[#1E73BE] text-3xl sm:text-4xl uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
            >
              Our HVAC Installation Process
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-8 left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-[#E5E7EB] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
              {[
                { n: "01", title: "Consultation", desc: "Discuss your property, usage, comfort needs, and budget." },
                { n: "02", title: "Site Survey", desc: "Assess room sizes, layout, insulation, and installation requirements." },
                { n: "03", title: "Recommendation", desc: "Recommend the right Daikin or HVAC configuration for your needs." },
                { n: "04", title: "Quotation", desc: "Clear quote covering equipment, installation, and scope." },
                { n: "05", title: "Installation", desc: "Install units, pipework, drainage, electrics, and outdoor equipment." },
                { n: "06", title: "Testing", desc: "Test performance, explain operation, and advise on maintenance." },
                { n: "07", title: "Aftercare", desc: "Servicing, repairs, and seasonal support when you need it." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex flex-col items-center text-center bg-white">
                  <div className="w-16 h-16 rounded-full bg-[#1E73BE] text-white flex items-center justify-center mb-4 shadow-md">
                    <span
                      className="text-white font-bold text-base"
                      style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                      {n}
                    </span>
                  </div>
                  <h3
                    className="text-[#1E73BE] font-bold text-sm mb-1 uppercase tracking-wide"
                    style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.06em" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[#666666] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button onClick={() => scrollTo("quote")} className="btn-gold text-xs">
              Book a Site Survey
            </button>
          </div>
        </div>
      </section>

      {/* ── AREAS SERVED ───────────────────────────────────────────────────── */}
      <section id="areas" className="py-16 bg-[#F9F9F9]">
        <div className="container">
          <div ref={r9} className="reveal max-w-3xl">
            <p className="eyebrow text-[#1E73BE] mb-3">Coverage</p>
            <h2
              className="text-[#1E73BE] text-3xl sm:text-4xl mb-5 uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
            >
              HVAC Installation Across the Algarve
            </h2>
            <p className="text-[#444444] leading-relaxed mb-8">
              Algarve Seasons provides HVAC installation and maintenance across the Algarve,
              including Silves, Lagoa, Portimão, Lagos, Albufeira, Vilamoura, Loulé, Almancil,
              Quinta do Lago, Vale do Lobo, Faro, Olhão, Tavira, and surrounding areas. Whether
              you are upgrading a coastal villa, fitting out a rental apartment, improving comfort
              in a family home, or planning climate control for a commercial property, our team can
              advise on a system suited to the building and local conditions.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Silves", "Lagoa", "Portimão", "Lagos", "Albufeira",
                "Vilamoura", "Loulé", "Almancil", "Quinta do Lago",
                "Vale do Lobo", "Faro", "Olhão", "Tavira",
              ].map((town) => (
                <span
                  key={town}
                  className="inline-flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 text-sm text-[#333333] hover:border-[#1E73BE] hover:text-[#1E73BE] transition-colors"
                >
                  <MapPin size={12} className="text-[#1E73BE]" />
                  {town}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="eyebrow text-[#1E73BE] mb-3">Why Algarve Seasons</p>
              <h2
                className="text-[#1E73BE] text-3xl sm:text-4xl mb-6 uppercase"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
              >
                Trusted HVAC Specialists in the Algarve
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: "Local Algarve Expertise",
                    desc: "We understand coastal conditions, summer heat, humidity, and local property types — from rural quintas to beachfront villas.",
                  },
                  {
                    title: "Daikin Knowledge",
                    desc: "We can recommend and install premium Daikin solutions where appropriate, with full commissioning and warranty support.",
                  },
                  {
                    title: "Integrated Energy Thinking",
                    desc: "HVAC can be planned alongside solar PV, battery storage, and heat pumps for a joined-up energy strategy.",
                  },
                  {
                    title: "Practical Sizing Advice",
                    desc: "BTU sizing and site assessment help avoid underpowered or oversized systems that waste energy and underperform.",
                  },
                  {
                    title: "Aftercare & Maintenance",
                    desc: "Maintenance and repair support help protect comfort and system life well beyond the installation date.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#1E73BE] shrink-0 mt-0.5"
                    />
                    <div>
                      <p
                        className="font-bold text-[#1E73BE] text-sm mb-0.5 uppercase tracking-wide"
                        style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.04em" }}
                      >
                        {title}
                      </p>
                      <p className="text-[#444444] text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <ReviewCard
                name="James H."
                location="Villa owner, Vilamoura"
                text="Algarve Seasons installed a full Daikin multi-split system across our villa. The team was professional, tidy, and explained everything clearly. The system has been running perfectly through two summers now."
              />
              <ReviewCard
                name="Maria S."
                location="Rental property manager, Albufeira"
                text="We manage several rental villas and Algarve Seasons handles all our HVAC maintenance. Response times are excellent and our guests have never complained about the air conditioning."
              />
              <ReviewCard
                name="David & Claire T."
                location="Homeowners, Lagos"
                text="We asked for advice on whether to install air conditioning or a heat pump. The team gave us honest, practical guidance and we chose a heat pump solution that works brilliantly for both summer and winter."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 bg-[#F9F9F9]">
        <div className="container">
          <div ref={r10} className="reveal max-w-3xl mx-auto">
            <p className="eyebrow text-[#1E73BE] mb-3 text-center">Common Questions</p>
            <h2
              className="text-[#1E73BE] text-3xl sm:text-4xl mb-10 text-center uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
            >
              HVAC Installation FAQs
            </h2>

            <div>
              {[
                {
                  q: "How much does HVAC installation cost in the Algarve?",
                  a: "Cost depends on property size, number of rooms, system type, brand, pipework complexity, access, and whether ongoing maintenance is included. We recommend requesting a site survey and quote so we can give you an accurate figure based on your specific property and requirements.",
                },
                {
                  q: "What is the best HVAC system for an Algarve villa?",
                  a: "The best system depends on your villa's layout, insulation, sun exposure, occupancy pattern, rental use, and whether you need heating as well as cooling. A site survey allows us to assess these factors and recommend a system — whether Daikin split units, a multi-split configuration, or a heat pump — that suits your property.",
                },
                {
                  q: "Do I need air conditioning or a heat pump?",
                  a: "Many modern systems can provide both cooling and heating, so the choice is not always either/or. A heat pump is often more efficient for properties that need year-round comfort, while a dedicated air conditioning system may be preferred for cooling-only use. We can advise based on your usage and budget after a consultation.",
                },
                {
                  q: "How long does HVAC installation take?",
                  a: "A simple single-room installation can typically be completed in a day. Multi-room or whole-villa systems require more planning and may take two to four days depending on the scope. Commercial projects are assessed individually. We will give you a realistic timeline as part of the quotation process.",
                },
                {
                  q: "Can HVAC help with humidity in Algarve homes?",
                  a: "Yes. Properly selected and installed systems can support comfort and dehumidification, which is particularly relevant during the Algarve's humid winter months. We can advise on systems that address both temperature and humidity management.",
                },
                {
                  q: "Do you install Daikin air conditioning systems?",
                  a: "Yes, Algarve Seasons has Daikin expertise and can install, commission, and maintain Daikin air conditioning and heat pump systems. We can advise on suitable models for your property and usage. Contact us to discuss your requirements.",
                },
                {
                  q: "Do coastal properties need special HVAC maintenance?",
                  a: "Coastal properties are exposed to salt-laden air, which can accelerate corrosion of outdoor units if not managed. We advise on appropriate unit placement, protective measures, and planned servicing to reduce this risk and extend system life.",
                },
                {
                  q: "Do you provide HVAC maintenance after installation?",
                  a: "Yes. We offer servicing, seasonal performance checks, filter cleaning, and repair support. Planned maintenance helps protect efficiency, hygiene, and system life — and is particularly important for rental properties where reliability is critical.",
                },
                {
                  q: "Can you install HVAC for rental properties or hospitality businesses?",
                  a: "Yes. We support villas, apartments, restaurants, offices, and hospitality spaces across the Algarve. For property managers and hospitality businesses, we can discuss maintenance contracts and priority response arrangements.",
                },
                {
                  q: "Which areas of the Algarve do you cover?",
                  a: "We cover the whole Algarve region, including Silves, Lagoa, Portimão, Lagos, Albufeira, Vilamoura, Loulé, Almancil, Quinta do Lago, Vale do Lobo, Faro, Olhão, Tavira, and surrounding areas. Contact us to confirm coverage for your specific location.",
                },
              ].map(({ q, a }) => (
                <FaqItem key={q} q={q} a={a} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <button onClick={() => scrollTo("quote")} className="btn-gold text-xs">
                Still have questions? Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ─────────────────────────────────────────────────────── */}
      <section id="quote" className="py-20 bg-[#0E2A47]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <p className="eyebrow text-[#71BBEC] mb-3">Get Started</p>
              <h2
                className="text-white text-3xl sm:text-4xl mb-5 uppercase"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
              >
                Request Your HVAC Installation Quote
              </h2>
              <p className="text-white/75 leading-relaxed mb-8">
                Fill in the form and we will get back to you to arrange a consultation or site
                survey. Alternatively, call or email us directly.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+351910675168"
                  className="flex items-center gap-3 text-white/85 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-md bg-[#71BBEC]/15 border border-[#71BBEC]/30 flex items-center justify-center">
                    <Phone size={18} className="text-[#71BBEC]" />
                  </div>
                  <div>
                    <p
                      className="text-[10px] text-white/55 mb-0.5 uppercase tracking-widest"
                      style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
                    >
                      Phone
                    </p>
                    <p className="font-semibold">+351 910 675 168</p>
                  </div>
                </a>
                <a
                  href="mailto:Dan@algarveseasons.com"
                  className="flex items-center gap-3 text-white/85 hover:text-white transition-colors"
                >
                  <div className="w-11 h-11 rounded-md bg-[#71BBEC]/15 border border-[#71BBEC]/30 flex items-center justify-center">
                    <Mail size={18} className="text-[#71BBEC]" />
                  </div>
                  <div>
                    <p
                      className="text-[10px] text-white/55 mb-0.5 uppercase tracking-widest"
                      style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
                    >
                      Email
                    </p>
                    <p className="font-semibold">Dan@algarveseasons.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/85">
                  <div className="w-11 h-11 rounded-md bg-[#71BBEC]/15 border border-[#71BBEC]/30 flex items-center justify-center">
                    <MapPin size={18} className="text-[#71BBEC]" />
                  </div>
                  <div>
                    <p
                      className="text-[10px] text-white/55 mb-0.5 uppercase tracking-widest"
                      style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
                    >
                      Service Area
                    </p>
                    <p className="font-semibold">Across the Algarve, Portugal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-md p-8 shadow-2xl">
              <h3
                className="text-[#1E73BE] text-xl mb-6 uppercase"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
              >
                Free HVAC Quote Request
              </h3>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0A1F33] text-white/65 py-12">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="bg-white inline-block rounded-md p-3 mb-4">
                <img
                  src={LOGO}
                  alt="Algarve Seasons logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-sm leading-relaxed">
                Professional HVAC, Daikin air conditioning, and heat pump installation for homes
                and businesses across the Algarve.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4
                className="text-white font-bold text-xs mb-4 uppercase tracking-widest"
                style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
              >
                Services
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Air Conditioning Installation",
                  "Heat Pump Installation",
                  "HVAC Maintenance",
                  "HVAC Repairs",
                  "Commercial HVAC",
                  "BTU Sizing",
                ].map((s) => (
                  <li key={s}>
                    <a href="https://algarveseasons.com" className="hover:text-white transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas */}
            <div>
              <h4
                className="text-white font-bold text-xs mb-4 uppercase tracking-widest"
                style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
              >
                Areas Served
              </h4>
              <ul className="space-y-2 text-sm">
                {["Lagos", "Portimão", "Albufeira", "Vilamoura", "Faro", "Tavira", "Silves", "Lagoa"].map(
                  (a) => (
                    <li key={a}>{a}</li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4
                className="text-white font-bold text-xs mb-4 uppercase tracking-widest"
                style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.18em" }}
              >
                Contact
              </h4>
              <div className="space-y-3 text-sm">
                <a href="tel:+351910675168" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} className="text-[#71BBEC]" /> +351 910 675 168
                </a>
                <a href="mailto:Dan@algarveseasons.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} className="text-[#71BBEC]" /> Dan@algarveseasons.com
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="shrink-0 mt-0.5 text-[#71BBEC]" />
                  Algarve, Portugal
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <p>© 2026 Algarve Seasons. All rights reserved.</p>
            <a href="https://algarveseasons.com" className="hover:text-white transition-colors">
              algarveseasons.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Quote Form ────────────────────────────────────────────────────────────────
function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    service: "",
    area: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 size={48} className="text-[#1E73BE] mx-auto mb-4" />
        <h4
          className="text-[#1E73BE] text-xl mb-2 uppercase"
          style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}
        >
          Thank you, {form.name}!
        </h4>
        <p className="text-[#444444] text-sm">
          We have received your quote request and will be in touch shortly to arrange a
          consultation or site survey.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-[#E5E7EB] rounded-md px-3 py-2.5 text-sm text-[#222222] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E73BE] focus:ring-2 focus:ring-[#1E73BE]/20 transition-colors bg-white";
  const labelClass =
    "block text-[10px] font-bold text-[#1E73BE] mb-1.5 uppercase tracking-widest";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
            Full Name *
          </label>
          <input
            required
            className={inputClass}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
            Phone
          </label>
          <input
            className={inputClass}
            placeholder="+351 ..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
          Email Address *
        </label>
        <input
          required
          type="email"
          className={inputClass}
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
            Property Type
          </label>
          <select
            className={inputClass}
            value={form.propertyType}
            onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
          >
            <option value="">Select...</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Rental Property</option>
            <option>Commercial</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
            Service Needed
          </label>
          <select
            className={inputClass}
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
          >
            <option value="">Select...</option>
            <option>New HVAC Installation</option>
            <option>Daikin Air Conditioning</option>
            <option>Heat Pump Installation</option>
            <option>HVAC Replacement</option>
            <option>Maintenance / Service</option>
            <option>Repair</option>
            <option>Not sure — need advice</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
          Your Area in the Algarve
        </label>
        <input
          className={inputClass}
          placeholder="e.g. Vilamoura, Lagos, Faro..."
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass} style={{ fontFamily: "'Josefin Sans', sans-serif", letterSpacing: "0.16em" }}>
          Additional Details
        </label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="Tell us about your property, number of rooms, any existing system..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button type="submit" className="btn-gold w-full text-sm py-3">
        Send Quote Request
      </button>

      <p className="text-[#9CA3AF] text-xs text-center">
        We typically respond within one business day.
      </p>
    </form>
  );
}
