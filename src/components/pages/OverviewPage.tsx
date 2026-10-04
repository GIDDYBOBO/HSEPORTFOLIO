import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { FadeUpSection } from '../common/FadeUpSection';
import { 
  CREDENTIALS, 
  ACADEMIC_QUALIFICATIONS, 
  CAREER_HISTORY, 
  PROFILE_SUMMARY
} from '../../data/profileData';
import { SIGNATURE_WORKS, Megaproject } from '../../data/projectsData';
import { BOOKS_AND_PUBLICATIONS } from '../../data/booksData';
import { CaseStudyModal } from '../modals/CaseStudyModal';
import { CountUp } from '../CountUp';
import { usePerceivedLoading, ProjectsListSkeleton } from '../common/Skeletons';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Award, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Sliders, 
  PhoneCall, 
  TrendingUp, 
  FileText, 
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Quote,
  Star,
  Activity,
  Calendar,
  AlertTriangle,
  ArrowDownUp,
  BookOpen,
  Library,
  Compass,
  Check,
  Search,
  BadgeCheck,
  UserCheck
} from 'lucide-react';

interface OverviewPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
  onOpenCredentialsModal?: () => void;
  onSelectBook?: (bookId: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ 
  onSelectPage,
  onOpenBookingModal,
  onOpenCredentialsModal,
  onSelectBook
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timelineOrder, setTimelineOrder] = useState<'desc' | 'asc'>('desc');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Megaproject | null>(null);
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  // Instant local rendering without artificial delays
  const isProjectsLoading = false;

  const categories = [
    { id: 'all', label: 'All Megaprojects' },
    { id: 'Bridges & Marine', label: 'Bridges & Marine' },
    { id: 'Expressways & Corridors', label: 'Expressways & Corridors' },
    { id: 'Heavy Civil & High-Rise', label: 'Heavy Civil & High-Rise' },
    { id: 'Environmental & Industrial', label: 'Environmental Remediation' },
    { id: 'Statutory Governance', label: 'Statutory Governance' }
  ];

  const filteredProjects = [...SIGNATURE_WORKS]
    .filter((p) => {
      if (selectedCategory === 'all') return true;
      return p.category === selectedCategory;
    })
    .sort((a, b) => {
      return timelineOrder === 'desc' 
        ? b.startYear - a.startYear 
        : a.startYear - b.startYear;
    });

  const services = [
    {
      number: '01',
      title: 'Mega-Infrastructure Safety Directorship & Executive Governance',
      desc: 'Enterprise-level occupational safety governance for complex civil engineering schemes, bridges, highway corridors, and multi-tier public works.',
      deliverables: [
        'Site-specific safety cases & high-consequence lifting regimes',
        'Zero-harm behavioral frameworks tailored for multicultural workforces',
        'Real-time contractor compliance dashboards and risk registries',
        'Executive board safety advisory and client liaison'
      ],
      tag: 'Strategic Directorship'
    },
    {
      number: '02',
      title: 'ISO 45001 & ISO 14001 Integrated Systems & Auditing',
      desc: 'Global benchmark OHSMS and EMS diagnostics as a certified Lead Auditor, eliminating single-point organizational failure modes.',
      deliverables: [
        'ISO 45001:2018 comprehensive systems certification auditing',
        'ISO 14001:2015 environmental impact attenuation audits',
        'Legal compliance verification under Nigerian & British statutory codes',
        'Corrective action architecture and preventative barrier design'
      ],
      tag: 'Lead Auditor #423290'
    },
    {
      number: '03',
      title: 'Bioclimatic Thermal Stress & Severe Weather Field Mitigation',
      desc: 'Applied environmental ergonomics for extreme outdoor heat, asphalt laydown, and heavy manual labour in tropical sub-Saharan climates.',
      deliverables: [
        'Calibrated thermal index mapping and microclimatic heat monitoring',
        'Metabolic work-rest cycle schedules preventing heat syncope',
        'On-site electrolyte hydration protocols & biometric monitoring',
        'Field-validated risk protocols deployed across frontline gangs'
      ],
      tag: 'BOHS Bursary Pedigree'
    },
    {
      number: '04',
      title: 'Construction SME & Subcontractor Safety Capacity Building',
      desc: 'Empirically tested safety coaching methodology selected from 1,100+ submissions at the 23rd World Congress on Safety and Health in Sydney.',
      deliverables: [
        'Non-punitive safety coaching models for informal contractors',
        'Practical hazard communication avoiding bureaucratic paralysis',
        'Tier-1 supply chain alignment for developing construction markets',
        'Cost-neutral safety interventions delivering verified LTIFR cuts'
      ],
      tag: 'World Congress Selected'
    },
    {
      number: '05',
      title: 'Keynote Addresses, Board Masterclasses & CMIOSH Mentorship',
      desc: 'Inspiring international keynote presentations and executive mentoring for senior safety professionals preparing for IOSH peer review.',
      deliverables: [
        'Signature keynotes on Just Culture & Engineering Safety Integration',
        'Parliamentary & regulatory advisory for statutory commissions',
        'CMIOSH Peer Review Interview preparation and portfolio review',
        'Corporate leadership seminars on psychological safety and zero blame'
      ],
      tag: 'IOSH Peer Panelist'
    }
  ];

  const testimonials = [
    {
      quote: "Engr. Osazee brings a level of engineering rigor and meticulous safety discipline that transforms how complex civil undertakings are delivered. His leadership ensures zero compromise on human life across the country's most demanding infrastructure corridors.",
      author: "Julius Berger Civil Engineering Directorate",
      role: "Executive Operations & Megaproject Leadership",
      entity: "Julius Berger Nigeria PLC",
      badge: "Corporate Leadership"
    },
    {
      quote: "His strategic mediation within the House of Representatives Committee restored statutory stability and integrity to Nigeria's safety regulatory landscape, leading directly to the historic October 2024 national elections.",
      author: "Parliamentary Sub-Committee Delegation",
      role: "House of Representatives Committee on Safety Standards",
      entity: "10th National Assembly of Nigeria",
      badge: "Statutory Governance"
    },
    {
      quote: "Selected out of over 1,100 global submissions for the 23rd World Congress in Sydney, his research on construction SME safety capacity offers a pragmatic, life-saving blueprint for developing world infrastructure.",
      author: "International Peer Review Committee",
      role: "Global Selection Panel",
      entity: "23rd World Congress on Safety and Health at Work (Sydney)",
      badge: "Global Research Peer"
    },
    {
      quote: "Serving on the IOSH Chartered Membership Peer Review Interview Panel, Engr. Osazee upholds the highest standards of professional competence and ethics that define global chartered safety practitioners.",
      author: "Chartered Assessment Body",
      role: "Professional Standards & Peer Review",
      entity: "Institution of Occupational Safety and Health (IOSH UK)",
      badge: "CMIOSH Accreditation"
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-28 pt-20 sm:pt-24 pb-16 sm:pb-20">
      
      {/* 1. HERO SECTION (High-Impact Hero with Prominent Megaproject & Safety Directorship Image) */}
      <FadeUpSection 
        as="section"
        className="relative pt-2 sm:pt-6 md:pt-10"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[420px] sm:h-[520px] dialed-glow pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Headline & Executive Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
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
            
            {/* Giant Bold Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08] uppercase">
              ENGINEERING ZERO-HARM AT MEGA-SCALE.
            </h1>

            {/* Grounded Value Proposition */}
            <p className="text-sm sm:text-base md:text-lg text-[#c4c7c5] leading-relaxed font-normal">
              Directing corporate occupational safety architecture across Nigeria&apos;s landmark civil engineering megaprojects at Julius Berger PLC. Delivering 50,000,000+ incident-free man-hours through predictive hazard modeling, ISO 45001 auditing diagnostics, and bioclimatic thermal ergonomics.
            </p>

            {/* High-Intent Dialed Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] font-bold text-xs sm:text-sm tracking-tight transition-all shadow-[0_8px_25px_rgba(255,255,255,0.25)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#signature-works-section"
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full dialed-glass-pill hover:bg-white/15 text-white border border-white/20 font-semibold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>Signature Works</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectPage('works')}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full dialed-glass-pill hover:bg-white/15 text-[#c4c7c5] hover:text-white border border-white/20 font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#a8c7fa]" />
                <span>Featured Works</span>
              </button>
            </div>

            {/* Verification Proof Strip */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>50M+ Man-Hours</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>0.00 LTIFR Marine</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>ISO 45001 / 14001 Lead Auditor</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Visual Hero Image Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] group">
              <div className="relative h-72 sm:h-96 lg:h-[440px] w-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Industrial Health, Safety and Environmental (HSE) Field Protection, Safety Helmet and Technical Equipment"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=1200';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.90] contrast-[1.08]"
                />
                
                {/* Vignette Gradients for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
              </div>

              {/* Overlay Glass Tags & Captions */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                    <span>HSE Systems &amp; Operational Safety</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-neutral-300 text-[10px] font-mono">
                    50M+ Man-Hours
                  </span>
                </div>

                <div className="space-y-1.5 text-left bg-black/60 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#a8c7fa] uppercase tracking-wider font-semibold">
                    <span>Proactive HSE Governance</span>
                    <span className="text-white">LTIFR: 0.00</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white leading-snug drop-shadow-sm">
                    Holistic Health, Safety &amp; Environmental Leadership
                  </h3>
                  <p className="text-xs text-neutral-300 font-sans line-clamp-2 leading-relaxed">
                    Protecting every life through predictive risk controls, rigorous ISO 45001 auditing, high-consequence engineering fail-safes, and human-centered safety culture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* 2. KEY PERFORMANCE INDICATORS ("Numbers That Just Make Sense" - Dialedweb Pattern) */}
      <FadeUpSection 
        as="section"
        id="kpi-metrics-section" 
        className="space-y-8 scroll-mt-24 pt-4 sm:pt-6"
      >
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-neutral-200/90 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-[11px] font-mono shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
            <span>Key Performance Indicators • Dynamic Active Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Numbers That Just Make Sense
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono">
            Relentlessly standard-driven, engineering zero-harm environments across West Africa&apos;s largest infrastructure corridors.
          </p>
        </div>

        {/* Big KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Frontline Tenure */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] group-hover:text-white transition-colors tracking-wider font-semibold">Frontline Tenure</span>
              <span className="text-[10px] font-mono text-[#8e918f] group-hover:text-[#c4c7c5] transition-colors">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-white tracking-tight shrink-0">
                  <CountUp 
                    end={22} 
                    suffix="+" 
                    duration={1600} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-[#c4c7c5] font-medium">
                  Years
                </span>
              </div>
              <p className="text-xs text-[#c4c7c5] leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Executive HSE leadership delivering landmark national infrastructure at Julius Berger PLC.
              </p>
            </div>
          </div>

          {/* Card 2: Operational Exposure */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] group-hover:text-white transition-colors tracking-wider font-semibold">Operational Exposure</span>
              <span className="text-[10px] font-mono text-[#8e918f] group-hover:text-[#c4c7c5] transition-colors">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-white tracking-tight shrink-0">
                  <CountUp 
                    end={50} 
                    suffix="M+" 
                    duration={1800} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-[#c4c7c5] font-medium">
                  Hours
                </span>
              </div>
              <p className="text-xs text-[#c4c7c5] leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Supervised safe work-hours under zero-fatal incident protocols across live multi-tier civil schemes.
              </p>
            </div>
          </div>

          {/* Card 3: Global Recognition */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] group-hover:text-white transition-colors tracking-wider font-semibold">Global Selection</span>
              <span className="text-[10px] font-mono text-[#8e918f] group-hover:text-[#c4c7c5] transition-colors">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-white tracking-tight shrink-0">
                  <CountUp 
                    end={1100} 
                    suffix="+" 
                    duration={2000} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-[#c4c7c5] font-medium">
                  Submissions
                </span>
              </div>
              <p className="text-xs text-[#c4c7c5] leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Selected speaker at the 23rd World Congress on Safety and Health at Work in Sydney, Australia.
              </p>
            </div>
          </div>

          {/* Card 4: Chartered Rigor */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] group-hover:text-white transition-colors tracking-wider font-semibold">Chartered Rigor</span>
              <span className="text-[10px] font-mono text-[#8e918f] group-hover:text-[#c4c7c5] transition-colors">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-white tracking-tight shrink-0">
                  <CountUp 
                    end={2} 
                    duration={1200} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-[#c4c7c5] font-medium">
                  Master Degrees
                </span>
              </div>
              <p className="text-xs text-[#c4c7c5] leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Civil Engineering (Heriot-Watt, Edinburgh) & Environmental OSH (Portsmouth, UK).
              </p>
            </div>
          </div>
        </div>

        {/* Verifiable Credentials Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-mono text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-white/5">
          <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300" />
            ISO 45001 Lead Auditor (#423290)
          </span>
          <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-300">
            <Award className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300" />
            IOSH Chartered Fellow Assessor (#100175)
          </span>
          <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300" />
            Registered Professional Engineer (MNSE)
          </span>
        </div>
      </FadeUpSection>

      {/* 2B. EXECUTIVE PROFILE SCANNING GRID (Review Item #4: Visual Chunks) */}
      <FadeUpSection
        as="section"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-[#333538] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-300 font-bold">
              Executive Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              A Record of Leadership &amp; Rigor
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono max-w-xl">
              Rapid visual overview of professional experience, chartered accreditations, dual master’s degrees, and technical publications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPage('about')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white text-xs font-mono font-medium transition-all shrink-0 self-start sm:self-end dark:border-[#333538] cursor-pointer shadow-sm"
          >
            <span>Read Full Biography</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Visual Chunks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Chunk 1: Professional Experience */}
          <div className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] font-bold">01 • Experience</span>
              <Building2 className="w-4 h-4 text-[#a8c7fa]" />
            </div>
            <h3 className="text-lg font-display font-bold text-white leading-snug">22+ Years Heavy Civil HSE</h3>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Leading corporate safety architecture at Julius Berger Nigeria PLC across high-consequence river bridges, metropolitan expressways, deep piling, and industrial facilities.
            </p>
            <div className="text-[11px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
              Zero-fatal incident protocols across 50M+ exposure hours.
            </div>
          </div>

          {/* Chunk 2: Dual Master's Degrees */}
          <div className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] font-bold">02 • Education</span>
              <GraduationCap className="w-4 h-4 text-[#a8c7fa]" />
            </div>
            <h3 className="text-lg font-display font-bold text-white leading-snug">Dual British Postgraduates</h3>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              MSc Civil Engineering &amp; Construction Management (Heriot-Watt University, Edinburgh) and MSc Occupational &amp; Environmental Health Safety (University of Portsmouth, UK).
            </p>
            <div className="text-[11px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
              Bridge structural science united with industrial hygiene.
            </div>
          </div>

          {/* Chunk 3: Chartered Certifications */}
          <div className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] font-bold">03 • Certifications</span>
              <ShieldCheck className="w-4 h-4 text-[#a8c7fa]" />
            </div>
            <h3 className="text-lg font-display font-bold text-white leading-snug">CMIOSH &amp; Lead Auditor</h3>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Chartered Safety and Health Professional (CMIOSH UK #100175), certified ISO 45001 / ISO 14001 Lead Auditor (#423290), and COREN Registered Engineer.
            </p>
            <div className="text-[11px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
              Qualified peer assessor for chartered membership.
            </div>
          </div>

          {/* Chunk 4: Professional Memberships */}
          <div className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] font-bold">04 • Memberships</span>
              <Award className="w-4 h-4 text-[#a8c7fa]" />
            </div>
            <h3 className="text-lg font-display font-bold text-white leading-snug">Institutional Fellowships</h3>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Fellow of the Institute of Safety Professionals of Nigeria (FISPON #004), Member of the Nigerian Society of Engineers (MNSE #21200), and IOSH UK.
            </p>
            <div className="text-[11px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
              Active legislative mediator for parliamentary standards.
            </div>
          </div>

          {/* Chunk 5: Publications & Thought Leadership */}
          <div className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] font-bold">05 • Publications</span>
              <BookOpen className="w-4 h-4 text-[#a8c7fa]" />
            </div>
            <h3 className="text-lg font-display font-bold text-white leading-snug">Books &amp; Scientific Research</h3>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Author of published monographs on thermal ergonomics, municipal landfill kinetics, and 23rd World Congress Sydney speaker.
            </p>
            <div className="text-[11px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
              ResearchGate Series &amp; Peer-Reviewed Scientific Treatises.
            </div>
          </div>

          {/* Chunk 6: Areas of Expertise */}
          <div className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#a8c7fa] font-bold">06 • Core Practice</span>
              <Layers className="w-4 h-4 text-[#a8c7fa]" />
            </div>
            <h3 className="text-lg font-display font-bold text-white leading-snug">Specialized Consulting</h3>
            <p className="text-xs text-[#c4c7c5] leading-relaxed">
              Executive board safety directorship, ISO management system diagnostics, construction SME capacity coaching, and statutory regulatory defense.
            </p>
            <div className="text-[11px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
              Bespoke advisory formulations for enterprise clients.
            </div>
          </div>
        </div>
      </FadeUpSection>

      {/* 2C. FEATURED CERTIFICATIONS EVIDENCE SYSTEM (Review Item #6) */}
      <FadeUpSection
        as="section"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 dark:border-[#333538] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-300 font-bold">
              Evidence System
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Featured Professional Certifications
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono max-w-2xl">
              An evidence-backed registry of statutory licenses, international peer-reviewed charters, and diagnostic auditor accreditations.
            </p>
          </div>

          {onOpenCredentialsModal && (
            <button
              type="button"
              onClick={onOpenCredentialsModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-xs font-semibold font-mono transition-all shrink-0 self-start sm:self-end shadow-md cursor-pointer"
            >
              <span>View All 12+ Certifications</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* 4 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              code: "CMIOSH #100175",
              title: "Chartered Safety and Health Professional",
              issuer: "Institution of Occupational Safety and Health (IOSH UK)",
              year: "Chartered 2021",
              detail: "Highest tier of global safety practice. Qualified IOSH Peer Review Interview Panelist."
            },
            {
              code: "IRCA #423290",
              title: "ISO 45001:2018 Lead Auditor",
              issuer: "CQI / International Register of Certificated Auditors",
              year: "Certified 2021",
              detail: "Comprehensive OHSMS certification auditing and high-consequence enterprise gap analysis."
            },
            {
              code: "FISPON #004",
              title: "Fellow of the Institute (FISPON)",
              issuer: "Institute of Safety Professionals of Nigeria",
              year: "Conferred 2022",
              detail: "Highest statutory professional grade established under Federal Act No. 2 of 2014."
            },
            {
              code: "BOHS Sydney",
              title: "Overseas Conference Bursary Award",
              issuer: "British Occupational Hygiene Society (BOHS)",
              year: "Awarded 2023",
              detail: "Selected for pioneering empirical research presented at the 23rd World Congress in Sydney."
            }
          ].map((cred, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full dialed-glass-pill text-[#a8c7fa]">
                    {cred.code}
                  </span>
                  <span className="text-[11px] font-mono text-[#8e918f]">{cred.year}</span>
                </div>
                <h3 className="text-base font-display font-bold text-white leading-snug">
                  {cred.title}
                </h3>
                <p className="text-xs font-mono text-[#8e918f]">
                  {cred.issuer}
                </p>
                <p className="text-xs text-[#c4c7c5] leading-relaxed pt-1">
                  {cred.detail}
                </p>
              </div>

              <div className="text-[10px] font-mono text-[#a8c7fa] flex items-center gap-1.5 pt-3 border-t border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#a8c7fa]" />
                <span>Verified Regulatory Standing</span>
              </div>
            </div>
          ))}
        </div>
      </FadeUpSection>

      {/* 2D. FEATURED BOOKS & PUBLICATIONS (Review Item #7) */}
      <FadeUpSection
        as="section"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#a8c7fa] font-bold">
              Thought Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug sm:leading-tight">
              Authored Books &amp; Scientific Research
            </h2>
            <p className="text-xs sm:text-sm text-[#8e918f] font-mono max-w-2xl">
              Contributing empirical science and actionable frameworks to international industrial ergonomics and environmental engineering.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPage('books')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full dialed-glass-pill hover:bg-white/10 text-white text-xs font-mono font-medium transition-all shrink-0 self-start sm:self-end cursor-pointer shadow-sm"
          >
            <Library className="w-3.5 h-3.5 text-[#a8c7fa]" />
            <span>Browse Full Library &amp; Papers</span>
          </button>
        </div>

        {/* Featured 2 Books Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BOOKS_AND_PUBLICATIONS.slice(0, 2).map((book) => (
            <article
              key={book.id}
              className="p-6 sm:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between space-y-6 group overflow-hidden"
            >
              <div className="space-y-5">
                {/* Small Image Preview inside Section Box */}
                {book.imageUrl && (
                  <div className="relative h-36 sm:h-44 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden bg-black/40 border-b border-white/10 group/img">
                    <img
                      src={book.imageUrl}
                      alt={book.imageAlt || book.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#a8c7fa] border border-white/20 font-semibold shadow-xs">
                        {book.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 sm:bottom-3 sm:right-4 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-300 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                        {book.publishedYear}
                      </span>
                    </div>
                  </div>
                )}

                {!book.imageUrl && (
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-white/5 pb-3">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-[#3c4043] font-semibold">
                      {book.badge}
                    </span>
                    <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400">{book.publishedYear}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white group-hover:underline transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {book.subtitle}
                  </p>
                </div>

                {/* What You'll Learn Bullet Points (Review Item #7) */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-300 font-bold block">
                    Key Practical Knowledge &amp; Takeaways:
                  </span>
                  <ul className="space-y-2">
                    {book.whatYoullLearn.slice(0, 3).map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                        <span className="w-4 h-4 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-300 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold border border-neutral-200 dark:border-[#333538]">
                          ✓
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-[#333538] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                  {book.publisherOrJournal}
                </span>

                <div className="flex items-center gap-2">
                  {onSelectBook ? (
                    <button
                      type="button"
                      onClick={() => onSelectBook(book.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-xs font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Inspect Details &amp; Chapters</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectPage('books')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black text-xs font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Book Details</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </FadeUpSection>

      {/* 3. SIGNATURE WORKS & MEGAPROJECTS: BASED TIMELINE */}
      <FadeUpSection 
        as="section"
        id="signature-works-section" 
        className="space-y-10 scroll-mt-28"
      >
        {/* Section Header & Direction Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-neutral-200 dark:border-[#333538] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-xs font-mono shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
              <span>Chronological Project Timeline • 2002 – 2025</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
              Featured Infrastructure Projects
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono max-w-2xl">
              Chronological milestones of landmark federal engineering operations, cross-river marine structures, metropolitan expressways, and statutory reforms.
            </p>
          </div>

          {/* Timeline Controls: Sorting */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center p-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-xs font-mono shadow-sm">
              <button
                type="button"
                onClick={() => setTimelineOrder('desc')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  timelineOrder === 'desc'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="Latest projects first (2025 → 2002)"
              >
                <ArrowDownUp className="w-3 h-3" />
                Latest First
              </button>
              <button
                type="button"
                onClick={() => setTimelineOrder('asc')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  timelineOrder === 'asc'
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
                title="Earliest projects first (2002 → 2025)"
              >
                <Clock className="w-3 h-3" />
                Earliest First
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 mr-2">
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Track & Milestone Cards */}
        {isProjectsLoading ? (
          <ProjectsListSkeleton count={2} />
        ) : (
          <div className="relative pl-6 sm:pl-10 md:pl-12 lg:pl-14 space-y-10 sm:space-y-12 pt-2 animate-fadeIn">
            {/* Continuous vertical timeline track spine */}
          <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] lg:left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-neutral-800 via-neutral-400 to-neutral-200 dark:from-white dark:via-neutral-500 dark:to-white/10" />

          {filteredProjects.map((work, index) => (
            <motion.div 
              key={work.id} 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.65, 
                delay: (index % 3) * 0.08, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="relative group"
            >
              {/* Timeline Marker Node on the track */}
              <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[39px] lg:-left-[43px] top-6 z-10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-[#1e1f20] border-2 border-neutral-800 dark:border-white group-hover:scale-110 transition-all flex items-center justify-center shadow-sm">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-black dark:bg-white transition-colors" />
                </div>
              </div>

              {/* Timeline Card */}
              <article 
                onClick={() => setActiveCaseStudy(work)}
                className="p-6 sm:p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all duration-300 cursor-pointer space-y-6 overflow-hidden"
              >
                {/* Project Image Header */}
                {work.imageUrl && (
                  <div className="relative h-44 sm:h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden group/img">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.pexels.com/photos/8961439/pexels-photo-8961439.jpeg?auto=compress&cs=tinysrgb&w=1200';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.90] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>{work.category}</span>
                    </div>
                    <div className="absolute bottom-3 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-neutral-200 text-[10px] font-mono">
                      <MapPin className="w-3 h-3 text-white" />
                      <span>{work.location}</span>
                    </div>
                  </div>
                )}

                {/* Timeline Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 dark:border-white/5 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#3c4043] text-black dark:text-neutral-200 font-mono text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300" />
                      {work.timelineDate}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] text-neutral-700 dark:text-neutral-300 font-mono text-xs">
                      {work.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-900 dark:text-neutral-200 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538] px-3 py-1 rounded-full font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-300" />
                    {work.safetyRecord}
                  </span>
                </div>

                {/* Title & Metadata */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-black dark:text-white group-hover:underline transition-colors tracking-tight leading-snug">
                    {work.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-300">
                      <Building2 className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                      {work.client}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {work.location}
                    </span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl">
                  {work.summary}
                </p>

                {/* Engineering Challenge & Solution Dual Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-300 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" />
                      High-Consequence Risk & Challenge
                    </span>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {work.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200 dark:border-[#333538] space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-white font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" />
                      Engineered HSE Intervention
                    </span>
                    <p className="text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {work.hseSolution}
                    </p>
                  </div>
                </div>

                {/* Key Metrics Strip & CTA */}
                <div className="pt-4 border-t border-neutral-200 dark:border-[#333538] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1">
                    {work.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5">
                        <span className="text-[10px] font-mono uppercase text-neutral-600 dark:text-neutral-400 block truncate">
                          {m.label}
                        </span>
                        <strong className="text-xs sm:text-sm font-display font-bold text-black dark:text-white block truncate">
                          {m.value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCaseStudy(work);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-black hover:text-white border border-neutral-200 dark:bg-white/5 dark:hover:bg-white dark:hover:text-black dark:border-[#333538] text-xs font-mono font-medium text-black dark:text-white transition-all shrink-0 self-end sm:self-center group/btn shadow-sm cursor-pointer"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
        )}
      </FadeUpSection>

      {/* 4. OUR SERVICES: YOUR SAFETY & ENGINEERING POWERHOUSE */}
      <FadeUpSection 
        as="section"
        id="services-powerhouse-section" 
        className="space-y-8 scroll-mt-28"
      >
        <div className="space-y-2 max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-300 font-semibold">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Your Safety & Engineering Powerhouse
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
            Providing end-to-end HSE directorship, certified ISO 45001/14001 auditing, bioclimatic heat stress systems, and strategic regulatory liaison for corporations and statutory authorities.
          </p>
        </div>

        {/* Interactive Services Showcase: Master Tabs + Detailed Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Service Selector Tabs (5 Services) */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((svc, idx) => {
              const isActive = activeServiceTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveServiceTab(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all flex items-start space-x-4 border cursor-pointer ${
                    isActive 
                      ? 'bg-white text-[#131314] border-white shadow-[0_8px_30px_rgba(255,255,255,0.15)] scale-[1.01]' 
                      : 'dialed-glass-panel hover:bg-white/[0.08] text-[#c4c7c5] hover:text-white border-white/10'
                  }`}
                >
                  <span className={`text-sm font-mono font-bold ${isActive ? 'text-[#131314]' : 'text-[#a8c7fa]'}`}>
                    {svc.number}
                  </span>
                  <div className="space-y-1">
                    <h4 className={`text-sm sm:text-base font-display font-bold leading-snug ${isActive ? 'text-[#131314]' : 'text-white'}`}>
                      {svc.title}
                    </h4>
                    <span className={`text-[11px] font-mono block ${isActive ? 'text-[#333538]' : 'text-[#8e918f]'}`}>
                      {svc.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Detailed Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl dialed-glass-card space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-[#333538] pb-4">
              <span className="text-xs font-mono text-neutral-800 dark:text-neutral-300 uppercase tracking-wider font-semibold">
                Practice Area {services[activeServiceTab].number} of 05
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/10 text-black dark:text-white text-xs font-mono border border-neutral-200 dark:border-[#333538]">
                {services[activeServiceTab].tag}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-black dark:text-white tracking-tight leading-snug">
                {services[activeServiceTab].title}
              </h3>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {services[activeServiceTab].desc}
              </p>
            </div>

            {/* Core Deliverables List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-400 font-bold block">
                Signature Deliverables & Executive Outcomes:
              </span>
              <ul className="space-y-2.5">
                {services[activeServiceTab].deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                    <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-white/10 text-black dark:text-white border border-neutral-200 dark:border-[#333538] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Action Strip */}
            <div className="pt-6 border-t border-neutral-200 dark:border-[#333538] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                Custom proposals formulated upon formal inquiry
              </div>

              <button
                onClick={onOpenBookingModal}
                className="px-6 py-2.5 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book This Engagement</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </FadeUpSection>



      {/* 6. TESTIMONIALS & INSTITUTIONAL WORDS */}
      <FadeUpSection 
        as="section"
        className="space-y-8"
      >
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-300 font-semibold">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Institutional Feedback & Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-mono">
            Independent appraisals from corporate directors, legislative panels, and chartered institutions.
          </p>
        </div>

        {/* Testimonials Cards Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#a8c7fa]" />
                <p className="text-sm sm:text-base text-[#c4c7c5] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-display font-bold text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-[#8e918f] font-mono">
                    {t.role} • {t.entity}
                  </p>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full dialed-glass-pill text-[#a8c7fa] font-medium">
                  {t.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeUpSection>

      {/* 7. ABOUT / ACADEMIC & INSTITUTIONAL LEADERSHIP */}
      <FadeUpSection 
        as="section"
        className="p-5 sm:p-10 md:p-12 rounded-3xl dialed-glass-card space-y-8 sm:space-y-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#a8c7fa] font-semibold">
              Institutional Pedigree
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight leading-snug">
              Dual-Master Engineer, Chartered Fellow &amp; Legislative Mediator
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#c4c7c5] leading-relaxed font-normal">
              Engr. Osazee unites structural civil fundamentals with occupational health, environmental microbiology, and parliamentary safety governance.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSelectPage('leadership')}
              className="w-full sm:w-auto px-6 py-3 rounded-full dialed-glass-pill hover:bg-white/10 text-white text-xs font-semibold font-mono border border-white/15 transition-all text-center min-h-[44px] flex items-center justify-center cursor-pointer shadow-sm"
            >
              Explore Full Leadership Dossier
            </button>
          </div>
        </div>

        {/* Qualifications & Career Highlights Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {ACADEMIC_QUALIFICATIONS.map((acad, idx) => (
            <div 
              key={idx}
              className="p-5 sm:p-6 rounded-2xl dialed-glass-elevated flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full dialed-glass-pill text-[#a8c7fa] font-semibold">
                  {acad.badge}
                </span>
                <h4 className="text-base font-display font-bold text-white leading-snug">
                  {acad.degree}
                </h4>
                <p className="text-xs font-mono text-[#8e918f]">
                  {acad.institution} • {acad.period}
                </p>
                <p className="text-xs text-[#c4c7c5] leading-relaxed pt-1">
                  {acad.detail}
                </p>
              </div>

              <div className="text-[10px] font-mono text-[#8e918f] pt-2 border-t border-white/5">
                Verified Academic Record
              </div>
            </div>
          ))}
        </div>
      </FadeUpSection>

      {/* 8. HIGH-IMPACT BOTTOM CTA BANNER */}
      <FadeUpSection 
        as="section"
        className="relative p-6 sm:p-10 md:p-14 rounded-3xl dialed-glass-card text-white overflow-hidden text-center space-y-5 sm:space-y-6"
      >
        <div className="absolute inset-0 bg-radial from-[#a8c7fa]/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#a8c7fa] font-semibold">
            Lead in Your Industry
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            Ready to Build an Uncompromising Standard of Safety?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#c4c7c5] leading-relaxed font-normal">
            Available for executive safety directorship, ISO management system audits, high-consequence infrastructure bid advisory, and international keynote presentations.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onOpenBookingModal}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#f0f4f9] text-[#131314] font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md hover:scale-105 min-h-[44px] cursor-pointer"
          >
            <span>Book an Advisory Consultation</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => onSelectPage('services')}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-[#282a2c] hover:bg-[#333538] text-white border border-[#3c4043] font-semibold text-xs sm:text-sm transition-all min-h-[44px] flex items-center justify-center cursor-pointer shadow-xs"
          >
            Submit Detailed Project Dossier
          </button>
        </div>

        <p className="relative text-[11px] sm:text-xs text-[#8e918f] font-mono">
          Direct Liaison: contact@iyenomaosazee.com • Abuja, Federal Capital Territory, Nigeria
        </p>
      </FadeUpSection>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onBookAdvisory={onOpenBookingModal}
      />
    </div>
  );
};
