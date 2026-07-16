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
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
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
    <section className="py-16 bg-[#FAF9F6] border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          eyebrow="Tech Stack"
          title="Trusted Technologies We Teach"
          sub="Master the most in-demand tools and frameworks used by tech leaders globally."
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center mt-12">
          {TECHS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={i} delay={i * 0.02} className="w-full max-w-[300px]">
                <div className="tech-card-uiverse">
                  <div className="tech-card-uiverse-border"></div>
                  <div className="tech-card-uiverse-content">
                    <div className="tech-card-uiverse-logo-wrapper">
                      <div className="tech-card-uiverse-logo1">
                        <Icon className="w-7 h-7 text-[#EAB308]" strokeWidth={1.5} />
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
    <section id="about" className="py-16 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Text & Image Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
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
        <div className="flex items-center justify-center gap-4 mt-28 mb-12">
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
  
  if (name === "c programming") {
    return (
      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
          <path fill="#A8B9CC" d="M117.5 33.5L68.5 4.9c-2.8-1.6-6.2-1.6-9 0L10.5 33.5c-2.8 1.6-4.5 4.6-4.5 7.8v57.3c0 3.2 1.7 6.2 4.5 7.8l49 28.6c2.8 1.6 6.2 1.6 9 0l49-28.6c2.8-1.6 4.5-4.6 4.5-7.8V41.3c0-3.2-1.7-6.2-4.5-7.8z" />
          <path fill="#00599C" d="M112.5 36.4L68.5 10.7c-2.8-1.6-6.2-1.6-9 0L15.5 36.4c-2.8 1.6-4.5 4.6-4.5 7.8v51.6c0 3.2 1.7 6.2 4.5 7.8l44 25.7c2.8 1.6 6.2 1.6 9 0l44-25.7c2.8-1.6 4.5-4.6 4.5-7.8V44.2c0-3.2-1.7-6.2-4.5-7.8z" />
          <path fill="#FFFFFF" d="M85.4 82.9c-6.1 7.2-15 11.2-25.4 11.2-18.7 0-32.9-14-32.9-32.9S41.3 28.3 60 28.3c10.4 0 19.3 4 25.4 11.2l12.7-12.7C88.6 15.6 75.3 10 60 10 29.8 10 7.8 33.5 7.8 63.8s22 53.8 52.2 53.8c15.3 0 28.6-5.6 38.1-16.8L85.4 82.9z" />
        </svg>
      </div>
    );
  }
  
  if (name === "c++") {
    return (
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
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
      <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
          <path fill="#3776AB" d="M64 5.92c-32.06 0-30.04 13.91-30.04 13.91l.01 14.36h30.41v4.28H15.02s-14.28-1.63-14.28 30.04c0 31.67 12.63 30.41 12.63 30.41l11.29-.01v-15.9c0-19.16 15.54-18.73 15.54-18.73h26.47c19.16 0 18.73-15.54 18.73-15.54V18.73c0-19.16-17.65-12.81-17.65-12.81S80 5.92 64 5.92zm-12.81 7.21c2.37 0 4.29 1.91 4.29 4.28 0 2.37-1.92 4.29-4.29 4.29-2.37 0-4.28-1.92-4.28-4.29 0-2.37 1.91-4.28 4.28-4.28z" />
          <path fill="#FFE873" d="M64 122.08c32.06 0 30.04-13.91 30.04-13.91l-.01-14.36H63.62v-4.28h49.36s14.28 1.63 14.28-30.04c0-31.67-12.63-30.41-12.63-30.41l-11.29.01v15.9c0 19.16-15.54 18.73-15.54 18.73H71.27c-19.16 0-18.73 15.54-18.73 15.54v26.47c0 19.16 17.65 12.81 17.65 12.81s13.78.01 29.81.01zm12.81-7.21c-2.37 0-4.29-1.91-4.29-4.28 0-2.37 1.92-4.29 4.29-4.29 2.37 0 4.28 1.92 4.28 4.29 0 2.37-1.91 4.28-4.28 4.28z" />
        </svg>
      </div>
    );
  }
  
  if (name.includes("java") && !name.includes("javascript")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
          <path fill="#EA2D42" d="M85.7 94.3c-2.3 5.3-7.7 9.8-15.5 12.8-12 4.7-27.9 5.3-39.7 1.5-6.3-2-10.4-5.2-11.4-8.8-.7-2.6.2-5.3 2.4-7.8l2.2-2.3 2.2 2.3c2 2 5 3.8 8.6 5.1 9.9 3.6 24 3.7 34.3.4 9.1-3 14.8-7.8 14.8-12.7 0-.7-.1-1.4-.3-2.1L81.2 80c2.8 1.9 4.3 4.2 4.5 6.6.3 2.9-.6 5.7-2.3 7.7z" />
          <path fill="#305D7C" d="M98.9 76.5c-4.4 7.6-14 13.3-25.7 15.3-7.5 1.3-15.3.8-22.3-1.4-10.6-3.4-17.1-9.9-17-17 .1-8.1 7.2-15.6 18.5-19.7 6.4-2.3 13.5-3.3 20.3-2.7 10.9 1 19.3 5.3 23.3 11.9 2.5 4.2 3.6 8.9 2.9 13.6zm-17.4-4.8c1-1.6 1.5-3.4 1.4-5.3 0-6.1-5.1-11-11.3-11s-11.3 4.9-11.3 11 5.1 11 11.3 11c3.8-.1 7.3-2.2 9.9-5.7z" />
          <path fill="#EA2D42" d="M68.5 2.1C65.3 10.4 72.8 17.5 70 25.8c-2.3 6.8-8.8 10.8-7.5 18.9 1.4 9 11.3 13 8.3 22.4-.7 2.3-2.2 4.3-3.8 5.8 4.5-1.7 8.3-5.1 9.7-10.3 2.1-8.1-4.5-13.5-1.6-21.8 2.6-7.4 9.1-10.8 7.9-19.1-1.2-8.3-9.7-12.7-7.3-21.7C67.2 7.3 68.6 4.3 69.8 2.1c-1.3 0-1.3 0 0 0z" />
        </svg>
      </div>
    );
  }
  
  if (name.includes("javascript") || name.includes("front-end")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-yellow-50 border border-yellow-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
          <path fill="#F7DF1E" d="M1.4 1.4h125.2v125.2H1.4V1.4z" />
          <path fill="#000000" d="M118.2 100.7c-2.3-4-5.2-7.3-9.8-9.8-3.7-2-8.3-3.1-15.8-3.1-4 0-7.8.6-10.4 1.4-2.8 1.1-5.1 2.8-6.3 5.4-2 3.4-2 8.3-.3 11.8 1.4 2.8 3.7 4.8 6.9 6 3.7 1.4 9.8 2.8 17.3 4 10.4 1.7 17.3 3.7 21.6 6.6 4.8 3.1 8 7.5 9.2 13 1.1 4.3.9 9.8-.9 14.7-2.3 6.3-6.6 11.3-12.7 14.1-6 2.8-14.7 4-25.1 4-11.8 0-21-2.3-27.7-6.9-6.3-4.3-9.5-10.4-10.1-20.5h18.7c.6 5.4 2.6 9.2 6 11.5 4.3 2.8 11.2 4 19.9 4 7.2 0 12.7-.9 15.8-2.6 3.4-1.7 5.1-4.3 5.1-8.3 0-3.4-1.4-6-4.6-7.8-2.6-1.7-7.2-2.8-14.1-4-10.9-1.7-18.7-3.4-23.3-6.3-5.4-3.1-8.9-7.8-10.1-13.8-1.1-4.8-.6-10.4 1.7-15.3 2.8-6 7.5-10.4 13.8-12.7 6.3-2.3 14.7-3.4 24.5-3.4 10.9 0 19.3 2 25.1 5.7 5.4 3.4 8.6 8.3 9.8 15.8H118.2zm-67.4-48.4v68.3c0 8-.6 13.8-2 17.6-1.7 4.6-5.1 8.3-9.8 10.4-4.8 2.3-11.8 3.1-21.3 3.1-6.6 0-12.1-.6-16.1-1.7-4-1.1-7.2-2.8-9.8-5.1-2-1.7-3.7-4-4.6-6.9-.9-2.8-.9-7.2-.9-12.7h18.7c0 4 .9 6.6 2.3 8 2.3 2 6 2.8 11.2 2.8 5.7 0 9.5-1.1 11.2-3.1 1.7-2 2.3-6 2.3-12.4V52.3h19.1z" />
        </svg>
      </div>
    );
  }

  if (name.includes("mern stack") || name.includes("flutter") || name.includes("react") || name.includes("android")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
          <path fill="#61DAFB" d="M117.7 54c-1.5-6.8-5.3-12.7-10.7-17-4.2-3.3-9-5.7-14.2-7l-1.3-.3c-3-.6-6.2-.9-9.5-1-12.6-.2-24 3.7-33 11-4.7 3.8-8.8 8.4-12.1 13.5-3.3 5.1-5.7 10.7-7 16.7-1.5 6.8-1 13.5 1.5 19.5 3.3 8.1 9.3 14.5 17 18.2 5.1 2.5 10.7 3.9 16.7 4.2h1.6c3.2.1 6.5 0 9.8-.3 11.2-1 21.6-5.6 29.8-13 4.7-4.2 8.5-9.3 11.3-15 2.8-5.7 4.2-11.9 4.2-18.4v-1.1zm-84.5-18c2-2.5 4.3-4.7 7-6.6 6.3-4.5 13.6-7.2 21.2-8 3-.3 6-.4 9.1-.3l1.8.1c8.4.5 16.2 3.1 23 7.5 5.7 3.7 10.4 8.7 13.8 14.5.8 1.4 1.5 2.9 2 4.4-1.7 5.7-5.1 10.7-9.8 14.5-6.8 5.4-15 8.9-23.8 10.4-3.5.6-7.1.9-10.7.9-9.1 0-17.9-2-25.9-5.9-6-2.9-11.2-7.1-15-12.3-1.6-2.2-2.8-4.7-3.6-7.3.7-2.7 1.8-5.2 3.3-7.5l1.6-2.2z" />
          <circle cx="64" cy="64" r="7" fill="#61DAFB" />
        </svg>
      </div>
    );
  }

  if (name.includes("aws") || name.includes("azure") || name.includes("gcp") || name.includes("google cloud") || name.includes("cloud")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 256 256" className="w-6 h-6">
          <path fill="#232F3E" d="M110.2 163.6c-4.4 7-11 11.2-19.8 12.8-12 2.2-24.2-2.2-30.8-11-4.4-6-6.6-13-6.6-21v-30c0-15.4 8.8-26.4 22-29.7 13.2-3.3 26.4 1 33 11 6.6 9.9 8.8 23 8.8 38.5v30c0 4.4-.8 7.7-2.2 9.9-1.4 2.2-2.6 4.4-4.4 6.6zm-17.6-43c0-12-.5-19.8-3.3-24.2-2.8-4.4-7.7-6.6-13.2-6.6-5.5 0-9.9 2.2-12.7 6.6-2.8 4.4-3.3 12.1-3.3 24.2v22c0 12.1.5 19.8 3.3 24.2 2.8 4.4 7.2 6.6 12.7 6.6 5.5 0 10.4-2.2 13.2-6.6 2.8-4.4 3.3-12.1 3.3-24.2v-22z" />
          <path fill="#FF9900" d="M30 185c40 32 105 45 156 36 28-5 54-15 70-26 5-3 5-7 1-10s-7-2-11 1c-15 10-38 18-62 23-45 8-105-2-141-28-5-4-10-3-13 1s-2 9 0 13z" />
          <path fill="#FF9900" d="M246 171c-3-11-15-28-21-33-3-3-7-1-6 3 2 12 5 32-2 42-2 3-1 6 3 5 11-4 28-11 31-15 3-1 0-7-5-12z" />
        </svg>
      </div>
    );
  }

  if (name.includes("devops")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-6 h-6" stroke="#10B981" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12c0-3.31-2.69-6-6-6-2.44 0-4.5 1.5-5.5 3.5-1-2-3.06-3.5-5.5-3.5-3.31 0-6 2.69-6 6s2.69 6 6 6c2.44 0 4.5-1.5 5.5-3.5 1 2 3.06 3.5 5.5 3.5 3.31 0 6-2.69 6-6z" />
        </svg>
      </div>
    );
  }

  if (name.includes("sql") || name.includes("database") || name.includes("postgresql") || name.includes("mysql") || name.includes("mongodb")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-6 h-6" stroke="#3B82F6" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      </div>
    );
  }

  if (name.includes("office") || name.includes("excel") || name.includes("tally")) {
    return (
      <div className="w-12 h-12 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 128 128" className="w-6 h-6">
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
      <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center flex-shrink-0 shadow-sm">
        <svg viewBox="0 0 24 24" className="w-6 h-6" stroke="#8B5CF6" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 11h-4V7a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="15" r="2" />
        </svg>
      </div>
    );
  }
  
  const CatIcon = categoryIcon;
  return (
    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-700 border border-slate-200/60 flex items-center justify-center flex-shrink-0 shadow-sm">
      <CatIcon className="w-5 h-5" />
    </div>
  );
};

