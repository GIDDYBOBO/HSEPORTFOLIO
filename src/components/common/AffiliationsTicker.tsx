import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  GraduationCap, 
  FileCheck2, 
  Scale 
} from 'lucide-react';

interface AffiliationItem {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

const AFFILIATIONS: AffiliationItem[] = [
  {
    id: 'jb',
    name: 'Julius Berger Nigeria PLC',
    subtitle: 'HSE Manager · 22+ Yrs Command',
    icon: <Building2 className="w-4 h-4 text-[#1C6CD4]" />
  },
  {
    id: 'iosh',
    name: 'CMIOSH UK',
    subtitle: 'Chartered Safety & Health Fellow #100175',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />
  },
  {
    id: 'coren',
    name: 'COREN Registered',
    subtitle: 'Practicing Civil Engineering Seal #R.16,916',
    icon: <Award className="w-4 h-4 text-[#142C5C]" />
  },
  {
    id: 'mnse',
    name: 'Nigerian Society of Engineers',
    subtitle: 'Corporate Member (MNSE) #17,896',
    icon: <Award className="w-4 h-4 text-emerald-700" />
  },
  {
    id: 'hw',
    name: 'Heriot-Watt University',
    subtitle: 'MSc Construction Civil Engineering (Distinction)',
    icon: <GraduationCap className="w-4 h-4 text-[#1C6CD4]" />
  },
  {
    id: 'portsmouth',
    name: 'University of Portsmouth',
    subtitle: 'MSc Occupational & Environmental Health Safety',
    icon: <GraduationCap className="w-4 h-4 text-purple-600" />
  },
  {
    id: 'iso',
    name: 'ISO 45001:2018',
    subtitle: 'Certified Lead Auditor (CQI / IRCA)',
    icon: <FileCheck2 className="w-4 h-4 text-emerald-600" />
  },
  {
    id: 'nass',
    name: '10th National Assembly',
    subtitle: 'Statutory Safety Reform & Mediation Lead',
    icon: <Scale className="w-4 h-4 text-amber-600" />
  },
  {
    id: 'ispon',
    name: 'Fellow ISPON',
    subtitle: 'Institute of Safety Professionals of Nigeria',
    icon: <ShieldCheck className="w-4 h-4 text-emerald-700" />
  }
];

export const AffiliationsTicker: React.FC = () => {
  return (
    <div className="w-full overflow-hidden py-6 border-y border-slate-200/80 bg-slate-50/70 select-none">
      <div className="max-w-7xl mx-auto px-4 mb-3 text-center sm:text-left">
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-bold">
          Verified Institutional Affiliations &amp; Statutory Credentials
        </span>
      </div>

      <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {/* Left & Right gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none" />

        {/* Continuous ticker track */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-6 py-1">
          {[...AFFILIATIONS, ...AFFILIATIONS].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#1C6CD4]/60 hover:shadow-xs transition-all duration-200 shrink-0 group cursor-default"
            >
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                {item.icon}
              </div>
              <div className="text-left">
                <span className="text-xs font-display font-black text-slate-900 block leading-tight group-hover:text-[#1C6CD4] transition-colors">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-slate-500 block leading-tight mt-0.5">
                  {item.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
