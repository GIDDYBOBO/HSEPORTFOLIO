import React, { useEffect, useState } from 'react';
import { Megaproject } from '../../data/projectsData';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Building2,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ChevronRight,
  Calendar,
  Compass,
  FileCheck,
  Zap
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Megaproject | null;
  onClose: () => void;
  onBookAdvisory: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onBookAdvisory
}) => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'strategies' | 'results' | 'specs'>('challenges');

  useEffect(() => {
    if (project) {
      setActiveTab('challenges');
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [project, onClose]);

  if (!project) return null;

  const getRiskBadge = (level: 'Critical' | 'High' | 'Severe') => {
    switch (level) {
      case 'Severe':
        return 'bg-red-500/15 border-red-500/30 text-red-300';
      case 'Critical':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-300';
      case 'High':
      default:
        return 'bg-blue-500/15 border-blue-500/30 text-blue-300';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden bg-slate-900/50 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white border border-slate-200 shadow-2xl flex flex-col my-auto overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Project Image Hero Banner with Ambient Accents */}
        {project.imageUrl && (
          <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-slate-100 shrink-0 border-b border-slate-200 group">
            <img
              src={project.imageUrl}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.85] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 transition-all border border-slate-200 z-10 cursor-pointer shadow-lg hover:scale-105"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on Banner */}
            <div className="absolute bottom-4 left-5 sm:left-7 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1C6CD4] text-xs font-mono font-bold border border-slate-200 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C6CD4]" />
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-900 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5 font-bold shadow-sm">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                {project.period}
              </span>
              <span className="hidden sm:inline-flex text-xs font-mono text-emerald-800 bg-emerald-50/95 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-200 items-center gap-1.5 font-bold shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {project.manHours}
              </span>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="relative p-5 sm:p-7 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#1C6CD4] font-bold">
                <Building2 className="w-3.5 h-3.5 text-[#1C6CD4]" />
                <span>{project.client}</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {project.location}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                {project.title}
              </h2>
            </div>

            {!project.imageUrl && (
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Interactive Case Study Section Tabs */}
          <div className="flex items-center gap-2 pt-4 mt-2 overflow-x-auto border-t border-slate-200">
            {[
              { id: 'challenges', label: 'Safety Challenges', count: project.safetyChallenges?.length || 1, icon: AlertTriangle },
              { id: 'strategies', label: 'HSE Strategies', count: project.hseStrategies?.length || 1, icon: ShieldCheck },
              { id: 'results', label: 'Measurable Results', count: project.measurableResults?.length || 1, icon: Award },
              { id: 'specs', label: 'Engineering Specs', count: project.metrics.length, icon: Layers }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1C6CD4] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1 text-slate-700">
          
          {/* Key Metrics Quick Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-1 hover:border-[#1C6CD4] transition-colors"
              >
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block truncate">
                  {m.label}
                </span>
                <span className="text-base sm:text-xl font-display font-black text-slate-900 tracking-tight">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* TAB 1: SAFETY CHALLENGES */}
          {activeTab === 'challenges' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>Specific Engineering &amp; Physical Safety Hazards</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  High-consequence conditions identified during hazard identification and risk assessment (HIRA) that required bespoke engineering controls:
                </p>
              </div>

              {project.safetyChallenges && project.safetyChallenges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.safetyChallenges.map((ch, ci) => (
                    <div 
                      key={ci} 
                      className="p-5 rounded-2xl bg-red-50 border border-red-200 space-y-2 hover:border-red-300 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-display font-bold text-slate-900 leading-snug">
                          {ch.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getRiskBadge(ch.riskLevel)}`}>
                          {ch.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                        {ch.hazard}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-sm font-display font-bold text-slate-900">Critical Risk Challenge:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{project.challenge}</p>
                </div>
              )}

              {/* Operational Context Quote */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase text-[#1C6CD4] font-bold block">
                  Operational Mandate Overview:
                </span>
                <p className="text-slate-700 font-sans leading-relaxed font-normal">
                  {project.summary}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: HSE STRATEGIES & ENGINEERING CONTROLS */}
          {activeTab === 'strategies' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Engineered Safety Controls &amp; Management Protocols</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Physical barriers, telemetry monitoring, and organizational systems deployed to eliminate risks at the source:
                </p>
              </div>

              {project.hseStrategies && project.hseStrategies.length > 0 ? (
                <div className="space-y-3">
                  {project.hseStrategies.map((strat, si) => (
                    <div 
                      key={si} 
                      className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{strat.title}</span>
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-700 bg-emerald-100 border border-emerald-200 font-bold">
                          Protocol 0{si + 1}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        {strat.protocol}
                      </p>
                      <div className="pt-2 border-t border-emerald-200/60 flex items-start gap-2 text-[11px] font-mono text-[#1C6CD4]">
                        <Zap className="w-3.5 h-3.5 text-[#1C6CD4] shrink-0 mt-0.5" />
                        <span><strong>Engineering Control:</strong> {strat.engineeringControl}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-sm font-display font-bold text-slate-900">Engineered HSE Solution:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{project.hseSolution}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEASURABLE RESULTS & MILESTONES */}
          {activeTab === 'results' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C6CD4] font-bold">
                  <Award className="w-3.5 h-3.5 text-[#1C6CD4]" />
                  <span>Audited Safety Records &amp; Measurable Milestones</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                  Empirical outcomes verified by third-party statutory bodies, ISO auditors, and client oversight:
                </p>
              </div>

              {project.measurableResults && project.measurableResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.measurableResults.map((res, ri) => (
                    <div 
                      key={ri} 
                      className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2 hover:border-blue-300 transition-colors"
                    >
                      <div className="text-base font-display font-black text-slate-900">
                        {res.metric}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        {res.outcome}
                      </p>
                      <div className="pt-2 border-t border-blue-200 text-[11px] font-mono text-emerald-700">
                        <strong>Audit Benchmark:</strong> {res.benchmark}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-sm font-display font-bold text-slate-900">Verified Safety Record:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{project.safetyRecord}</p>
                </div>
              )}

              {/* Verified Safety Badge Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-emerald-700 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Third-Party Compliance Standing
                  </span>
                  <p className="text-sm font-display font-black text-slate-900">
                    {project.safetyRecord}
                  </p>
                </div>
                <div className="text-xs font-mono text-slate-700 bg-white px-3 py-1.5 rounded-full border border-slate-200 self-start sm:self-auto font-bold">
                  ISO 45001 &amp; IOSH UK Code
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ENGINEERING SPECS & EXECUTIVE TAKEAWAY */}
          {activeTab === 'specs' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1C6CD4] font-bold">
                  <Layers className="w-3.5 h-3.5 text-[#1C6CD4]" />
                  <span>Technical Project Parameters &amp; Executive Takeaway</span>
                </div>
              </div>

              {project.engineeringSpecs && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                    Engineering Parameters:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                    {project.engineeringSpecs.map((spec, spi) => (
                      <div key={spi} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="text-slate-500 text-[10px] block">{spec.parameter}</span>
                        <span className="text-slate-900 font-bold block">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.executiveTakeaway && (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                  <span className="text-xs font-mono uppercase text-[#1C6CD4] font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Executive Safety Directorship Principle:
                  </span>
                  <blockquote className="text-xs sm:text-sm text-slate-700 font-sans italic leading-relaxed">
                    &ldquo;{project.executiveTakeaway}&rdquo;
                  </blockquote>
                  <span className="text-[11px] font-mono text-slate-500 block pt-1">
                    — Engr. Iyenoma ThankGod Osazee (CMIOSH UK #100175)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Project Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
            {project.tags.map((t, idx) => (
              <span 
                key={idx} 
                className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-[#1C6CD4] transition-colors"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-600 font-mono text-center sm:text-left">
            Need an equivalent executive HSE framework deployed on your venture?
          </p>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookAdvisory();
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-bold font-mono tracking-tight transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 hover:scale-105"
            >
              <span>Request Advisory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
