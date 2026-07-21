import React, { useState, useEffect } from "react";
import { Phone, ArrowUp, ArrowDown, X, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/yugaacademy-logo.jpeg";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.774 9.774 0 0 0-6.974-2.85C6.191 1.99 1.766 6.36 1.762 11.79c-.001 1.768.461 3.49 1.339 5.025l-.995 3.637 3.737-.979zm11.758-5.321c-.305-.153-1.802-.888-2.08-.989-.279-.1-.481-.153-.683.153-.202.306-.78.989-.957 1.193-.176.204-.353.229-.658.076-1.528-.767-2.661-1.337-3.729-2.311-.274-.251-.252-.43.082-.767.151-.152.304-.356.455-.534.153-.178.204-.306.305-.51.101-.204.051-.382-.025-.535-.076-.153-.683-1.644-.936-2.256-.247-.594-.499-.514-.683-.524-.176-.01-.379-.011-.582-.011s-.532.076-.81.382c-.279.306-1.064 1.045-1.064 2.548s1.089 2.958 1.241 3.162c.152.204 2.143 3.272 5.19 4.587.725.313 1.29.5 1.73.64.729.232 1.392.199 1.916.12.584-.087 1.802-.738 2.057-1.453.255-.713.255-1.325.178-1.453-.077-.127-.279-.203-.584-.356z" />
  </svg>
);

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(true);

  const checkScroll = () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    setShowTop(scrolled > 300);
    setShowBottom(maxScroll - scrolled > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (hasNewMsg) setHasNewMsg(false);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 items-end">
      
      {/* Interactive WhatsApp Popup Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-2 w-80 sm:w-84 rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-slate-200/90 text-slate-900 z-50 text-left relative overflow-hidden"
          >
            {/* Top header bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={logoImg} alt="YUGA Tech Academy Logo" className="w-10 h-10 rounded-xl object-contain bg-slate-900 p-1 border border-slate-200" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
                <div className="leading-tight">
                  <h4 className="font-extrabold text-sm text-slate-900">YUGA Tech Academy</h4>
                  <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Online • Quick Reply
                  </div>
                </div>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat message bubble */}
            <div className="my-4 p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-xs text-slate-700 leading-relaxed font-medium">
              <p className="font-bold text-slate-900 mb-1">👋 Hello & Welcome!</p>
              Have any questions about our IT training programs, Kids Coding courses, or placement support? Chat with us live!
            </div>

            {/* Start Chat Button */}
            <a
              href="https://api.whatsapp.com/send?phone=917989033585&text=Hi%20YUGA%20Tech%20Academy%2C%20I%20have%20an%20inquiry%20about%20your%20courses."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <WhatsAppIcon /> Start WhatsApp Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-2.5 items-center">
        {/* Scroll to Top */}
        {showTop && (
          <button
            onClick={scrollToTop}
            className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        )}

        {/* Direct Call Button */}
        <a
          href="tel:+917989033585"
          className="p-3 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-amber-300"
          title="Call Us Directly"
          aria-label="Call Us"
        >
          <Phone className="w-4 h-4 fill-slate-950" />
        </a>

        {/* Persistent Floating WhatsApp Button */}
        <button
          onClick={toggleChat}
          className="relative p-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-emerald-400"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          {/* Notification Ping Badge */}
          {hasNewMsg && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-black text-slate-950 items-center justify-center border border-white">
                1
              </span>
            </span>
          )}

          <WhatsAppIcon />
        </button>

        {/* Scroll to Bottom */}
        {showBottom && (
          <button
            onClick={scrollToBottom}
            className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
            title="Scroll to Bottom"
            aria-label="Scroll to Bottom"
          >
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          </button>
        )}
      </div>

    </div>
  );
}
