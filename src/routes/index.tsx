import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu, X, ArrowRight, Play, Sparkles, Code2, Brain, Cloud, Shield, Database, Smartphone,
  TestTube2, Calculator, Baby, GraduationCap, Briefcase, Users, Award, Rocket, Target,
  MessageCircle, FileText, MonitorPlay, Building2, Presentation, BookOpen, CheckCircle2,
  Star, MapPin, Mail, Phone, Facebook, Instagram, Linkedin, Youtube, Send, ChevronDown,
  Layers, Server, Terminal, Cpu, Zap, Trophy, HeartHandshake, Clock, ChevronLeft, ChevronRight, TrendingUp, Calendar,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import logoImg from "@/assets/yugaacademy-logo.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:image", content: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200" },
    ],
  }),
  component: Home,
});

/* ---------- helpers ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const } }),
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} custom={delay} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ---------- navbar ---------- */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Services", href: "#services" },
  { label: "Placements", href: "#placements" },
  { label: "Testimonials", href: "#testimonials" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Sync hash on initial load
    if (window.location.hash) {
      setActiveHash(window.location.hash);
    }

    // Scroll spy to highlight active section on scroll
    const sectionIds = ["home", "about", "courses", "services", "placements", "testimonials"];
    
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-35% 0px -45% 0px", // Detect sections in the upper-middle area of the viewport
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" style={{ background: "var(--gradient-navy)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between py-3">
          <a href="#home" onClick={() => setActiveHash("#home")} className="flex items-center gap-3">
            <img src={logoImg} alt="YUGA Tech Academy Logo" className="h-14 w-auto object-contain rounded" />
            <div className="leading-tight">
              <div className="font-display text-xl font-black text-white tracking-wide">YUGA</div>
              <div className="text-[10px] tracking-[0.18em] font-bold text-[#EAB308]">TECH ACADEMY</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((n) => {
              const isActive = activeHash === n.href;
              return (
                <a key={n.href} href={n.href}
                  onClick={() => setActiveHash(n.href)}
                  className={`relative py-2 text-sm font-semibold transition-colors tracking-wide ${isActive ? "text-[#EAB308]" : "text-white/80 hover:text-white"}`}>
                  {n.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EAB308] rounded-full" 
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" onClick={() => setActiveHash("#contact")} className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-slate-950 border border-[#EAB308] font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-110" style={{ background: "#EAB308" }}>
              Contact <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg text-white" aria-label="Menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#020617] border-t border-slate-800">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV.map((n) => {
                const isActive = activeHash === n.href;
                return (
                  <a key={n.href} href={n.href} 
                    onClick={() => {
                      setActiveHash(n.href);
                      setOpen(false);
                    }} 
                    className={`px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive ? "text-[#EAB308] bg-slate-800/60" : "text-white/85 hover:text-white hover:bg-slate-800/30"}`}>
                    {n.label}
                  </a>
                );
              })}
              <a href="#contact" onClick={() => {
                setActiveHash("#contact");
                setOpen(false);
              }} className="mt-2 text-center px-4 py-3 rounded-full text-slate-950 border border-[#EAB308] font-bold hover:brightness-110" style={{ background: "#EAB308" }}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative bg-white pt-24 lg:h-[700px] overflow-hidden flex flex-col justify-between">
      {/* Responsive SVG ClipPath definition for the curved image cutout */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <clipPath id="hero-curve" clipPathUnits="objectBoundingBox">
            <path d="M 0.38,0 C 0.08,0.3 0.12,0.7 0.42,1 L 1,1 L 1,0 Z" />
          </clipPath>
        </defs>
      </svg>



      {/* Main Content Area */}
      <div className="flex-grow flex items-start lg:items-start relative z-10 lg:h-[474px] lg:pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-0 pb-12 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (Text & CTAs) */}
            <div className="lg:col-span-6 flex flex-col justify-start text-slate-900 z-10 pr-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#EAB308]/60 bg-[#FEF3C7] px-4 py-1.5 text-xs font-bold text-[#B45309] mb-3 w-fit shadow-sm"
              >
                <GraduationCap className="w-4 h-4 text-[#B45309]" />
                <span className="tracking-wider uppercase">LEARN • BUILD • EXCEL</span>
              </motion.div>

              <motion.h1 
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="font-display text-3xl sm:text-4xl lg:text-[40px] font-black text-[#020617] leading-tight flex flex-wrap gap-x-[0.22em]"
              >
                {["Learn", "Today's", "Skills"].map((w, idx) => (
                  <motion.span key={idx} variants={fadeUpWord} className="inline-block">{w}</motion.span>
                ))}
                <br className="hidden sm:inline" />
                {["for", "Tomorrow's", "Career"].map((w, idx) => (
                  <motion.span key={idx} variants={fadeUpWord} className="inline-block text-[#D97706]">{w}</motion.span>
                ))}
              </motion.h1>

              {/* Gold horizontal line divider */}
              <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-28 h-1.5 bg-[#EAB308] mt-4 rounded-full origin-left"
              />

              <motion.p 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-4 text-base text-slate-600 max-w-xl leading-relaxed font-medium"
              >
                Empowering students with industry-ready IT skills through expert training, live projects, internships, certifications, and placements.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-5 flex flex-wrap gap-4"
              >
                <a href="#courses" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] hover:brightness-110" style={{ background: "var(--gradient-navy)" }}>
                  Explore Courses <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Statistics Row placed below buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8 py-5 border-y border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2"
              >
                {/* Stat 1: 150+ Courses */}
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
                  <div className="leading-tight">
                    <div className="font-display text-lg sm:text-xl font-black text-[#020617]">
                      <Counter to={150} suffix="+" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      Courses
                    </div>
                  </div>
                </div>

                {/* Stat 2: 20K+ Students Trained */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200/80 sm:pl-6">
                  <Users className="w-6 h-6 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
                  <div className="leading-tight">
                    <div className="font-display text-lg sm:text-xl font-black text-[#020617]">
                      <Counter to={20} suffix="K+" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      Students Trained
                    </div>
                  </div>
                </div>

                {/* Stat 3: 100+ Hiring Partners */}
                <div className="flex items-center gap-3 pl-0 sm:pl-6 border-l-0 sm:border-l border-slate-200/80">
                  <HeartHandshake className="w-6 h-6 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
                  <div className="leading-tight">
                    <div className="font-display text-lg sm:text-xl font-black text-[#020617]">
                      <Counter to={100} suffix="+" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      Hiring Partners
                    </div>
                  </div>
                </div>

                {/* Stat 4: 95% Placement Rate */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200/80 sm:pl-6">
                  <TrendingUp className="w-6 h-6 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
                  <div className="leading-tight">
                    <div className="font-display text-lg sm:text-xl font-black text-[#020617]">
                      <Counter to={95} suffix="%" />
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      Placement Rate
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Student Quotation */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-5 text-xs sm:text-sm text-slate-700 font-bold italic border-l-3 border-[#EAB308] pl-4 leading-relaxed"
              >
                "Learn today, lead tomorrow. The best investment you can make is in yourself."
              </motion.div>
            </div>

            {/* Right Column Spacer (Desktop is absolute, Mobile renders image directly here) */}
            <div className="lg:col-span-6 lg:hidden">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-[#EAB308]/50"
              >
                <img src={heroImg} alt="Students learning IT skills" className="w-full h-auto object-cover" />
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Desktop Absolute Image Container with Curved Cutout and Gold Border */}
      <div className="absolute top-0 right-0 bottom-0 left-[38%] hidden lg:block overflow-hidden z-0">
        <div className="relative w-full h-full">
          {/* Overlay gold curve border */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="gold-border-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
            </defs>
            <path d="M 38,0 C 8,30 12,70 42,100" fill="none" stroke="url(#gold-border-grad)" strokeWidth="1.2" />
          </svg>

          {/* Masked Student Image with object-bottom to preserve students faces */}
          <img 
            src={heroImg} 
            alt="Students learning IT skills" 
            className="w-full h-full object-cover object-bottom"
            style={{ clipPath: "url(#hero-curve)" }}
          />
          {/* Shadow-like overlay to integrate the image (clipped to only overlay the image region) */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(2,6,23,0.08) 0%, transparent 20%)", clipPath: "url(#hero-curve)" }} />
        </div>
      </div>

      {/* Overlapping Feature Cards for Desktop (placed absolute over padding bottom of section) */}
      <div className="absolute bottom-[150px] left-[50%] right-4 z-20 hidden lg:grid grid-cols-4 gap-3">
        
        {/* Card 1: Expert Trainers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <h3 className="font-display font-bold text-[#020617] text-[11px] sm:text-xs">Expert Trainers</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Industry experts</p>
          </div>
        </motion.div>

        {/* Card 2: Live Projects */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
            <Code2 className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <h3 className="font-display font-bold text-[#020617] text-[11px] sm:text-xs">Live Projects</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Real-world apps</p>
          </div>
        </motion.div>

        {/* Card 3: Certifications */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <h3 className="font-display font-bold text-[#020617] text-[11px] sm:text-xs">Certifications</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Career credibility</p>
          </div>
        </motion.div>

        {/* Card 4: 100% Placement */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center gap-2.5 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-0.5"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <h3 className="font-display font-bold text-[#020617] text-[11px] sm:text-xs">100% Placement</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Job assistance</p>
          </div>
        </motion.div>

      </div>

      {/* Mobile Feature Cards (Visible only on mobile/tablet viewports) */}
      <div className="mt-6 lg:hidden w-full px-4 sm:px-6 z-10 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Card 1: Expert Trainers */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-150 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[#020617] text-base">Expert Trainers</h3>
              <p className="text-sm text-slate-500 mt-0.5">Learn from industry professionals</p>
            </div>
          </div>

          {/* Card 2: Live Projects */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-150 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[#020617] text-base">Live Projects</h3>
              <p className="text-sm text-slate-500 mt-0.5">Build real-world applications</p>
            </div>
          </div>

          {/* Card 3: Certifications */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-150 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[#020617] text-base">Certifications</h3>
              <p className="text-sm text-slate-500 mt-0.5">Boost your career credibility</p>
            </div>
          </div>

          {/* Card 4: 100% Placement */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-150 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-[#020617] text-base">100% Placement</h3>
              <p className="text-sm text-slate-500 mt-0.5">Placement assistance & support</p>
            </div>
          </div>

        </div>
      </div>



    </section>
  );
}

const BRAND_LOGOS: Record<string, { path: string; color: string }> = {
  "Python": {
    path: "M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z",
    color: "#3776AB"
  },
  "React": {
    path: "M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z",
    color: "#61DAFB"
  },
  "Spring Boot": {
    path: "m23.693 10.7058-4.73-8.1844c-.4094-.7106-1.4166-1.2942-2.2402-1.2942H7.2725c-.819 0-1.8308.5836-2.2402 1.2942L.307 10.7058c-.4095.7106-.4095 1.873 0 2.5837l4.7252 8.189c.4094.7107 1.4166 1.2943 2.2402 1.2943h9.455c.819 0 1.826-.5836 2.2402-1.2942l4.7252-8.189c.4095-.7107.4095-1.8732 0-2.5838zM10.9763 5.7547c0-.5365.4377-.9742.9742-.9742s.9742.4377.9742.9742v5.8217c0 .5366-.4377.9742-.9742.9742s-.9742-.4376-.9742-.9742zm.9742 12.4294c-3.6427 0-6.6077-2.965-6.6077-6.6077.0047-2.0896.993-4.0521 2.6685-5.304a.8657.8657 0 0 1 1.2142.1788.8657.8657 0 0 1-.1788 1.2143c-2.1602 1.6048-2.612 4.6592-1.0072 6.8194 1.6049 2.1603 4.6593 2.612 6.8195 1.0072 1.2378-.9177 1.9673-2.372 1.9673-3.9157a4.8972 4.8972 0 0 0-1.9861-3.925c-.386-.2824-.466-.8284-.1836-1.2143.2824-.386.8283-.466 1.2143-.1835 1.6895 1.2471 2.6826 3.2238 2.6873 5.3228 0 3.6474-2.965 6.6077-6.6077 6.6077z",
    color: "#6DB33F"
  },
  "Azure": {
    path: "M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684",
    color: "#0078D4"
  },
  "Docker": {
    path: "M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z",
    color: "#2496ED"
  },
  "Kubernetes": {
    path: "M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z",
    color: "#326CE5"
  },
  "TensorFlow": {
    path: "M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.168 3.564z",
    color: "#FF6F00"
  },
  "MongoDB": {
    path: "M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z",
    color: "#47A248"
  },
  "MySQL": {
    path: "M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z",
    color: "#00758F"
  },
  "PostgreSQL": {
    path: "M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z",
    color: "#4169E1"
  },
  "Flutter": {
    path: "M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z",
    color: "#02569B"
  },
  "Android": {
    path: "M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z",
    color: "#3DDC84"
  },
  "Selenium": {
    path: "M23.174 3.468l-7.416 8.322a.228.228 0 0 1-.33 0l-3.786-3.9a.228.228 0 0 1 0-.282L12.872 6a.228.228 0 0 1 .366 0l2.106 2.346a.228.228 0 0 0 .342 0l5.94-8.094A.162.162 0 0 0 21.5 0H.716a.174.174 0 0 0-.174.174v23.652A.174.174 0 0 0 .716 24h22.566a.174.174 0 0 0 .174-.174V3.6a.162.162 0 0 0-.282-.132zM6.932 21.366a5.706 5.706 0 0 1-4.05-1.44.222.222 0 0 1 0-.288l.882-1.236a.222.222 0 0 1 .33-.036 4.338 4.338 0 0 0 2.964 1.158c1.158 0 1.722-.534 1.722-1.098 0-1.752-5.7-.552-5.7-4.278 0-1.65 1.428-3 3.756-3a5.568 5.568 0 0 1 3.708 1.242.222.222 0 0 1 0 .3l-.906 1.2a.222.222 0 0 1-.318.036 4.29 4.29 0 0 0-2.706-.936c-.906 0-1.41.402-1.41.996 0 1.572 5.688.522 5.688 4.2.006 1.812-1.284 3.18-3.96 3.18zm12.438-3.432a.192.192 0 0 1-.192.192h-5.202a.06.06 0 0 0-.06.066 1.986 1.986 0 0 0 2.106 1.638 3.264 3.264 0 0 0 1.8-.6.192.192 0 0 1 .276.042l.636.93a.198.198 0 0 1-.042.264 4.71 4.71 0 0 1-2.892.9 3.726 3.726 0 0 1-3.93-3.87 3.744 3.744 0 0 1 3.81-3.852c2.196 0 3.684 1.644 3.684 4.05zm-3.684-2.748a1.758 1.758 0 0 0-1.8 1.56.06.06 0 0 0 .06.066h3.492a.06.06 0 0 0 .06-.066 1.698 1.698 0 0 0-1.812-1.56Z",
    color: "#43B02A"
  },
  "Java": {
    path: "M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639",
    color: "#F89820"
  },
  "AWS": {
    path: "M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z",
    color: "#FF9900"
  },
};

/* ---------- tech section ---------- */
const TECHS = [
  { name: "Java", icon: Code2, desc: "Enterprise Backend" },
  { name: "Python", icon: Brain, desc: "AI & Data Science" },
  { name: "React", icon: Smartphone, desc: "Modern Frontend" },
  { name: "Spring Boot", icon: Server, desc: "Robust APIs" },
  { name: "AWS", icon: Cloud, desc: "Cloud Infrastructure" },
  { name: "Azure", icon: Cloud, desc: "Enterprise Cloud" },
  { name: "Docker", icon: Layers, desc: "Containerization" },
  { name: "Kubernetes", icon: Cpu, desc: "Orchestration" },
  { name: "AI", icon: Brain, desc: "Machine Learning" },
  { name: "TensorFlow", icon: Database, desc: "Deep Learning" },
  { name: "MongoDB", icon: Database, desc: "NoSQL Database" },
  { name: "MySQL", icon: Database, desc: "Relational DB" },
  { name: "PostgreSQL", icon: Database, desc: "Advanced SQL" },
  { name: "Flutter", icon: Smartphone, desc: "Cross-Platform" },
  { name: "Android", icon: Smartphone, desc: "Native Mobile" },
  { name: "DevOps", icon: Terminal, desc: "CI/CD Pipelines" },
  { name: "Selenium", icon: TestTube2, desc: "Automated Testing" },
  { name: "Cyber Security", icon: Shield, desc: "Network Defense" },
];

function TechSection() {
  return (
    <section className="py-10 bg-[#FAF9F6] border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          eyebrow="Tech Stack"
          title="Trusted Technologies We Teach"
          sub="Master the most in-demand tools and frameworks used by tech leaders globally."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center mt-6">
          {TECHS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={i} delay={i * 0.02} className="w-full max-w-[300px]">
                <div className="tech-card-uiverse">
                  <div className="tech-card-uiverse-border"></div>
                  <div className="tech-card-uiverse-content">
                    <div className="tech-card-uiverse-logo-wrapper">
                                            <div className="tech-card-uiverse-logo1 flex items-center justify-center">
                        {BRAND_LOGOS[t.name] ? (
                          <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" style={{ fill: BRAND_LOGOS[t.name].color }}>
                            <path d={BRAND_LOGOS[t.name].path} />
                          </svg>
                        ) : (
                          <Icon className="w-7 h-7 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className="tech-card-uiverse-logo2">
                        <span className="font-display font-bold text-white text-base tracking-wider whitespace-nowrap">{t.name}</span>
                      </div>
                      <span className="tech-card-uiverse-trail"></span>
                    </div>
                    <span className="tech-card-uiverse-desc">{t.desc}</span>
                  </div>
                  <span className="tech-card-uiverse-bottom-accent">YUGA TECH</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- stagger text animations ---------- */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUpWord = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
    },
  },
} as const;

/* ---------- animated title ---------- */
function AnimatedTitle({ title, className = "", light = false }: { title: string; className?: string; light?: boolean }) {
  const words = title.split(" ");
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.h2
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`font-display text-3xl sm:text-4xl lg:text-5xl font-black flex flex-wrap justify-center gap-x-[0.22em] leading-tight ${light ? "text-white" : "text-[#020617]"} ${className}`}
    >
      {words.map((w, i) => {
        const isHighlighted = i === words.length - 1 || 
                             (w.toLowerCase() === "mission" && words[i - 1]?.toLowerCase() === "our") ||
                             (w.toLowerCase() === "leaders" && words[i - 1]?.toLowerCase() === "it") ||
                             (w.toLowerCase() === "say" && words[i - 1]?.toLowerCase() === "students");
        return (
          <motion.span
            key={i}
            variants={fadeUpWord}
            className={`inline-block origin-bottom ${isHighlighted ? "text-[#D97706]" : ""}`}
          >
            {w}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}

/* ---------- section title ---------- */
function SectionTitle({ eyebrow, title, sub, light = false }: { eyebrow?: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      {eyebrow && (
        <Reveal>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.18em] uppercase ${light ? "bg-white/10 text-gold-glow" : "bg-gold/15 text-navy-deep"} mb-4`}>
            {eyebrow}
          </div>
        </Reveal>
      )}
      <AnimatedTitle title={title} light={light} />
      {sub && (
        <Reveal delay={0.25}>
          <p className={`mt-4 text-base sm:text-lg ${light ? "text-white/70" : "text-slate-500"} leading-relaxed`}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- about ---------- */
function About() {
  return (
    <section id="about" className="py-10 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Text & Image Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text */}
          <div className="lg:col-span-6 flex flex-col justify-start text-slate-900 pr-6">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#D97706]">
                <span>About Us</span>
                <div className="w-12 h-[1px] bg-[#D97706]" />
              </div>
              <AnimatedTitle title="Shaping Tomorrow's IT Leaders" className="!justify-start text-left" />
              <div className="w-16 h-1.5 bg-[#EAB308] mt-6 rounded-full" />
              <p className="mt-6 text-base text-slate-600 leading-relaxed font-medium">
                YUGA Tech Academy is a premier IT training institute in Visakhapatnam committed to transforming students into industry-ready professionals. Through expert training, practical learning, live projects, internships, and placement support, we empower students to build successful careers in IT and emerging technologies.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Image with overlay mission card */}
          <div className="lg:col-span-6 mt-8 lg:mt-0">
            <Reveal className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/15 to-navy/5 blur-2xl pointer-events-none" />
              <img 
                src={aboutImg} 
                alt="Students learning at YUGA Tech Academy" 
                className="relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-full h-auto object-cover border border-slate-100" 
              />
              {/* Overlapping Mission Card */}
              <div className="absolute -bottom-8 left-4 right-4 sm:left-8 sm:right-8 bg-[#020617] rounded-2xl p-5 shadow-2xl flex items-start gap-4 border border-slate-800 z-20">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-navy-deep">
                  <Target className="w-5 h-5 text-[#020617]" />
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm sm:text-base">Our Mission</div>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 leading-relaxed">
                    To deliver quality education with practical exposure and technology-driven training that prepares students for real-world success.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Part 2: Why Choose Us Section */}
        <div className="flex items-center justify-center gap-4 mt-14 mb-12">
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
          <h3 className="font-display text-xs sm:text-sm font-black tracking-[0.2em] text-[#020617] uppercase text-center">
            Why Choose Yuga Tech Academy?
          </h3>
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {/* Card 1: Industry Experts */}
          <Reveal delay={0.02} className="w-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 h-full">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-[#020617] text-base leading-tight mb-2">Industry Experts</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Learn from experienced professionals with real-world industry knowledge.
              </p>
            </div>
          </Reveal>

          {/* Card 2: Practical Learning */}
          <Reveal delay={0.04} className="w-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 h-full">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-[#020617] text-base leading-tight mb-2">Practical Learning</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hands-on training with live projects and modern tools for in-depth understanding.
              </p>
            </div>
          </Reveal>

          {/* Card 3: Placement Support */}
          <Reveal delay={0.06} className="w-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 h-full">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-[#020617] text-base leading-tight mb-2">Placement Support</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dedicated placement assistance to help you achieve your dream career.
              </p>
            </div>
          </Reveal>

          {/* Card 4: Certifications */}
          <Reveal delay={0.08} className="w-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 h-full">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-[#020617] text-base leading-tight mb-2">Certifications</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Industry-recognized certifications to boost your skills and career growth.
              </p>
            </div>
          </Reveal>

          {/* Card 5: Student Community */}
          <Reveal delay={0.10} className="w-full">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 h-full">
              <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-[#020617] text-base leading-tight mb-2">Student Community</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Be part of a vibrant learning community that inspires and supports you.
              </p>
            </div>
          </Reveal>
        </div>



      </div>
    </section>
  );
}

/* ---------- courses ---------- */
/* ---------- courses ---------- */
const ALL_COURSES_LIST = [
  { name: "C Programming", desc: "Master fundamentals of programming with C.", dur: "2 Months", level: "Beginner", bullets: ["Basics to Advanced", "Hands-on Labs", "Certificate Included"], icon: "C" },
  { name: "C++", desc: "OOP concepts & problem solving using C++.", dur: "2.5 Months", level: "Beginner", bullets: ["OOP Principles", "Project Based Learning", "Certificate Included"], icon: "C++" },
  { name: "Core Python", desc: "Python essentials & scripting for everyone.", dur: "2 Months", level: "Beginner", bullets: ["Python Basics", "Real-world Examples", "Certificate Included"], icon: "Python" },
  { name: "Core Java", desc: "Build strong programming skills with Core Java.", dur: "3 Months", level: "Intermediate", bullets: ["OOP Concepts", "Exception Handling", "Certificate Included"], icon: "Java" },
  { name: "JavaScript", desc: "Learn JavaScript for interactive web development.", dur: "2 Months", level: "Beginner", bullets: ["ES6+ Features", "DOM Manipulation", "Certificate Included"], icon: "JS" },
];

const COURSE_GROUPS: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  courses: { name: string; desc: string; dur: string; level: string; bullets?: string[] }[] 
}[] = [
  {
    title: "Programming Languages", icon: Terminal, courses: [
      { name: "C Programming", desc: "Master fundamentals of programming with C.", dur: "2 Months", level: "Beginner", bullets: ["Basics to Advanced", "Hands-on Labs", "Certificate Included"] },
      { name: "C++", desc: "OOP concepts & problem solving using C++.", dur: "2.5 Months", level: "Beginner", bullets: ["OOP Principles", "Project Based Learning", "Certificate Included"] },
      { name: "Core Python", desc: "Python essentials & scripting for everyone.", dur: "2 Months", level: "Beginner", bullets: ["Python Basics", "Real-world Examples", "Certificate Included"] },
      { name: "Advanced Python", desc: "Frameworks, APIs & automation.", dur: "3 Months", level: "Intermediate", bullets: ["Django & Flask", "Automation Scripts", "Certificate Included"] },
      { name: "Core Java", desc: "OOP with Java from scratch.", dur: "3 Months", level: "Beginner", bullets: ["OOP Concepts", "Exception Handling", "Certificate Included"] },
      { name: "Advanced Java", desc: "JDBC, Servlets, JSP & JPA.", dur: "3 Months", level: "Intermediate", bullets: ["Web Services", "Database Integration", "Certificate Included"] },
    ]
  },
  {
    title: "Full Stack Development", icon: Layers, courses: [
      { name: "Java Full Stack", desc: "Spring Boot + React end-to-end.", dur: "6 Months", level: "Advanced", bullets: ["Spring Boot Framework", "React UI Development", "Full Stack Project"] },
      { name: "Python Full Stack", desc: "Django/Flask + React apps.", dur: "6 Months", level: "Advanced", bullets: ["Django REST Framework", "React Integration", "End-to-End Hosting"] },
      { name: "MERN Stack", desc: "Mongo, Express, React, Node.", dur: "5 Months", level: "Advanced", bullets: ["Node.js & Express APIs", "React SPAs", "MongoDB Databases"] },
    ]
  },
  {
    title: "AI & Data Science", icon: Brain, courses: [
      { name: "Artificial Intelligence", desc: "Foundations of AI & neural nets.", dur: "4 Months", level: "Intermediate", bullets: ["Neural Networks", "Neural NLP", "TensorFlow & PyTorch"] },
      { name: "Machine Learning", desc: "Supervised & unsupervised models.", dur: "3 Months", level: "Intermediate", bullets: ["Regression & Classifiers", "Model Evaluation", "Real-world datasets"] },
      { name: "Generative AI", desc: "LLMs, RAG and Agents.", dur: "2.5 Months", level: "Advanced", bullets: ["LLM Prompting & Tuning", "RAG architectures", "AI Agents & LangChain"] },
      { name: "Data Science", desc: "End-to-end DS pipelines.", dur: "4 Months", level: "Intermediate", bullets: ["Data Wrangling", "Statistical Analysis", "Data Visualization"] },
    ]
  },
  {
    title: "Cyber Security", icon: Shield, courses: [
      { name: "Ethical Hacking", desc: "Offensive security techniques.", dur: "3 Months", level: "Intermediate", bullets: ["Penetration Testing", "Metasploit & Nmap", "CEH curriculum alignment"] },
      { name: "SOC Analyst", desc: "Blue-team monitoring & response.", dur: "2.5 Months", level: "Intermediate", bullets: ["SIEM tools (Splunk)", "Log analysis", "Threat intelligence"] },
      { name: "Network Security", desc: "Firewalls, VPNs, protocols.", dur: "2.5 Months", level: "Intermediate", bullets: ["Firewall Configuration", "Protocol Analysis", "Network Hardening"] },
      { name: "VAPT", desc: "Vulnerability assessment & pentest.", dur: "3 Months", level: "Advanced", bullets: ["Vulnerability Scans", "Exploit development", "Report writing"] },
    ]
  },
  {
    title: "Cloud & DevOps", icon: Cloud, courses: [
      { name: "AWS", desc: "Cloud architect certified path.", dur: "2.5 Months", level: "Intermediate", bullets: ["EC2, S3, RDS & VPC", "IAM Security Policies", "Solution Architect Prep"] },
      { name: "Microsoft Azure", desc: "Azure fundamentals to admin.", dur: "2.5 Months", level: "Intermediate", bullets: ["Azure Portal & CLI", "VMs & App Services", "AZ-104 Exam prep"] },
      { name: "Google Cloud", desc: "GCP core services & deploy.", dur: "2.5 Months", level: "Intermediate", bullets: ["GCP Compute Engine", "BigQuery & Cloud Storage", "GCP cloud console"] },
      { name: "DevOps", desc: "CI/CD, Docker, K8s, Jenkins.", dur: "3 Months", level: "Advanced", bullets: ["Docker Containers", "Kubernetes Orchestration", "CI/CD Pipeline Building"] },
    ]
  },
  {
    title: "Software Testing", icon: TestTube2, courses: [
      { name: "Manual Testing", desc: "SDLC, STLC & test cases.", dur: "1.5 Months", level: "Beginner", bullets: ["Black Box Testing", "Bug Tracking (Jira)", "Test Case Design"] },
      { name: "Selenium Automation", desc: "Automate web with Java/Python.", dur: "2.5 Months", level: "Intermediate", bullets: ["WebDriver API", "TestNG Framework", "Page Object Model"] },
    ]
  },
  {
    title: "Web & Mobile", icon: Smartphone, courses: [
      { name: "Front-End Development", desc: "HTML, CSS, JS, React.", dur: "3 Months", level: "Beginner", bullets: ["Responsive UI design", "JavaScript & ES6", "React components & state"] },
      { name: "Android Development", desc: "Kotlin native apps.", dur: "3 Months", level: "Intermediate", bullets: ["Kotlin language", "Jetpack Compose", "Play Store publishing"] },
      { name: "Flutter Development", desc: "Cross-platform Dart apps.", dur: "3 Months", level: "Intermediate", bullets: ["Dart programming", "Widget trees & state", "iOS/Android single codebase"] },
    ]
  },
  {
    title: "Databases", icon: Database, courses: [
      { name: "SQL", desc: "Queries, joins, window fns.", dur: "1.5 Months", level: "Beginner", bullets: ["Basic DML/DDL queries", "Joins & Subqueries", "Window functions"] },
      { name: "MySQL", desc: "Design & admin.", dur: "1.5 Months", level: "Beginner", bullets: ["Database Schema design", "Triggers & Stored procs", "User Administration"] },
      { name: "PostgreSQL", desc: "Advanced RDBMS features.", dur: "2 Months", level: "Intermediate", bullets: ["JSONB & NoSQL features", "Performance tuning", "PL/pgSQL scripting"] },
      { name: "MongoDB", desc: "NoSQL document DB.", dur: "1.5 Months", level: "Intermediate", bullets: ["Document Store model", "Aggregation framework", "Mongoose ODM integration"] },
    ]
  },
  {
    title: "Accounting & Office", icon: Calculator, courses: [
      { name: "Tally Prime with GST", desc: "Full accounting + GST filing.", dur: "2 Months", level: "Beginner", bullets: ["Voucher entries", "GST & e-Way billing", "Tax filings (GSTR)"] },
      { name: "MS Office", desc: "Word, Excel, PowerPoint mastery.", dur: "1 Month", level: "Beginner", bullets: ["Excel pivot tables/formulas", "Word formatting", "PowerPoint deck design"] },
    ]
  },
  {
    title: "Kids Coding", icon: Baby, courses: [
      { name: "Scratch", desc: "Visual programming for kids.", dur: "1.5 Months", level: "Kids", bullets: ["Block-based logic", "Sprite animations", "Simple game design"] },
      { name: "Block Coding", desc: "Logic through blocks.", dur: "1.5 Months", level: "Kids", bullets: ["Conditionals & Loops", "Computational logic", "App Inventor basic apps"] },
      { name: "Python for Kids", desc: "First real language for kids.", dur: "2 Months", level: "Kids", bullets: ["Turtle graphics", "Python basic syntax", "Text adventure games"] },
      { name: "AI for Kids", desc: "Fun intro to AI concepts.", dur: "1.5 Months", level: "Kids", bullets: ["Image classifiers", "Speech recognition games", "Ethics of AI"] },
      { name: "Robotics", desc: "Hands-on robots & sensors.", dur: "2.5 Months", level: "Kids", bullets: ["Arduino/Micro:bit basics", "Sensor integration", "Robot path traversal"] },
    ]
  },
];

const getCourseBullets = (course: any) => {
  if (course.bullets) return course.bullets;
  return ["Basics to Advanced", "Real-world Projects", "Certificate Included"];
};

const getCourseIcon = (courseName: string, categoryIcon: any) => {
  const name = courseName.toLowerCase();
  
  // Clean transparent container for all logos to render natively inside the card's glass badge
  const wrapperClass = "w-10 h-10 flex items-center justify-center flex-shrink-0 overflow-hidden";
  const svgClass = "w-8 h-8 flex-shrink-0";
  
  if (name === "c programming") {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#A8B9CC" d="M117.5 33.5L68.5 4.9c-2.8-1.6-6.2-1.6-9 0L10.5 33.5c-2.8 1.6-4.5 4.6-4.5 7.8v57.3c0 3.2 1.7 6.2 4.5 7.8l49 28.6c2.8 1.6 6.2 1.6 9 0l49-28.6c2.8-1.6 4.5-4.6 4.5-7.8V41.3c0-3.2-1.7-6.2-4.5-7.8z" />
          <path fill="#00599C" d="M112.5 36.4L68.5 10.7c-2.8-1.6-6.2-1.6-9 0L15.5 36.4c-2.8 1.6-4.5 4.6-4.5 7.8v51.6c0 3.2 1.7 6.2 4.5 7.8l44 25.7c2.8 1.6 6.2 1.6 9 0l44-25.7c2.8-1.6 4.5-4.6 4.5-7.8V44.2c0-3.2-1.7-6.2-4.5-7.8z" />
          <path fill="#FFFFFF" d="M85.4 82.9c-6.1 7.2-15 11.2-25.4 11.2-18.7 0-32.9-14-32.9-32.9S41.3 28.3 60 28.3c10.4 0 19.3 4 25.4 11.2l12.7-12.7C88.6 15.6 75.3 10 60 10 29.8 10 7.8 33.5 7.8 63.8s22 53.8 52.2 53.8c15.3 0 28.6-5.6 38.1-16.8L85.4 82.9z" />
        </svg>
      </div>
    );
  }
  
  if (name === "c++") {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#A8B9CC" d="M117.5 33.5L68.5 4.9c-2.8-1.6-6.2-1.6-9 0L10.5 33.5c-2.8 1.6-4.5 4.6-4.5 7.8v57.3c0 3.2 1.7 6.2 4.5 7.8l49 28.6c2.8 1.6 6.2 1.6 9 0l49-28.6c2.8-1.6 4.5-4.6 4.5-7.8V41.3c0-3.2-1.7-6.2-4.5-7.8z" />
          <path fill="#00599C" d="M112.5 36.4L68.5 10.7c-2.8-1.6-6.2-1.6-9 0L15.5 36.4c-2.8 1.6-4.5 4.6-4.5 7.8v51.6c0 3.2 1.7 6.2 4.5 7.8l44 25.7c2.8 1.6 6.2 1.6 9 0l44-25.7c2.8-1.6 4.5-4.6 4.5-7.8V44.2c0-3.2-1.7-6.2-4.5-7.8z" />
          <path fill="#FFFFFF" d="M78 80.5c-5.1 6.2-13 10.2-22.4 10.2-16.7 0-29.9-12-29.9-28.9s13.2-28.9 29.9-28.9c9.4 0 17.3 4 22.4 10.2l11.7-11.7C77.2 15.6 66.9 10 55.6 10 28.4 10 7.4 31.5 7.4 61.8s21 51.8 48.2 51.8c11.3 0 21.6-5.6 29.1-15.8L78 80.5z" />
          <path fill="#00599C" d="M96 50h-6v-6h-4v6h-6v4h6v6h4v-6h6v-4zm20 0h-6v-6h-4v6h-6v4h6v6h4v-6h6v-4z" />
        </svg>
      </div>
    );
  }
  
  if (name.includes("python")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#3776AB" d="M64 5.92c-32.06 0-30.04 13.91-30.04 13.91l.01 14.36h30.41v4.28H15.02s-14.28-1.63-14.28 30.04c0 31.67 12.63 30.41 12.63 30.41l11.29-.01v-15.9c0-19.16 15.54-18.73 15.54-18.73h26.47c19.16 0 18.73-15.54 18.73-15.54V18.73c0-19.16-17.65-12.81-17.65-12.81S80 5.92 64 5.92zm-12.81 7.21c2.37 0 4.29 1.91 4.29 4.28 0 2.37-1.92 4.29-4.29 4.29-2.37 0-4.28-1.92-4.28-4.29 0-2.37 1.91-4.28 4.28-4.28z" />
          <path fill="#FFE873" d="M64 122.08c32.06 0 30.04-13.91 30.04-13.91l-.01-14.36H63.62v-4.28h49.36s14.28 1.63 14.28-30.04c0-31.67-12.63-30.41-12.63-30.41l-11.29.01v15.9c0 19.16-15.54 18.73-15.54 18.73H71.27c-19.16 0-18.73 15.54-18.73 15.54v26.47c0 19.16 17.65 12.81 17.65 12.81s13.78.01 29.81.01zm12.81-7.21c-2.37 0-4.29-1.91-4.29-4.28 0-2.37 1.92-4.29 4.29-4.29 2.37 0 4.28 1.92 4.28 4.29 0 2.37-1.91 4.28-4.28 4.28z" />
        </svg>
      </div>
    );
  }
  
  if (name.includes("java") && !name.includes("javascript")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#EA2D42" d="M85.7 94.3c-2.3 5.3-7.7 9.8-15.5 12.8-12 4.7-27.9 5.3-39.7 1.5-6.3-2-10.4-5.2-11.4-8.8-.7-2.6.2-5.3 2.4-7.8l2.2-2.3 2.2 2.3c2 2 5 3.8 8.6 5.1 9.9 3.6 24 3.7 34.3.4 9.1-3 14.8-7.8 14.8-12.7 0-.7-.1-1.4-.3-2.1L81.2 80c2.8 1.9 4.3 4.2 4.5 6.6.3 2.9-.6 5.7-2.3 7.7z" />
          <path fill="#305D7C" d="M98.9 76.5c-4.4 7.6-14 13.3-25.7 15.3-7.5 1.3-15.3.8-22.3-1.4-10.6-3.4-17.1-9.9-17-17 .1-8.1 7.2-15.6 18.5-19.7 6.4-2.3 13.5-3.3 20.3-2.7 10.9 1 19.3 5.3 23.3 11.9 2.5 4.2 3.6 8.9 2.9 13.6zm-17.4-4.8c1-1.6 1.5-3.4 1.4-5.3 0-6.1-5.1-11-11.3-11s-11.3 4.9-11.3 11 5.1 11 11.3 11c3.8-.1 7.3-2.2 9.9-5.7z" />
          <path fill="#EA2D42" d="M68.5 2.1C65.3 10.4 72.8 17.5 70 25.8c-2.3 6.8-8.8 10.8-7.5 18.9 1.4 9 11.3 13 8.3 22.4-.7 2.3-2.2 4.3-3.8 5.8 4.5-1.7 8.3-5.1 9.7-10.3 2.1-8.1-4.5-13.5-1.6-21.8 2.6-7.4 9.1-10.8 7.9-19.1-1.2-8.3-9.7-12.7-7.3-21.7C67.2 7.3 68.6 4.3 69.8 2.1c-1.3 0-1.3 0 0 0z" />
        </svg>
      </div>
    );
  }
  
  if (name.includes("javascript") || name.includes("front-end")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#F7DF1E" d="M1.4 1.4h125.2v125.2H1.4V1.4z" />
          <path fill="#000000" d="M118.2 100.7c-2.3-4-5.2-7.3-9.8-9.8-3.7-2-8.3-3.1-15.8-3.1-4 0-7.8.6-10.4 1.4-2.8 1.1-5.1 2.8-6.3 5.4-2 3.4-2 8.3-.3 11.8 1.4 2.8 3.7 4.8 6.9 6 3.7 1.4 9.8 2.8 17.3 4 10.4 1.7 17.3 3.7 21.6 6.6 4.8 3.1 8 7.5 9.2 13 1.1 4.3.9 9.8-.9 14.7-2.3 6.3-6.6 11.3-12.7 14.1-6 2.8-14.7 4-25.1 4-11.8 0-21-2.3-27.7-6.9-6.3-4.3-9.5-10.4-10.1-20.5h18.7c.6 5.4 2.6 9.2 6 11.5 4.3 2.8 11.2 4 19.9 4 7.2 0 12.7-.9 15.8-2.6 3.4-1.7 5.1-4.3 5.1-8.3 0-3.4-1.4-6-4.6-7.8-2.6-1.7-7.2-2.8-14.1-4-10.9-1.7-18.7-3.4-23.3-6.3-5.4-3.1-8.9-7.8-10.1-13.8-1.1-4.8-.6-10.4 1.7-15.3 2.8-6 7.5-10.4 13.8-12.7 6.3-2.3 14.7-3.4 24.5-3.4 10.9 0 19.3 2 25.1 5.7 5.4 3.4 8.6 8.3 9.8 15.8H118.2zm-67.4-48.4v68.3c0 8-.6 13.8-2 17.6-1.7 4.6-5.1 8.3-9.8 10.4-4.8 2.3-11.8 3.1-21.3 3.1-6.6 0-12.1-.6-16.1-1.7-4-1.1-7.2-2.8-9.8-5.1-2-1.7-3.7-4-4.6-6.9-.9-2.8-.9-7.2-.9-12.7h18.7c0 4 .9 6.6 2.3 8 2.3 2 6 2.8 11.2 2.8 5.7 0 9.5-1.1 11.2-3.1 1.7-2 2.3-6 2.3-12.4V52.3h19.1z" />
        </svg>
      </div>
    );
  }

  if (name.includes("mern stack") || name.includes("flutter") || name.includes("react") || name.includes("android")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#61DAFB" d="M117.7 54c-1.5-6.8-5.3-12.7-10.7-17-4.2-3.3-9-5.7-14.2-7l-1.3-.3c-3-.6-6.2-.9-9.5-1-12.6-.2-24 3.7-33 11-4.7 3.8-8.8 8.4-12.1 13.5-3.3 5.1-5.7 10.7-7 16.7-1.5 6.8-1 13.5 1.5 19.5 3.3 8.1 9.3 14.5 17 18.2 5.1 2.5 10.7 3.9 16.7 4.2h1.6c3.2.1 6.5 0 9.8-.3 11.2-1 21.6-5.6 29.8-13 4.7-4.2 8.5-9.3 11.3-15 2.8-5.7 4.2-11.9 4.2-18.4v-1.1zm-84.5-18c2-2.5 4.3-4.7 7-6.6 6.3-4.5 13.6-7.2 21.2-8 3-.3 6-.4 9.1-.3l1.8.1c8.4.5 16.2 3.1 23 7.5 5.7 3.7 10.4 8.7 13.8 14.5.8 1.4 1.5 2.9 2 4.4-1.7 5.7-5.1 10.7-9.8 14.5-6.8 5.4-15 8.9-23.8 10.4-3.5.6-7.1.9-10.7.9-9.1 0-17.9-2-25.9-5.9-6-2.9-11.2-7.1-15-12.3-1.6-2.2-2.8-4.7-3.6-7.3.7-2.7 1.8-5.2 3.3-7.5l1.6-2.2z" />
          <circle cx="64" cy="64" r="7" fill="#61DAFB" />
        </svg>
      </div>
    );
  }

  if (name.includes("aws") || (name.includes("cloud") && !name.includes("azure") && !name.includes("gcp") && !name.includes("google"))) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 256 256" className={svgClass}>
          <path fill="#232F3E" d="M110.2 163.6c-4.4 7-11 11.2-19.8 12.8-12 2.2-24.2-2.2-30.8-11-4.4-6-6.6-13-6.6-21v-30c0-15.4 8.8-26.4 22-29.7 13.2-3.3 26.4 1 33 11 6.6 9.9 8.8 23 8.8 38.5v30c0 4.4-.8 7.7-2.2 9.9-1.4 2.2-2.6 4.4-4.4 6.6zm-17.6-43c0-12-.5-19.8-3.3-24.2-2.8-4.4-7.7-6.6-13.2-6.6-5.5 0-9.9 2.2-12.7 6.6-2.8 4.4-3.3 12.1-3.3 24.2v22c0 12.1.5 19.8 3.3 24.2 2.8 4.4 7.2 6.6 12.7 6.6 5.5 0 10.4-2.2 13.2-6.6 2.8-4.4 3.3-12.1 3.3-24.2v-22z" />
          <path fill="#FF9900" d="M30 185c40 32 105 45 156 36 28-5 54-15 70-26 5-3 5-7 1-10s-7-2-11 1c-15 10-38 18-62 23-45 8-105-2-141-28-5-4-10-3-13 1s-2 9 0 13z" />
          <path fill="#FF9900" d="M246 171c-3-11-15-28-21-33-3-3-7-1-6 3 2 12 5 32-2 42-2 3-1 6 3 5 11-4 28-11 31-15 3-1 0-7-5-12z" />
        </svg>
      </div>
    );
  }

  if (name.includes("azure")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 24 24" className={svgClass} style={{ fill: "#0078D4" }}>
          <path d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684" />
        </svg>
      </div>
    );
  }

  if (name.includes("gcp") || name.includes("google")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 24 24" className={svgClass} style={{ fill: "#4285F4" }}>
          <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" />
        </svg>
      </div>
    );
  }

  if (name.includes("devops")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 24 24" className={svgClass} stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12c0-3.31-2.69-6-6-6-2.44 0-4.5 1.5-5.5 3.5-1-2-3.06-3.5-5.5-3.5-3.31 0-6 2.69-6 6s2.69 6 6 6c2.44 0 4.5-1.5 5.5-3.5 1 2 3.06 3.5 5.5 3.5 3.31 0 6-2.69 6-6z" />
        </svg>
      </div>
    );
  }

  if (name.includes("sql") || name.includes("database") || name.includes("postgresql") || name.includes("mysql") || name.includes("mongodb")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 24 24" className={svgClass} stroke="#3B82F6" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      </div>
    );
  }

  if (name.includes("office") || name.includes("excel") || name.includes("tally")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 128 128" className={svgClass}>
          <path fill="#107C41" d="M74 16h38c3.3 0 6 2.7 6 6v84c0 3.3-2.7 6-6 6H74V16z" />
          <path fill="#1F9A55" d="M16 32h58v64H16c-3.3 0-6-2.7-6-6V38c0-3.3 2.7-6 6-6z" />
          <path fill="#FFF" d="M32 48h26v6H32v-6zm0 14h26v6H32v-6zm0 14h26v6H32v-6z" />
          <path fill="#107C41" opacity=".1" d="M74 32h38v14H74V32zm0 24h38v14H74V56zm0 24h38v14H74V80z" />
          <path fill="#107C41" opacity=".2" d="M74 46h38v10H74V46zm0 24h38v10H74V70zm0 24h38v10H74V94z" />
        </svg>
      </div>
    );
  }

  if (name.includes("scratch") || name.includes("block coding") || name.includes("kids") || name.includes("robotics")) {
    return (
      <div className={wrapperClass}>
        <svg viewBox="0 0 24 24" className={svgClass} stroke="#8B5CF6" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 11h-4V7a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="15" r="2" />
        </svg>
      </div>
    );
  }
  
  const CatIcon = categoryIcon;
  return (
    <div className={wrapperClass}>
      <CatIcon className="w-12 h-12 transition-all duration-500 group-hover:w-8 group-hover:h-8 text-slate-700 flex-shrink-0" />
    </div>
  );
};const getCourseBg = (courseName: string, categoryName: string) => {
  const name = courseName.toLowerCase();
  const cat = categoryName.toLowerCase();
  if (name === "c programming") return "bg-slate-50/60 border-slate-200/60";
  if (name === "c++") return "bg-blue-50/40 border-blue-200/30";
  if (name.includes("python")) return "bg-sky-50/30 border-sky-200/30";
  if (name.includes("java") && !name.includes("javascript")) return "bg-orange-50/30 border-orange-200/30";
  if (name.includes("javascript") || name.includes("front-end")) return "bg-yellow-50/40 border-yellow-200/30";
  if (cat.includes("full stack")) return "bg-indigo-50/30 border-indigo-200/30";
  if (cat.includes("ai & data")) return "bg-violet-50/30 border-violet-200/30";
  if (cat.includes("cyber")) return "bg-rose-50/30 border-rose-200/30";
  if (cat.includes("cloud")) return "bg-cyan-50/30 border-cyan-200/30";
  if (cat.includes("testing")) return "bg-emerald-50/30 border-emerald-200/30";
  return "bg-slate-50/40 border-slate-200/30";
};

const getLevelBadge = (level: string) => {
  const lvl = level.toLowerCase();
  if (lvl === "beginner") {
    return <span className="bg-[#f0fdf4] text-[#16a34a] border border-[#dcfce7] rounded-full px-2.5 py-1 text-xs font-semibold">Beginner</span>;
  }
  if (lvl === "intermediate") {
    return <span className="bg-[#fff7ed] text-[#ea580c] border border-[#ffedd5] rounded-full px-2.5 py-1 text-xs font-semibold">Intermediate</span>;
  }
  if (lvl === "advanced") {
    return <span className="bg-[#fef2f2] text-[#dc2626] border border-[#fee2e2] rounded-full px-2.5 py-1 text-xs font-semibold">Advanced</span>;
  }
  return <span className="bg-[#faf5ff] text-[#9333ea] border border-[#f3e8ff] rounded-full px-2.5 py-1 text-xs font-semibold">{level}</span>;
};

function Courses() {
  const [active, setActive] = useState(-1); // -1 is All Courses

  const activeGroup = active === -1 ? { title: "All Courses", icon: Code2, courses: ALL_COURSES_LIST } : COURSE_GROUPS[active];

  return (
    <section id="courses" className="py-10 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Grid Header section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left: Heading and Key Features */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#D97706]">
                <span>Our Programs</span>
                <div className="w-12 h-[1px] bg-[#D97706]" />
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#020617] leading-tight">
                Professional <span className="text-[#D97706]">Courses</span>
              </h2>
              <p className="mt-4 text-base text-slate-500 max-w-xl font-medium leading-relaxed">
                From beginner to advanced — 40+ industry-aligned programs across 10 verticals to launch your dream career.
              </p>
            </Reveal>

            {/* Key features checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <Reveal delay={0.02}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Industry-Aligned</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                      Curriculum designed by industry experts
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <MonitorPlay className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Hands-on Learning</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                      Real-world projects & practical training
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Placement Support</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                      Dedicated assistance till you get placed
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: Curved Image with Overlapping Badge */}
          <div className="lg:col-span-5 relative">
            <Reveal className="relative">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-gold/15 to-navy/5 blur-2xl pointer-events-none" />
              
              {/* Curved container for the image */}
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 w-full h-[280px] lg:h-[320px]">
                <img 
                  src={aboutImg} 
                  alt="YUGA Tech Academy students learning" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Float badges on top of image */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 z-10"><Code2 className="w-4 h-4" /></div>
                <div className="absolute top-8 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 z-10"><TrendingUp className="w-4 h-4" /></div>
                <div className="absolute bottom-16 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 z-10"><Database className="w-4 h-4" /></div>
              </div>

              {/* Overlapping Info Card */}
              <div className="absolute -bottom-4 -left-4 bg-[#020617] rounded-2xl p-4 shadow-xl border border-slate-800 flex items-center gap-3 z-10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#EAB308]">
                  <Star className="w-5 h-5 fill-[#EAB308] text-[#EAB308]" />
                </div>
                <div>
                  <div className="font-display font-black text-white text-base leading-none">40+</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">Courses Across</div>
                  <div className="text-[9px] text-slate-500 font-medium">10+ Verticals</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Part 2: Interactive Tabs Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 mb-12 max-w-5xl mx-auto">
          {/* All Courses Tab */}
          <button 
            onClick={() => setActive(-1)}
            style={active === -1 ? { background: "var(--gradient-navy)" } : undefined}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              active === -1 
                ? "text-white border border-[#EAB308]/60 shadow-lg font-bold" 
                : "bg-white border border-slate-200 text-navy-deep hover:border-[#EAB308]"
            }`}
          >
            <Code2 className="w-4 h-4" /> All Courses
          </button>

          {/* Individual Category Tabs */}
          {COURSE_GROUPS.map((g, i) => (
            <button 
              key={g.title} 
              onClick={() => setActive(i)}
              style={active === i ? { background: "var(--gradient-navy)" } : undefined}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                active === i 
                  ? "text-white border border-[#EAB308]/60 shadow-lg font-bold" 
                  : "bg-white border border-slate-200 text-navy-deep hover:border-[#EAB308]"
              }`}
            >
              <g.icon className="w-4 h-4" /> {g.title}
            </button>
          ))}
        </div>

        {/* Part 3: Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeGroup.courses.map((c, i) => {
            const courseBg = getCourseBg(c.name, activeGroup.title);
            const courseIcon = getCourseIcon(c.name, activeGroup.icon);
            const courseBullets = getCourseBullets(c);

            return (
              <Reveal key={c.name} delay={i * 0.03}>
                <div className={`course-card-uiverse group ${courseBg}`}>
                  {/* Top: Level Badge */}
                  <div className="absolute right-4 top-4 z-10 transition-all duration-300 group-hover:scale-105">
                    {getLevelBadge(c.level)}
                  </div>

                  {/* Profile Pic: Course Icon */}
                  <div className="profile-pic">
                    {courseIcon}
                  </div>

                  {/* Sliding Panel: Bottom */}
                  <div className="bottom">
                    <div className="content">
                      <span className="name">{c.name}</span>
                      <span className="about-me">{c.desc}</span>
                      
                      {/* Bullets List */}
                      <div className="bullets-list space-y-2">
                        {courseBullets.map((bullet: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308] flex-shrink-0" />
                            <span className="truncate">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bottom-bottom">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 font-black">Duration</span>
                        <span className="text-xs font-extrabold text-[#020617] mt-0.5">{c.dur}</span>
                      </div>

                      <a href="#contact" className="button">
                        Enquiry <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}



/* ---------- services ---------- */
const SERVICES = [
  { 
    title: "Classroom Training", 
    icon: GraduationCap, 
    desc: "Immersive in-person sessions at our Visakhapatnam campus with modern infrastructure.",
    bgClass: "bg-blue-50 text-blue-500",
    iconColor: "text-blue-600 font-semibold"
  },
  { 
    title: "Online Live Classes", 
    icon: MonitorPlay, 
    desc: "Interactive live batches with recordings, doubt support & flexible learning.",
    bgClass: "bg-emerald-50 text-emerald-500",
    iconColor: "text-emerald-600 font-semibold"
  },
  { 
    title: "Corporate Training", 
    icon: Building2, 
    desc: "Custom upskilling programs designed for teams and organizations.",
    bgClass: "bg-purple-50 text-purple-500",
    iconColor: "text-purple-600 font-semibold"
  },
  { 
    title: "Internships", 
    icon: Briefcase, 
    desc: "Work on real-time projects and gain hands-on industry experience.",
    bgClass: "bg-amber-50 text-amber-500",
    iconColor: "text-amber-600 font-semibold"
  },
  { 
    title: "Placement Assistance", 
    icon: HeartHandshake, 
    desc: "Resume building, mock interviews, aptitude training & job opportunities.",
    bgClass: "bg-rose-50 text-rose-500",
    iconColor: "text-rose-600 font-semibold"
  },
  { 
    title: "Career Guidance", 
    icon: Target, 
    desc: "One-on-one mentorship to help you choose the right career path.",
    bgClass: "bg-cyan-50 text-cyan-500",
    iconColor: "text-cyan-600 font-semibold"
  },
];

function Services() {
  return (
    <section id="services" className="py-10 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Grid Header section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left: Heading and Key Features */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#D97706]">
                <span>Our Services</span>
                <div className="w-12 h-[1px] bg-[#D97706]" />
              </div>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#020617] leading-tight">
                End-to-End Learning <br />
                Support for <span className="text-[#D97706]">Your Success</span>
              </h2>
              <p className="mt-4 text-base text-slate-500 max-w-xl font-medium leading-relaxed">
                We provide a complete ecosystem to help you learn, grow, and achieve your dream career in IT.
              </p>
            </Reveal>

            {/* Key features checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <Reveal delay={0.02}>
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Expert Trainers</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                      Industry professionals with real-world experience
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Practical Approach</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                      Hands-on training with real-world projects
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex items-start gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Placement Support</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                      Resume building, mock interviews & more
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: Curved Image with Overlapping Badge */}
          <div className="lg:col-span-5 relative">
            <Reveal className="relative">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-gold/15 to-navy/5 blur-2xl pointer-events-none" />
              
              {/* Curved container for the image */}
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 w-full h-[280px] lg:h-[320px]">
                <img 
                  src={aboutImg} 
                  alt="YUGA Tech Academy classroom learning" 
                  className="w-full h-full object-cover" 
                />
                
                {/* Float badges on top of image */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 z-10"><Code2 className="w-4 h-4" /></div>
                <div className="absolute top-8 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 z-10"><TrendingUp className="w-4 h-4" /></div>
                <div className="absolute bottom-16 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md border border-slate-100 flex items-center justify-center text-slate-700 z-10"><Database className="w-4 h-4" /></div>
              </div>

              {/* Overlapping Info Card */}
              <div className="absolute -bottom-4 -left-4 bg-[#020617] rounded-2xl p-4 shadow-xl border border-slate-800 flex items-center gap-3 z-10 max-w-[280px]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#EAB308]">
                  <Rocket className="w-5 h-5 text-[#020617] fill-[#020617]" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-white text-[11px] sm:text-xs">From Learning to Landing Your Dream Job</div>
                  <div className="text-[9px] text-slate-400 font-semibold mt-1">We're with you at every step.</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Part 2: Services cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.03}>
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex items-start gap-4 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 group">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${s.bgClass}`}>
                    <Icon className={`w-7 h-7 ${s.iconColor}`} />
                  </div>
                  <div className="flex-grow text-left">
                    <h4 className="font-display font-bold text-[#020617] text-base leading-tight mb-2">{s.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed pr-6">{s.desc}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center flex-shrink-0 self-center group-hover:border-[#EAB308] group-hover:bg-[#EAB308]/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D97706] transition-colors" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>



      </div>
    </section>
  );
}

/* ---------- learning process ---------- */
const STEPS = [
  { icon: FileText, t: "Enroll" },
  { icon: Users, t: "Learn from Experts" },
  { icon: Terminal, t: "Hands-on Labs" },
  { icon: Rocket, t: "Live Projects" },
  { icon: Briefcase, t: "Internship" },
  { icon: Award, t: "Certification" },
  { icon: HeartHandshake, t: "Placement" },
];
function Process() {
  return (
    <section className="py-10 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Our Method" title="Learning Process" sub="A proven seven-step journey from beginner to placed professional." />
        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i}>
                <div className="text-center">
                  <div className="mx-auto relative flex h-20 w-20 items-center justify-center rounded-2xl bg-card border border-border shadow-md">
                    <s.icon className="w-8 h-8 text-navy-deep" />
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full btn-gold text-xs font-bold">{i + 1}</span>
                  </div>
                  <div className="mt-4 font-display font-semibold text-navy-deep text-sm">{s.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- placement ---------- */
const OFFERS = [
  { 
    title: "Resume Building", 
    icon: FileText, 
    desc: "ATS-friendly resumes that get you noticed.",
    bgClass: "bg-blue-50 text-blue-500",
    iconColor: "text-blue-600 font-semibold"
  },
  { 
    title: "Mock Interviews", 
    icon: MessageCircle, 
    desc: "Realistic interview practice with experts.",
    bgClass: "bg-emerald-50 text-emerald-500",
    iconColor: "text-emerald-600 font-semibold"
  },
  { 
    title: "Technical Prep", 
    icon: Code2, 
    desc: "Coding tests, aptitude & technical training.",
    bgClass: "bg-amber-50 text-amber-500",
    iconColor: "text-amber-600 font-semibold"
  },
  { 
    title: "Soft Skills Training", 
    icon: Users, 
    desc: "Communication, confidence & more.",
    bgClass: "bg-rose-50 text-rose-500",
    iconColor: "text-rose-600 font-semibold"
  },
  { 
    title: "Hiring Assistance", 
    icon: Briefcase, 
    desc: "Get job opportunities from top companies.",
    bgClass: "bg-blue-50 text-blue-500",
    iconColor: "text-blue-600 font-semibold"
  },
  { 
    title: "Interview Scheduling", 
    icon: Calendar, 
    desc: "Hassle-free interview scheduling support.",
    bgClass: "bg-yellow-50 text-yellow-500",
    iconColor: "text-yellow-600 font-semibold"
  },
];

const RECRUITERS = ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Tech Mahindra", "HCL", "Virtusa", "Capgemini", "Deloitte"];

const getRecruiterLogo = (name: string) => {
  const n = name.toLowerCase();
  if (n === "tcs") {
    return (
      <div className="flex items-center gap-1">
        <span className="font-sans font-black text-[#011e41] text-base leading-none">tcs</span>
        <div className="w-[1px] h-3.5 bg-slate-300" />
        <div className="text-[5px] font-bold text-slate-400 leading-none text-left">
          TATA<br />CONSULTANCY<br />SERVICES
        </div>
      </div>
    );
  }
  if (n === "infosys") {
    return (
      <span className="font-sans font-black text-sm text-[#007cc3] italic tracking-tight">
        Infosys
      </span>
    );
  }
  if (n === "wipro") {
    return (
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-green-500 opacity-80" />
        <span className="font-sans font-extrabold text-[10px] text-[#0c2340] leading-none">wipro</span>
      </div>
    );
  }
  if (n === "accenture") {
    return (
      <div className="flex items-center gap-0.5">
        <span className="font-sans font-black text-[#000000] text-xs leading-none">accenture</span>
        <span className="text-[#A100FF] font-black text-xs font-display leading-none">&gt;</span>
      </div>
    );
  }
  if (n === "cognizant") {
    return (
      <span className="font-sans font-black text-sm text-[#002f6c] leading-none">Cognizant</span>
    );
  }
  if (n === "techmahindra") {
    return (
      <div className="flex flex-col items-center">
        <span className="font-sans font-black text-[9px] text-[#e2001a] leading-none">Tech</span>
        <span className="font-sans font-light text-[6px] text-slate-700 tracking-[0.15em] leading-none mt-0.5">Mahindra</span>
      </div>
    );
  }
  if (n === "hcl") {
    return (
      <span className="font-sans font-black text-[#00529b] text-sm tracking-tight leading-none">HCL</span>
    );
  }
  if (n === "virtusa") {
    return (
      <span className="font-sans font-extrabold text-xs leading-none">virtusa</span>
    );
  }
  if (n === "capgemini") {
    return (
      <span className="font-sans font-black text-[#0070ad] text-xs leading-none">Capgemini◆</span>
    );
  }
  if (n === "deloitte") {
    return (
      <span className="font-sans font-black text-[#000000] text-xs leading-none">Deloitte<span className="text-[#86bc25] font-black">.</span></span>
    );
  }
  return null;
};

function Placements() {
  return (
    <section id="placements" className="py-10 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Grid Header section */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left: Heading and Key Features */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#D97706]">
                <Target className="w-4 h-4 text-[#D97706]" />
                <span>Placement Support</span>
                <div className="w-12 h-[1px] bg-[#D97706]" />
              </div>
              <AnimatedTitle title="Your Career, Our Mission" className="!justify-start text-left" />
              <p className="mt-4 text-base text-slate-500 max-w-xl font-medium leading-relaxed">
                We provide complete placement assistance to help you build a successful career with top companies.
              </p>
            </Reveal>

            {/* Key features checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <Reveal delay={0.02}>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-base leading-none">100+</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-semibold">
                      Hiring Partners
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-base leading-none">5,000+</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-semibold">
                      Students Placed
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-slate-900 text-base leading-none">95%</h4>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 font-semibold">
                      Placement Support
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Our Placement Process Button */}
            <Reveal delay={0.08} className="mt-8">
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-xs transition-all duration-300 shadow-md hover:shadow-lg hover:brightness-110"
                style={{ background: "var(--gradient-navy)" }}
              >
                Our Placement Process <ArrowRight className="w-4 h-4" />
              </a>
            </Reveal>
          </div>

          {/* Right: Curved Image with Overlapping Badge */}
          <div className="lg:col-span-5 relative">
            <Reveal className="relative">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-gold/15 to-navy/5 blur-2xl pointer-events-none" />
              
              {/* Curved container for the image */}
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 w-full h-[280px] lg:h-[320px]">
                <img 
                  src={aboutImg} 
                  alt="Recruiters interviewing student at YUGA Tech Academy" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Overlapping Step-by-Step Info Card */}
              <div className="absolute -bottom-4 -left-4 right-4 bg-[#020617]/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-800 flex items-center justify-between z-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-deep">
                    <Award className="w-4 h-4 text-[#020617]" />
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EAB308] text-white text-[8px] font-black">1</span>
                  </div>
                  <span className="text-[9px] text-white font-bold mt-1.5 leading-none">Skill Assessment</span>
                </div>
                
                <span className="text-slate-600 font-bold text-xs">&rarr;</span>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-deep">
                    <FileText className="w-4 h-4 text-[#020617]" />
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EAB308] text-white text-[8px] font-black">2</span>
                  </div>
                  <span className="text-[9px] text-white font-bold mt-1.5 leading-none">Resume Building</span>
                </div>

                <span className="text-slate-600 font-bold text-xs">&rarr;</span>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-deep">
                    <Users className="w-4 h-4 text-[#020617]" />
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EAB308] text-white text-[8px] font-black">3</span>
                  </div>
                  <span className="text-[9px] text-white font-bold mt-1.5 leading-none">Mock Interviews</span>
                </div>

                <span className="text-slate-600 font-bold text-xs">&rarr;</span>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy-deep">
                    <Briefcase className="w-4 h-4 text-[#020617]" />
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#EAB308] text-white text-[8px] font-black">4</span>
                  </div>
                  <span className="text-[9px] text-white font-bold mt-1.5 leading-none">Job Placements</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Part 2: What We Offer */}
        <div className="flex items-center justify-center gap-4 mt-10 mb-10">
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
          <h3 className="font-display text-sm font-black tracking-[0.2em] text-[#020617] uppercase">What We Offer</h3>
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {OFFERS.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal key={o.title} delay={i * 0.02}>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1 h-full">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${o.bgClass}`}>
                    <Icon className={`w-6 h-6 ${o.iconColor}`} />
                  </div>
                  <h4 className="font-display font-bold text-[#020617] text-sm leading-tight mb-2">{o.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{o.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Part 3: Our Top Recruiters */}
        <div className="flex items-center justify-center gap-4 mt-10 mb-10">
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
          <h3 className="font-display text-sm font-black tracking-[0.2em] text-[#020617] uppercase text-center">Our Top Recruiters</h3>
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-6 items-center justify-items-center mt-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
          {RECRUITERS.map((r) => (
            <div key={r} className="flex items-center justify-center h-10">
              {getRecruiterLogo(r)}
            </div>
          ))}
        </div>

        {/* Part 4: Bottom Promo Banner */}
        <Reveal className="mt-8">
          <div className="bg-[#020617] border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-left">
            <div className="absolute inset-y-0 right-0 w-[40%] bg-[radial-gradient(circle_at_right,rgba(234,179,8,0.05),transparent_60%)] pointer-events-none" />
            
            {/* Left: Icon and Text */}
            <div className="flex items-center gap-5 z-10">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAB308]/15 text-[#EAB308]">
                <Rocket className="w-6 h-6 text-[#EAB308] fill-[#EAB308]/10 animate-pulse" />
              </div>
              <div>
                <h4 className="font-display font-black text-white text-base sm:text-lg">Ready to Start Your Journey?</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium leading-relaxed">
                  Join YUGA Tech Academy and get placed in your dream company.
                </p>
              </div>
            </div>

            {/* Right: Gold Enroll Button */}
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white border border-[#EAB308]/60 font-bold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px] z-10 flex-shrink-0 hover:brightness-110"
              style={{ background: "var(--gradient-navy)" }}
            >
              Get Placed Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
const REVIEWS = [
  { 
    name: "Sneha Reddy", 
    course: "MERN Stack Developer", 
    quote: "The training and guidance I received at YUGA Tech Academy helped me build strong skills and land my dream job. Thank you for everything!", 
    avatar: "https://i.pravatar.cc/120?img=32",
    company: "TCS"
  },
  { 
    name: "Arjun Patnaik", 
    course: "Python Developer", 
    quote: "The hands-on projects and real-time approach boosted my confidence. The placement team is excellent and very supportive.", 
    avatar: "https://i.pravatar.cc/120?img=12",
    company: "Infosys"
  },
  { 
    name: "Pooja Sharma", 
    course: "Data Analyst", 
    quote: "YUGA Tech Academy provides the perfect blend of technical knowledge and soft skills training. Highly recommended!", 
    avatar: "https://i.pravatar.cc/120?img=47",
    company: "Wipro"
  },
  { 
    name: "Sai Kiran", 
    course: "Java Developer", 
    quote: "From zero coding knowledge to getting placed in a top MNC - my journey wouldn't have been possible without YUGA.", 
    avatar: "https://i.pravatar.cc/120?img=15",
    company: "Accenture"
  },
  { 
    name: "Meghana Das", 
    course: "QA Engineer", 
    quote: "The trainers are experienced and always ready to help. YUGA Tech Academy is the best place to start your tech career.", 
    avatar: "https://i.pravatar.cc/120?img=45",
    company: "HCL"
  },
];

const getCompanyLogo = (company: string) => {
  const c = company.toLowerCase();
  if (c === "tcs") {
    return (
      <div className="mt-5 flex items-center justify-center gap-1.5 h-6">
        <span className="font-sans font-black text-xl text-[#011e41]">tcs</span>
        <div className="w-[1.5px] h-4 bg-slate-300" />
        <div className="text-[6px] font-bold text-slate-400 leading-tight text-left">
          TATA<br />CONSULTANCY<br />SERVICES
        </div>
      </div>
    );
  }
  if (c === "infosys") {
    return (
      <div className="mt-5 flex items-center justify-center h-6 font-sans font-black text-lg text-[#007cc3] italic tracking-tight">
        Infosys
      </div>
    );
  }
  if (c === "wipro") {
    return (
      <div className="mt-5 flex items-center justify-center gap-1 h-6">
        <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-green-500 opacity-80" />
        <span className="font-sans font-extrabold text-sm text-[#0c2340]">wipro</span>
      </div>
    );
  }
  if (c === "accenture") {
    return (
      <div className="mt-5 flex items-center justify-center gap-0.5 h-6">
        <span className="font-sans font-black text-[#000000] text-sm leading-none">accenture</span>
        <span className="text-[#A100FF] font-black text-sm font-display leading-none">&gt;</span>
      </div>
    );
  }
  if (c === "hcl") {
    return (
      <div className="mt-5 flex items-center justify-center h-6 font-sans font-black text-[#00529b] text-base tracking-tight">
        HCL
      </div>
    );
  }
  return <div className="mt-5 h-6" />;
};

function Testimonials() {
  const [index, setIndex] = useState(0);
  const maxIndex = REVIEWS.length - 3; // On desktop we show 3 cards at once

  const next = () => setIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  const prev = () => setIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));

  return (
    <section id="testimonials" className="py-10 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background dot shade */}
      <div className="absolute left-8 top-1/4 w-28 h-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none hidden lg:block" />
      <div className="absolute right-8 top-1/4 w-28 h-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none hidden lg:block" />

      {/* Large decorative quotes */}
      <div className="absolute top-20 left-16 text-[#FAF9F6] font-display font-black text-[220px] leading-none select-none pointer-events-none hidden lg:block">“</div>
      <div className="absolute top-20 right-16 text-[#FAF9F6] font-display font-black text-[220px] leading-none select-none pointer-events-none hidden lg:block">”</div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header capsule and titles */}
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-[#D97706] uppercase tracking-widest mb-4">
          Student Voices
        </div>
        <AnimatedTitle title="What Our Students Say" />
        <div className="text-[#EAB308] font-display font-black text-5xl leading-none mt-2">“</div>
        <p className="mt-2 text-slate-500 font-medium text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Real stories from real students who transformed their careers with YUGA Tech Academy.
        </p>

        {/* Carousel deck viewport */}
        <div className="relative mt-6 max-w-5xl mx-auto px-0 sm:px-10">
          
          {/* Desktop view (animated slider) */}
          <div className="hidden lg:block overflow-hidden py-4 px-2">
            <motion.div 
              className="flex gap-6"
              animate={{ x: `-${index * 324}px` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {REVIEWS.map((r, i) => (
                <div 
                  key={i} 
                  className="w-[300px] flex-shrink-0 bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.05)] hover:-translate-y-1"
                >
                  <div>
                    {/* Stars and quote tag */}
                    <div className="flex justify-between items-center w-full">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <Star key={k} className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                        ))}
                      </div>
                      <span className="text-slate-200 font-display font-black text-3xl leading-none">”</span>
                    </div>

                    {/* Review text */}
                    <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium min-h-[90px]">
                      {r.quote}
                    </p>
                  </div>

                  {/* Student details footer */}
                  <div>
                    <div className="w-10 h-0.5 bg-[#EAB308]/60 my-4" />
                    <div className="flex items-center gap-3">
                      <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-[#EAB308]/40" />
                      <div>
                        <h4 className="font-display font-black text-sm text-[#020617]">{r.name}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{r.course}</p>
                      </div>
                    </div>

                    {/* Brand logo */}
                    {getCompanyLogo(r.company)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile view (native scroll with snap) */}
          <div className="flex lg:hidden overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 py-4 px-4 w-full">
            {REVIEWS.map((r, i) => (
              <div 
                key={i} 
                className="w-[280px] sm:w-[300px] flex-shrink-0 snap-center bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)] flex flex-col justify-between text-left transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="w-3.5 h-3.5 fill-[#EAB308] text-[#EAB308]" />
                      ))}
                    </div>
                    <span className="text-slate-200 font-display font-black text-3xl leading-none">”</span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium min-h-[90px]">
                    {r.quote}
                  </p>
                </div>

                <div>
                  <div className="w-10 h-0.5 bg-[#EAB308]/60 my-4" />
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-[#EAB308]/40" />
                    <div>
                      <h4 className="font-display font-black text-sm text-[#020617]">{r.name}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{r.course}</p>
                    </div>
                  </div>

                  {getCompanyLogo(r.company)}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls (Desktop only) */}
          <button 
            onClick={prev} 
            className="hidden lg:flex absolute left-0 top-[42%] -translate-y-1/2 p-2.5 rounded-full bg-[#020617] text-white hover:bg-slate-800 transition shadow-lg z-10"
            aria-label="Previous reviews"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={next} 
            className="hidden lg:flex absolute right-0 top-[42%] -translate-y-1/2 p-2.5 rounded-full bg-[#020617] text-white hover:bg-slate-800 transition shadow-lg z-10"
            aria-label="Next reviews"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Part 2: Community Card Badge */}
        <Reveal delay={0.08} className="max-w-4xl mx-auto mt-6 px-4">
          <div className="bg-amber-50/50 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 border border-amber-100 text-left">
            {/* Left part */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#020617] text-white">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-[#020617] text-sm sm:text-base">Trusted by Thousands</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  Join our growing community of successful learners and achievers.
                </p>
              </div>
            </div>

            {/* Middle part: Overlapping avatars */}
            <div className="flex -space-x-3 overflow-hidden">
              {[32, 12, 47, 15, 45, 22].map((imgId, idx) => (
                <img 
                  key={idx}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src={`https://i.pravatar.cc/100?img=${imgId}`}
                  alt="Student avatar"
                />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#020617] text-white text-[10px] font-bold ring-2 ring-white">5K+</div>
            </div>

            {/* Right part */}
            <div className="leading-tight md:pr-4 text-left">
              <div className="font-display font-black text-[#020617] text-sm sm:text-base">5,000+ Students</div>
              <div className="text-xs text-slate-500 mt-1 font-semibold">Have transformed their careers with us.</div>
            </div>
          </div>
        </Reveal>

        {/* Part 3: Bottom statistics bar */}
        <Reveal delay={0.12}>
          <div className="mt-10 bg-[#020617] border border-slate-800 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y divide-slate-800 md:divide-y-0 md:divide-x divide-slate-800">
            {/* Stat 1: 5,000+ Students */}
            <div className="flex items-center justify-center gap-4 py-2 md:py-0 md:px-4">
              <Users className="w-8 h-8 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <div className="font-display text-2xl font-black text-white leading-none">
                  <Counter to={5000} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1">Students Trained</div>
                <div className="text-[10px] text-slate-500 font-medium">Successfully</div>
              </div>
            </div>

            {/* Stat 2: 100+ Hiring Partners */}
            <div className="flex items-center justify-center gap-4 py-2 md:py-0 md:px-4 pl-0 md:pl-6">
              <Briefcase className="w-8 h-8 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <div className="font-display text-2xl font-black text-white leading-none">
                  <Counter to={100} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1">Hiring Partners</div>
                <div className="text-[10px] text-slate-500 font-medium">Worldwide</div>
              </div>
            </div>

            {/* Stat 3: 95% Placement Rate */}
            <div className="flex items-center justify-center gap-4 py-2 md:py-0 md:px-4 pl-0 md:pl-6">
              <TrendingUp className="w-8 h-8 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <div className="font-display text-2xl font-black text-white leading-none">
                  <Counter to={95} suffix="%" />
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1">Placement Rate</div>
                <div className="text-[10px] text-slate-500 font-medium">Every Year</div>
              </div>
            </div>

            {/* Stat 4: 7+ Years of Excellence */}
            <div className="flex items-center justify-center gap-4 py-2 md:py-0 md:px-4 pl-0 md:pl-6">
              <Trophy className="w-8 h-8 text-[#EAB308] flex-shrink-0" strokeWidth={1.5} />
              <div className="text-left">
                <div className="font-display text-2xl font-black text-white leading-none">
                  <Counter to={7} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-semibold mt-1">Years of Excellence</div>
                <div className="text-[10px] text-slate-500 font-medium">in IT Training</div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}



/* ---------- FAQ ---------- */
const FAQS = [
  { q: "Do you provide placements?", a: "Yes. We provide dedicated placement assistance with 100+ hiring partners and a 95% placement support rate." },
  { q: "Are online classes available?", a: "Absolutely. We offer both classroom and live online batches with lifetime access to recordings." },
  { q: "Will I get certificates?", a: "Yes. Every completed course includes a YUGA Tech Academy certificate plus preparation for industry-recognised certifications." },
  { q: "Can beginners join?", a: "Yes. Most of our courses start from zero, and we offer foundation modules before advanced topics." },
  { q: "What are course durations?", a: "Ranging from 4 weeks (short modules) to 6 months (Full Stack programs). Duration is listed on each course card." },
  { q: "Do you provide internships?", a: "Yes. Real-world internships are integrated into all our professional programs." },
];
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-10 bg-gradient-to-b from-background to-secondary/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i}>
              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                <button onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="font-display font-semibold text-navy-deep">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const phone = fd.get("phone") as string;
    const email = fd.get("email") as string;
    const course = fd.get("course") as string;
    const msg = fd.get("message") as string;

    const text = `*New Inquiry from YUGA Tech Academy*\n\n` +
                 `*Name:* ${name}\n` +
                 `*Phone:* ${phone}\n` +
                 `*Email:* ${email}\n` +
                 `*Course:* ${course}\n` +
                 `*Message:* ${msg}`;

    const waUrl = `https://api.whatsapp.com/send?phone=917989033585&text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");

    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-10 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Contact Us" title="Let's Start Your Journey" sub="Visit our campus, drop us a message, or say hello — we're here to help." />
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="rounded-3xl overflow-hidden border border-border h-full min-h-[420px] bg-secondary">
              <iframe
                title="YUGA Tech Academy location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.0209068325703!2d83.32215464999999!3d17.743654049999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39434ce07ebcfb%3A0x3f70f3043e152eef!2sBhanu%20Nagar%2C%20H%20B%20Colony%2C%20Visakhapatnam%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1784179123614!5m2!1sen!2sin"
                className="w-full h-full min-h-[420px] border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="rounded-3xl bg-card border border-border p-7 shadow-[var(--shadow-elegant)]">
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Full Name" name="name" placeholder="Your name" required />
                  <Input label="Phone" name="phone" type="tel" placeholder="+91 " required />
                </div>
                <Input label="Email" name="email" type="email" placeholder="you@email.com" required />
                <div>
                  <label className="block text-sm font-semibold text-navy-deep mb-1.5">Course Interested</label>
                  <select name="course" required className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold">
                    <option value="">Select a course…</option>
                    {COURSE_GROUPS.flatMap((g) => g.courses.map((c) => (
                      <option key={g.title + c.name} value={`${g.title} — ${c.name}`}>{g.title} — {c.name}</option>
                    )))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy-deep mb-1.5">Message</label>
                  <textarea name="message" rows={4} placeholder="Tell us about your goals…" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold resize-none" />
                </div>
                <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl btn-gold btn-gold-hover font-semibold">
                  {sent ? "Message Sent ✓" : (<>Send Message <Send className="w-4 h-4" /></>)}
                </button>
              </form>

              <div className="mt-8 grid gap-3 pt-6 border-t border-border">
                <InfoLine icon={MapPin} label="Address" value="Dr No: 54-11-38/2, 2nd Floor, Bhanu Nagar, V.S. Krishna College Road, Visakhapatnam – 530022" />
                <InfoLine icon={Mail} label="Email" value="info@yugatechacademy.com" />
                <InfoLine icon={Phone} label="Phone" value="+91 79890 33585" />
                <div className="flex items-center gap-3 pt-2">
                  {[Facebook, Instagram, Linkedin, Youtube].map((I, k) => (
                    <a key={k} href="#" aria-label="Social" className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary hover:btn-gold text-navy-deep transition"><I className="w-5 h-5" /></a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...p }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-semibold text-navy-deep mb-1.5">{label}</label>
      <input {...p} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold" />
    </div>
  );
}
function InfoLine({ icon: I, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-navy-deep"><I className="w-5 h-5" /></div>
      <div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm text-navy-deep font-medium leading-relaxed">{value}</div>
      </div>
    </div>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="pt-10 pb-8 text-white" style={{ background: "var(--gradient-navy)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-3 mb-5">
              <img src={logoImg} alt="YUGA Tech Academy Logo" className="h-14 w-auto object-contain rounded bg-white/5 p-1" />
              <div className="leading-tight">
                <div className="font-display text-xl font-black text-white tracking-wide">YUGA</div>
                <div className="text-[10px] tracking-[0.18em] font-bold text-[#EAB308]">TECH ACADEMY</div>
              </div>
            </a>
            <p className="mt-5 text-sm text-white/70 leading-relaxed">
              Premier IT training institute in Visakhapatnam. Learn. Build. Excel.
            </p>
          </div>

          <FooterCol title="Quick Links" links={NAV.map((n) => n.label)} />
          <FooterCol title="Popular Courses" links={["Java Full Stack", "MERN Stack", "AI & ML", "AWS Cloud", "Cyber Security", "DevOps"]} />

          <div>
            <div className="font-display font-bold text-gold-glow mb-4">Contact Us</div>
            <div className="text-sm text-white/70 space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" />
                <span>Dr No: 54-11-38/2, 2nd Floor, Bhanu Nagar, Visakhapatnam – 530022</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:info@yugatechacademy.com" className="hover:text-gold transition-colors">info@yugatechacademy.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+917989033585" className="hover:text-gold transition-colors">+91 79890 33585</a>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((I, k) => (
                <a key={k} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-gold hover:text-navy-deep transition"><I className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <div>© 2026 YUGA Tech Academy. All Rights Reserved.</div>
          <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-gold" /> Learn · Build · Excel</div>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="font-display font-bold text-gold-glow mb-4">{title}</div>
      <ul className="space-y-2 text-sm text-white/75">
        {links.map((l) => <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>)}
      </ul>
    </div>
  );
}

/* ---------- page ---------- */
function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TechSection />
        <About />
        <Courses />

        <Services />
        <Process />
        <Placements />
        <Testimonials />

        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
