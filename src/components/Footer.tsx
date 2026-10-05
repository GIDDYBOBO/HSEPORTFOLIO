import React from 'react';
import { PageId } from '../types';
import { 
  ArrowUpRight, 
  MapPin, 
  ArrowUp,
  Linkedin,
  BookOpen
} from 'lucide-react';

interface FooterProps {
  onSelectPage: (id: PageId) => void;
  onOpenBookingModal?: () => void;
}

const CREDENTIAL_TILES = [
  { title: "CMIOSH", subtitle: "Chartered Safety Fellow" },
  { title: "MNSE", subtitle: "Registered Civil Engineer" },
  { title: "COREN Reg.", subtitle: "Practicing Engineering Seal" },
  { title: "ISO 45001", subtitle: "Certified Lead Auditor" },
  { title: "MSc CECM", subtitle: "Heriot-Watt University" },
  { title: "MSc OEHSM", subtitle: "University of Portsmouth" },
];

export const Footer: React.FC<FooterProps> = ({ 
  onSelectPage,
  onOpenBookingModal
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (id: PageId) => {
    onSelectPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultationClick = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      handleNav('contact');
    }
  };

  const handleFormalWrittenQueryClick = () => {
    sessionStorage.setItem('hse_scroll_target', 'formal-query');
    window.location.hash = 'formal-query';
    onSelectPage('services');
    const scrollToSection = () => {
      const el = document.getElementById('formal-written-query-section') || document.getElementById('inquiry-form-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollToSection();
    setTimeout(scrollToSection, 150);
    setTimeout(scrollToSection, 400);
    setTimeout(scrollToSection, 750);
  };

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white/95 backdrop-blur-xl text-slate-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Credentials Ticker / Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pb-8 border-b border-slate-200">
          {CREDENTIAL_TILES.map((tile, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex flex-col justify-center text-center space-y-0.5"
            >
              <span className="text-xs font-display font-bold text-slate-900 tracking-tight">
                {tile.title}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {tile.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* 3-Column Core Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Column 1: Brand & Profile */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none bg-gradient-to-br from-[#1C6CD4] to-[#142C5C] text-white">
                TG
              </div>
              <span className="text-lg font-display font-black tracking-tight text-slate-900">
                Engr. Iyenoma ThankGod Osazee
              </span>
            </div>

            <p className="text-xs sm:text-[12.5px] leading-relaxed max-w-md text-slate-600 font-medium">
              Digital headquarters and technical repository. Blending two decades of frontline civil construction safety directorship at Julius Berger Nigeria PLC with peer-reviewed research in occupational hygiene, landfill sustainability, construction safety frameworks, and statutory safety reform.
            </p>

            <div className="flex items-center space-x-2 pt-0.5 font-mono text-xs text-slate-700 font-bold">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#1C6CD4]" />
              <span>Abuja, Federal Capital Territory, Nigeria</span>
            </div>

            {/* Social & Academic Profile Icons Row */}
            <div className="pt-2 flex items-center space-x-2">
              <a
                id="footer-icon-linkedin"
                href="https://www.linkedin.com/in/iyenoma-osazee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Professional Network"
                title="LinkedIn Profile: Engr. Iyenoma Osazee"
                className="w-9 h-9 rounded-xl border border-slate-300 bg-white hover:border-[#1C6CD4] text-slate-800 hover:text-[#1C6CD4] flex items-center justify-center transition-all shadow-xs"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                id="footer-icon-researchgate"
                href="https://www.researchgate.net/publication/351052674"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate Scientific Monograph"
                title="ResearchGate Scientific Repository"
                className="w-9 h-9 rounded-xl border border-slate-300 bg-white hover:border-[#1C6CD4] text-slate-800 hover:text-[#1C6CD4] flex items-center justify-center transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Architectural Site Navigation (HSE-Port Signature Suite) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest font-black text-slate-900">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNav('home')}
                  className="transition-colors text-left cursor-pointer text-slate-700 hover:text-[#1C6CD4] font-semibold"
                >
                  Home • Overview
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNav('about')}
                  className="transition-colors text-left cursor-pointer text-slate-700 hover:text-[#1C6CD4] font-semibold"
                >
                  About • Profile &amp; Values
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-works"
                  onClick={() => handleNav('works')}
                  className="transition-colors text-left cursor-pointer text-slate-700 hover:text-[#1C6CD4] font-semibold"
                >
                  Works • Megaprojects
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-books"
                  onClick={() => handleNav('books')}
                  className="transition-colors text-left cursor-pointer text-slate-700 hover:text-[#1C6CD4] font-semibold"
                >
                  Books &amp; Publications
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => handleNav('services')}
                  className="transition-colors text-left cursor-pointer text-slate-700 hover:text-[#1C6CD4] font-semibold"
                >
                  Services • Advisory
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-leadership"
                  onClick={() => handleNav('leadership')}
                  className="transition-colors text-left cursor-pointer text-slate-700 hover:text-[#1C6CD4] font-semibold"
                >
                  Leadership &amp; Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Executive Engagement */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest font-black text-slate-900">
              EXECUTIVE ENGAGEMENT
            </h4>
            <p className="text-xs leading-relaxed text-slate-600 font-medium">
              Available for high-consequence project safety governance, ISO 45001 auditing diagnostics, and international keynote addresses.
            </p>

            <div className="pt-2 space-y-2.5">
              <button
                id="footer-btn-book-consultation"
                onClick={handleConsultationClick}
                className="w-full py-3 px-5 rounded-full font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer min-h-[44px] bg-[#1C6CD4] text-white hover:bg-[#155ab3] shadow-[#1C6CD4]/25 hover:scale-[1.02]"
              >
                <span>Book a Consultation Call</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                id="footer-btn-written-inquiry"
                onClick={handleFormalWrittenQueryClick}
                className="w-full py-3 px-5 rounded-full font-bold text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 transition-all text-center cursor-pointer min-h-[44px] flex items-center justify-center shadow-xs hover:scale-[1.02]"
              >
                <span>Submit a Formal Written Query</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-600 font-semibold">
          <p>© {new Date().getFullYear()} Engr. Iyenoma ThankGod Osazee. All rights reserved.</p>
          <p className="text-slate-500">
            Website designed &amp; developed by <span className="text-slate-900 font-bold">Gideon Ogunyemi</span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 transition-colors cursor-pointer text-slate-600 hover:text-[#1C6CD4] font-bold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
