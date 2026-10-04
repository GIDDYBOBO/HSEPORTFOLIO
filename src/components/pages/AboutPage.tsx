import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, Credential } from '../../types';
import { useLivePortfolioData } from '../../hooks/useLivePortfolioData';
import { ACADEMIC_QUALIFICATIONS } from '../../data/profileData';
import { CareerTimeline } from '../about/CareerTimeline';
import { 
  BadgeCheck, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Award,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';

interface AboutPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
  onOpenCredentialsModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onSelectPage,
  onOpenBookingModal,
  onOpenCredentialsModal
}) => {
  const { credentials: liveCredentials } = useLivePortfolioData();
  const [showAllCreds, setShowAllCreds] = useState(false);
  const [selectedCred, setSelectedCred] = useState<Credential | null>(null);

  const displayedCredentials = showAllCreds 
    ? liveCredentials 
    : liveCredentials.slice(0, 6);

  const coreValues = [
    {
      title: 'Non-Punitive Just Culture',
      desc: 'Safety thrives when workers are empowered to report hazards without fear of retribution. True prevention learns from frontline reality rather than assigning blame.',
      accent: 'blue'
    },
    {
      title: 'Engineering Superiority over Rules',
      desc: 'Rules guide behavior, but physical design eliminates hazards. Eliminating danger through physical engineering barriers always supersedes administrative warnings.',
      accent: 'mint'
    },
    {
      title: 'Evidence-Led Hygiene & Ergonomics',
      desc: 'Thermal heat stress, chemical exposures, and fatigue are measurable physical stressors. Governance requires biometric monitoring rather than guesswork.',
      accent: 'amber'
    },
    {
      title: 'Zero Compromise on Frontline Dignity',
      desc: 'Every artisan, rigger, and driver must return home whole each night. Corporate directorship is judged by how the most vulnerable worker is safeguarded.',
      accent: 'blue'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pt-24 sm:pt-32 pb-24 text-neutral-100 max-w-6xl mx-auto transition-colors duration-200">
      
      {/* =========================================================================
          1. INTRODUCTION (Storytelling Dossier with Portrait)
             Obsidian Black Canvas with Luminous Safety Accents
          ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C6CD4]/15 border border-[#1C6CD4]/30 text-xs font-mono text-[#93c5fd] font-extrabold">
            <BadgeCheck className="w-3.5 h-3.5 text-[#1C6CD4]" />
            <span>Professional Dossier • Executive Profile</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight">
            A Career Built Around Safety, Responsibility and People.
          </h1>

          <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans font-normal">
            <p>
              Engr. Iyenoma ThankGod Osazee is an acclaimed Nigerian health, safety, and environmental executive whose career spans over two decades at the forefront of the construction industry with Julius Berger Nigeria PLC.
            </p>
            <p>
              Sitting at the rare nexus of <span className="text-white font-semibold underline decoration-[#1C6CD4] decoration-2 underline-offset-4">civil engineering and occupational hygiene</span>, he unites high-level academic research, international safety standards (ISO 45001 &amp; ISO 14001), and frontline mega-infrastructure execution across river marine bridges, highways, and high-consequence civil schemes.
            </p>
            <p>
              Unlike purely bureaucratic approaches, his practice translates statutory mandates into living site cultures where workers feel protected and empowered.
            </p>
          </div>

          {/* On Smaller Screens: Portrait Image comes BEFORE Dual British Postgraduate Education */}
          <div className="block lg:hidden my-6">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 hover:border-[#1C6CD4]/60 bg-[#11141c] shadow-2xl group transition-all duration-500">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <img
                  src="/assets/portrait.jpg"
                  alt="Engr. Iyenoma ThankGod Osazee"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C6CD4]/30 border border-[#1C6CD4]/40 text-[11px] font-mono text-[#93c5fd] font-bold mb-1.5">
                    <ShieldCheck className="w-3 h-3 text-[#96E2A5]" />
                    <span>CMIOSH UK #100175</span>
                  </div>
                  <div className="text-lg sm:text-xl font-display font-black group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                    Engr. Iyenoma T. Osazee
                  </div>
                  <div className="text-xs text-neutral-300 font-mono mt-0.5">
                    Executive HSE Leader • Civil Engineer &amp; Author
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Academic Qualifications */}
          <div className="pt-4 space-y-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#93c5fd] font-bold">
              <GraduationCap className="w-4 h-4 text-[#1C6CD4]" />
              <span>Dual British Postgraduate Education:</span>
            </div>
            <ul className="space-y-2 text-xs text-neutral-200 font-mono">
              {ACADEMIC_QUALIFICATIONS.map((acad, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#96E2A5] font-black text-sm leading-none">•</span>
                  <span>
                    <strong className="text-white font-bold">{acad.degree}</strong> — <span className="text-neutral-400">{acad.institution}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Executive Portrait Card with Glowing Accents (Desktop only) */}
        <div className="hidden lg:block lg:col-span-5 w-full">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 hover:border-[#1C6CD4]/60 bg-[#11141c] shadow-2xl group transition-all duration-500 hover:shadow-[0_20px_45px_rgba(28,108,212,0.2)]">
            <div className="relative h-80 sm:h-96 lg:h-[430px] w-full overflow-hidden">
              <img
                src="/assets/portrait.jpg"
                alt="Engr. Iyenoma ThankGod Osazee"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1C6CD4]/30 border border-[#1C6CD4]/40 text-[11px] font-mono text-[#93c5fd] font-bold mb-1.5">
                  <ShieldCheck className="w-3 h-3 text-[#96E2A5]" />
                  <span>CMIOSH UK #100175</span>
                </div>
                <div className="text-lg sm:text-xl font-display font-black group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                  Engr. Iyenoma T. Osazee
                </div>
                <div className="text-xs text-neutral-300 font-mono mt-0.5">
                  Executive HSE Leader • Civil Engineer &amp; Author
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. VERTICAL ANIMATED CAREER TIMELINE COMPONENT
             Features 'fade-up-section' class, interactive categories, 
             deep-dive toggles, and rich HSE achievements
          ========================================================================= */}
      <CareerTimeline />

      {/* =========================================================================
          3. CORE VALUES (4 Principles, Anti-Slop Layout)
             Obsidian Surface with Color Accent Accoutrements
          ========================================================================= */}
      <section className="space-y-8 pt-4">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Core Principles of Practice
          </h2>
          <p className="text-sm text-neutral-300 font-sans leading-relaxed">
            Frontline ethics, systemic accountability, and non-negotiable worker dignity governing every civil scheme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 rounded-3xl bg-[#11141c] hover:bg-[#141824] border border-white/10 hover:border-[#1C6CD4]/50 transition-all duration-300 shadow-xl space-y-3 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white text-xs font-mono font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C6CD4]" />
                  Principle 0{idx + 1}
                </span>
                <ShieldCheck className="w-4 h-4 text-[#96E2A5]" />
              </div>
              <h3 className="text-xl font-display font-black text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. COMPLETE CERTIFICATIONS & ACCREDITATIONS (Live CMS Connected)
             Obsidian Cards with Accent Badges
          ========================================================================= */}
      <section className="space-y-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
              Global Standing
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Certifications &amp; Accreditations
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans">
              Complete verified registry of chartered standing, ISO lead auditor certifications, and institutional fellowships.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onOpenCredentialsModal && (
              <button
                onClick={onOpenCredentialsModal}
                className="px-4 py-2 rounded-full border border-white/20 text-xs font-mono font-bold text-white hover:bg-white/10 transition-colors cursor-pointer self-start sm:self-auto"
              >
                Inspect All
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayedCredentials.map((cred) => (
            <div
              key={cred.id}
              onClick={() => setSelectedCred(cred)}
              className="p-6 rounded-3xl bg-[#11141c] hover:bg-[#151924] border border-white/10 hover:border-[#1C6CD4]/60 transition-all duration-300 shadow-xl space-y-3 cursor-pointer group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#93c5fd] bg-[#1C6CD4]/15 px-2.5 py-1 rounded-full border border-[#1C6CD4]/30">
                  {cred.designation}
                </span>
                {cred.year && (
                  <span className="text-[11px] font-mono text-neutral-400 font-bold">
                    {cred.year}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-display font-black text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all">
                {cred.title}
              </h3>
              
              <p className="text-xs text-[#96E2A5] font-mono font-bold">
                {cred.issuer}
              </p>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans font-medium line-clamp-3">
                {cred.description}
              </p>

              {cred.credentialId && (
                <div className="text-[10px] font-mono text-neutral-400 pt-2 border-t border-white/5 font-semibold">
                  Ref: {cred.credentialId}
                </div>
              )}
            </div>
          ))}
        </div>

        {liveCredentials.length > 6 && (
          <div className="text-center pt-2">
            <button
              onClick={() => setShowAllCreds(!showAllCreds)}
              className="px-6 py-2.5 rounded-full border border-white/20 hover:border-[#1C6CD4] text-xs font-mono font-bold text-white hover:text-[#93c5fd] transition-all cursor-pointer inline-flex items-center gap-2 bg-white/5 shadow-sm"
            >
              <span>{showAllCreds ? 'Show Fewer Credentials' : `View All ${liveCredentials.length} Credentials`}</span>
              {showAllCreds ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}
      </section>

      {/* Credential Detail Modal */}
      <AnimatePresence>
        {selectedCred && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedCred(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg rounded-3xl p-8 space-y-5 bg-[#141824] border border-white/20 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-[#93c5fd] bg-[#1C6CD4]/20 px-2.5 py-0.5 rounded-full border border-[#1C6CD4]/40 font-bold">
                    {selectedCred.designation}
                  </span>
                  <h3 className="text-xl font-display font-black text-white mt-2 leading-snug">
                    {selectedCred.title}
                  </h3>
                  <p className="text-xs font-mono text-[#96E2A5] mt-1 font-bold">
                    {selectedCred.issuer}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCred(null)}
                  className="text-neutral-400 hover:text-white p-1 cursor-pointer font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-medium">
                {selectedCred.description}
              </p>

              {selectedCred.credentialId && (
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-neutral-300 font-bold">
                  Credential ID: {selectedCred.credentialId}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedCred(null)}
                  className="px-5 py-2 rounded-full bg-[#1C6CD4] text-white text-xs font-bold hover:bg-[#155ab3] cursor-pointer shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          5. BOTTOM INVITATION CTA
             Obsidian Surface with Blue & Green Gradient Accents
          ========================================================================= */}
      <section className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-[#11141c] to-[#161c28] border border-white/15 hover:border-[#1C6CD4]/50 transition-all text-white text-center shadow-2xl space-y-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1C6CD4]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1C6CD4]/20 transition-all" />

        <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
          Engage for Executive Safety Directorship
        </h2>
        <p className="text-xs sm:text-base text-neutral-300 max-w-xl mx-auto font-sans leading-relaxed">
          Available for corporate safety governance, high-consequence infrastructure bid advisory, and international keynote presentations.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onSelectPage('contact')}
            className="px-8 py-3.5 rounded-full font-black text-xs bg-[#1C6CD4] hover:bg-[#1855a8] text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </section>

    </div>
  );
};
