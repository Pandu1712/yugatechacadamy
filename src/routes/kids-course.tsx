import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Baby,
  Code2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Gamepad2,
  Cpu,
  Bot,
  Palette,
  Award,
  Users,
  BrainCircuit,
  Clock,
  HelpCircle,
  Smile,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";
import logoImg from "@/assets/yugaacademy-logo.jpeg";
import heroImg from "@/assets/kids/hero.png";
import scratchImg from "@/assets/kids/scratch.png";
import blockCodingImg from "@/assets/kids/block_coding.png";
import pythonImg from "@/assets/kids/python.png";
import aiImg from "@/assets/kids/ai.png";
import roboticsImg from "@/assets/kids/robotics.png";

export const Route = createFileRoute("/kids-course")({
  head: () => ({
    meta: [
      { title: "Kids Coding & Tech Courses — YUGA Tech Academy" },
      { name: "description", content: "Interactive, logic-building, and hands-on technology courses specially crafted for kids ages 6-16 in Visakhapatnam. Learn Scratch, Block Coding, Python, AI, and Robotics." },
      { property: "og:title", content: "Kids Coding & Tech Courses — YUGA Tech Academy" },
      { property: "og:description", content: "Turn screen time into productive learning! Empower your child to build games, mobile apps, AI models, and robots." },
      { property: "og:image", content: "https://www.yugatechacademy.com/yugaacademy-logo.jpeg" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Kids Coding & Tech Courses — YUGA Tech Academy" },
      { name: "twitter:description", content: "Interactive coding & robotics courses for kids ages 6-16 in Visakhapatnam." },
      { name: "twitter:image", content: "https://www.yugatechacademy.com/yugaacademy-logo.jpeg" },
    ],
  }),
  component: KidsCoursePage,
});

/* ---------- 5 Kids Courses Data ---------- */
const KIDS_COURSES = [
  {
    name: "Scratch Programming",
    shortName: "Scratch",
    desc: "Visual block-based programming where kids build interactive stories, animations & 2D video games.",
    dur: "1.5 Months",
    age: "Ages 6 - 10",
    level: "Beginner",
    image: scratchImg,
    tag: "Most Popular",
    bullets: ["Block-based visual logic", "Sprite animations & sound effects", "Interactive 2D game creation"],
    theme: {
      badgeClass: "bg-purple-100 text-purple-700 border border-purple-200",
      checkClass: "text-purple-600",
      cardBorder: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      gradient: "radial-gradient(circle at top right, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0) 70%)",
      footerBg: "bg-purple-50 hover:bg-purple-100 border-t border-purple-200/60 text-purple-700",
      accentColor: "#9333EA",
    },
  },
  {
    name: "Block Coding & Apps",
    shortName: "Block Coding",
    desc: "Logic-building using drag & drop blocks to craft real mobile apps and smart interactive programs.",
    dur: "1.5 Months",
    age: "Ages 8 - 12",
    level: "Beginner+",
    image: blockCodingImg,
    tag: "App Creator",
    bullets: ["Conditionals, loops & variables", "Computational logic building", "App Inventor mobile application creation"],
    theme: {
      badgeClass: "bg-blue-100 text-blue-700 border border-blue-200",
      checkClass: "text-blue-600",
      cardBorder: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      gradient: "radial-gradient(circle at top right, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0) 70%)",
      footerBg: "bg-blue-50 hover:bg-blue-100 border-t border-blue-200/60 text-blue-700",
      accentColor: "#2563EB",
    },
  },
  {
    name: "Python for Kids",
    shortName: "Python for Kids",
    desc: "First real text programming language for kids with colorful turtle graphics & text adventure games.",
    dur: "2 Months",
    age: "Ages 10 - 16",
    level: "Intermediate",
    image: pythonImg,
    tag: "High Demand",
    bullets: ["Turtle graphics drawing & math art", "Python basic syntax & functions", "Text adventure game engines"],
    theme: {
      badgeClass: "bg-amber-100 text-amber-800 border border-amber-200",
      checkClass: "text-amber-600",
      cardBorder: "border-amber-200 hover:border-amber-400 hover:shadow-amber-100",
      gradient: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0) 70%)",
      footerBg: "bg-amber-50 hover:bg-amber-100 border-t border-amber-200/60 text-amber-800",
      accentColor: "#D97706",
    },
  },
  {
    name: "AI & Machine Learning",
    shortName: "AI for Kids",
    desc: "Fun hands-on introduction to Artificial Intelligence concepts, computer vision & smart voice assistants.",
    dur: "1.5 Months",
    age: "Ages 9 - 16",
    level: "Next-Gen Tech",
    image: aiImg,
    tag: "Future Tech",
    bullets: ["Image & face recognition classifiers", "Voice command & speech games", "Understanding AI ethics & real applications"],
    theme: {
      badgeClass: "bg-cyan-100 text-cyan-800 border border-cyan-200",
      checkClass: "text-cyan-600",
      cardBorder: "border-cyan-200 hover:border-cyan-400 hover:shadow-cyan-100",
      gradient: "radial-gradient(circle at top right, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0) 70%)",
      footerBg: "bg-cyan-50 hover:bg-cyan-100 border-t border-cyan-200/60 text-cyan-800",
      accentColor: "#0891B2",
    },
  },
  {
    name: "Robotics & Hardware",
    shortName: "Robotics",
    desc: "Hands-on engineering with sensors, motors, Arduino & Micro:bit to bring physical robots to life.",
    dur: "2.5 Months",
    age: "Ages 10 - 16",
    level: "Hands-On",
    image: roboticsImg,
    tag: "Hardware Fun",
    bullets: ["Arduino & Micro:bit circuit setup", "Sensor integration & light controls", "Robot obstacle navigation traversal"],
    theme: {
      badgeClass: "bg-indigo-100 text-indigo-700 border border-indigo-200",
      checkClass: "text-indigo-600",
      cardBorder: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
      gradient: "radial-gradient(circle at top right, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0) 70%)",
      footerBg: "bg-indigo-50 hover:bg-indigo-100 border-t border-indigo-200/60 text-indigo-700",
      accentColor: "#4F46E5",
    },
  },
];

