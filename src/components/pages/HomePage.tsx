import React from 'react';
import { PageId, BookItem } from '../../types';
import { CountUp } from '../CountUp';
import { useLivePortfolioData } from '../../hooks/useLivePortfolioData';
import { 
  ArrowUpRight, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  Quote, 
  Layers,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onSelectPage: (page: PageId) => void;
  onSelectBook: (book: BookItem) => void;
  onOpenBookingModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onSelectPage, 
  onSelectBook,
  onOpenBookingModal 
}) => {
  // Live reactive data from CMS Dashboard (credentials, books, projects)
  const { credentials: liveCredentials, books: liveBooks } = useLivePortfolioData();

  // Books: 1 large featured book + 2 secondary books
  const primaryFeaturedBook = liveBooks[0] || null;
  const secondaryBooks = liveBooks.slice(1, 3);

  // Authentic Testimonials
  const testimonials = [
    {
      quote: "Engr. Osazee brings a level of engineering rigor and meticulous safety discipline that transforms how complex civil undertakings are delivered. His leadership ensures zero compromise on human life across Nigeria's most demanding infrastructure corridors.",
      author: "Civil Engineering Directorate",
      role: "Executive Operations",
      entity: "Julius Berger Nigeria PLC",
      badge: "Operational Directorship"
    },
    {
      quote: "His strategic mediation within the House of Representatives Committee restored statutory stability and integrity to Nigeria's safety regulatory landscape, leading directly to the historic October 2024 national elections.",
      author: "Parliamentary Delegation",
      role: "House of Representatives Committee on Safety Standards",
      entity: "10th National Assembly of Nigeria",
      badge: "Statutory Governance"
    },
    {
      quote: "Selected out of over 1,100 global submissions for the 23rd World Congress in Sydney, his research on construction SME safety capacity offers a pragmatic, life-saving blueprint for developing world infrastructure.",
      author: "International Selection Committee",
      role: "Global Peer Review",
      entity: "23rd World Congress on Safety and Health at Work",
      badge: "Scientific Peer Review"
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pt-24 sm:pt-32 pb-24 text-black dark:text-[#e3e3e3] transition-colors duration-200">

      {/* =========================================================================
          1. HERO SECTION (Obsidian Canvas with Luminous Accents)
          ========================================================================= */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Master Identification, Positioning & Two Clean CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Professional Identity Eyebrow with "|" separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C6CD4] dark:text-[#60a5fa] font-bold">
              <span>HSE Professional</span>
              <span aria-hidden="true" className="text-neutral-500 font-normal">|</span>
              <span>Civil Engineering</span>
              <span aria-hidden="true" className="text-neutral-500 font-normal">|</span>
              <span>Author</span>
              <span aria-hidden="true" className="text-neutral-500 font-normal">|</span>
              <span>Safety Leader</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-display font-black text-black dark:text-white tracking-tight leading-[1.08] uppercase">
              ENGINEERING ZERO-HARM AT MEGA-SCALE.
            </h1>

            {/* Positioning Statement */}
            <p className="text-base sm:text-lg text-black dark:text-[#cbd5e1] leading-relaxed max-w-2xl font-medium">
              Advancing safer workplaces through leadership, engineering rigor, and practical HSE experience. Directing corporate safety architecture at Julius Berger PLC across complex river bridges, highway corridors, and national infrastructure.
            </p>

            {/* On Smaller Screens: Portrait Image comes BEFORE the two buttons */}
            <div className="block lg:hidden my-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl group">
                <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                  <img
                    src="/assets/portrait.jpg"
                    alt="Engr. Iyenoma ThankGod Osazee — Health, Safety and Environment Leader, Civil Engineer, and Author"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                </div>

                {/* Overlay Glass Caption (Julius Berger and Abuja Nigeria removed as requested) */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                  <div className="space-y-1 text-left bg-black/75 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-white/15">
                    <span className="text-[10px] sm:text-xs font-mono text-[#93c5fd] uppercase tracking-wider font-bold">
                      CMIOSH · MNSE · Fellow ISPON
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                      Engr. Iyenoma ThankGod Osazee
                    </h3>
                    <p className="text-xs text-white/90 font-sans line-clamp-2 leading-relaxed">
                      Uniting structural engineering science with occupational hygiene and systemic safety governance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Clean CTAs: "Explore My Work" (Ocean Blue #1C6CD4) and "Get in Touch" (Trust Navy #142C5C) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectPage('about')}
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-sm tracking-tight transition-all shadow-[0_8px_25px_rgba(28,108,212,0.4)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectPage('contact')}
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-[#142C5C] hover:bg-[#1b3874] text-white border border-[#1C6CD4]/30 font-bold text-sm transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-[#93c5fd]" />
              </button>
            </div>

            {/* Factual Credibility Badges */}
            <div className="pt-3 border-t-2 border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-black dark:text-[#94a3b8]">
              <div className="flex items-center space-x-1.5 text-[#154E20] dark:text-[#96E2A5]">
                <CheckCircle2 className="w-4 h-4 text-[#154E20] dark:text-[#96E2A5]" />
                <span className="font-bold">22+ Years Field Command</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[#142C5C] dark:text-[#93c5fd]">
                <CheckCircle2 className="w-4 h-4 text-[#1C6CD4] dark:text-[#60a5fa]" />
                <span className="font-bold">CMIOSH UK #100175</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[#154E20] dark:text-[#96E2A5]">
                <CheckCircle2 className="w-4 h-4 text-[#154E20] dark:text-[#96E2A5]" />
                <span className="font-bold">ISO 45001 Lead Auditor</span>
              </div>
            </div>

          </div>

          {/* Right Column: Desktop High-Fidelity Hero Showcase Card */}
          <div className="hidden lg:block lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900 shadow-2xl group">
              <div className="relative h-[440px] w-full overflow-hidden">
                <img
                  src="/assets/portrait.jpg"
                  alt="Engr. Iyenoma ThankGod Osazee — Health, Safety and Environment Leader, Civil Engineer, and Author"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              </div>

              {/* Overlay Glass Caption (Julius Berger and Abuja Nigeria removed as requested) */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                <div className="space-y-1 text-left bg-black/75 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-white/15">
                  <span className="text-[10px] sm:text-xs font-mono text-[#93c5fd] uppercase tracking-wider font-bold">
                    CMIOSH · MNSE · Fellow ISPON
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug">
                    Engr. Iyenoma ThankGod Osazee
                  </h3>
                  <p className="text-xs text-white/90 font-sans line-clamp-2 leading-relaxed">
                    Uniting structural engineering science with occupational hygiene and systemic safety governance.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          2. PROFESSIONAL SNAPSHOT (METRICS & EXPERIENCE)
             SECTION BACKGROUND: "Explore My Work" Ocean Blue (#1C6CD4)!
          ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#1C6CD4] text-white shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/25 pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-100 font-bold block mb-1">
                Executive Safety Metric Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                Two Decades of Field Governance &amp; Accreditations
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-6 rounded-2xl bg-white text-black shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#154E20] font-black tracking-wider">Experience</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#154E20]/15 text-[#154E20] font-extrabold">Verified</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-black tracking-tight">
                  <CountUp end={22} suffix="+" duration={1600} />
                </div>
                <div className="text-xs font-mono text-black font-extrabold">Years Field Command</div>
                <p className="text-[11px] text-neutral-800 leading-snug pt-1 font-medium">
                  Leading civil safety directorship at Julius Berger PLC.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white text-black shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#142C5C] font-black tracking-wider">Credentials</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#142C5C]/15 text-[#142C5C] font-extrabold">Registry</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-black tracking-tight">
                  <CountUp end={liveCredentials.length} suffix={liveCredentials.length >= 6 ? "+" : ""} duration={1200} />
                </div>
                <div className="text-xs font-mono text-black font-extrabold">Active Accreditations</div>
                <p className="text-[11px] text-neutral-800 leading-snug pt-1 font-medium">
                  Managed in real-time from your CMS dashboard.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white text-black shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#1C6CD4] font-black tracking-wider">Publications</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1C6CD4]/15 text-[#1C6CD4] font-extrabold">Scientific</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-black tracking-tight">
                  <CountUp end={liveBooks.length} duration={1400} />
                </div>
                <div className="text-xs font-mono text-black font-extrabold">Authored Treatises</div>
                <p className="text-[11px] text-neutral-800 leading-snug pt-1 font-medium">
                  Peer-reviewed scientific monographs &amp; research treatises.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white text-black shadow-lg flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#142C5C] font-black tracking-wider">Postgraduates</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#142C5C]/15 text-[#142C5C] font-extrabold">UK Degrees</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-black tracking-tight">
                  <CountUp end={2} duration={1000} />
                </div>
                <div className="text-xs font-mono text-black font-extrabold">Dual Master Degrees</div>
                <p className="text-[11px] text-neutral-800 leading-snug pt-1 font-medium">
                  Civil Engineering (Heriot-Watt) &amp; OEHSM (Portsmouth).
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          3. SHORT INTRODUCTION (Crisp White Canvas with Jet Black High-Contrast Text)
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Background &amp; Identity
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-black dark:text-white tracking-tight leading-tight">
            Experience Built Around Safety.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="text-base sm:text-lg text-black dark:text-[#c4c7c5] leading-relaxed font-medium">
            Frontline safety on major civil infrastructure is never just a matter of signing checklists or reciting statutory regulations. It demands engineering comprehension of physics, material stresses, high-consequence lifting, and human decision-making under intense site conditions.
          </p>
          <p className="text-sm sm:text-base text-neutral-900 dark:text-neutral-300 leading-relaxed font-normal">
            As a Chartered Safety and Health Professional (CMIOSH) and Registered Professional Engineer (MNSE), Engr. Osazee brings together scientific inquiry in occupational hygiene with more than two decades of real-world project delivery at Julius Berger Nigeria PLC.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onSelectPage('about')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1C6CD4] hover:text-[#142C5C] dark:text-[#a8c7fa] dark:hover:text-white transition-colors group cursor-pointer"
            >
              <span>Discover His Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SAFETY PHILOSOPHY ("My Approach to Safety")
             SECTION BACKGROUND: "Get in Touch" Trust Navy (#142C5C)!
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-8 sm:px-14 rounded-3xl bg-[#142C5C] text-white shadow-2xl border border-[#1C6CD4]/30 my-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#93c5fd] font-bold border border-white/20">
            My Approach to Safety
          </div>
          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif-editorial italic font-normal text-white leading-relaxed">
            &ldquo;Safety is not simply about rules. It is about people, responsibility, leadership, and the decisions we make when it matters.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-sky-100 font-mono font-medium">
            Safety Philosophy • Grounded in frontline construction ethics and systemic fail-safes.
          </p>
        </div>
      </section>

      {/* =========================================================================
          5. EXPERIENCE IN PRACTICE (3 Operational Pillars)
             Obsidian Surface with Vibrant Safety Accents & Hover Underlines
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#1C6CD4]">
            <Sparkles className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Operational Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Experience in Practice
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans max-w-2xl leading-relaxed">
            How two decades of civil engineering leadership translate into proactive workplace protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] text-white shadow-xl space-y-4 border border-white/10 hover:border-[#1C6CD4]/60 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C6CD4]/15 border border-[#1C6CD4]/30 text-[#93c5fd] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#1C6CD4]" />
              </div>
              <h3 className="text-xl font-display font-black text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                HSE Leadership
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
                Strengthening site safety culture, frontline accountability, and cross-tier communication so every worker takes ownership of mutual protection.
              </p>
            </div>
            <div className="pt-3 text-xs font-mono text-[#93c5fd] border-t border-white/10 font-bold">
              Just Culture • Executive Oversight
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] text-white shadow-xl space-y-4 border border-white/10 hover:border-[#96E2A5]/60 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#154E20]/25 border border-[#96E2A5]/30 text-[#96E2A5] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-[#96E2A5]" />
              </div>
              <h3 className="text-xl font-display font-black text-white group-hover:text-[#96E2A5] group-hover:underline decoration-[#96E2A5] decoration-2 underline-offset-4 transition-all leading-snug">
                Risk &amp; Compliance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
                Certified ISO 45001 &amp; ISO 14001 Lead Auditor diagnostics. Identifying latent hazards and engineering predictive barriers before incidents occur.
              </p>
            </div>
            <div className="pt-3 text-xs font-mono text-[#96E2A5] border-t border-white/10 font-bold">
              ISO 45001 • Statutory Audits
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] text-white shadow-xl space-y-4 border border-white/10 hover:border-[#1C6CD4]/60 transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1C6CD4]/15 border border-[#1C6CD4]/30 text-[#93c5fd] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#1C6CD4]" />
              </div>
              <h3 className="text-xl font-display font-black text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                Knowledge &amp; Training
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
                Translating engineering research into practical field tools—such as site risk assessment protocols and subcontractor safety coaching frameworks.
              </p>
            </div>
            <div className="pt-3 text-xs font-mono text-[#93c5fd] border-t border-white/10 font-bold">
              Applied Science • World Congress Speaker
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. FEATURED BOOKS ("Ideas Worth Sharing")
             FEATURED CARD BACKGROUND: "Get in Touch" Trust Navy (#142C5C)!
          ========================================================================= */}
      {primaryFeaturedBook && (
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-slate-200 dark:border-white/10 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
                Authored Publications
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-black dark:text-white tracking-tight">
                Ideas Worth Sharing
              </h2>
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-[#8e918f] font-mono max-w-xl font-medium">
                Explore published works shaped by professional experience, observation, and a commitment to advancing safety knowledge.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPage('books')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-[#1C6CD4] text-xs font-mono font-bold transition-all self-start sm:self-auto cursor-pointer shadow-md"
            >
              <span>View All Library Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1 Large Featured Book in Trust Navy (#142C5C) + 2 Secondary in Crisp White */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Primary Featured Book (Span 7) - Trust Navy Background */}
            <article className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#142C5C] text-white border border-[#1C6CD4]/40 shadow-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-white/15 text-[#93c5fd] font-bold border border-white/20">
                    Featured Monograph
                  </span>
                  <span className="text-sky-100 font-bold">{primaryFeaturedBook.publishedYear}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-snug">
                  {primaryFeaturedBook.title}
                </h3>
                
                <p className="text-xs sm:text-sm font-mono text-[#93c5fd] font-bold">
                  {primaryFeaturedBook.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                  {primaryFeaturedBook.abstract}
                </p>

                {primaryFeaturedBook.whatYoullLearn && (
                  <div className="pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#93c5fd] block mb-2 font-bold">
                      Key Practical Outcomes:
                    </span>
                    <ul className="space-y-1.5 text-xs text-white">
                      {primaryFeaturedBook.whatYoullLearn.slice(0, 3).map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#96E2A5] font-black">✓</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectBook(primaryFeaturedBook)}
                  className="px-6 py-3 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <span>Explore the Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-mono text-sky-100">
                  {primaryFeaturedBook.publisherOrJournal}
                </span>
              </div>
            </article>

            {/* 2 Secondary Books (Span 5) - Crisp White Cards with Jet Black Text */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {secondaryBooks.map((book) => (
                <article 
                  key={book.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-white/10 shadow-lg flex flex-col justify-between space-y-4 flex-1 text-black dark:text-white"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#1C6CD4] font-bold">{book.format}</span>
                      <span className="text-neutral-800 dark:text-neutral-400 font-bold">{book.publishedYear}</span>
                    </div>
                    <h4 className="text-lg font-display font-black text-black dark:text-white leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-black dark:text-[#c4c7c5] line-clamp-3 leading-relaxed font-medium">
                      {book.abstract}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-slate-100 dark:border-white/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      className="text-xs font-black text-[#1C6CD4] hover:text-[#142C5C] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Read Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-mono text-neutral-800 dark:text-neutral-400 font-semibold">
                      {book.publisherOrJournal ? book.publisherOrJournal.split('•')[0] : 'Research Treatise'}
                    </span>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* =========================================================================
          7. SELECTED CREDENTIALS (Accreditations, Fellowships & Chartered Standing)
             Obsidian Surface with Luminous Borders & Colorful Accents
          ========================================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Professional Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
              Chartered Accreditations &amp; Fellowships
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-sans">
              Selected Institutional Credentials &amp; Certifications
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPage('about')}
            className="text-xs font-mono font-bold text-white hover:text-[#93c5fd] flex items-center gap-1.5 transition-colors cursor-pointer bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <span>View Full Career Background</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1C6CD4]" />
          </button>
        </div>

        {/* Responsive grid displaying top 4 credentials in obsidian black cards with vivid accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveCredentials.slice(0, 4).map((cred) => (
            <div
              key={cred.id}
              className="p-6 rounded-3xl bg-[#11141c] hover:bg-[#141824] text-white border border-white/10 hover:border-[#1C6CD4]/60 transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(28,108,212,0.18)] hover:-translate-y-1 flex flex-col justify-between space-y-4 group cursor-pointer"
              onClick={() => onSelectPage('about')}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    cred.designation?.includes('CMIOSH') || cred.designation?.includes('MNSE')
                      ? 'bg-[#1C6CD4]/15 text-[#93c5fd] border-[#1C6CD4]/30'
                      : cred.designation?.includes('Fellow') || cred.designation?.includes('Prize')
                      ? 'bg-amber-400/10 text-[#fbbf24] border-amber-400/30'
                      : 'bg-[#154E20]/25 text-[#96E2A5] border-[#96E2A5]/30'
                  }`}>
                    {cred.designation}
                  </span>
                  {cred.year && (
                    <span className="text-[10px] font-mono text-neutral-400 font-bold">
                      {cred.year}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-display font-black text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                  {cred.title}
                </h3>
                <p className="text-xs font-mono text-[#96E2A5] font-bold">
                  {cred.issuer}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans line-clamp-3 font-normal">
                  {cred.description}
                </p>
              </div>

              {cred.credentialId && (
                <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-neutral-400 font-semibold">
                  Ref: {cred.credentialId}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. TESTIMONIALS / WHAT COLLEAGUES SAY
             Obsidian Surface with Luminous Borders & Quote Accents
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#1C6CD4]">
            <Quote className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Institutional Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            What Colleagues Say
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans">
            Direct appraisals from operations directors, legislative panels, and peer review committees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] border border-white/10 hover:border-[#1C6CD4]/60 text-white space-y-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-[#1C6CD4] group-hover:scale-110 transition-transform" />
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans italic font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1">
                <h4 className="text-sm font-display font-bold text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                  {t.author}
                </h4>
                <p className="text-[11px] text-neutral-400 font-mono">
                  {t.role} • {t.entity}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#1C6CD4]/15 border border-[#1C6CD4]/30 text-[#93c5fd] font-bold">
                    {t.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. FINAL CONTACT CTA
             Obsidian Surface with Blue/Green Gradient Accents
          ========================================================================= */}
      <section className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#11141c] to-[#161c28] text-white text-center space-y-6 relative overflow-hidden shadow-2xl border border-white/15 hover:border-[#1C6CD4]/50 transition-all group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1C6CD4]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1C6CD4]/20 transition-all" />

        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C6CD4]/20 border border-[#1C6CD4]/30 text-xs font-mono text-[#93c5fd] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#96E2A5]" />
            <span>Executive Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Ready to Build a Standard of Zero-Harm?
          </h2>
          <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto font-sans">
            Whether you want to discuss a publication, explore executive safety governance for major works, or schedule technical advisory:
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onSelectPage('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-black text-xs tracking-tight transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenBookingModal) {
                onOpenBookingModal();
              } else {
                onSelectPage('contact');
              }
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-mono font-bold text-xs transition-all border border-white/20 shadow-xl hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Consultation Call</span>
            <ArrowUpRight className="w-4 h-4 text-[#96E2A5]" />
          </button>
        </div>
      </section>

    </div>
  );
};
