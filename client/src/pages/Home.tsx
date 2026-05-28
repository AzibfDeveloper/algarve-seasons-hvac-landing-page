/*
 * DESIGN PHILOSOPHY: Technical Authority — Deep Navy & Precision White
 * Navy #0D2137 | Gold #C9922A | Off-white #F8F6F2
 * DM Serif Display (headings) + DM Sans (body)
 * Split-panel hero, asymmetric grids, numbered process timeline
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
      className="border-b border-[oklch(0.88_0.008_80)] py-5 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="font-semibold text-[oklch(0.18_0.055_240)] text-base leading-snug"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {q}
        </span>
        <span className="shrink-0 text-[oklch(0.65_0.13_65)] mt-0.5">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </div>
      {open && (
        <p className="mt-3 text-[oklch(0.35_0.03_240)] text-sm leading-relaxed gold-border-left">
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
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[oklch(0.88_0.008_80)] hover:shadow-md hover:-translate-y-1 transition-all duration-200 group">
      <div className="w-11 h-11 rounded-md bg-[oklch(0.975_0.006_80)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.65_0.13_65)] transition-colors duration-200">
        <Icon
          size={22}
          className="text-[oklch(0.65_0.13_65)] group-hover:text-white transition-colors duration-200"
        />
      </div>
      <h3
        className="text-[oklch(0.18_0.055_240)] font-semibold text-base mb-2"
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {title}
      </h3>
      <p className="text-[oklch(0.45_0.03_240)] text-sm leading-relaxed">{desc}</p>
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
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[oklch(0.88_0.008_80)]">
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="fill-[oklch(0.65_0.13_65)] text-[oklch(0.65_0.13_65)]"
          />
        ))}
      </div>
      <p className="text-[oklch(0.35_0.03_240)] text-sm leading-relaxed mb-4 gold-border-left">
        "{text}"
      </p>
      <div>
        <p className="font-semibold text-[oklch(0.18_0.055_240)] text-sm">{name}</p>
        <p className="text-[oklch(0.55_0.03_240)] text-xs">{location}</p>
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
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.18_0.055_240)] shadow-lg"
            : "bg-[oklch(0.18_0.055_240/0.95)] backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <a href="https://algarveseasons.com" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-[oklch(0.65_0.13_65)] flex items-center justify-center">
              <Thermometer size={18} className="text-white" />
            </div>
            <span
              className="text-white font-semibold text-base tracking-tight"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Algarve Seasons
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
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
                className="hover:text-[oklch(0.65_0.13_65)] transition-colors duration-150 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-[oklch(0.65_0.13_65)] after:transition-all hover:after:w-full"
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+351910675168"
              className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
            >
              <Phone size={15} />
              +351 910 675 168
            </a>
            <button
              onClick={() => scrollTo("quote")}
              className="btn-gold text-sm py-2 px-4"
            >
              Get a Free Quote
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[oklch(0.18_0.055_240)] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
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
                className="text-white/80 hover:text-white text-left text-sm py-1"
              >
                {label}
              </button>
            ))}
            <a href="tel:+351910675168" className="flex items-center gap-2 text-white/80 text-sm">
              <Phone size={14} /> +351 910 675 168
            </a>
            <button
              onClick={() => scrollTo("quote")}
              className="btn-gold text-sm py-2.5 w-full mt-1"
            >
              Get a Free Quote
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[oklch(0.18_0.055_240)]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Algarve Seasons technician installing Daikin air conditioning in an Algarve home"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.055_240/0.95)] via-[oklch(0.18_0.055_240/0.75)] to-[oklch(0.18_0.055_240/0.3)]" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[oklch(0.65_0.13_65/0.15)] border border-[oklch(0.65_0.13_65/0.4)] rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.13_65)] animate-pulse" />
              <span className="text-[oklch(0.65_0.13_65)] text-xs font-semibold tracking-wide uppercase">
                Daikin Certified Installers · Algarve
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              HVAC Installation
              <br />
              <span className="text-[oklch(0.65_0.13_65)]">in the Algarve</span>
            </h1>

            <p className="text-white/75 text-lg leading-relaxed mb-8 max-w-xl">
              Algarve Seasons installs efficient HVAC, Daikin air conditioning, and heat pump
              systems for homes, villas, apartments, rental properties, and businesses across the
              Algarve. From system sizing and installation to maintenance and aftercare, we help
              you choose a reliable climate-control solution for year-round comfort.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button onClick={() => scrollTo("quote")} className="btn-gold text-base">
                Get a Free HVAC Quote
              </button>
              <a href="tel:+351910675168" className="btn-white-outline text-base text-center">
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
                <div key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle2 size={14} className="text-[oklch(0.65_0.13_65)] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <span>Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.65_0.13_65)] py-10">
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
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  <AnimatedNumber target={n} suffix={s} />
                </div>
                <div className="text-white/80 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ──────────────────────────────────────────────── */}
      <section id="services" className="py-20 bg-[oklch(0.975_0.006_80)]">
        <div className="container">
          <div ref={r1} className="reveal max-w-2xl mb-12">
            <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Services
            </p>
            <h2
              className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Professional HVAC Systems for Algarve Homes and Businesses
            </h2>
            <p className="text-[oklch(0.45_0.03_240)] leading-relaxed">
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
            />
            <ServiceCard
              icon={Wrench}
              title="HVAC Replacement"
              desc="Upgrade old or inefficient systems with modern, quieter, more energy-efficient alternatives. We handle removal, installation, and commissioning."
            />
            <ServiceCard
              icon={Thermometer}
              title="Heat Pump Installation"
              desc="Efficient heating and cooling solutions for Algarve homes and businesses. Ideal for year-round comfort with lower running costs."
            />
            <ServiceCard
              icon={Shield}
              title="HVAC Maintenance"
              desc="Seasonal servicing to protect performance, efficiency, hygiene, and warranty. Planned maintenance reduces breakdowns during peak season."
            />
            <ServiceCard
              icon={Wrench}
              title="HVAC Repairs"
              desc="Diagnosis and repair support for air conditioning and climate-control faults. Fast response to keep your property comfortable."
            />
            <ServiceCard
              icon={Droplets}
              title="Ventilation & Humidity Control"
              desc="Improve indoor comfort, air movement, and moisture management. Particularly important for coastal Algarve properties."
            />
            <ServiceCard
              icon={Building2}
              title="Commercial HVAC"
              desc="Climate-control solutions for offices, hospitality, restaurants, rental properties, and property managers across the Algarve."
            />
            <ServiceCard
              icon={Zap}
              title="BTU Sizing Support"
              desc="Correct BTU sizing prevents underpowered or oversized systems. We assess room size, insulation, sun exposure, and usage before recommending a system."
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
                className="rounded-xl shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -right-4 bg-[oklch(0.18_0.055_240)] text-white rounded-lg px-5 py-3 shadow-lg">
                <p className="text-xs text-white/60 mb-0.5">Preferred Brand</p>
                <p
                  className="font-bold text-lg text-[oklch(0.65_0.13_65)]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Daikin Certified
                </p>
              </div>
            </div>

            {/* Content */}
            <div ref={r4} className="reveal">
              <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
                Daikin Specialists
              </p>
              <h2
                className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Daikin Air Conditioning Installation in the Algarve
              </h2>
              <p className="text-[oklch(0.45_0.03_240)] leading-relaxed mb-5">
                Algarve Seasons assesses room size, insulation, layout, usage, sun exposure, and
                budget before recommending a Daikin system. Correct unit placement, pipework,
                drainage, electrical safety, and commissioning matter for long-term performance —
                and that is where our experience makes the difference.
              </p>
              <p className="text-[oklch(0.45_0.03_240)] leading-relaxed mb-6">
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
                      className="text-[oklch(0.65_0.13_65)] shrink-0 mt-0.5"
                    />
                    <span className="text-[oklch(0.35_0.03_240)] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("quote")}
                className="btn-gold flex items-center gap-2"
              >
                Ask About Daikin Installation <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── HEAT PUMPS ─────────────────────────────────────────────────────── */}
      <section id="heat-pumps" className="py-20 bg-[oklch(0.975_0.006_80)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div ref={r5} className="reveal order-2 lg:order-1">
              <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
                Heating & Cooling
              </p>
              <h2
                className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Heat Pump Installation for Year-Round Comfort
              </h2>
              <p className="text-[oklch(0.45_0.03_240)] leading-relaxed mb-5">
                Heat pumps can provide efficient heating and cooling, making them well suited to
                Algarve properties that need comfort during hot summers and mild but humid winters.
                Algarve Seasons can advise whether a heat pump, air conditioning system, or
                integrated renewable-energy setup is the best fit for your property.
              </p>
              <p className="text-[oklch(0.45_0.03_240)] leading-relaxed mb-6">
                Many modern systems provide both cooling and heating. Rather than choosing between
                air conditioning and a heat pump, a site survey helps identify which configuration
                delivers the best comfort, efficiency, and value for your specific building and
                usage pattern.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Sun, label: "Summer Cooling", desc: "Efficient cooling during Algarve's hot months" },
                  { icon: Thermometer, label: "Winter Heating", desc: "Comfortable warmth through humid winters" },
                  { icon: Zap, label: "Energy Efficient", desc: "Lower running costs than conventional heating" },
                  { icon: Droplets, label: "Humidity Control", desc: "Manage moisture for coastal properties" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="bg-white rounded-lg p-4 border border-[oklch(0.88_0.008_80)]">
                    <Icon size={18} className="text-[oklch(0.65_0.13_65)] mb-2" />
                    <p className="font-semibold text-[oklch(0.18_0.055_240)] text-sm mb-1">{label}</p>
                    <p className="text-[oklch(0.55_0.03_240)] text-xs">{desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("quote")}
                className="btn-gold flex items-center gap-2"
              >
                Enquire About Heat Pumps <ArrowRight size={16} />
              </button>
            </div>

            {/* Image */}
            <div ref={r6} className="reveal order-1 lg:order-2 relative">
              <img
                src={HEATPUMP_IMG}
                alt="Daikin Altherma heat pump installed outside a modern Algarve home"
                className="rounded-xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ALGARVE CLIMATE ────────────────────────────────────────────────── */}
      <section className="py-20 bg-[oklch(0.18_0.055_240)] relative overflow-hidden">
        {/* Background villa image */}
        <div className="absolute inset-0">
          <img
            src={VILLA_IMG}
            alt="Algarve villa with HVAC outdoor unit in Mediterranean garden"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="container relative z-10">
          <div ref={r7} className="reveal max-w-2xl mb-12">
            <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
              Local Expertise
            </p>
            <h2
              className="text-white text-3xl sm:text-4xl mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Designed for the Algarve Climate
            </h2>
            <p className="text-white/70 leading-relaxed">
              The Algarve's climate presents specific challenges that generic HVAC advice does not
              address. Our local experience means we understand what works — and what to avoid —
              for properties in this region.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Sun,
                title: "Hot Algarve Summers",
                desc: "Proper BTU sizing prevents underpowered systems and excessive energy consumption during peak summer heat.",
              },
              {
                icon: Droplets,
                title: "Humid Winters",
                desc: "HVAC supports heating, dehumidification, and comfort beyond summer cooling — important for year-round Algarve living.",
              },
              {
                icon: Wind,
                title: "Coastal Salt Air",
                desc: "Outdoor units need thoughtful placement and maintenance to reduce corrosion risk from coastal salt-laden air.",
              },
              {
                icon: Building2,
                title: "Rental Villas",
                desc: "Reliable systems and planned servicing reduce guest complaints during peak rental season and protect your investment.",
              },
              {
                icon: Zap,
                title: "Solar Integration",
                desc: "HVAC can be discussed alongside solar PV and battery storage for energy resilience and lower running costs.",
              },
              {
                icon: Shield,
                title: "Long-Term Reliability",
                desc: "We recommend systems and installation approaches that hold up to the Algarve environment over many years.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/8 border border-white/15 rounded-lg p-5 hover:bg-white/12 transition-colors duration-200"
              >
                <Icon size={22} className="text-[oklch(0.65_0.13_65)] mb-3" />
                <h3
                  className="text-white font-semibold text-base mb-2"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ───────────────────────────────────────────── */}
      <section id="process" className="py-20 bg-white">
        <div className="container">
          <div ref={r8} className="reveal text-center max-w-xl mx-auto mb-14">
            <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2
              className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Our HVAC Installation Process
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-8 left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-[oklch(0.88_0.008_80)] z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
              {[
                { n: "01", title: "Consultation", desc: "Discuss your property, usage, comfort needs, and budget." },
                { n: "02", title: "Site Survey", desc: "Assess room sizes, layout, insulation, and installation requirements." },
                { n: "03", title: "System Recommendation", desc: "Recommend the right Daikin or HVAC configuration for your needs." },
                { n: "04", title: "Quotation", desc: "Clear quote covering equipment, installation, and scope." },
                { n: "05", title: "Installation", desc: "Install units, pipework, drainage, electrics, and outdoor equipment." },
                { n: "06", title: "Testing & Handover", desc: "Test performance, explain operation, and advise on maintenance." },
                { n: "07", title: "Aftercare", desc: "Servicing, repairs, and seasonal support when you need it." },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[oklch(0.18_0.055_240)] text-white flex items-center justify-center mb-4 shadow-md">
                    <span
                      className="text-[oklch(0.65_0.13_65)] font-bold text-sm"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {n}
                    </span>
                  </div>
                  <h3
                    className="text-[oklch(0.18_0.055_240)] font-semibold text-sm mb-1"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-[oklch(0.55_0.03_240)] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <button onClick={() => scrollTo("quote")} className="btn-gold">
              Book a Site Survey
            </button>
          </div>
        </div>
      </section>

      {/* ── AREAS SERVED ───────────────────────────────────────────────────── */}
      <section id="areas" className="py-16 bg-[oklch(0.975_0.006_80)]">
        <div className="container">
          <div ref={r9} className="reveal max-w-3xl">
            <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
              Coverage
            </p>
            <h2
              className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl mb-5"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              HVAC Installation Across the Algarve
            </h2>
            <p className="text-[oklch(0.45_0.03_240)] leading-relaxed mb-8">
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
                  className="inline-flex items-center gap-1.5 bg-white border border-[oklch(0.88_0.008_80)] rounded-full px-3 py-1 text-sm text-[oklch(0.35_0.03_240)]"
                >
                  <MapPin size={12} className="text-[oklch(0.65_0.13_65)]" />
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
              <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
                Why Algarve Seasons
              </p>
              <h2
                className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
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
                      className="text-[oklch(0.65_0.13_65)] shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="font-semibold text-[oklch(0.18_0.055_240)] text-sm mb-0.5">
                        {title}
                      </p>
                      <p className="text-[oklch(0.45_0.03_240)] text-sm leading-relaxed">{desc}</p>
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
      <section id="faq" className="py-20 bg-[oklch(0.975_0.006_80)]">
        <div className="container">
          <div ref={r10} className="reveal max-w-3xl mx-auto">
            <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3 text-center">
              Common Questions
            </p>
            <h2
              className="text-[oklch(0.18_0.055_240)] text-3xl sm:text-4xl mb-10 text-center"
              style={{ fontFamily: "'DM Serif Display', serif" }}
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
              <button onClick={() => scrollTo("quote")} className="btn-gold">
                Still have questions? Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE FORM ─────────────────────────────────────────────────────── */}
      <section id="quote" className="py-20 bg-[oklch(0.18_0.055_240)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <p className="text-[oklch(0.65_0.13_65)] text-sm font-semibold uppercase tracking-widest mb-3">
                Get Started
              </p>
              <h2
                className="text-white text-3xl sm:text-4xl mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Request Your HVAC Installation Quote
              </h2>
              <p className="text-white/70 leading-relaxed mb-8">
                Fill in the form and we will get back to you to arrange a consultation or site
                survey. Alternatively, call or email us directly.
              </p>

              <div className="space-y-4">
                <a
                  href="tel:+351910675168"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-[oklch(0.65_0.13_65/0.2)] flex items-center justify-center">
                    <Phone size={18} className="text-[oklch(0.65_0.13_65)]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Phone</p>
                    <p className="font-semibold">+351 910 675 168</p>
                  </div>
                </a>
                <a
                  href="mailto:info@algarveseasons.com"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <div className="w-10 h-10 rounded-md bg-[oklch(0.65_0.13_65/0.2)] flex items-center justify-center">
                    <Mail size={18} className="text-[oklch(0.65_0.13_65)]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Email</p>
                    <p className="font-semibold">info@algarveseasons.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-10 h-10 rounded-md bg-[oklch(0.65_0.13_65/0.2)] flex items-center justify-center">
                    <MapPin size={18} className="text-[oklch(0.65_0.13_65)]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-0.5">Service Area</p>
                    <p className="font-semibold">Across the Algarve, Portugal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h3
                className="text-[oklch(0.18_0.055_240)] text-xl mb-6"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Free HVAC Quote Request
              </h3>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[oklch(0.13_0.04_240)] text-white/60 py-12">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-sm bg-[oklch(0.65_0.13_65)] flex items-center justify-center">
                  <Thermometer size={18} className="text-white" />
                </div>
                <span
                  className="text-white font-semibold"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Algarve Seasons
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Professional HVAC, Daikin air conditioning, and heat pump installation for homes
                and businesses across the Algarve.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
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
              <h4 className="text-white font-semibold text-sm mb-4">Areas Served</h4>
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
              <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
              <div className="space-y-3 text-sm">
                <a href="tel:+351910675168" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone size={14} /> +351 910 675 168
                </a>
                <a href="mailto:info@algarveseasons.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail size={14} /> info@algarveseasons.com
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="shrink-0 mt-0.5" />
                  Algarve, Portugal
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs">
            <p>© 2024 Algarve Seasons. All rights reserved.</p>
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
        <CheckCircle2 size={48} className="text-[oklch(0.65_0.13_65)] mx-auto mb-4" />
        <h4
          className="text-[oklch(0.18_0.055_240)] text-xl mb-2"
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          Thank you, {form.name}!
        </h4>
        <p className="text-[oklch(0.45_0.03_240)] text-sm">
          We have received your quote request and will be in touch shortly to arrange a
          consultation or site survey.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-[oklch(0.88_0.008_80)] rounded-md px-3 py-2.5 text-sm text-[oklch(0.18_0.055_240)] placeholder-[oklch(0.65_0.03_240)] focus:outline-none focus:border-[oklch(0.65_0.13_65)] focus:ring-1 focus:ring-[oklch(0.65_0.13_65)] transition-colors";
  const labelClass = "block text-xs font-semibold text-[oklch(0.35_0.03_240)] mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            required
            className={inputClass}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            className={inputClass}
            placeholder="+351 ..."
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email Address *</label>
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
          <label className={labelClass}>Property Type</label>
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
          <label className={labelClass}>Service Needed</label>
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
        <label className={labelClass}>Your Area in the Algarve</label>
        <input
          className={inputClass}
          placeholder="e.g. Vilamoura, Lagos, Faro..."
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>Additional Details</label>
        <textarea
          rows={3}
          className={inputClass}
          placeholder="Tell us about your property, number of rooms, any existing system..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button type="submit" className="btn-gold w-full text-base py-3">
        Send Quote Request
      </button>

      <p className="text-[oklch(0.65_0.03_240)] text-xs text-center">
        We typically respond within one business day.
      </p>
    </form>
  );
}
