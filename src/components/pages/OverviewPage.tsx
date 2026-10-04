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
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              <span>HSE Professional</span>
              <span aria-hidden="true" className="text-slate-400 font-normal">|</span>
              <span>Civil Engineering</span>
              <span aria-hidden="true" className="text-slate-400 font-normal">|</span>
              <span>Author</span>
              <span aria-hidden="true" className="text-slate-400 font-normal">|</span>
              <span>Safety Leader</span>
            </div>
            
            {/* Giant Bold Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08] uppercase">
              ENGINEERING ZERO-HARM AT MEGA-SCALE.
            </h1>

            {/* Grounded Value Proposition */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
              Directing corporate occupational safety architecture across Nigeria&apos;s landmark civil engineering megaprojects at Julius Berger PLC. Delivering 50,000,000+ incident-free man-hours through predictive hazard modeling, ISO 45001 auditing diagnostics, and bioclimatic thermal ergonomics.
            </p>

            {/* High-Intent Dialed Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenBookingModal}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#signature-works-section"
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs sm:text-sm transition-all shadow-xs"
              >
                <span>Signature Works</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectPage('works')}
                className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 font-medium text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#1C6CD4]" />
                <span>Featured Works</span>
              </button>
            </div>

            {/* Verification Proof Strip */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono text-slate-600">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                <span>50M+ Man-Hours</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                <span>0.00 LTIFR Marine</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                <span>ISO 45001 / 14001 Lead Auditor</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Visual Hero Image Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md group">
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95] contrast-[1.05]"
                />
                
                {/* Vignette Gradients for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
              </div>

              {/* Overlay Glass Tags & Captions */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900 text-[11px] font-mono font-bold">
                    <span>HSE Systems &amp; Operational Safety</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-[10px] font-mono font-bold">
                    50M+ Man-Hours
                  </span>
                </div>

                <div className="space-y-1.5 text-left bg-white/95 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#1C6CD4] uppercase tracking-wider font-bold">
                    <span>Proactive HSE Governance</span>
                    <span className="text-slate-900">LTIFR: 0.00</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug drop-shadow-sm">
                    Holistic Health, Safety &amp; Environmental Leadership
                  </h3>
                  <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed font-medium">
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
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-mono shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6CD4]" />
            <span>Key Performance Indicators • Dynamic Active Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
            Numbers That Just Make Sense
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-mono">
            Relentlessly standard-driven, engineering zero-harm environments across West Africa&apos;s largest infrastructure corridors.
          </p>
        </div>

        {/* Big KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Frontline Tenure */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] tracking-wider font-bold">Frontline Tenure</span>
              <span className="text-[10px] font-mono text-slate-500">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-slate-900 tracking-tight shrink-0">
                  <CountUp 
                    end={22} 
                    suffix="+" 
                    duration={1600} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-slate-600 font-medium">
                  Years
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Executive HSE leadership delivering landmark national infrastructure at Julius Berger PLC.
              </p>
            </div>
          </div>

          {/* Card 2: Operational Exposure */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] tracking-wider font-bold">Operational Exposure</span>
              <span className="text-[10px] font-mono text-slate-500">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-slate-900 tracking-tight shrink-0">
                  <CountUp 
                    end={50} 
                    suffix="M+" 
                    duration={1800} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-slate-600 font-medium">
                  Hours
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Supervised safe work-hours under zero-fatal incident protocols across live multi-tier civil schemes.
              </p>
            </div>
          </div>

          {/* Card 3: Global Recognition */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] tracking-wider font-bold">Global Selection</span>
              <span className="text-[10px] font-mono text-slate-500">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-slate-900 tracking-tight shrink-0">
                  <CountUp 
                    end={1100} 
                    suffix="+" 
                    duration={2000} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-slate-600 font-medium">
                  Submissions
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Selected speaker at the 23rd World Congress on Safety and Health at Work in Sydney, Australia.
              </p>
            </div>
          </div>

          {/* Card 4: Chartered Rigor */}
          <div className="group p-6 sm:p-7 xl:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] tracking-wider font-bold">Chartered Rigor</span>
              <span className="text-[10px] font-mono text-slate-500">Verified</span>
            </div>
            <div className="pt-6 sm:pt-8 flex flex-col justify-end space-y-2.5">
              <div className="flex items-baseline gap-1.5 xl:gap-2 whitespace-nowrap">
                <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-display font-bold text-slate-900 tracking-tight shrink-0">
                  <CountUp 
                    end={2} 
                    duration={1200} 
                  />
                </span>
                <span className="text-sm sm:text-base lg:text-xs xl:text-base 2xl:text-xl text-slate-600 font-medium">
                  Master Degrees
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed min-h-[36px] sm:min-h-[42px]">
                Civil Engineering (Heriot-Watt, Edinburgh) & Environmental OSH (Portsmouth, UK).
              </p>
            </div>
          </div>
        </div>

        {/* Verifiable Credentials Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs font-mono text-slate-600 border-t border-slate-200">
          <span className="flex items-center gap-1.5 text-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1C6CD4]" />
            ISO 45001 Lead Auditor (#423290)
          </span>
          <span className="flex items-center gap-1.5 text-slate-800">
            <Award className="w-3.5 h-3.5 text-[#1C6CD4]" />
            IOSH Chartered Fellow Assessor (#100175)
          </span>
          <span className="flex items-center gap-1.5 text-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
            Registered Professional Engineer (MNSE)
          </span>
        </div>
      </FadeUpSection>

      {/* 2B. EXECUTIVE PROFILE SCANNING GRID (Review Item #4: Visual Chunks) */}
      <FadeUpSection
        as="section"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Executive Profile
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
              A Record of Leadership &amp; Rigor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-mono max-w-xl">
              Rapid visual overview of professional experience, chartered accreditations, dual master’s degrees, and technical publications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPage('about')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-mono font-medium transition-all shrink-0 self-start sm:self-end cursor-pointer shadow-sm"
          >
            <span>Read Full Biography</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Visual Chunks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Chunk 1: Professional Experience */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold">01 • Experience</span>
              <Building2 className="w-4 h-4 text-[#1C6CD4]" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">22+ Years Heavy Civil HSE</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Leading corporate safety architecture at Julius Berger Nigeria PLC across high-consequence river bridges, metropolitan expressways, deep piling, and industrial facilities.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Zero-fatal incident protocols across 50M+ exposure hours.
            </div>
          </div>

          {/* Chunk 2: Dual Master's Degrees */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold">02 • Education</span>
              <GraduationCap className="w-4 h-4 text-[#1C6CD4]" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">Dual British Postgraduates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              MSc Civil Engineering &amp; Construction Management (Heriot-Watt University, Edinburgh) and MSc Occupational &amp; Environmental Health Safety (University of Portsmouth, UK).
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Bridge structural science united with industrial hygiene.
            </div>
          </div>

          {/* Chunk 3: Chartered Certifications */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold">03 • Certifications</span>
              <ShieldCheck className="w-4 h-4 text-[#1C6CD4]" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">CMIOSH &amp; Lead Auditor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chartered Safety and Health Professional (CMIOSH UK #100175), certified ISO 45001 / ISO 14001 Lead Auditor (#423290), and COREN Registered Engineer.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Qualified peer assessor for chartered membership.
            </div>
          </div>

          {/* Chunk 4: Professional Memberships */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold">04 • Memberships</span>
              <Award className="w-4 h-4 text-[#1C6CD4]" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">Institutional Fellowships</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fellow of the Institute of Safety Professionals of Nigeria (FISPON #004), Member of the Nigerian Society of Engineers (MNSE #21200), and IOSH UK.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              Active legislative mediator for parliamentary standards.
            </div>
          </div>

          {/* Chunk 5: Publications & Thought Leadership */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold">05 • Publications</span>
              <BookOpen className="w-4 h-4 text-[#1C6CD4]" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">Books &amp; Scientific Research</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Author of published monographs on thermal ergonomics, municipal landfill kinetics, and 23rd World Congress Sydney speaker.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
              ResearchGate Series &amp; Peer-Reviewed Scientific Treatises.
            </div>
          </div>

          {/* Chunk 6: Areas of Expertise */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold">06 • Core Practice</span>
              <Layers className="w-4 h-4 text-[#1C6CD4]" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">Specialized Consulting</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Executive board safety directorship, ISO management system diagnostics, construction SME capacity coaching, and statutory regulatory defense.
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-100">
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Evidence System
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
              Featured Professional Certifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-mono max-w-2xl">
              An evidence-backed registry of statutory licenses, international peer-reviewed charters, and diagnostic auditor accreditations.
            </p>
          </div>

          {onOpenCredentialsModal && (
            <button
              type="button"
              onClick={onOpenCredentialsModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-semibold font-mono transition-all shrink-0 self-start sm:self-end shadow-md cursor-pointer"
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
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4]">
                    {cred.code}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{cred.year}</span>
                </div>
                <h3 className="text-base font-display font-bold text-slate-900 leading-snug">
                  {cred.title}
                </h3>
                <p className="text-xs font-mono text-slate-500">
                  {cred.issuer}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {cred.detail}
                </p>
              </div>

              <div className="text-[10px] font-mono text-[#1C6CD4] font-semibold flex items-center gap-1.5 pt-3 border-t border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C6CD4]" />
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Thought Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
              Authored Books &amp; Scientific Research
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-mono max-w-2xl">
              Contributing empirical science and actionable frameworks to international industrial ergonomics and environmental engineering.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectPage('books')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-mono font-medium transition-all shrink-0 self-start sm:self-end cursor-pointer shadow-sm"
          >
            <Library className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Browse Full Library &amp; Papers</span>
          </button>
        </div>

        {/* Featured 2 Books Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BOOKS_AND_PUBLICATIONS.slice(0, 2).map((book) => (
            <article
              key={book.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#1C6CD4]/40 transition-all flex flex-col justify-between space-y-6 group overflow-hidden"
            >
              <div className="space-y-5">
                {/* Small Image Preview inside Section Box */}
                {book.imageUrl && (
                  <div className="relative h-36 sm:h-44 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden bg-slate-100 border-b border-slate-200 group/img">
                    <img
                      src={book.imageUrl}
                      alt={book.imageAlt || book.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95] contrast-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1C6CD4] border border-slate-200 font-bold shadow-xs">
                        {book.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 sm:bottom-3 sm:right-4 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-800 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-200 font-bold">
                        {book.publishedYear}
                      </span>
                    </div>
                  </div>
                )}

                {!book.imageUrl && (
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4] font-semibold">
                      {book.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{book.publishedYear}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 group-hover:underline transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-600 leading-relaxed">
                    {book.subtitle}
                  </p>
                </div>

                {/* What You'll Learn Bullet Points (Review Item #7) */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold block">
                    Key Practical Knowledge &amp; Takeaways:
                  </span>
                  <ul className="space-y-2">
                    {book.whatYoullLearn.slice(0, 3).map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1C6CD4] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold border border-blue-200">
                          ✓
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-500">
                  {book.publisherOrJournal}
                </span>

                <div className="flex items-center gap-2">
                  {onSelectBook ? (
                    <button
                      type="button"
                      onClick={() => onSelectBook(book.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Inspect Details &amp; Chapters</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectPage('books')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-mono shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-slate-700" />
              <span>Chronological Project Timeline • 2002 – 2025</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
              Featured Infrastructure Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-mono max-w-2xl">
              Chronological milestones of landmark federal engineering operations, cross-river marine structures, metropolitan expressways, and statutory reforms.
            </p>
          </div>

          {/* Timeline Controls: Sorting */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono shadow-xs">
              <button
                type="button"
                onClick={() => setTimelineOrder('desc')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  timelineOrder === 'desc'
                    ? 'bg-[#1C6CD4] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
                    ? 'bg-[#1C6CD4] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
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
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 mr-2">
            Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1C6CD4] text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
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
          <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] lg:left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-slate-400 via-slate-300 to-slate-200" />

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
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-[#1C6CD4] group-hover:scale-110 transition-all flex items-center justify-center shadow-xs">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#1C6CD4] transition-colors" />
                </div>
              </div>

              {/* Timeline Card */}
              <article 
                onClick={() => setActiveCaseStudy(work)}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#1C6CD4]/40 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer space-y-6 overflow-hidden"
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95] contrast-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[11px] font-mono font-bold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C6CD4]" />
                      <span>{work.category}</span>
                    </div>
                    <div className="absolute bottom-3 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-[10px] font-mono font-semibold">
                      <MapPin className="w-3 h-3 text-[#1C6CD4]" />
                      <span>{work.location}</span>
                    </div>
                  </div>
                )}

                {/* Timeline Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4] font-mono text-xs font-semibold">
                      <Clock className="w-3.5 h-3.5 text-[#1C6CD4]" />
                      {work.timelineDate}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs">
                      {work.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {work.safetyRecord}
                  </span>
                </div>

                {/* Title & Metadata */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900 group-hover:underline transition-colors tracking-tight leading-snug">
                    {work.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-800 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-slate-600" />
                      {work.client}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {work.location}
                    </span>
                  </div>
                </div>

                {/* Narrative Summary */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
                  {work.summary}
                </p>

                {/* Engineering Challenge & Solution Dual Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      High-Consequence Risk & Challenge
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {work.challenge}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-900 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1C6CD4]" />
                      Engineered HSE Intervention
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {work.hseSolution}
                    </p>
                  </div>
                </div>

                {/* Key Metrics Strip & CTA */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 flex-1">
                    {work.metrics.map((m, mIdx) => (
                      <div key={mIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block truncate">
                          {m.label}
                        </span>
                        <strong className="text-xs sm:text-sm font-display font-bold text-slate-900 block truncate">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-mono font-medium transition-all shrink-0 self-end sm:self-center group/btn shadow-xs cursor-pointer"
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
            Your Safety & Engineering Powerhouse
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
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
                      ? 'bg-[#1C6CD4] text-white border-[#1C6CD4] shadow-md scale-[1.01]' 
                      : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <span className={`text-sm font-mono font-bold ${isActive ? 'text-white' : 'text-[#1C6CD4]'}`}>
                    {svc.number}
                  </span>
                  <div className="space-y-1">
                    <h4 className={`text-sm sm:text-base font-display font-bold leading-snug ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {svc.title}
                    </h4>
                    <span className={`text-[11px] font-mono block ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                      {svc.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Service Detailed Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-mono text-slate-800 uppercase tracking-wider font-semibold">
                Practice Area {services[activeServiceTab].number} of 05
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1C6CD4] text-xs font-mono border border-blue-200 font-semibold">
                {services[activeServiceTab].tag}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-snug">
                {services[activeServiceTab].title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {services[activeServiceTab].desc}
              </p>
            </div>

            {/* Core Deliverables List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold block">
                Signature Deliverables & Executive Outcomes:
              </span>
              <ul className="space-y-2.5">
                {services[activeServiceTab].deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-[#1C6CD4] border border-blue-200 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Action Strip */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-mono text-slate-500">
                Custom proposals formulated upon formal inquiry
              </div>

              <button
                onClick={onOpenBookingModal}
                className="px-6 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
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
          <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
            Institutional Feedback & Endorsements
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-mono">
            Independent appraisals from corporate directors, legislative panels, and chartered institutions.
          </p>
        </div>

        {/* Testimonials Cards Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-[#1C6CD4]/40 transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#1C6CD4]" />
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-display font-bold text-slate-900">
                    {t.author}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {t.role} • {t.entity}
                  </p>
                </div>

                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4] font-semibold">
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
        className="p-5 sm:p-10 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8 sm:space-y-10"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Institutional Pedigree
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight leading-snug">
              Dual-Master Engineer, Chartered Fellow &amp; Legislative Mediator
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
              Engr. Osazee unites structural civil fundamentals with occupational health, environmental microbiology, and parliamentary safety governance.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSelectPage('leadership')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold font-mono border border-slate-200 transition-all text-center min-h-[44px] flex items-center justify-center cursor-pointer shadow-xs"
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
              className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4] font-bold">
                  {acad.badge}
                </span>
                <h4 className="text-base font-display font-bold text-slate-900 leading-snug">
                  {acad.degree}
                </h4>
                <p className="text-xs font-mono text-slate-500">
                  {acad.institution} • {acad.period}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {acad.detail}
                </p>
              </div>

              <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                Verified Academic Record
              </div>
            </div>
          ))}
        </div>
      </FadeUpSection>

      {/* 8. HIGH-IMPACT BOTTOM CTA BANNER */}
      <FadeUpSection 
        as="section"
        className="relative p-6 sm:p-10 md:p-14 rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-200 text-slate-900 overflow-hidden text-center space-y-5 sm:space-y-6 shadow-sm"
      >
        <div className="relative space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Lead in Your Industry
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight leading-tight">
            Ready to Build an Uncompromising Standard of Safety?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal">
            Available for executive safety directorship, ISO management system audits, high-consequence infrastructure bid advisory, and international keynote presentations.
          </p>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onOpenBookingModal}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 sm:py-4 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-xs sm:text-sm tracking-tight transition-all shadow-md hover:scale-105 min-h-[44px] cursor-pointer"
          >
            <span>Book an Advisory Consultation</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={() => onSelectPage('services')}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-xs sm:text-sm transition-all min-h-[44px] flex items-center justify-center cursor-pointer shadow-xs"
          >
            Submit Detailed Project Dossier
          </button>
        </div>

        <p className="relative text-[11px] sm:text-xs text-slate-500 font-mono">
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