/* ---------- Why Kids Love Us Features ---------- */
const WHY_KIDS_LOVE_US = [
  {
    icon: Gamepad2,
    title: "Game-Based Learning",
    desc: "Kids learn programming by designing games, animations, and interactive apps—making learning feel like play!",
    color: "bg-purple-500 text-white",
  },
  {
    icon: BrainCircuit,
    title: "Logic & Problem Solving",
    desc: "Develops critical thinking, mathematical reasoning, and structured problem-solving skills early in life.",
    color: "bg-blue-500 text-white",
  },
  {
    icon: Palette,
    title: "Creative Expression",
    desc: "Encourages imagination by giving young minds the power to transform their creative ideas into digital reality.",
    color: "bg-amber-500 text-white",
  },
  {
    icon: Award,
    title: "Certificate & Projects",
    desc: "Every kid builds their own project portfolio and receives an official certificate of completion.",
    color: "bg-emerald-500 text-white",
  },
];

/* ---------- FAQ Items ---------- */
const FAQS = [
  {
    q: "Does my child need any prior coding or math knowledge?",
    a: "Not at all! Our courses start from absolute scratch using fun visual drag-and-drop tools like Scratch and Block Coding before progressing to text languages.",
  },
  {
    q: "What age group is suitable for these courses?",
    a: "Our programs cater to kids aged 6 to 16, with tailored curriculums and age-appropriate projects for each group.",
  },
  {
    q: "Are the classes conducted online or in-person?",
    a: "We offer both interactive live online sessions and hands-on offline classroom training at our Visakhapatnam center.",
  },
  {
    q: "Can I schedule a free demo class for my child?",
    a: "Yes! Click the 'Enquiry Now' button or message us on WhatsApp to book a complimentary 1-on-1 demo session.",
  },
];

function KidsCoursePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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

      {/* Main Content: Complete Kids Theme & Courses */}
      <main className="bg-slate-50/50 flex-grow">
        
        {/* KIDS HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 text-white pt-12 pb-16 lg:pt-16 lg:pb-24">
          {/* Decorative floating colorful blur elements */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Hero Text */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-inner">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Interactive Kids Coding & Tech Academy</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  Where Young Minds <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Create & Innovate! 🚀
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Turn screen time into productive learning! We empower kids ages 6–16 to build games, code mobile apps, program robots, and explore AI with hands-on mentors.
                </p>

                {/* Hero Badges */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm font-bold text-white/90">
                  <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <Baby className="w-4 h-4 text-amber-400" /> Ages 6–16
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <Gamepad2 className="w-4 h-4 text-purple-400" /> Game-Based Learning
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl border border-white/10">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Practical & Safe
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={() => handleEnquiry("Kids General Coding Demo")}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Smile className="w-5 h-5" /> Book Free Demo Class
                  </button>
                  <a
                    href="#courses"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm border border-white/20 transition-all text-center"
                  >
                    Explore 5 Courses 👇
                  </a>
                </div>
              </div>

              {/* Hero Image */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative group max-w-md w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-slate-900 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img
                      src={heroImg}
                      alt="Kids Coding and Robotics Workshop"
                      className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition duration-500"
                    />
                    {/* Floating pill tag */}
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center gap-3 text-left">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 flex-shrink-0 font-black">
                        <Star className="w-5 h-5 fill-slate-950" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-amber-300 uppercase tracking-wider">Join 500+ Happy Kids</div>
                        <div className="text-xs text-slate-300 font-medium">Build your first game in 7 days!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 5 COURSES GRID SECTION */}
        <section id="courses" className="py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-black tracking-wider uppercase mb-3 border border-amber-200">
              <Baby className="w-4 h-4 text-amber-600" />
              <span>Tailored For Young Minds</span>
            </div>
            
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              Our 5 Fun <span className="text-amber-600">Kids Courses</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto">
              Select the perfect tech program for your child's age group and interests.
            </p>
          </div>

          {/* 5 Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {KIDS_COURSES.map((c) => (
              <div
                key={c.name}
                className={`group relative bg-white border rounded-3xl flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden ${c.theme.cardBorder}`}
                style={{ backgroundImage: c.theme.gradient, backgroundRepeat: "no-repeat" }}
              >
                {/* Course Image Header */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={`${c.name} course for kids`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm ${c.theme.badgeClass}`}>
                      {c.age}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-900/90 text-amber-400 border border-amber-400/40 shadow-sm">
                      {c.tag}
                    </span>
                  </div>

                  {/* Course Duration Tag on Image bottom */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-extrabold text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Duration: {c.dur}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="font-display font-black text-slate-900 text-xl leading-tight tracking-wide group-hover:text-amber-600 transition-colors">
                      {c.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                      {c.desc}
                    </p>

                    {/* Bullet List */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                        What Kids Will Learn:
                      </div>
                      {c.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-bold">
                          <CheckCircle2 className={`w-4 h-4 ${c.theme.checkClass} flex-shrink-0 mt-0.5`} strokeWidth={2.5} />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp Enquiry Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleEnquiry(c.name)}
                      className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.01-5.092-2.855-6.941C16.638 2.016 14.17 1 11.547 1 6.11 1 1.685 5.373 1.682 10.801c0 1.673.447 3.3 1.295 4.757l-.272.996 1.056-.39 2.886 1.054zm12.316-5.733c-.332-.165-1.962-.968-2.267-1.08-.303-.108-.522-.162-.741.165-.218.327-.844 1.072-1.036 1.293-.19.22-.382.247-.714.082-2.965-1.478-4.03-2.061-5.747-5.012-.22-.378.22-.35.63-.76.368-.37.478-.51.714-.99.24-.48.12-.907-.06-1.235-.18-.328-.741-1.815-1.014-2.478-.266-.64-.537-.55-.741-.56l-.63-.008c-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.73 0 1.611 1.173 3.167 1.336 3.386.163.22 2.308 3.522 5.59 4.945 2.723 1.18 3.278.94 4.453.83.1.002.327-.082.573-.247.247-.165.41-.41.492-.686.082-.275.082-.51.054-.56-.027-.05-.11-.08-.443-.245z"/>
                      </svg>
                      Enquiry Now
                    </button>
                  </div>
                </div>

                {/* Bottom Banner Strip */}
                <button
                  onClick={() => handleEnquiry(c.name)}
                  className={`px-6 py-3 transition-colors flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider ${c.theme.footerBg}`}
                >
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> ENHANCE YOUR SKILLS TODAY
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* WHY KIDS LOVE CODING WITH US */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black tracking-wider uppercase mb-3 border border-purple-200">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>The YUGA Advantage</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                Why Kids & Parents <span className="text-purple-600">Love Our Program</span>
              </h2>
              <p className="mt-3 text-base text-slate-600 font-medium">
                We make computer science engaging, supportive, and extremely practical for young learners.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {WHY_KIDS_LOVE_US.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-black text-slate-900 text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LEARNING PATH ROADMAP FOR KIDS */}
        <section className="py-16 bg-gradient-to-b from-slate-900 to-indigo-950 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black tracking-wider uppercase mb-4 border border-amber-400/30">
              <Star className="w-4 h-4 text-amber-400" />
              <span>Step-By-Step Growth</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
              The Kids <span className="text-amber-400">Coding Roadmap</span>
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-xl mx-auto font-medium">
              From colorful Scratch blocks to building real AI models and programming robots!
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { step: "01", title: "Visual Scratch", age: "Ages 6-8", text: "Master logic with colorful block games & animations." },
                { step: "02", title: "Block & App Creator", age: "Ages 8-10", text: "Create custom mobile apps and problem-solving tools." },
                { step: "03", title: "Python Programming", age: "Ages 10-12", text: "Transition to real text coding with Python & graphics." },
                { step: "04", title: "AI & Robotics", age: "Ages 12-16", text: "Build smart AI classifiers & assemble physical robots." },
              ].map((s, i) => (
                <div key={i} className="relative p-6 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-black text-amber-400/80 mb-2 font-display">{s.step}</div>
                  <div className="text-xs font-extrabold uppercase text-amber-300 tracking-wider mb-1">{s.age}</div>
                  <h3 className="text-lg font-black text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARENT FAQ SECTION */}
        <section className="py-16 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-900 text-xs font-black tracking-wider uppercase mb-3 border border-blue-200">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="font-display text-3xl font-black text-slate-900">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? "rotate-180 bg-blue-100 text-blue-600" : ""}`}>
                      ↓
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM FREE TRIAL CTA BANNER */}
        <section className="py-12 pb-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-8 sm:p-12 text-slate-950 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
                  🎁 Special Offer
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-black text-slate-950 leading-tight">
                  Book a FREE 1-on-1 Trial Class for Your Child!
                </h3>
                <p className="mt-2 text-slate-900 text-sm sm:text-base font-semibold max-w-xl">
                  Let your child experience the magic of building their very first computer game today. No commitment required!
                </p>
              </div>

              <button
                onClick={() => handleEnquiry("Free 1-on-1 Trial Class")}
                className="px-8 py-4 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white font-black text-sm uppercase tracking-wider shadow-xl transition-transform hover:scale-105 active:scale-95 flex-shrink-0 flex items-center gap-2 cursor-pointer border-0"
              >
                <Smile className="w-5 h-5 text-amber-400" /> Book Free Trial Now
              </button>
            </div>
          </div>
        </section>

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