const getCourseBg = (courseName: string, categoryName: string) => {
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
    <section id="courses" className="py-16 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Grid Header section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
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
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-12 mb-12 max-w-5xl mx-auto">
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
                  {/* Top: Level Badge (fades out on hover) */}
                  <div className="absolute right-4 top-4 z-10 transition-all group-hover:opacity-0 group-hover:scale-95 duration-300">
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
                          <div key={idx} className="flex items-center gap-2 text-xs text-white/90 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308] flex-shrink-0" />
                            <span className="truncate">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bottom-bottom">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] uppercase tracking-wider text-white/50 font-bold">Duration</span>
                        <span className="text-xs font-bold text-white mt-0.5">{c.dur}</span>
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
    <section id="services" className="py-16 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Grid Header section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
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
    <section className="py-16 bg-background">
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
    <section id="placements" className="py-16 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Grid Header section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
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
        <div className="flex items-center justify-center gap-4 mt-20 mb-10">
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
        <div className="flex items-center justify-center gap-4 mt-20 mb-10">
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
          <h3 className="font-display text-sm font-black tracking-[0.2em] text-[#020617] uppercase text-center">Our Top Recruiters</h3>
          <div className="w-12 h-[1.5px] bg-[#EAB308]/60" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-6 items-center justify-items-center mt-12 bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
          {RECRUITERS.map((r) => (
            <div key={r} className="flex items-center justify-center h-10">
              {getRecruiterLogo(r)}
            </div>
          ))}
        </div>

        {/* Part 4: Bottom Promo Banner */}
        <Reveal className="mt-16">
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
    <section id="testimonials" className="py-16 bg-white border-t border-slate-100 relative overflow-hidden">
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
        <div className="relative mt-12 max-w-5xl mx-auto px-0 sm:px-10">
          
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
        <Reveal delay={0.08} className="max-w-4xl mx-auto mt-12 px-4">
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
          <div className="mt-20 bg-[#020617] border border-slate-800 rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y divide-slate-800 md:divide-y-0 md:divide-x divide-slate-800">
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
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
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
    <section id="contact" className="py-16 bg-background">
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
    <footer className="pt-20 pb-8 text-white" style={{ background: "var(--gradient-navy)" }}>
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

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/60">
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
