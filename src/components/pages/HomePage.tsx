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
    <div className="space-y-20 sm:space-y-28 pt-24 sm:pt-32 pb-24 text-slate-900 transition-colors duration-200">

      {/* =========================================================================
          1. HERO SECTION (Obsidian Canvas with Luminous Accents)
          ========================================================================= */}
      <section className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Master Identification, Positioning & Two Clean CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Professional Identity Eyebrow with "|" separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              <span>HSE Professional</span>
              <span aria-hidden="true" className="text-neutral-500 font-normal">|</span>
              <span>Civil Engineering</span>
              <span aria-hidden="true" className="text-neutral-500 font-normal">|</span>
              <span>Author</span>
              <span aria-hidden="true" className="text-neutral-500 font-normal">|</span>
              <span>Safety Leader</span>
            </div>

            {/* Master Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-display font-black text-slate-900 tracking-tight leading-[1.08] uppercase">
              ENGINEERING ZERO-HARM AT MEGA-SCALE.
            </h1>

            {/* Positioning Statement */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
              Advancing safer workplaces through leadership, engineering rigor, and practical HSE experience. Directing corporate safety architecture at Julius Berger PLC across complex river bridges, highway corridors, and national infrastructure.
            </p>

            {/* On Smaller Screens: Portrait Image comes BEFORE the two buttons */}
            <div className="block lg:hidden my-6">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-xl group">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                </div>

                {/* Overlay Glass Caption */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                  <div className="space-y-1 text-left bg-white/95 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-slate-200 shadow-md">
                    <span className="text-[10px] sm:text-xs font-mono text-[#1C6CD4] uppercase tracking-wider font-bold">
                      CMIOSH · MNSE · Fellow ISPON
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug">
                      Engr. Iyenoma ThankGod Osazee
                    </h3>
                    <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed font-medium">
                      Uniting structural engineering science with occupational hygiene and systemic safety governance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Two Clean CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onSelectPage('about')}
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-sm tracking-tight transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectPage('contact')}
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 border-2 border-slate-300 font-bold text-sm transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-[#1C6CD4]" />
              </button>
            </div>

            {/* Factual Credibility Badges */}
            <div className="pt-3 border-t-2 border-slate-200 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-slate-800">
              <div className="flex items-center space-x-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">22+ Years Field Command</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-900">
                <CheckCircle2 className="w-4 h-4 text-[#1C6CD4]" />
                <span className="font-bold">CMIOSH UK #100175</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span className="font-bold">ISO 45001 Lead Auditor</span>
              </div>
            </div>

          </div>

          {/* Right Column: Desktop High-Fidelity Hero Showcase Card */}
          <div className="hidden lg:block lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-xl group">
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
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>

              {/* Overlay Glass Caption */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
                <div className="space-y-1 text-left bg-white/95 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-slate-200 shadow-md">
                  <span className="text-[10px] sm:text-xs font-mono text-[#1C6CD4] uppercase tracking-wider font-bold">
                    CMIOSH · MNSE · Fellow ISPON
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug">
                    Engr. Iyenoma ThankGod Osazee
                  </h3>
                  <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed font-medium">
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
             SECTION BACKGROUND: Clean Crisp Light Surface
          ========================================================================= */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/50 text-slate-900 shadow-xl border-2 border-slate-200 relative overflow-hidden">
        <div className="relative z-10 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold block mb-1">
                Executive Safety Metric Track Record
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
                Two Decades of Field Governance &amp; Accreditations
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#154E20] font-black tracking-wider">Experience</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-extrabold">Verified</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
                  <CountUp end={22} suffix="+" duration={1600} />
                </div>
                <div className="text-xs font-mono text-slate-900 font-extrabold">Years Field Command</div>
                <p className="text-[11px] text-slate-600 leading-snug pt-1 font-medium">
                  Leading civil safety directorship at Julius Berger PLC.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#1C6CD4] font-black tracking-wider">Credentials</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#1C6CD4] border border-blue-200 font-extrabold">Registry</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
                  <CountUp end={liveCredentials.length} suffix={liveCredentials.length >= 6 ? "+" : ""} duration={1200} />
                </div>
                <div className="text-xs font-mono text-slate-900 font-extrabold">Active Accreditations</div>
                <p className="text-[11px] text-slate-600 leading-snug pt-1 font-medium">
                  Managed in real-time from your CMS dashboard.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#1C6CD4] font-black tracking-wider">Publications</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#1C6CD4] border border-blue-200 font-extrabold">Scientific</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
                  <CountUp end={liveBooks.length} duration={1400} />
                </div>
                <div className="text-xs font-mono text-slate-900 font-extrabold">Authored Treatises</div>
                <p className="text-[11px] text-slate-600 leading-snug pt-1 font-medium">
                  Peer-reviewed scientific monographs &amp; research treatises.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white text-slate-900 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
                <span className="text-xs font-mono uppercase text-[#1C6CD4] font-black tracking-wider">Postgraduates</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-[#1C6CD4] border border-blue-200 font-extrabold">UK Degrees</span>
              </div>
              <div className="pt-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
                  <CountUp end={2} duration={1000} />
                </div>
                <div className="text-xs font-mono text-slate-900 font-extrabold">Dual Master Degrees</div>
                <p className="text-[11px] text-slate-600 leading-snug pt-1 font-medium">
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
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Experience Built Around Safety.
          </h2>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            Frontline safety on major civil infrastructure is never just a matter of signing checklists or reciting statutory regulations. It demands engineering comprehension of physics, material stresses, high-consequence lifting, and human decision-making under intense site conditions.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            As a Chartered Safety and Health Professional (CMIOSH) and Registered Professional Engineer (MNSE), Engr. Osazee brings together scientific inquiry in occupational hygiene with more than two decades of real-world project delivery at Julius Berger Nigeria PLC.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onSelectPage('about')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1C6CD4] hover:text-[#142C5C] transition-colors group cursor-pointer"
            >
              <span>Discover His Story</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SAFETY PHILOSOPHY ("My Approach to Safety")
             SECTION BACKGROUND: Soft Trust Horizon (#F0F7FF)
          ========================================================================= */}
      <section className="py-16 sm:py-20 px-8 sm:px-14 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50/40 to-slate-50 text-slate-900 shadow-xl border-2 border-blue-200/80 my-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-xs font-mono uppercase tracking-widest text-[#142C5C] font-bold border border-blue-200">
            My Approach to Safety
          </div>
          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif-editorial italic font-normal text-slate-900 leading-relaxed">
            &ldquo;Safety is not simply about rules. It is about people, responsibility, leadership, and the decisions we make when it matters.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-slate-600 font-mono font-medium">
            Safety Philosophy • Grounded in frontline construction ethics and systemic fail-safes.
          </p>
        </div>
      </section>

      {/* =========================================================================
          5. EXPERIENCE IN PRACTICE (3 Operational Pillars)
             Clean Crisp Light Surface with Vibrant Safety Accents & Hover Underlines
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#1C6CD4]">
            <Sparkles className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Operational Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Experience in Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-2xl leading-relaxed font-medium">
            How two decades of civil engineering leadership translate into proactive workplace protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-white hover:bg-slate-50 text-slate-900 shadow-lg space-y-4 border-2 border-slate-200 hover:border-[#1C6CD4] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#1C6CD4] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#1C6CD4]" />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                HSE Leadership
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                Strengthening site safety culture, frontline accountability, and cross-tier communication so every worker takes ownership of mutual protection.
              </p>
            </div>
            <div className="pt-3 text-xs font-mono text-[#1C6CD4] border-t border-slate-100 font-bold">
              Just Culture • Executive Oversight
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white hover:bg-slate-50 text-slate-900 shadow-lg space-y-4 border-2 border-slate-200 hover:border-[#96E2A5] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#154E20] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 group-hover:text-emerald-700 group-hover:underline decoration-[#96E2A5] decoration-2 underline-offset-4 transition-all leading-snug">
                Risk &amp; Compliance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                Certified ISO 45001 &amp; ISO 14001 Lead Auditor diagnostics. Identifying latent hazards and engineering predictive barriers before incidents occur.
              </p>
            </div>
            <div className="pt-3 text-xs font-mono text-emerald-800 border-t border-slate-100 font-bold">
              ISO 45001 • Statutory Audits
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white hover:bg-slate-50 text-slate-900 shadow-lg space-y-4 border-2 border-slate-200 hover:border-[#1C6CD4] transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#1C6CD4] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#1C6CD4]" />
              </div>
              <h3 className="text-xl font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                Knowledge &amp; Training
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                Translating engineering research into practical field tools—such as site risk assessment protocols and subcontractor safety coaching frameworks.
              </p>
            </div>
            <div className="pt-3 text-xs font-mono text-[#1C6CD4] border-t border-slate-100 font-bold">
              Applied Science • World Congress Speaker
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. FEATURED BOOKS ("Ideas Worth Sharing")
             FEATURED CARD BACKGROUND: Clean Light Editorial Canvas
          ========================================================================= */}
      {primaryFeaturedBook && (
        <section className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-slate-200 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
                Authored Publications
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
                Ideas Worth Sharing
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-mono max-w-xl font-medium">
                Explore published works shaped by professional experience, observation, and a commitment to advancing safety knowledge.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onSelectPage('books')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-mono font-bold transition-all self-start sm:self-auto cursor-pointer shadow-md"
            >
              <span>View All Library Works</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 1 Large Featured Book + 2 Secondary in Crisp White */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Primary Featured Book (Span 7) - Crisp Light Background */}
            <article className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/60 text-slate-900 border-2 border-slate-200 shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1C6CD4] font-bold border border-blue-200">
                    Featured Monograph
                  </span>
                  <span className="text-emerald-700 font-bold">{primaryFeaturedBook.publishedYear}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-black text-slate-900 leading-snug">
                  {primaryFeaturedBook.title}
                </h3>
                
                <p className="text-xs sm:text-sm font-mono text-[#1C6CD4] font-bold">
                  {primaryFeaturedBook.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {primaryFeaturedBook.abstract}
                </p>

                {primaryFeaturedBook.whatYoullLearn && (
                  <div className="pt-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-900 block mb-2 font-bold">
                      Key Practical Outcomes:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-800">
                      {primaryFeaturedBook.whatYoullLearn.slice(0, 3).map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-black">✓</span>
                          <span className="font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectBook(primaryFeaturedBook)}
                  className="px-6 py-3 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Explore the Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-mono text-slate-600 font-medium">
                  {primaryFeaturedBook.publisherOrJournal}
                </span>
              </div>
            </article>

            {/* 2 Secondary Books (Span 5) - Crisp White Cards with Jet Black Text */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {secondaryBooks.map((book) => (
                <article 
                  key={book.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200 shadow-md flex flex-col justify-between space-y-4 flex-1 text-slate-900"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#1C6CD4] font-bold">{book.format}</span>
                      <span className="text-slate-600 font-bold">{book.publishedYear}</span>
                    </div>
                    <h4 className="text-lg font-display font-black text-slate-900 leading-snug">
                      {book.title}
                    </h4>
                    <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed font-medium">
                      {book.abstract}
                    </p>
                  </div>

                  <div className="pt-3 border-t-2 border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onSelectBook(book)}
                      className="text-xs font-black text-[#1C6CD4] hover:text-[#142C5C] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Read Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">
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
             Clean Crisp Light Surface with Colorful Accents
          ========================================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Professional Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Chartered Accreditations &amp; Fellowships
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium">
              Selected Institutional Credentials &amp; Certifications
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPage('about')}
            className="text-xs font-mono font-bold text-slate-900 hover:text-[#1C6CD4] flex items-center gap-1.5 transition-colors cursor-pointer bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-300 shadow-xs"
          >
            <span>View Full Career Background</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#1C6CD4]" />
          </button>
        </div>

        {/* Responsive grid displaying top 4 credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {liveCredentials.slice(0, 4).map((cred) => (
            <div
              key={cred.id}
              className="p-6 rounded-3xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 hover:border-[#1C6CD4] transition-all duration-300 shadow-md hover:-translate-y-1 flex flex-col justify-between space-y-4 group cursor-pointer"
              onClick={() => onSelectPage('about')}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    cred.designation?.includes('CMIOSH') || cred.designation?.includes('MNSE')
                      ? 'bg-blue-50 text-[#1C6CD4] border-blue-200'
                      : cred.designation?.includes('Fellow') || cred.designation?.includes('Prize')
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {cred.designation}
                  </span>
                  {cred.year && (
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      {cred.year}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                  {cred.title}
                </h3>
                <p className="text-xs font-mono text-emerald-700 font-bold">
                  {cred.issuer}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 font-normal">
                  {cred.description}
                </p>
              </div>

              {cred.credentialId && (
                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500 font-semibold">
                  Ref: {cred.credentialId}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. TESTIMONIALS / WHAT COLLEAGUES SAY
             Clean Crisp Light Surface with Quote Accents
          ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#1C6CD4]">
            <Quote className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Institutional Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            What Colleagues Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-sans font-medium">
            Direct appraisals from operations directors, legislative panels, and peer review committees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#1C6CD4] text-slate-900 space-y-5 flex flex-col justify-between shadow-md transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div className="space-y-4">
                <Quote className="w-7 h-7 text-[#1C6CD4] group-hover:scale-110 transition-transform" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans italic font-normal">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-1">
                <h4 className="text-sm font-display font-bold text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                  {t.author}
                </h4>
                <p className="text-[11px] text-slate-500 font-mono font-medium">
                  {t.role} • {t.entity}
                </p>
                <div className="pt-1">
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4] font-bold">
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
             Clean Light Gradient Surface with Blue/Green Accents
          ========================================================================= */}
      <section className="p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-blue-50/60 text-slate-900 text-center space-y-6 relative overflow-hidden shadow-xl border-2 border-slate-200 hover:border-[#1C6CD4]/50 transition-all group">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-xs font-mono text-[#142C5C] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Executive Engagement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
            Ready to Build a Standard of Zero-Harm?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto font-sans font-medium">
            Whether you want to discuss a publication, explore executive safety governance for major works, or schedule technical advisory:
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => onSelectPage('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-black text-xs tracking-tight transition-all shadow-md hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
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
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-mono font-bold text-xs transition-all border-2 border-slate-300 shadow-sm hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book Consultation Call</span>
            <ArrowUpRight className="w-4 h-4 text-[#1C6CD4]" />
          </button>
        </div>
      </section>

    </div>
  );
};
