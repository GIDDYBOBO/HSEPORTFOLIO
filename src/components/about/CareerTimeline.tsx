import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  ExternalLink,
  Layers,
  Sparkles,
  Filter
} from 'lucide-react';

export interface TimelineMilestone {
  id: string;
  yearRange: string;
  role: string;
  organization: string;
  location: string;
  category: 'hse_management' | 'consultancy' | 'chartered_academic';
  categoryLabel: string;
  scope: string;
  achievements: string[];
  metrics: { label: string; value: string }[];
  highlightTag: string;
  tagColor: 'blue' | 'mint' | 'amber' | 'navy';
  deepDive?: {
    context: string;
    standards: string[];
    technicalTakeaway: string;
  };
}

export const CAREER_TIMELINE_DATA: TimelineMilestone[] = [
  {
    id: 'milestone-parliamentary-consultancy',
    yearRange: '2023 – Present',
    role: 'Principal Technical Consultant & Parliamentary Safety Reform Advisor',
    organization: 'House of Representatives Committee on Safety Standards / Strategic Retainers',
    location: 'Abuja & International',
    category: 'consultancy',
    categoryLabel: 'Technical Consultancy & Governance',
    scope: 'Statutory mediation, corporate HSE directorship advisory, and international executive peer evaluation. Leading nationwide regulatory harmonization under the ISPON Act 2014.',
    achievements: [
      'Appointed by the 10th National Assembly House Committee on Safety Standards to arbitrate national disputes, review statutory guidelines, and restore regulatory integrity to ISPON.',
      'Represented Nigeria at the 23rd World Congress on Safety and Health at Work in Sydney, Australia, presenting groundbreaking research on tropical bioclimatic heat strain.',
      'Formally appointed as Chartered Membership Peer Review Interviewer by IOSH UK, vetting international senior health and safety candidates for CMIOSH standing.',
      'Fellowship conferment by the Institute of Safety Professionals of Nigeria (FISPON) and World Safety Organization (FWSO).'
    ],
    metrics: [
      { label: 'Statutory Body', value: 'ISPON Act 2014' },
      { label: 'Congress Standing', value: '23rd World Congress' },
      { label: 'Chartered Panel', value: 'IOSH UK PRI Ref #100175' }
    ],
    highlightTag: 'Parliamentary & Global Standing',
    tagColor: 'blue',
    deepDive: {
      context: 'Navigated intense multi-stakeholder dispute resolution between divergent factions of the Institute of Safety Professionals of Nigeria, restoring statutory election processes under federal legislative supervision.',
      standards: ['ISPON Act 2014 Statutory Code', 'IOSH Chartered Code of Conduct', 'ISO 45001:2018 Clause 5 Governance'],
      technicalTakeaway: 'Regulatory institutional integrity requires transparent electoral mechanisms, verifiable credential registers, and legislative alignment between statutory acts and professional practice.'
    }
  },
  {
    id: 'milestone-trans-niger-megaproject',
    yearRange: '2018 – 2023',
    role: 'Regional HSE Project Manager & Lead Environmental Researcher',
    organization: 'Julius Berger Nigeria PLC',
    location: 'Asaba – Onitsha & Niger Delta Corridors',
    category: 'hse_management',
    categoryLabel: 'HSE Executive Command',
    scope: 'Executive safety management for landmark high-consequence civil marine engineering, including the Second River Niger Bridge Project and coastal trans-mangrove expressways.',
    achievements: [
      'Directed waterborne civil marine safety across deep river piling, navigation span launching, and coastal road networks spanning 18.6 million safe man-hours across complex marine navigation channels.',
      'Published landmark peer-reviewed research on bioclimatic Wet Bulb Globe Temperature (WBGT) and environmental consequence modeling in leading environmental engineering journals.',
      'Implemented real-time satellite meteorology wind-cutoff systems and GPS personal flotation beacon protocols for marine barge crews.',
      'Achieved continuous ISO 45001 and ISO 14001 surveillance audit approvals without a single major non-conformance.'
    ],
    metrics: [
      { label: 'Governed Man-Hours', value: '18,600,000+' },
      { label: 'Marine Execution', value: '18.6M Safe Hours' },
      { label: 'Monographs Published', value: '6 Peer-Reviewed' }
    ],
    highlightTag: 'Trans-Niger Marine Command',
    tagColor: 'mint',
    deepDive: {
      context: 'High-velocity Niger River currents during annual flood surges combined with high-altitude pier slipforming posed concurrent dual-hazard extremes.',
      standards: ['BS EN 12641 Marine Safety', 'ISO 7243 WBGT Heat Stress Standard', 'BS 5975 Temporary Works Code'],
      technicalTakeaway: 'In high-hazard marine environments, physical engineering barriers and continuous telemetry must supersede behavioral admonitions.'
    }
  },
  {
    id: 'milestone-iosh-chartered-irca',
    yearRange: '2013 – 2017',
    role: 'Senior HSE Lead & Certified IRCA Lead Auditor',
    organization: 'Julius Berger Nigeria PLC / IOSH UK / IRCA',
    location: 'Abuja & Nationwide Corridors',
    category: 'chartered_academic',
    categoryLabel: 'Academic & Chartered Fellowships',
    scope: 'Enterprise-wide management system integration, third-party certification audits, and structural safety frameworks across multi-million dollar federal transport schemes.',
    achievements: [
      'Admitted as Chartered Safety and Health Practitioner (CMIOSH #100175) by the Institution of Occupational Safety and Health (UK)—the preeminent international benchmark of HSE competence.',
      'Certified as Lead Auditor for ISO 45001 (OHSMS) and ISO 14001 (EMS) under CQI / IRCA (Certificate #423290).',
      'Completed second British postgraduate degree: MSc in Civil Engineering & Construction Management from Heriot-Watt University, Edinburgh.',
      'Pioneered corporate behavioral safety coaching programs training over 1,200 frontline foremen and site engineers.'
    ],
    metrics: [
      { label: 'Chartered Standing', value: 'CMIOSH UK #100175' },
      { label: 'Audit Certification', value: 'IRCA Lead Auditor #423290' },
      { label: 'Foremen Mentored', value: '1,200+ Personnel' }
    ],
    highlightTag: 'Chartered IOSH & ISO Lead Auditor',
    tagColor: 'blue',
    deepDive: {
      context: 'Bridged the historical operational gap between civil engineering project managers and statutory occupational hygiene specialists through dual-discipline literacy.',
      standards: ['CQI / IRCA ISO 19011 Guidelines', 'ISO 45001:2018', 'IOSH Competency Framework'],
      technicalTakeaway: 'Auditing is not a punitive policing mechanism; it is a systemic diagnostic tool for uncovering latent organizational vulnerabilities before they manifest as site failures.'
    }
  },
  {
    id: 'milestone-bohs-portsmouth-scholar',
    yearRange: '2006 – 2012',
    role: 'HSE Manager & British Occupational Hygiene Research Scholar',
    organization: 'Julius Berger Nigeria PLC & University of Portsmouth, UK',
    location: 'Portsmouth, UK & Abuja, Nigeria',
    category: 'chartered_academic',
    categoryLabel: 'Academic & Chartered Fellowships',
    scope: 'Advanced postgraduate research in toxicology, ergonomics, and epidemiology combined with executive appointment to HSE Manager overseeing major infrastructure schemes.',
    achievements: [
      'Awarded the prestigious British Occupational Hygiene Society (BOHS) Bursary in 2007 to support advanced master\'s research in occupational health.',
      'Graduated MSc with Distinction in Occupational and Environmental Health and Safety Management from the University of Portsmouth.',
      'Promoted to full HSE Manager at Julius Berger Nigeria PLC, directing site health and safety regimes across federal capital infrastructure expansions.',
      'Instituted first systematic site air quality and noise dosimetry monitoring regimes on high-traffic urban expressways.'
    ],
    metrics: [
      { label: 'Postgrad Degree', value: 'MSc Portsmouth' },
      { label: 'Bursary Distinction', value: 'BOHS Winner 2007' },
      { label: 'Operational Level', value: 'Enterprise HSE Manager' }
    ],
    highlightTag: 'BOHS Research Bursary Winner',
    tagColor: 'amber',
    deepDive: {
      context: 'Conducted rigorous field sampling investigating thermal strain and particulate exposure among civil construction artisans working in West African tropical climates.',
      standards: ['BOHS Occupational Hygiene Protocols', 'ACGIH Threshold Limit Values', 'HSE UK EH40 Exposure Limits'],
      technicalTakeaway: 'Occupational health requires quantitative measurement of physiological stressors—core body temperature, hydration loss, and airborne particulates—rather than subjective guesswork.'
    }
  },
  {
    id: 'milestone-hse-senior-supervisor',
    yearRange: '2002 – 2006',
    role: 'HSE Senior Supervisor & High-Risk Operations Lead',
    organization: 'Julius Berger Nigeria PLC',
    location: 'Abuja, Federal Capital Territory',
    category: 'hse_management',
    categoryLabel: 'HSE Executive Command',
    scope: 'Field safety supervision for heavy civil operations, deep excavation shoring, tower crane lifting, and precast concrete bridge beam launching.',
    achievements: [
      'Supervised high-risk civil operations during the intensive expansion phase of Nigeria\'s Federal Capital Territory.',
      'Authored rigorous site-specific lifting plans and deep excavation protection guidelines that prevented trench wall collapses.',
      'Pioneered non-punitive near-miss reporting mechanisms that empowered frontline artisans to halt dangerous work without fear of disciplinary reprisal.',
      'Achieved an exemplary zero-fatality record across multiple high-speed urban interchange construction projects.'
    ],
    metrics: [
      { label: 'Direct Supervision', value: '800+ Site Artisans' },
      { label: 'Trench Incidents', value: 'Zero Collapses' },
      { label: 'Culture Shift', value: 'Non-Punitive Near-Miss' }
    ],
    highlightTag: 'Frontline Hazard Command',
    tagColor: 'mint',
    deepDive: {
      context: 'Rapid pace of urban capital infrastructure delivery created immense schedule pressure, requiring safety systems that integrated seamlessly into daily work schedules rather than creating bottlenecks.',
      standards: ['OSHA 1926 Subpart P Excavations', 'BS 7121 Safe Use of Cranes', 'Nigerian Factory Act Regulations'],
      technicalTakeaway: 'Artisans will follow safety protocols when the tools are practical, the protective barriers are robust, and supervisors treat workers with frontline dignity.'
    }
  },
  {
    id: 'milestone-cbn-headquarters-foundations',
    yearRange: '2000 – 2002',
    role: 'Site Civil Engineer & Safety Section Contributor',
    organization: 'Julius Berger Nigeria PLC (Central Bank of Nigeria HQ Site)',
    location: 'Central Business District, Abuja, Nigeria',
    category: 'hse_management',
    categoryLabel: 'HSE Executive Command',
    scope: 'Deep basement diaphragm walls, structural steel rigging, and high-rise construction safety for Nigeria\'s premier central banking headquarters.',
    achievements: [
      'Contributed directly to safety systems for deep basement excavations, perimeter retaining walls, and tower crane operations on the 12-storey sovereign high-rise complex.',
      'The site safety section at the CBN Headquarters site was officially recognized on 12 December 2000 for benchmark site standards.',
      'Established foundational integration between structural engineering load calculations and physical edge-protection installations.',
      'Completed Higher National Diploma (HND) in Civil & Building Engineering with distinction in structural analysis.'
    ],
    metrics: [
      { label: 'Site Safety Record', value: 'Benchmark Execution' },
      { label: 'Building Scope', value: '12 Storeys + Deep Basements' },
      { label: 'Structural Role', value: 'Civil Foundations' }
    ],
    highlightTag: 'Civil Foundation Command',
    tagColor: 'amber',
    deepDive: {
      context: 'Executing deep foundation works in proximity to existing commercial utilities required extreme precision in soil shoring, dewatering, and tower crane swing radius controls.',
      standards: ['ISO 45001 Safety Benchmarks', 'BS 8004 Foundations Code', 'BS 5534 Scaffolding Code'],
      technicalTakeaway: 'The best safety professionals understand the underlying structural engineering of the assets they protect.'
    }
  }
];

