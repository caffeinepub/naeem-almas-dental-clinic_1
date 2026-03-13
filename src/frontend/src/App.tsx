import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  Facebook,
  Heart,
  Instagram,
  Layers,
  Loader2,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Phone,
  Shield,
  Smile,
  Sparkles,
  Star,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useActor } from "./hooks/useActor";
import AdminPage from "./pages/AdminPage";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ServiceItem {
  icon: React.ReactNode;
  name: string;
  description: string;
}

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── Design Tokens ────────────────────────────────────────────────────────────
const GOLD = "#FFD700";
const DARK_BG = "#1A1A1A";
const CARD_BG = "#222222";
const _CARD_BG_LIGHT = "#252525";

// ─── Data ─────────────────────────────────────────────────────────────────────
const dentalServices: ServiceItem[] = [
  {
    icon: <Shield size={22} />,
    name: "Restorations",
    description:
      "Repair damaged or decayed teeth to restore function and appearance",
  },
  {
    icon: <Layers size={22} />,
    name: "Crowns & Bridges",
    description: "Durable tooth-shaped caps and prosthetics for damaged teeth",
  },
  {
    icon: <Smile size={22} />,
    name: "Dental Implants",
    description: "Permanent tooth replacements that look and feel natural",
  },
  {
    icon: <Heart size={22} />,
    name: "RCT (Root Canal Treatment)",
    description:
      "Painless endodontic treatment to save infected or damaged teeth",
  },
  {
    icon: <Sparkles size={22} />,
    name: "Teeth Whitening",
    description: "Professional whitening for a brighter, confident smile",
  },
  {
    icon: <Droplets size={22} />,
    name: "Scaling & Polishing (Teeth Cleaning)",
    description:
      "Professional deep clean to remove plaque, tartar, and restore natural shine",
  },
  {
    icon: <Zap size={22} />,
    name: "Micro Abrasion & Bleaching",
    description:
      "Gentle removal of surface stains, enamel imperfections, and professional bleaching",
  },
  {
    icon: <Microscope size={22} />,
    name: "Tooth Extractions",
    description: "Safe and comfortable removal when necessary",
  },
  {
    icon: <CheckCircle2 size={22} />,
    name: "Orthodontics (Braces & Aligners)",
    description:
      "Metal braces, ceramic braces, and clear aligners for a perfect smile",
  },
];

const aestheticServices: ServiceItem[] = [
  {
    icon: <Sparkles size={22} />,
    name: "Facial Aesthetics",
    description:
      "Advanced treatments to enhance and rejuvenate your appearance",
  },
  {
    icon: <Droplets size={22} />,
    name: "HydraFacial",
    description: "Deep cleansing and hydration for glowing skin",
  },
  {
    icon: <Smile size={22} />,
    name: "BB Glow",
    description: "Semi-permanent foundation treatment for even skin tone",
  },
  {
    icon: <Heart size={22} />,
    name: "Face & Hair PRP",
    description: "Platelet-rich plasma therapy for skin and hair rejuvenation",
  },
  {
    icon: <Zap size={22} />,
    name: "Biotin & Exosomes",
    description: "Nourishing infusions for hair growth and skin vitality",
  },
  {
    icon: <Layers size={22} />,
    name: "Whitening Drips",
    description: "IV vitamin therapy for skin brightening",
  },
  {
    icon: <Shield size={22} />,
    name: "Laser Hair Removal",
    description: "Permanent reduction of unwanted hair with precision laser",
  },
];

const allServices = [...dentalServices, ...aestheticServices].map(
  (s) => s.name,
);

const whyUs = [
  {
    icon: <UserCheck size={26} />,
    title: "Experienced Professionals",
    desc: "Expert doctors trained in advanced dental and aesthetic procedures",
  },
  {
    icon: <Microscope size={26} />,
    title: "Advanced Technology",
    desc: "State-of-the-art equipment for precise diagnosis and treatment",
  },
  {
    icon: <Shield size={26} />,
    title: "Hygienic Environment",
    desc: "Strictly maintained sterile and comfortable clinic conditions",
  },
  {
    icon: <Layers size={26} />,
    title: "Complete Care Under One Roof",
    desc: "Dental treatments and facial aesthetics in one modern clinic",
  },
  {
    icon: <Heart size={26} />,
    title: "Patient-Centered Ethics",
    desc: "Honest, transparent, and compassionate care you can trust",
  },
];

