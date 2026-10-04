import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { SIGNATURE_WORKS, Megaproject } from '../../data/projectsData';
import { CaseStudyModal } from '../modals/CaseStudyModal';
import { ProjectsListSkeleton } from '../common/Skeletons';
import { 
  Building2, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Layers,
  ChevronRight,
  Filter,
  Activity,
  Calendar,
  AlertTriangle,
  ArrowDownUp,
  LayoutGrid,
  Search,
  Zap
} from 'lucide-react';

interface WorksPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const WorksPage: React.FC<WorksPageProps> = ({
  onSelectPage,
  onOpenBookingModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [timelineOrder, setTimelineOrder] = useState<'desc' | 'asc'>('desc');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Megaproject | null>(null);

  const isLoading = false;

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

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16 text-slate-900">
      {/* 1. Header Section with Landmark Megaprojects Visual */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1C6CD4] text-xs font-mono font-bold">
            <Building2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Frontline Portfolio • Mega-Infrastructure Safety</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
            Signature Works &amp; Landmark Megaprojects
          </h1>
          <p className="text-slate-700 text-base sm:text-lg font-sans leading-relaxed font-normal">
            Over two decades directing executive HSE frameworks for high-consequence civil engineering schemes across West Africa. From multi-billion naira trans-Niger marine corridors to high-density capital expressways and sovereign institutional towers.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-600">
            <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 hover:border-[#1C6CD4] transition-colors">
              <span className="text-emerald-700 font-bold">6</span> Signature Megaprojects
            </div>
            <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 hover:border-[#1C6CD4] transition-colors">
              <span className="text-[#1C6CD4] font-bold">18M+</span> Man-Hours Governed
            </div>
          </div>
        </div>

        {/* Megaproject Civil Infrastructure Showcase Card */}
        <div className="lg:col-span-5 w-full">
          <div 
            onClick={() => setActiveCaseStudy(SIGNATURE_WORKS[0])}
            className="relative rounded-3xl overflow-hidden border border-slate-200 hover:border-[#1C6CD4] bg-white shadow-xl group cursor-pointer transition-all duration-500 hover:shadow-[0_20px_45px_rgba(28,108,212,0.15)]"
          >
            <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="Second River Niger Bridge Heavy Civil Infrastructure and Marine Foundation Works"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-[0.85] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent" />

              {/* Hover Magnification Callout */}
              <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-mono font-bold border border-slate-200 flex items-center gap-2 scale-90 group-hover:scale-100 transition-transform shadow-xl">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Inspect Safety Case Study &amp; Results</span>
                </span>
              </div>
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[11px] font-mono self-start font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#1C6CD4]" />
                <span>Featured Project • Second River Niger Bridge</span>
              </div>

              <div className="space-y-1.5 text-left bg-white/95 backdrop-blur-md -mx-2 -mb-2 p-4 rounded-2xl border border-slate-200 shadow-lg">
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#1C6CD4] uppercase tracking-wider font-bold">
                  <span>Trans-Niger Marine Foundation</span>
                  <span className="text-slate-900">18.6M Hours</span>
                </div>
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                  High-Risk Waterborne Civil Safety Regimes
                </h3>
                <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed font-medium">
                  Sub-surface drilling, marine vessel traffic management, and zero fatal drowning incidents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Filter & View Switcher Controls */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#1C6CD4]" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
              Engineering Classification:
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1C6CD4] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Projects View: Grid (Default) vs Timeline */}
        {isLoading ? (
          <ProjectsListSkeleton count={4} />
        ) : viewMode === 'grid' ? (
          /* =========================================================================
             GRID OF PROJECT CARDS WITH HOVER-EFFECT MAGNIFICATIONS
             ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  duration: 0.55, 
                  delay: (index % 2) * 0.08, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onClick={() => setActiveCaseStudy(project)}
                className="group p-6 sm:p-8 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#1C6CD4] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-2 hover:scale-[1.01]"
              >
                {/* Image Container with Hover Magnification */}
                {project.imageUrl && (
                  <div className="relative h-52 sm:h-56 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                    
                    {/* Category Pill on Image */}
                    <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#1C6CD4] text-[11px] font-mono font-bold shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C6CD4]" />
                      <span>{project.category}</span>
                    </div>

                    {/* Timeline Date Pill on Image */}
                    <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-[11px] font-mono font-bold shadow-sm">
                      <Clock className="w-3 h-3 text-emerald-600" />
                      <span>{project.timelineDate}</span>
                    </div>

                    {/* Hover Magnification Preview Callout Badge */}
                    <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-mono font-bold border border-slate-200 flex items-center gap-2 scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Inspect Safety Challenges &amp; Results</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Verified Safety Record Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{project.safetyRecord}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {project.manHours}
                    </span>
                  </div>

                  {/* Title & Scope with Hover Underline */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug sm:leading-tight">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                        <Building2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                        {project.client}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {project.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Technical Challenge & HSE Solution Snapshot */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-red-600 font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        Critical Safety Challenge:
                      </span>
                      <p className="text-slate-700 leading-relaxed font-sans line-clamp-2">
                        {project.challenge}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-slate-200">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Engineered HSE Countermeasure:
                      </span>
                      <p className="text-slate-700 leading-relaxed font-sans line-clamp-2">
                        {project.hseSolution}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <span className="text-[10px] font-mono text-slate-500 block truncate">
                          {metric.label}
                        </span>
                        <span className="text-xs font-mono font-black text-slate-900 block mt-0.5 truncate">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Trigger Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCaseStudy(project);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-[#1C6CD4] text-slate-900 hover:text-white font-mono font-bold text-xs border border-slate-200 hover:border-[#1C6CD4] transition-all flex items-center justify-between group/btn cursor-pointer shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 group-hover/btn:text-white" />
                    <span>View Safety Case Study &amp; Results</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          /* =========================================================================
             TIMELINE VIEW
             ========================================================================= */
          <div className="relative pl-6 sm:pl-10 md:pl-12 lg:pl-14 space-y-10 sm:space-y-12 pt-2 animate-fadeIn">
            {/* Continuous vertical timeline track spine */}
            <div className="absolute left-[11px] sm:left-[19px] md:left-[23px] lg:left-[27px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#1C6CD4] via-emerald-500 to-[#142C5C]" />

            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
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
                {/* Timeline Marker Node */}
                <div className="absolute -left-[27px] sm:-left-[35px] md:-left-[39px] lg:-left-[43px] top-6 z-10">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-[#1C6CD4] group-hover:border-emerald-500 group-hover:scale-125 transition-all flex items-center justify-center shadow-md">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#1C6CD4] group-hover:bg-emerald-500 transition-colors" />
                  </div>
                </div>

                {/* Timeline Card */}
                <article 
                  onClick={() => setActiveCaseStudy(project)}
                  className="p-6 sm:p-8 rounded-3xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#1C6CD4] transition-all duration-300 cursor-pointer space-y-6 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5"
                >
                  {/* Project Image Header with Magnification */}
                  {project.imageUrl && (
                    <div className="relative h-48 sm:h-64 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 overflow-hidden group/img">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 brightness-[0.85] contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[#1C6CD4] text-xs font-mono font-bold shadow-sm">
                        <span>{project.category}</span>
                      </div>
                      <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-mono font-bold shadow-sm">
                        <span>{project.timelineDate}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 pb-4">
                    <div className="space-y-1.5">
                      <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1.5 text-slate-800 font-bold">
                          <Building2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                          {project.client}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {project.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 font-bold self-start shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{project.safetyRecord}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((m, mi) => (
                      <div key={mi} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] font-mono uppercase text-slate-500 block truncate">{m.label}</span>
                        <span className="text-xs font-mono font-black text-slate-900 block mt-0.5 truncate">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCaseStudy(project);
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                  >
                    <span>Inspect Safety Challenges &amp; Results</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </article>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* 4. High-Consequence Safety Protocol Callout */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 sm:p-12 md:p-14 rounded-3xl bg-slate-50 hover:bg-slate-100/80 text-slate-900 shadow-md border border-slate-200 hover:border-[#1C6CD4] space-y-8 relative overflow-hidden transition-all group"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1C6CD4]/05 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1C6CD4]/10 transition-all" />

        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
            The Zero-Harm Execution Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            Every mega-infrastructure site operates under predictive risk containment. By uniting rigorous ISO 45001 auditing diagnostics, real-time environmental fatigue pacing, and non-punitive Just Culture reporting, 50M+ cumulative work hours have been delivered with zero fatal incidents.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-[#1C6CD4] transition-colors">
            <span className="text-xs font-mono text-[#1C6CD4] uppercase font-black block">1. Predictive Hazard Control</span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
              Dynamic risk assessment prior to every high-tonnage tandem crane lift or marine barge launch.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-emerald-500 transition-colors">
            <span className="text-xs font-mono text-emerald-700 uppercase font-black block">2. Bioclimatic Health</span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
              Scientific heat index measurements governing work-rest cycles for hot-mix asphalt laydown.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 hover:border-amber-500 transition-colors">
            <span className="text-xs font-mono text-amber-700 uppercase font-black block">3. Just Culture Reporting</span>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
              Psychologically safe frontline near-miss logging, empowering all 1,800+ workers to exercise Stop Work Authority.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. Bottom Engagement CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 sm:p-12 md:p-14 rounded-3xl bg-slate-50 text-slate-900 shadow-md border border-slate-200 text-center space-y-6 relative overflow-hidden group hover:border-[#1C6CD4] transition-all"
      >
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
            Consult on High-Consequence Project Safety
          </h2>
          <p className="text-xs sm:text-base text-slate-700 leading-relaxed font-sans font-medium">
            Planning major civil works, marine engineering, or high-risk highway expansions? Engage Engr. Osazee for safety case drafting, ISO 45001 auditing, or executive board risk representation.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenBookingModal}
            className="flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-xs tracking-tight transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            <span>Book a Technical Briefing</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={() => onSelectPage('services')}
            className="px-8 py-3.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-mono font-bold text-xs border border-slate-300 transition-all cursor-pointer shadow-md hover:scale-105"
          >
            Explore All Safety Services
          </button>
        </div>
      </motion.section>

      {/* Case Study Modal detailing challenges, countermeasures, results, and specs */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onBookAdvisory={onOpenBookingModal}
      />
    </div>
  );
};
