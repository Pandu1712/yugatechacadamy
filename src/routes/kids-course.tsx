import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Baby,
  Code2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import logoImg from "@/assets/yugaacademy-logo.jpeg";

export const Route = createFileRoute("/kids-course")({
  component: KidsCoursePage,
});

/* ---------- 5 Kids Courses Data ---------- */
const KIDS_COURSES = [
  {
    name: "Scratch",
    desc: "Visual programming for kids.",
    dur: "1.5 Months",
    level: "Kids",
    bullets: ["Block-based logic", "Sprite animations", "Simple game design"],
    theme: {
      badgeClass: "bg-purple-50 text-purple-600 border border-purple-100",
      checkClass: "text-purple-500",
      cardBorder: "border-purple-100 hover:border-purple-300",
      gradient: "radial-gradient(circle at top right, rgba(168, 85, 247, 0.08) 0%, rgba(168, 85, 247, 0) 65%)",
      footerBg: "bg-purple-50/80 hover:bg-purple-100/80 border-t border-purple-100/40 text-purple-700",
    },
  },
  {
    name: "Block Coding",
    desc: "Logic through blocks.",
    dur: "1.5 Months",
    level: "Kids",
    bullets: ["Conditionals & Loops", "Computational logic", "App Inventor basic apps"],
    theme: {
      badgeClass: "bg-blue-50 text-blue-600 border border-blue-100",
      checkClass: "text-blue-500",
      cardBorder: "border-blue-100 hover:border-blue-300",
      gradient: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 65%)",
      footerBg: "bg-blue-50/80 hover:bg-blue-100/80 border-t border-blue-100/40 text-blue-700",
    },
  },
  {
    name: "Python for Kids",
    desc: "First real language for kids.",
    dur: "2 Months",
    level: "Kids",
    bullets: ["Turtle graphics", "Python basic syntax", "Text adventure games"],
    theme: {
      badgeClass: "bg-amber-50 text-amber-600 border border-amber-100",
      checkClass: "text-amber-500",
      cardBorder: "border-amber-100 hover:border-amber-300",
      gradient: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0) 65%)",
      footerBg: "bg-amber-50/80 hover:bg-amber-100/80 border-t border-amber-100/40 text-amber-700",
    },
  },
  {
    name: "AI for Kids",
    desc: "Fun intro to AI concepts.",
    dur: "1.5 Months",
    level: "Kids",
    bullets: ["Image classifiers", "Speech recognition games", "Ethics of AI"],
    theme: {
      badgeClass: "bg-cyan-50 text-cyan-600 border border-cyan-100",
      checkClass: "text-cyan-500",
      cardBorder: "border-cyan-100 hover:border-cyan-300",
      gradient: "radial-gradient(circle at top right, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0) 65%)",
      footerBg: "bg-cyan-50/80 hover:bg-cyan-100/80 border-t border-cyan-100/40 text-cyan-700",
    },
  },
  {
    name: "Robotics",
    desc: "Hands-on robots & sensors.",
    dur: "2.5 Months",
    level: "Kids",
    bullets: ["Arduino/Micro:bit basics", "Sensor Integration", "Robot path traversal"],
    theme: {
      badgeClass: "bg-indigo-50 text-indigo-600 border border-indigo-100",
      checkClass: "text-indigo-500",
      cardBorder: "border-indigo-100 hover:border-indigo-300",
      gradient: "radial-gradient(circle at top right, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0) 65%)",
      footerBg: "bg-indigo-50/80 hover:bg-indigo-100/80 border-t border-indigo-100/40 text-indigo-700",
    },
  },
];