const reviews = [
  {
    text: "This is the best place for all your dental needs. Dr. Jazib Memon is highly skilled in root canals, restorations, implants, crowns, and bridges.",
    author: "Ahmed R.",
    rating: 5,
  },
  {
    text: "Dr. Jazib is extremely humble and professional. Excellent work ethics and great patient care. Highly recommended to everyone!",
    author: "Sara K.",
    rating: 5,
  },
  {
    text: "I was nervous about my root canal but the team made me feel completely at ease. Pain-free experience and wonderful staff.",
    author: "Fatima M.",
    rating: 5,
  },
];

const infoBadges = [
  {
    icon: <Star size={13} style={{ color: GOLD, fill: GOLD }} />,
    text: "4.7 Stars",
  },
  {
    icon: <Clock size={13} style={{ color: GOLD }} />,
    text: "6 PM – 10:45 PM",
  },
  { icon: <Phone size={13} style={{ color: GOLD }} />, text: "03363051439" },
];

const aboutStats = [
  {
    label: "Dental Services",
    value: "9+",
    desc: "Comprehensive dental treatments",
  },
  {
    label: "Aesthetic Services",
    value: "7+",
    desc: "Advanced facial aesthetic procedures",
  },
  { label: "Patient Rating", value: "4.7★", desc: "Based on Google Reviews" },
];

const galleryImages = [
  {
    src: "/assets/uploads/About-is-NA-1.jpeg",
    alt: "Naeem & Almas Dental Clinic - About Us",
  },
  {
    src: "/assets/uploads/clinic-image-3-2.jpeg",
    alt: "Laser machine treatment at N&ADCS",
  },
  {
    src: "/assets/uploads/clinic-image-4-3.jpeg",
    alt: "Dental microscope procedure",
  },
];

const socialLinks = [
  {
    icon: <Facebook size={16} />,
    label: "Facebook",
    href: "https://facebook.com",
  },
  {
    icon: <Instagram size={16} />,
    label: "Instagram",
    href: "https://instagram.com",
  },
  {
    icon: <MessageCircle size={16} />,
    label: "WhatsApp",
    href: "https://wa.me/923363051439",
  },
];

const quickLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Patient Reviews", href: "#reviews" },
  { label: "Book Appointment", href: "#appointment" },
];

