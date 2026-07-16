import React, { useState, useEffect } from "react";
import { Phone, ArrowUp, ArrowDown } from "lucide-react";

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

  const checkScroll = () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    // Show top arrow if user has scrolled down a bit
    setShowTop(scrolled > 300);
    // Show bottom arrow if user is not close to the bottom
    setShowBottom(maxScroll - scrolled > 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Run initially
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

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50 items-center">
      {/* Scroll to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-foreground border border-border rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      )}

      {/* Call Button */}
      <a
        href="tel:+917989033585"
        className="p-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        title="Call Us"
        aria-label="Call Us"
      >
        <Phone className="w-5 h-5 fill-slate-900/10" />
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917989033585"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {/* Scroll to Bottom */}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-foreground border border-border rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
          title="Scroll to Bottom"
          aria-label="Scroll to Bottom"
        >
          <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
}