export const CareerTimeline: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'hse_management' | 'consultancy' | 'chartered_academic'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Hook for smooth scroll entry with fade-up-section class
  const { ref, className: revealClass } = useScrollReveal({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true
  });

  const filteredMilestones = CAREER_TIMELINE_DATA.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getTagColorClasses = (color: TimelineMilestone['tagColor']) => {
    switch (color) {
      case 'mint':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'amber':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'blue':
      default:
        return 'text-[#1C6CD4] bg-blue-50 border-blue-200';
    }
  };

  const getNodeColor = (color: TimelineMilestone['tagColor']) => {
    switch (color) {
      case 'mint':
        return 'bg-emerald-600 text-white shadow-md';
      case 'amber':
        return 'bg-amber-600 text-white shadow-md';
      case 'blue':
      default:
        return 'bg-[#1C6CD4] text-white shadow-md';
    }
  };

  return (
    <section 
      ref={ref}
      className={`space-y-12 relative fade-up-section ${revealClass}`}
      id="career-progression-timeline"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#1C6CD4]">
            <Sparkles className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>25+ Year Trajectory • Verified Career Progression</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight">
            Career Progression in HSE Command &amp; Technical Consultancy
          </h2>
          <p className="text-sm sm:text-base text-slate-700 font-sans leading-relaxed">
            From frontline civil engineering foundations at Julius Berger to British postgraduate research distinctions, chartered international standing (CMIOSH), and federal statutory reform advisory.
          </p>
        </div>

        {/* Category Filters (Clean Segmented Tabs, Anti-Slop Compliant) */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 self-start md:self-end overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Milestones (6)' },
            { id: 'hse_management', label: 'HSE Command' },
            { id: 'consultancy', label: 'Governance & Advisory' },
            { id: 'chartered_academic', label: 'Chartered & Fellowships' }
          ].map((tab) => {
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C6CD4] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vertical Animated Timeline Canvas */}
      <div className="relative pt-4 pb-8">
        {/* Central Vertical Connector Spine */}
        {/* Mobile: Left-aligned at 20px; Desktop: Centered */}
        <div 
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#1C6CD4] via-emerald-500 via-70% to-[#142C5C] shadow-sm rounded-full"
        />

        {/* Milestone Cards Container */}
        <div className="space-y-12 sm:space-y-16">
          <AnimatePresence>
            {filteredMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const isExpanded = expandedId === milestone.id;

              return (
                <motion.div
                  key={milestone.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node / Pulsating Checkpoint Indicator */}
                  <div 
                    className={`absolute left-5 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-md ${getNodeColor(
                      milestone.tagColor
                    )} transition-transform hover:scale-125 cursor-pointer`}
                    onClick={() => toggleExpand(milestone.id)}
                    title="Click to toggle technical deep-dive"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span className="absolute -inset-1 rounded-full border border-[#1C6CD4]/30 animate-ping opacity-30 pointer-events-none" />
                  </div>

                  {/* Date Pillar for Desktop (Opposite Side) */}
                  <div className={`hidden md:block w-1/2 px-8 pt-2 ${isEven ? 'text-right' : 'text-left'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 font-mono text-xs font-bold text-slate-800 shadow-sm">
                      <Calendar className="w-3.5 h-3.5 text-[#1C6CD4]" />
                      <span>{milestone.yearRange}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1">
                      {milestone.categoryLabel}
                    </div>
                  </div>

                  {/* Card Body */}
                  {/* On Mobile: indented by pl-14 to clear left spine; on Desktop: w-1/2 with px-8 */}
                  <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    <article 
                      className={`group p-6 sm:p-8 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#1C6CD4] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 relative overflow-hidden`}
                    >
                      {/* Header Badge & Meta Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getTagColorClasses(milestone.tagColor)}`}>
                            {milestone.highlightTag}
                          </span>
                        </div>
                        {/* Mobile Year Badge */}
                        <div className="md:hidden inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                          <Calendar className="w-3 h-3 text-[#1C6CD4]" />
                          <span>{milestone.yearRange}</span>
                        </div>
                      </div>

                      {/* Role & Organization Title */}
                      <div className="space-y-1.5 pt-4">
                        <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                          {milestone.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-600">
                          <span className="flex items-center gap-1.5 font-bold text-slate-900">
                            <Building2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                            {milestone.organization}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3 h-3" />
                            {milestone.location}
                          </span>
                        </div>
                      </div>

                      {/* Executive Scope Narrative */}
                      <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed pt-3">
                        {milestone.scope}
                      </p>

                      {/* Key Verified HSE Achievements */}
                      <div className="space-y-2 pt-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#1C6CD4] font-bold block">
                          Verified Technical Milestones:
                        </span>
                        <ul className="space-y-2 text-xs text-slate-700 font-sans font-medium">
                          {milestone.achievements.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics Pill Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-4 mt-4 border-t border-slate-100">
                        {milestone.metrics.map((m, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-[10px] font-mono text-slate-500 block truncate">
                              {m.label}
                            </span>
                            <span className="text-xs font-mono font-black text-slate-900 block mt-0.5 truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Technical Deep-Dive Toggle */}
                      {milestone.deepDive && (
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={() => toggleExpand(milestone.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1C6CD4] hover:underline transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? 'Hide Technical Context' : 'Inspect Field Standards & Protocol'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
                              >
                                <div>
                                  <span className="font-mono text-[10px] uppercase text-emerald-700 font-bold block mb-1">
                                    Engineering & Operational Reality:
                                  </span>
                                  <p className="text-slate-700 leading-relaxed font-sans">
                                    {milestone.deepDive.context}
                                  </p>
                                </div>

                                <div>
                                  <span className="font-mono text-[10px] uppercase text-[#1C6CD4] font-bold block mb-1">
                                    Governing Technical Standards:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {milestone.deepDive.standards.map((std, si) => (
                                      <span key={si} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-700 font-semibold">
                                        {std}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#142C5C] text-[11px] font-sans italic">
                                  <strong>Core HSE Principle:</strong> {milestone.deepDive.technicalTakeaway}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </article>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
