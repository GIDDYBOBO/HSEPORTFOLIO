import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LEADERSHIP_ROLES, AWARDS_AND_HONORS } from '../../data/profileData';
import { usePerceivedLoading, LeadershipGridSkeleton } from '../common/Skeletons';
import { 
  Award, 
  Landmark, 
  Mic2, 
  CheckCircle2, 
  Info,
  Sparkles
} from 'lucide-react';

export const LeadershipPage: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<'all' | 'governance' | 'institutional' | 'speaking'>('all');

  // Instant local rendering without artificial delays
  const isLoading = false;

  const filteredRoles = LEADERSHIP_ROLES.filter((role) => {
    if (roleFilter === 'all') return true;
    return role.category === roleFilter;
  });

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* Header Section with Executive Governance Visual */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-xs font-mono">
            <Award className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Statutory Governance &amp; International Presence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Institutional Leadership, Governance &amp; Speaking
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Beyond his corporate executive duties at Julius Berger Nigeria PLC, Engr. Osazee plays a central role in shaping national safety legislation, superintending international professional elections, mentoring chartered safety aspirants, and addressing global symposiums.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">National Assembly Assignment</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">IOSH UK Electoral Scrutineer</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">ISPON Fellow #004</span>
          </div>
        </div>

        {/* Executive Governance & International Summit Showcase Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#3c4043] bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
            <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="Executive Institutional Assembly, Statutory Hearing, and International Keynote Symposium"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.80] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end pointer-events-none">
              <div className="space-y-1 text-left">
                <span className="text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                  National Assembly Resolution
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow leading-snug">
                  High-Level Statutory &amp; Institutional Authority
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                  National Assembly resolution of the 10-year ISPON leadership dispute and international CMIOSH peer mentorship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feature Spotlight: National Assembly & ISPON Legislative Reform */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-8 sm:p-10 rounded-3xl dialed-glass-card text-[#333333] dark:text-white relative overflow-hidden"
      >
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
            <div className="flex items-center space-x-2 text-[#475569] dark:text-[#c4c7c5] text-xs font-mono uppercase tracking-wider">
              <Landmark className="w-4 h-4 text-[#1C6CD4] dark:text-[#a8c7fa]" />
              <span>National Legislative Assignment (May 2023 – Dec 2025)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-transparent text-[#64748b] dark:text-[#8e918f] text-xs font-mono font-bold">
                ISPON Act 2014 Framework
              </span>
            </div>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0f172a] dark:text-white tracking-tight leading-snug sm:leading-tight">
              House of Representatives Committee on Safety Standards &amp; Regulation
            </h2>
            <p className="text-xs sm:text-sm text-[#1C6CD4] dark:text-[#a8c7fa] font-mono font-medium">
              Statutory Mediation &amp; Institutional Governance Reform for the Institute of Safety Professionals of Nigeria (ISPON)
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#444444] dark:text-[#c4c7c5] leading-relaxed max-w-3xl">
            Appointed by the National Assembly sub-committee to resolve long-standing institutional friction within ISPON. Over a multi-year assignment, Engr. Osazee conducted formal sittings, evaluated stakeholder dossiers, formulated binding financial and electoral codes, and successfully superintended the historic October 2024 national elections that unified the profession under statutory law.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#0f172a] dark:text-white font-bold block">1. Dossier Evaluation</span>
              <p className="text-xs text-[#444444] dark:text-[#c4c7c5] leading-relaxed">
                Audited dispute records and institutional documentation spanning past regulatory friction.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#0f172a] dark:text-white font-bold block">2. Statutory Framework</span>
              <p className="text-xs text-[#444444] dark:text-[#c4c7c5] leading-relaxed">
                Formulated transparent financial frameworks and electoral guidelines under the ISPON Act 2014.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
              <span className="text-xs font-mono text-[#0f172a] dark:text-white font-bold block">3. Democratic Resolution</span>
              <p className="text-xs text-[#444444] dark:text-[#c4c7c5] leading-relaxed">
                Delivered unified national leadership elections in October 2024, restoring statutory stability.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Roles & Service */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-[#333538] pb-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-black dark:text-white leading-snug sm:leading-tight">
              Institutional Governance & Professional Service
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
              Service across the Institution of Occupational Safety and Health (IOSH), ISPON, and NISafetyE
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-1.5 p-1 rounded-lg bg-neutral-100 dark:bg-[#282a2c] border border-neutral-200 dark:border-[#333538] text-xs">
            {[
              { id: 'all', label: 'All Roles' },
              { id: 'governance', label: 'Governance & Panels' },
              { id: 'institutional', label: 'Institutional' },
              { id: 'speaking', label: 'Keynote & Speeches' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  roleFilter === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <LeadershipGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {filteredRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl dialed-glass-card hover:border-[#a8c7fa]/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-800 dark:text-neutral-300 px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-[#444746]">
                      {role.period}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-medium">
                      {role.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-bold text-black dark:text-white leading-snug">
                      {role.role}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                      {role.organization}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#282a2c]/80 border border-neutral-200 dark:border-[#333538] text-xs text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium">
                    {role.impactSummary}
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {role.details}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-[#333538] flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                  <span>Verified Public Record</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-black dark:text-white" />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Honors, Awards & Distinctions */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="border-b border-neutral-200 dark:border-[#333538] pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Accolades & Professional Distinctions
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-black dark:text-white mt-1 leading-snug sm:leading-tight">
            Honors, Prizes & Recognized Distinctions
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-1">
            Carefully curated to distinguish between individual scholarship, institutional listings, and corporate team milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AWARDS_AND_HONORS.map((award, idx) => {
            const isIndividual = award.category === 'individual';
            const isInstitutional = award.category === 'institutional_recognition';
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl dialed-glass-card hover:border-[#a8c7fa]/40 flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{award.year}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                      isIndividual
                        ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border-neutral-200 dark:border-neutral-600 font-semibold'
                        : isInstitutional
                        ? 'bg-neutral-50 dark:bg-[#1e1f20] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-[#444746]'
                        : 'bg-neutral-50 dark:bg-[#1e1f20] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-[#444746]'
                    }`}>
                      {isIndividual ? 'Individual Honor' : isInstitutional ? 'Corporate Recognition' : 'Site / Team Award'}
                    </span>
                  </div>

                  <h3 className="text-base font-display font-bold text-black dark:text-white leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {award.awardingBody}
                  </p>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                    {award.description}
                  </p>
                </div>

                {award.notes && (
                  <div className="pt-2 border-t border-neutral-100 dark:border-[#333538] text-[11px] text-neutral-500 dark:text-neutral-400 flex items-start space-x-1.5 italic">
                    <Info className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300 mt-0.5 shrink-0" />
                    <span>{award.notes}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Speaking & Keynote Topics */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#1C6CD4]">
            <Sparkles className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Thought Leadership Topics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white mt-1 leading-snug sm:leading-tight">
            Signature Keynote &amp; Executive Workshop Themes
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
            Available for international conferences, corporate boardrooms, and engineering symposiums.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] border border-white/10 hover:border-[#1C6CD4]/60 text-white shadow-xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="w-12 h-12 rounded-2xl bg-[#1C6CD4]/15 border border-[#1C6CD4]/30 text-[#93c5fd] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic2 className="w-5 h-5 text-[#1C6CD4]" />
            </div>
            <h3 className="text-white font-display font-black text-lg group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
              Human-Centered Safety in Mega-Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
              Moving beyond bureaucratic compliance. How civil engineering leadership at Julius Berger integrates psychological safety, just reporting, and zero-blame learning.
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] border border-white/10 hover:border-[#96E2A5]/60 text-white shadow-xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="w-12 h-12 rounded-2xl bg-[#154E20]/25 border border-[#96E2A5]/30 text-[#96E2A5] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic2 className="w-5 h-5 text-[#96E2A5]" />
            </div>
            <h3 className="text-white font-display font-black text-lg group-hover:text-[#96E2A5] group-hover:underline decoration-[#96E2A5] decoration-2 underline-offset-4 transition-all leading-snug">
              Thermal Hazards &amp; Tropical Bioclimatic Safety
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
              Managing extreme heat, metabolic work-rest cycles, and hydration in outdoor construction, farming, and extractive industries across Sub-Saharan Africa and arid zones.
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] border border-white/10 hover:border-[#fbbf24]/60 text-white shadow-xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 group">
            <div className="w-12 h-12 rounded-2xl bg-[#fbbf24]/15 border border-[#fbbf24]/30 text-[#fbbf24] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mic2 className="w-5 h-5 text-[#fbbf24]" />
            </div>
            <h3 className="text-white font-display font-black text-lg group-hover:text-[#fbbf24] group-hover:underline decoration-[#fbbf24] decoration-2 underline-offset-4 transition-all leading-snug">
              Construction SME Safety &amp; Subcontractor Resilience
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
              Selected at the 23rd World Congress in Sydney: Practical, cost-effective frameworks for bringing informal subcontractors into tier-1 safety standards.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