// ─── Wave Divider ──────────────────────────────────────────────────────────────
function WaveDivider({ fill = "#ffffff" }: { fill?: string }) {
  return (
    <div
      className="relative w-full overflow-hidden leading-none"
      style={{ height: 68, marginTop: -2 }}
    >
      <svg
        role="img"
        aria-label="decorative wave"
        viewBox="0 0 1440 68"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0,34 C240,68 480,0 720,34 C960,68 1200,0 1440,34 L1440,68 L0,68 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="text-center mb-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      <motion.div variants={fadeUp} className="mb-4 flex justify-center">
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${GOLD} 0%, #E6C000 100%)`,
            color: DARK_BG,
            boxShadow: `0 2px 12px ${GOLD}55`,
          }}
        >
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="text-3xl lg:text-4xl font-display font-bold text-white"
        style={{ textShadow: `0 0 20px ${GOLD}4D` }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl mx-auto text-white"
          style={{ opacity: 0.9 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Gold Underline ───────────────────────────────────────────────────────────
function GoldUnderline() {
  return (
    <div
      className="mx-auto mt-3 mb-1 rounded-full"
      style={{
        width: 64,
        height: 3,
        background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
      }}
    />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      data-ocid="nav.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 shadow-[0_2px_24px_rgba(0,0,0,0.70)]"
          : "bg-transparent py-5"
      }`}
      style={{
        backgroundColor: scrolled
          ? "rgba(26,26,26,0.97)"
          : "rgba(26,26,26,0.80)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? `1px solid ${GOLD}33` : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <img
              src="/assets/uploads/clinic-img-l-1.jpeg"
              alt="N&ADCS Logo"
              className="h-12 w-12 rounded-full object-cover border-2"
              style={{ borderColor: GOLD }}
            />
            <div className="leading-tight">
              <div
                className="text-sm font-bold transition-colors duration-300"
                style={{ color: GOLD, fontFamily: "'Poppins', sans-serif" }}
              >
                Naeem & Almas Dental
              </div>
              <div className="text-xs text-white/80">Clinic & School</div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm font-medium transition-colors text-white/85 hover:text-[#FFD700]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#appointment"
              data-ocid="nav.primary_button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold"
              style={{
                background: GOLD,
                color: DARK_BG,
                boxShadow: `0 2px 14px ${GOLD}55`,
              }}
            >
              Book Appointment
            </motion.a>
          </div>

          <button
            type="button"
            className="md:hidden p-2 transition-colors text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden rounded-b-xl border mt-2"
              style={{
                backgroundColor: "rgba(26,26,26,0.98)",
                borderColor: `${GOLD}44`,
              }}
            >
              <div
                className="flex flex-col gap-4 pt-4 pb-4 border-t mt-2 px-2"
                style={{ borderColor: `${GOLD}22` }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-white hover:text-[#FFD700] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="w-full mt-1 rounded-lg px-4 py-2.5 text-sm font-bold"
                  style={{ background: GOLD, color: DARK_BG }}
                  onClick={() => {
                    setMenuOpen(false);
                    document
                      .querySelector("#appointment")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-clinic.dim_1600x900.jpg')",
        }}
      />

      {/* Heavy dark overlay for high contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,26,26,0.96) 0%, rgba(26,26,26,0.82) 55%, rgba(26,26,26,0.55) 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${DARK_BG} 100%)`,
        }}
      />

      {/* Gold accent line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 3,
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-32">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
            style={{
              background: "rgba(255,215,0,0.12)",
              border: `1px solid ${GOLD}55`,
            }}
          >
            <Star size={12} style={{ color: GOLD, fill: GOLD }} />
            <span className="text-white text-xs font-semibold tracking-wide uppercase">
              4.7 Stars · Hyderabad's Trusted Clinic
            </span>
          </motion.div>

          {/* WELCOME — iridescent gradient */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            }}
          >
            <h1
              className="welcome-animate font-display font-bold leading-none mb-1"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              WELCOME
            </h1>
          </motion.div>

          {/* Gold underline beneath WELCOME */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            style={{
              height: 3,
              width: "100%",
              maxWidth: 320,
              background: `linear-gradient(to right, ${GOLD}, transparent)`,
              marginBottom: "1.25rem",
              transformOrigin: "left",
            }}
          />

          {/* Clinic name in gold */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            className="font-display font-bold text-2xl sm:text-3xl mb-5"
            style={{ color: GOLD, textShadow: `0 0 24px ${GOLD}66` }}
          >
            Naeem & Almas Dental Clinic &amp; School
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.22 }}
            className="text-lg text-white mb-2 leading-relaxed"
          >
            Comprehensive dental treatments &amp; facial aesthetics delivered
            with precision, comfort, and care.
          </motion.p>

          {/* HEALTHY SMILES keyword */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
            className="text-sm text-white/85 mb-10 leading-relaxed"
          >
            From routine cleanings to implants &amp; aesthetics — we help you
            achieve{" "}
            <span
              className="font-bold text-base"
              style={{ color: GOLD, textShadow: `0 0 12px ${GOLD}88` }}
            >
              HEALTHY SMILES
            </span>{" "}
            every day.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.36,
            }}
            className="flex flex-col sm:flex-row gap-3 mb-12"
          >
            <motion.a
              href="#appointment"
              data-ocid="hero.primary_button"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-bold"
              style={{
                background: GOLD,
                color: DARK_BG,
                boxShadow: `0 4px 22px ${GOLD}66`,
              }}
            >
              Book Appointment
              <ChevronRight size={18} />
            </motion.a>

            <motion.a
              href="tel:03363051439"
              data-ocid="hero.secondary_button"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold text-white"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255,255,255,0.30)",
              }}
            >
              <Phone size={17} />
              Call Now
            </motion.a>
          </motion.div>

          {/* Info badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {infoBadges.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "rgba(255,215,0,0.10)",
                  border: `1px solid ${GOLD}44`,
                }}
              >
                {badge.icon}
                <span className="text-white text-xs font-medium">
                  {badge.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28"
      style={{ backgroundColor: DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
                style={{
                  background: GOLD,
                  color: DARK_BG,
                  boxShadow: `0 2px 12px ${GOLD}55`,
                }}
              >
                About Us
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl font-display font-bold text-white mb-2"
              style={{ textShadow: `0 0 20px ${GOLD}33`, lineHeight: 1.2 }}
            >
              About Naeem & Almas Dental Clinic
            </motion.h2>
            <GoldUnderline />
            <div style={{ height: 16 }} />
            <motion.div
              variants={fadeUp}
              className="space-y-4 leading-relaxed"
              style={{ color: "#FFFFFF", opacity: 0.92 }}
            >
              <p>
                Naeem & Almas Dental Clinic and School is a trusted dental
                center in Hyderabad providing comprehensive dental care in a
                comfortable and hygienic environment.
              </p>
              <p>
                Our clinic combines modern dental technology with experienced
                professionals to deliver treatments that are precise, safe, and
                patient-focused.
              </p>
              <p>
                From preventive dentistry to advanced procedures like implants,
                root canals, and smile enhancement — we are dedicated to helping
                every patient achieve long-lasting oral health and{" "}
                <span style={{ color: GOLD, fontWeight: 700 }}>
                  HEALTHY SMILES
                </span>
                .
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-8">
              <motion.a
                href="#appointment"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
                style={{
                  background: GOLD,
                  color: DARK_BG,
                  boxShadow: `0 3px 16px ${GOLD}55`,
                }}
              >
                Schedule a Visit
                <ChevronRight size={16} />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 gap-4"
          >
            {aboutStats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardVariant}
                className="flex items-center gap-6 rounded-2xl p-6"
                style={{
                  background: CARD_BG,
                  borderLeft: `4px solid ${GOLD}`,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
                }}
              >
                <div
                  className="text-4xl font-bold font-display"
                  style={{ color: GOLD, textShadow: `0 0 16px ${GOLD}66` }}
                >
                  {stat.value}
                </div>
                <div>
                  <div className="font-semibold text-white font-display">
                    {stat.label}
                  </div>
                  <div className="text-sm text-white" style={{ opacity: 0.8 }}>
                    {stat.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServiceCard({ service }: { service: ServiceItem }) {
  const isKeyService = [
    "RCT (Root Canal Treatment)",
    "Orthodontics (Braces & Aligners)",
    "Laser Hair Removal",
  ].includes(service.name);

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -5, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group relative rounded-2xl p-6 cursor-default overflow-hidden"
      style={{
        background: CARD_BG,
        boxShadow: "0 2px 14px rgba(0,0,0,0.35)",
        borderTop: `2px solid ${GOLD}`,
      }}
    >
      {/* Hover gold glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(155deg, transparent 40%, ${GOLD}12 100%)`,
        }}
      />

      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{ backgroundColor: `${GOLD}18` }}
      >
        <span
          className="transition-colors duration-200"
          style={{ color: GOLD }}
        >
          {service.icon}
        </span>
      </div>

      <h3
        className="relative font-semibold font-display mb-2 text-[0.95rem]"
        style={{
          color: isKeyService ? GOLD : "#FFFFFF",
          textShadow: isKeyService ? `0 0 10px ${GOLD}66` : "none",
        }}
      >
        {service.name}
      </h3>
      <p
        className="relative text-sm text-white leading-relaxed"
        style={{ opacity: 0.85 }}
      >
        {service.description}
      </p>
    </motion.div>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our Dental & Aesthetic Services"
          description="Comprehensive care for your smile and confidence — all under one roof."
        />

        <Tabs defaultValue="dental" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList
              className="flex w-fit rounded-full p-1.5"
              style={{
                background: "#222222",
                border: `1px solid ${GOLD}33`,
              }}
            >
              <TabsTrigger
                value="dental"
                data-ocid="services.tab"
                className="rounded-full px-7 py-2.5 text-sm font-semibold transition-all data-[state=active]:shadow-md text-white/70"
                style={
                  {
                    // active styles via inline handled by CSS var override below
                  }
                }
              >
                Dental Services
              </TabsTrigger>
              <TabsTrigger
                value="aesthetic"
                data-ocid="services.tab"
                className="rounded-full px-7 py-2.5 text-sm font-semibold transition-all data-[state=active]:shadow-md text-white/70"
              >
                Aesthetic Services
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dental">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {dentalServices.map((s, i) => (
                <div key={s.name} data-ocid={`services.item.${i + 1}`}>
                  <ServiceCard service={s} />
                </div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="aesthetic">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              {aestheticServices.map((s, i) => (
                <div key={s.name} data-ocid={`services.item.${i + 1}`}>
                  <ServiceCard service={s} />
                </div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
function WhyUsSection() {
  return (
    <>
      <section
        id="why-us"
        className="pt-20 lg:pt-28 pb-28"
        style={{
          background:
            "linear-gradient(160deg, #1A1A1A 0%, #202015 40%, #1A1A1A 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Promise"
            title="Why Patients Trust Our Clinic"
            description="We are committed to providing exceptional care in a welcoming environment."
          />

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                variants={cardVariant}
                data-ocid={`why.item.${i + 1}`}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group rounded-2xl p-6"
                style={{
                  background: CARD_BG,
                  border: `1px solid ${GOLD}33`,
                  boxShadow: "0 2px 14px rgba(0,0,0,0.35)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${GOLD}20`,
                    color: GOLD,
                  }}
                >
                  {item.icon}
                </div>
                <h3
                  className="font-semibold font-display mb-2"
                  style={{ color: "#FFFFFF", textShadow: `0 0 12px ${GOLD}33` }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-white text-sm leading-relaxed"
                  style={{ opacity: 0.88 }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Wave transition */}
      <WaveDivider fill="#111111" />
    </>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="pb-20 lg:pb-28"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="mb-4">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{
                background: GOLD,
                color: DARK_BG,
                boxShadow: `0 2px 12px ${GOLD}55`,
              }}
            >
              Testimonials
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-3xl lg:text-4xl font-display font-bold text-white"
            style={{ textShadow: `0 0 20px ${GOLD}33` }}
          >
            What Our Patients Say
          </motion.h2>
          <GoldUnderline />
          <p className="mt-4 text-white" style={{ opacity: 0.85 }}>
            Trusted by hundreds of patients in Hyderabad
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={17} style={{ color: GOLD, fill: GOLD }} />
            ))}
            <span
              className="ml-2 text-sm font-medium text-white"
              style={{ opacity: 0.85 }}
            >
              4.7 / 5 on Google Reviews
            </span>
          </div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={review.author}
              variants={cardVariant}
              data-ocid={`reviews.item.${i + 1}`}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: CARD_BG,
                borderTop: `2px solid ${GOLD}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* Large quote watermark */}
              <div
                className="absolute top-2 right-4 text-8xl font-serif select-none pointer-events-none leading-none"
                style={{ color: `${GOLD}15` }}
              >
                &ldquo;
              </div>
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].slice(0, review.rating).map((s) => (
                  <Star key={s} size={14} style={{ color: GOLD, fill: GOLD }} />
                ))}
              </div>
              <p
                className="text-white leading-relaxed mb-6 text-sm relative"
                style={{ opacity: 0.95 }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD} 0%, #E6C000 100%)`,
                    color: DARK_BG,
                  }}
                >
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold font-display text-white text-sm">
                    {review.author}
                  </div>
                  <div className="text-xs text-white" style={{ opacity: 0.7 }}>
                    Verified Patient
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Appointment ──────────────────────────────────────────────────────────────
function AppointmentSection() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    treatment: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.bookAppointment(
        form.name,
        form.phone,
        form.treatment,
        BigInt(Date.now()),
        form.message || null,
      );
      setStatus("success");
      setForm({ name: "", phone: "", treatment: "", time: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="appointment"
      className="py-20 lg:py-28"
      style={{ backgroundColor: DARK_BG }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Online Booking"
          title="Book Your Appointment Today"
          description="Schedule your visit quickly through our online appointment system."
        />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              data-ocid="appointment.success_state"
              className="rounded-2xl p-10 text-center"
              style={{
                background: CARD_BG,
                border: `1px solid ${GOLD}55`,
                boxShadow: `0 4px 32px ${GOLD}22`,
              }}
            >
              <CheckCircle2 size={52} className="text-green-400 mx-auto mb-4" />
              <h3
                className="text-xl font-bold font-display text-white mb-2"
                style={{ textShadow: `0 0 16px ${GOLD}44` }}
              >
                Appointment Booked!
              </h3>
              <p className="text-white" style={{ opacity: 0.88 }}>
                Your appointment has been confirmed. We&apos;ll contact you
                shortly.
              </p>
              <motion.button
                type="button"
                onClick={() => setStatus("idle")}
                whileHover={{ scale: 1.04 }}
                className="mt-6 rounded-xl px-6 py-3 text-sm font-bold"
                style={{ background: GOLD, color: DARK_BG }}
              >
                Book Another
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 space-y-6"
              style={{
                background: CARD_BG,
                border: `1px solid ${GOLD}44`,
                boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
              }}
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium text-white">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    data-ocid="appointment.input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="03XX-XXXXXXX"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    data-ocid="appointment.input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="treatment" className="font-medium text-white">
                  Treatment Needed
                </Label>
                <Select
                  value={form.treatment}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, treatment: v }))
                  }
                >
                  <SelectTrigger data-ocid="appointment.select">
                    <SelectValue placeholder="Select a treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {allServices.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="font-medium text-white">
                  Preferred Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={form.time}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, time: e.target.value }))
                  }
                  data-ocid="appointment.input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-medium text-white">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Any additional notes or questions..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  rows={4}
                  data-ocid="appointment.textarea"
                />
              </div>

              {status === "error" && (
                <div
                  data-ocid="appointment.error_state"
                  className="flex items-center gap-2 text-sm rounded-lg p-3"
                  style={{
                    color: "#ff6b6b",
                    background: "rgba(255,107,107,0.12)",
                    border: "1px solid rgba(255,107,107,0.30)",
                  }}
                >
                  <AlertCircle size={16} />
                  <span>
                    Something went wrong. Please try again or call us directly.
                  </span>
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "loading"}
                data-ocid="appointment.submit_button"
                className="w-full rounded-xl py-4 text-base font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                style={{
                  background: GOLD,
                  color: DARK_BG,
                  boxShadow: `0 4px 20px ${GOLD}55`,
                }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span data-ocid="appointment.loading_state">
                      Booking...
                    </span>
                  </>
                ) : (
                  "Confirm Appointment"
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function GallerySection() {
  return (
    <section
      id="gallery"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#111111" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Clinic"
          title="Our Clinic Environment"
          description="A hygienic, modern, and welcoming space designed for your comfort"
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.alt}
              variants={cardVariant}
              data-ocid={`gallery.item.${i + 1}`}
              whileHover={{ scale: 1.025, transition: { duration: 0.3 } }}
              className="overflow-hidden rounded-2xl"
              style={{ border: `2px solid ${GOLD}55` }}
            >
              <div className="relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.75) 100%)",
                  }}
                />
                {/* Gold accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ height: 2, background: GOLD }}
                />
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold drop-shadow-lg">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 lg:py-28"
      style={{ backgroundColor: DARK_BG }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Find Us" title="Visit Our Clinic" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {[
              {
                icon: <MapPin size={20} />,
                title: "Address",
                content: (
                  <p className="text-white" style={{ opacity: 0.9 }}>
                    Block I, Sindhi Muslim Housing Society Phase 1<br />
                    Qasimabad, Hyderabad
                  </p>
                ),
              },
              {
                icon: <Phone size={20} />,
                title: "Phone",
                content: (
                  <a
                    href="tel:03363051439"
                    className="font-medium transition-colors hover:opacity-80"
                    style={{ color: GOLD }}
                    data-ocid="contact.link"
                  >
                    03363051439
                  </a>
                ),
              },
              {
                icon: <Clock size={20} />,
                title: "Working Hours",
                content: (
                  <p className="text-white" style={{ opacity: 0.9 }}>
                    6:00 PM – 10:45 PM, Daily
                  </p>
                ),
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${GOLD}20`,
                    color: GOLD,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="font-semibold font-display text-white mb-1"
                    style={{ textShadow: `0 0 10px ${GOLD}33` }}
                  >
                    {item.title}
                  </h3>
                  {item.content}
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeUp}>
              <motion.a
                href="tel:03363051439"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold"
                style={{
                  background: GOLD,
                  color: DARK_BG,
                  boxShadow: `0 3px 16px ${GOLD}55`,
                }}
                data-ocid="contact.primary_button"
              >
                <Phone size={18} />
                Call Now
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden"
            style={{
              border: `2px solid ${GOLD}55`,
              boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
            }}
            data-ocid="contact.map_marker"
          >
            <iframe
              title="Clinic Location"
              src="https://maps.google.com/maps?q=Sindhi+Muslim+Housing+Society+Qasimabad+Hyderabad+Pakistan&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      style={{
        backgroundColor: "#0F0F0F",
        borderTop: `2px solid ${GOLD}55`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/generated/clinic-logo-transparent.dim_200x200.png"
                alt="Naeem & Almas Dental"
                className="w-10 h-10 object-contain brightness-0 invert"
              />
              <div>
                <div
                  className="font-bold font-display text-sm"
                  style={{ color: GOLD }}
                >
                  Naeem & Almas Dental
                </div>
                <div className="text-xs text-white/75">Clinic & School</div>
              </div>
            </div>
            <p
              className="text-white text-sm leading-relaxed italic"
              style={{ opacity: 0.8 }}
            >
              &ldquo;Caring for Your Smile with Expertise and Compassion&rdquo;
            </p>
            {/* Social icons in FFD700 */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: `${GOLD}20`,
                    color: GOLD,
                    border: `1px solid ${GOLD}44`,
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="font-semibold font-display mb-5 text-sm uppercase tracking-wider"
              style={{ color: GOLD }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white text-sm transition-colors hover:text-[#FFD700]"
                    style={{ opacity: 0.88 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold font-display mb-5 text-sm uppercase tracking-wider"
              style={{ color: GOLD }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin
                  size={14}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: GOLD }}
                />
                <span className="text-white text-sm" style={{ opacity: 0.9 }}>
                  Block I, Sindhi Muslim Housing Society Phase 1, Qasimabad,
                  Hyderabad
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone
                  size={14}
                  style={{ color: GOLD }}
                  className="flex-shrink-0"
                />
                <a
                  href="tel:03363051439"
                  className="text-white text-sm transition-colors hover:text-[#FFD700]"
                  style={{ opacity: 0.9 }}
                >
                  03363051439
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="font-semibold font-display mb-5 text-sm uppercase tracking-wider"
              style={{ color: GOLD }}
            >
              Working Hours
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock size={14} style={{ color: GOLD }} />
                <span className="text-white text-sm" style={{ opacity: 0.9 }}>
                  6:00 PM – 10:45 PM
                </span>
              </div>
              <div
                className="text-white text-sm pl-5"
                style={{ opacity: 0.75 }}
              >
                Open Daily
              </div>
              <div
                className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{ background: "rgba(74,222,128,0.15)" }}
              >
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-300 text-xs font-medium">
                  Accepting Appointments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: `${GOLD}22` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-white text-xs text-center sm:text-left"
            style={{ opacity: 0.6 }}
          >
            &copy; {year} Naeem & Almas Dental Clinic. All rights reserved.
          </p>
          <p className="text-white text-xs" style={{ opacity: 0.55 }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90 transition-opacity"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  if (window.location.pathname === "/admin") {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyUsSection />
        <ReviewsSection />
        <AppointmentSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
