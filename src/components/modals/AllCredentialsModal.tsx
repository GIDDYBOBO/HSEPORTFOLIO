import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Credential } from '../../types';
import { CREDENTIALS } from '../../data/profileData';
import { subscribeToCredentials } from '../../lib/portfolioService';
import { usePerceivedLoading, CredentialsGridSkeleton } from '../common/Skeletons';
import { 
  X, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  FileCheck,
  Building,
  Calendar,
  Search,
  Filter
} from 'lucide-react';

interface AllCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXTENDED_CREDENTIALS: Credential[] = [
  ...CREDENTIALS,
  {
    id: "hse-directorship",
    title: "Executive Safety Governance Masterclass",
    designation: "Executive Safety Governance",
    issuer: "Julius Berger Nigeria PLC Corporate HSE Academy",
    year: "Ongoing Senior Mandate",
    credentialId: "JBN-HSE-DIR-2006",
    description: "Operational mastery in leading high-consequence civil engineering safety regimes across complex river bridge construction and federal transport corridors.",
    highlight: false,
    verificationStatus: "Verified"
  },
  {
    id: "iosh-panelist",
    title: "Chartered Membership Peer Review Interview Panelist",
    designation: "Peer Review Interviewer",
    issuer: "Institution of Occupational Safety and Health (IOSH), United Kingdom",
    year: "Appointed 2025",
    credentialId: "IOSH UK Assessment Ref: 100175/PRI",
    description: "Formally designated peer interviewer vetting international senior safety practitioners applying for Chartered Safety and Health Professional (CMIOSH) standing.",
    highlight: true,
    verificationStatus: "Chartered"
  },
  {
    id: "parliamentary-advisory",
    title: "Statutory Reform Expert Advisor",
    designation: "Parliamentary Mediation Panelist",
    issuer: "House of Representatives Committee on Safety Standards, National Assembly of Nigeria",
    year: "2023 – 2025",
    credentialId: "NASS-HR-CSSR-2023",
    description: "Statutory appointment arbitrating the ISPON leadership dispute under the ISPON Act 2014, restoring national regulatory governance and fair elections.",
    highlight: true,
    verificationStatus: "Verified"
  },
  {
    id: "bohs-bursary",
    title: "British Occupational Hygiene Society (BOHS) Bursary",
    designation: "BOHS Bursary Laureate",
    issuer: "British Occupational Hygiene Society, United Kingdom",
    year: "Awarded Jan 2007",
    credentialId: "BOHS-UK-BURSARY-2007",
    description: "Prestigious international bursary awarded in support of postgraduate research in industrial hygiene and environmental health at University of Portsmouth.",
    highlight: false,
    verificationStatus: "Verified"
  },
  {
    id: "cbn-safety-excellence",
    title: "CBN Headquarters Project Safety Recognition",
    designation: "Site Safety Excellence",
    issuer: "National Safety Advisory Committee",
    year: "Dec 2000",
    credentialId: "CBN-HQ-SAFETY-2000",
    description: "Conferred on the Julius Berger Safety Section at the Central Bank of Nigeria HQ project for exemplary engineering safety standards.",
    highlight: false,
    verificationStatus: "Verified"
  },
  {
    id: "law-contract-prize",
    title: "Prof. Itse Sagay Prize in Law of Contract",
    designation: "Contract Law Prize",
    issuer: "Chartered Institute of Arbitrators Nigeria (CIAN)",
    year: "2012",
    credentialId: "CIAN-LAW-2012",
    description: "Academic prize awarded for premier performance in contract law examination, underpinning safety compliance in major civil agreements.",
    highlight: false,
    verificationStatus: "Verified"
  }
];

export const AllCredentialsModal: React.FC<AllCredentialsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [credentialsList, setCredentialsList] = useState<Credential[]>(EXTENDED_CREDENTIALS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'chartered' | 'auditing' | 'institutional'>('all');

  // Instant local rendering without artificial delays
  const isLoading = false;

  useEffect(() => {
    const unsub = subscribeToCredentials((liveCreds) => {
      if (liveCreds && liveCreds.length > 0) {
        const map = new Map<string, Credential>();
        EXTENDED_CREDENTIALS.forEach(c => map.set(c.id, c));
        liveCreds.forEach(c => map.set(c.id, c));
        setCredentialsList(Array.from(map.values()));
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCredentials = credentialsList.filter((cred) => {
    const matchesSearch = 
      cred.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cred.credentialId && cred.credentialId.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterType === 'chartered') {
      return cred.designation.includes('CMIOSH') || cred.designation.includes('MNSE') || cred.designation.includes('ISPON');
    }
    if (filterType === 'auditing') {
      return cred.designation.includes('Auditor') || cred.designation.includes('Cert');
    }
    if (filterType === 'institutional') {
      return cred.designation.includes('Panelist') || cred.designation.includes('Governance') || cred.designation.includes('Award');
    }
    return true;
  });

  return (
    <AnimatePresence>
      <div 
        id="all-credentials-modal-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden bg-slate-900/50 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl max-h-[86vh] sm:max-h-[88vh] rounded-3xl bg-white border-2 border-slate-200 text-slate-900 shadow-2xl flex flex-col my-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-7 border-b-2 border-slate-200 bg-slate-50 relative shrink-0">
            <button
              id="btn-close-credentials-modal"
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center transition-all border border-slate-300 active:scale-95 cursor-pointer font-bold"
              aria-label="Close credentials modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#1C6CD4] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1C6CD4]" />
                <span>Professional Evidence &amp; Verification Registry</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
                All Professional Credentials &amp; Certifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Verifiable institutional certifications, chartered registrations, international auditor credentials, and statutory peer appointments.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by credential title, ID (e.g. 100175), or issuer..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#1C6CD4] transition-colors"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                <Filter className="w-3.5 h-3.5 text-slate-600 shrink-0 mr-1" />
                {[
                  { id: 'all', label: 'All (12)' },
                  { id: 'chartered', label: 'Chartered & NSE' },
                  { id: 'auditing', label: 'ISO & Safety' },
                  { id: 'institutional', label: 'Governance' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterType(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                      filterType === f.id
                        ? 'bg-[#1C6CD4] text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Credentials Grid (Scrolls internally within screen range) */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-4">
            <div className="text-xs font-mono text-slate-600 flex items-center justify-between pb-1 font-bold">
              <span>Showing {filteredCredentials.length} verifiable credentials</span>
              <span>Evidence Standard: ISO / IOSH UK / NSE / ISPON</span>
            </div>

            {isLoading ? (
              <CredentialsGridSkeleton count={6} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                {filteredCredentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#1C6CD4] transition-all flex flex-col justify-between space-y-3 group text-slate-900 shadow-sm"
                  >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1C6CD4] border border-blue-200 text-[11px] font-mono font-bold">
                        {cred.designation}
                      </span>
                      {cred.credentialId && (
                        <span className="text-[10px] font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-bold">
                          {cred.credentialId}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-display font-black text-slate-900 transition-colors leading-snug">
                      {cred.title}
                    </h3>

                    <p className="text-xs text-emerald-700 font-bold">
                      {cred.issuer}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed pt-1 font-medium">
                      {cred.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Status: Active / Certified
                    </span>
                    {cred.year && (
                      <span className="font-bold text-slate-700">{cred.year}</span>
                    )}
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer (Shrink-0) */}
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-600">
              Direct verification queries may be dispatched through official corporate liaison channels.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
            >
              Close Registry
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
