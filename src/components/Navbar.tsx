import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticButton } from './common/MagneticButton';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ShieldCheck, 
  BookOpen, 
  User, 
  Briefcase,
  Layers,
  Award,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onOpenBookingModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Original HSE-Port Navigation suite
  const navItems: { id: PageId; label: string; number: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', number: '01', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'about', label: 'About', number: '02', icon: <User className="w-4 h-4" /> },
    { id: 'works', label: 'Works', number: '03', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'books', label: 'Books', number: '04', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'services', label: 'Services', number: '05', icon: <Layers className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', number: '06', icon: <Award className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', number: '07', icon: <PhoneCall className="w-4 h-4" /> }
  ];

  const isNavActive = (id: PageId) => {
    if (currentPage === id) return true;
    if (currentPage === 'overview' && id === 'home') return true;
    if (currentPage === 'publications' && id === 'books') return true;
    if (currentPage === 'advisory' && id === 'services') return true;
    return false;
  };

  const handleNavClick = (id: PageId) => {
    onSelectPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConnectClick = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal();
    } else {
      handleNavClick('services');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'pt-2.5 sm:pt-3' : 'pt-4 sm:pt-6'}`}>
        <nav 
          aria-label="Main Navigation"
          className={`dialed-glass-nav rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between border transition-all duration-300 backdrop-blur-2xl text-slate-900 ${
            isScrolled 
              ? 'bg-white/95 border-slate-300/80 shadow-lg shadow-slate-900/5' 
              : 'bg-white/85 border-slate-200/90 shadow-md'
          }`}
        >
          {/* Brand Mark & Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm tracking-wider select-none shrink-0 transition-transform duration-300 group-hover:scale-105 bg-gradient-to-br from-[#1C6CD4] to-[#142C5C] text-white shadow-md shadow-[#142C5C]/20 border border-[#1C6CD4]/40">
              TG
            </div>
            <div className="text-left flex flex-col justify-center">
              <span className="text-xs sm:text-sm font-display font-black tracking-tight text-slate-900 group-hover:text-[#1C6CD4] transition-colors">
                Engr. Iyenoma ThankGod Osazee
              </span>
              <div className="flex items-center space-x-1.5 text-[10px] sm:text-[11px] font-mono leading-none text-slate-500 font-semibold">
                <span className="text-[#154E20] font-bold">CMIOSH</span>
                <span className="opacity-40">•</span>
                <span>Civil Engineer</span>
                <span className="opacity-40">•</span>
                <span>HSE Leader</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links with Animated Layout Tab */}
          <div className="hidden lg:flex items-center space-x-1 font-mono text-xs relative">
            {navItems.map((item) => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer font-bold ${
                    active
                      ? 'text-[#1C6CD4]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-blue-50 border border-blue-200 shadow-2xs -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop Actions: "Book Call" with Magnetic Pull */}
          <div className="hidden sm:flex items-center space-x-2">
            <MagneticButton
              onClick={handleConnectClick}
              className="py-2 px-4.5 rounded-full font-mono font-bold text-xs tracking-tight transition-all flex items-center space-x-2 shadow-md bg-[#1C6CD4] hover:bg-[#155ab3] text-white shadow-[#1C6CD4]/25 border border-[#1C6CD4]/30 group"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span>Book Call</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
          </div>

          {/* Mobile Actions: "Book Call" compact button & Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={handleConnectClick}
              className="py-1.5 px-3 rounded-full font-mono font-bold text-[11px] tracking-tight transition-all flex items-center space-x-1.5 shadow-md cursor-pointer bg-[#1C6CD4] hover:bg-[#155ab3] text-white"
            >
              <span>Book Call</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Navigation"
              className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5 text-slate-800" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl flex flex-col justify-between p-6 text-slate-900 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1C6CD4] to-[#142C5C] text-white font-bold text-xs flex items-center justify-center border border-[#1C6CD4]/40">
                TG
              </div>
              <div className="text-left">
                <span className="font-display font-black text-sm text-slate-900 block">
                  Engr. Iyenoma Osazee
                </span>
                <span className="text-[10px] font-mono text-[#154E20] font-bold">
                  CMIOSH • Executive HSE Leader
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Mobile Navigation"
              className="p-2 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-2 py-4 font-mono text-sm overflow-y-auto">
            {navItems.map((item) => {
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-50 text-[#1C6CD4] border border-blue-200 font-bold shadow-xs'
                      : 'text-slate-800 hover:bg-slate-100 font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-[#1C6CD4]">{item.icon}</span>
                    <span className="font-bold">{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleConnectClick();
              }}
              className="w-full py-3.5 rounded-full font-mono font-bold text-xs bg-[#1C6CD4] text-white flex items-center justify-center space-x-2 shadow-lg shadow-[#1C6CD4]/25 hover:bg-[#155ab3] cursor-pointer transition-all"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Book Consultation Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] font-mono font-bold text-center text-slate-500">
              Executive HSE Leader • Civil Engineer &amp; Author
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