function KidsCoursePage() {
  const [open, setOpen] = useState(false);

  const handleEnquiry = (courseName: string) => {
    const text = `Hi YUGA Tech Academy, I am interested in enrolling my child in the *${courseName}* course. Please provide details.`;
    const waUrl = `https://api.whatsapp.com/send?phone=917989033585&text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" style={{ background: "var(--gradient-navy)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between py-3">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="YUGA Tech Academy Logo" className="h-14 w-auto object-contain rounded" />
              <div className="leading-tight">
                <div className="font-display text-xl font-black text-white tracking-wide">YUGA</div>
                <div className="text-[10px] tracking-[0.18em] font-bold text-[#EAB308]">TECH ACADEMY</div>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white bg-white/10 hover:bg-white/20 font-bold text-xs sm:text-sm transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: 5 Kids Courses */}
      <main className="py-12 bg-white flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Badge */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#020617] text-white text-xs font-bold shadow-md mb-4 border border-[#EAB308]/40">
              <Baby className="w-4 h-4 text-[#EAB308]" />
              <span>KIDS CODING & TECH PROGRAM</span>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              Kids <span className="text-[#D97706]">Courses</span>
            </h1>
            <p className="mt-3 text-base text-slate-500 font-medium max-w-xl mx-auto">
              Interactive, logic-building, and hands-on technology courses specially crafted for young learners.
            </p>
          </div>

          {/* 5 Course Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {KIDS_COURSES.map((c) => (
              <div
                key={c.name}
                className={`group relative bg-white border rounded-[28px] p-6 pb-0 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-[360px] overflow-hidden ${c.theme.cardBorder}`}
                style={{ backgroundImage: c.theme.gradient, backgroundRepeat: "no-repeat" }}
              >
                <div className="relative z-10 flex flex-col">
                  {/* Top Row: Icon + Level Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-md text-purple-600">
                      <Baby className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${c.theme.badgeClass}`}>
                      {c.level}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="text-left mt-4">
                    <h3 className="font-display font-extrabold text-slate-900 text-xl leading-tight tracking-wide">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1.5 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  {/* Bullet Checklist */}
                  <div className="mt-4 space-y-2">
                    {c.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-bold text-left">
                        <CheckCircle2 className={`w-4 h-4 ${c.theme.checkClass} flex-shrink-0`} strokeWidth={2.5} />
                        <span className="truncate">{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Enquiry Button (WhatsApp) */}
                  <button
                    onClick={() => handleEnquiry(c.name)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:brightness-105 active:translate-y-[0.5px] border-0"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.01-5.092-2.855-6.941C16.638 2.016 14.17 1 11.547 1 6.11 1 1.685 5.373 1.682 10.801c0 1.673.447 3.3 1.295 4.757l-.272.996 1.056-.39 2.886 1.054zm12.316-5.733c-.332-.165-1.962-.968-2.267-1.08-.303-.108-.522-.162-.741.165-.218.327-.844 1.072-1.036 1.293-.19.22-.382.247-.714.082-2.965-1.478-4.03-2.061-5.747-5.012-.22-.378.22-.35.63-.76.368-.37.478-.51.714-.99.24-.48.12-.907-.06-1.235-.18-.328-.741-1.815-1.014-2.478-.266-.64-.537-.55-.741-.56l-.63-.008c-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.73 0 1.611 1.173 3.167 1.336 3.386.163.22 2.308 3.522 5.59 4.945 2.723 1.18 3.278.94 4.453.83.1.002.327-.082.573-.247.247-.165.41-.41.492-.686.082-.275.082-.51.054-.56-.027-.05-.11-.08-.443-.245z"/>
                    </svg>
                    Enquiry Now
                  </button>
                </div>

                {/* Bottom Card Footer */}
                <button
                  onClick={() => handleEnquiry(c.name)}
                  className={`-mx-6 px-6 py-3 transition-colors flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider ${c.theme.footerBg}`}
                >
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> ENHANCE YOUR SKILLS TODAY
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="pt-10 pb-8 text-white" style={{ background: "var(--gradient-navy)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60">
            <div>© 2026 YUGA Tech Academy. All Rights Reserved.</div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#EAB308]" /> Learn · Build · Excel
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
