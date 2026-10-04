import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Send, 
  Mail, 
  MapPin, 
  Clock, 
  Building2, 
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

interface ServicesPageProps {
  onSelectPage: (page: PageId) => void;
  onOpenBookingModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectPage,
  onOpenBookingModal
}) => {
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    inquiryReason: 'hse_consultation',
    serviceType: 'mega_infrastructure',
    timeframe: 'immediate',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>('');

  // Auto-scroll to formal written query section if hash or sessionStorage requested
  useEffect(() => {
    const scrollToQuery = () => {
      const isTarget = 
        window.location.hash === '#formal-query' ||
        window.location.hash === '#formal-written-query-section' ||
        window.location.hash === '#inquiry-form-section' ||
        sessionStorage.getItem('hse_scroll_target') === 'formal-query';

      if (isTarget) {
        sessionStorage.removeItem('hse_scroll_target');
        const el = document.getElementById('formal-written-query-section') || document.getElementById('inquiry-form-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Staggered triggers to account for page enter transitions
    const t1 = setTimeout(scrollToQuery, 100);
    const t2 = setTimeout(scrollToQuery, 350);
    const t3 = setTimeout(scrollToQuery, 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const INQUIRY_REASONS = [
    { id: 'hse_consultation', label: 'HSE Consultation' },
    { id: 'speaking_training', label: 'Speaking Engagement' },
    { id: 'book_enquiry', label: 'Book & Research Enquiry' },
    { id: 'iso_audit', label: 'ISO 45001 / 14001 Audit' },
    { id: 'professional_opportunity', label: 'Professional Opportunity' },
    { id: 'general_enquiry', label: 'General Enquiry' }
  ];

  const services = [
    {
      number: '01',
      title: 'Mega-Infrastructure Safety Directorship & Executive Governance',
      desc: 'Enterprise-level occupational safety governance for complex civil engineering schemes, bridges, highway corridors, and multi-tier public works.',
      deliverables: [
        'Site-specific safety cases & high-consequence lifting regimes',
        'Zero-harm behavioral frameworks tailored for multicultural workforces',
        'Real-time contractor compliance dashboards and risk registries',
        'Executive board safety advisory and statutory client liaison'
      ],
      tag: 'Strategic Directorship',
      serviceKey: 'mega_infrastructure'
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
      tag: 'Lead Auditor #423290',
      serviceKey: 'iso_audit'
    },
    {
      number: '03',
      title: 'Bioclimatic Thermal Stress & Severe Weather Field Mitigation',
      desc: 'Applied environmental ergonomics for extreme outdoor heat, asphalt laydown, and heavy manual labour in tropical sub-Saharan climates.',
      deliverables: [
        'Calibrated thermal index mapping and microclimatic heat monitoring',
        'Metabolic work-rest cycle schedules preventing heat syncope',
        'On-site electrolyte hydration protocols & biometric monitoring',
        'Statutory compliance guidelines for tropical infrastructure sites'
      ],
      tag: 'Scientific Ergonomics',
      serviceKey: 'thermal_stress'
    },
    {
      number: '04',
      title: 'Construction SME Safety Capacity & Behavioral Frameworks',
      desc: 'Scalable safety coaching grounded in empirical research presented at the 23rd World Congress on Safety and Health in Sydney.',
      deliverables: [
        'Subcontractor capability screening & onboarding systems',
        'Frontline supervisory safety leadership bootcamps',
        'Cost-effective risk management protocols for high-growth contractors',
        'Peer mentoring and CMIOSH progression coaching'
      ],
      tag: 'World Congress Research',
      serviceKey: 'sme_capacity'
    },
    {
      number: '05',
      title: 'Executive Board Masterclasses & CMIOSH Mentorship',
      desc: 'Inspiring international keynote presentations, parliamentary advisory, and tailored executive mentoring for safety professionals preparing for IOSH peer review.',
      deliverables: [
        'Signature keynotes on Just Culture & Civil Engineering Safety',
        'Parliamentary & statutory advisory for regulatory commissions',
        'CMIOSH Peer Review Interview preparation & portfolio review',
        'Executive board masterclasses on psychological safety & zero harm'
      ],
      tag: 'IOSH Peer Panelist',
      serviceKey: 'keynote_speaking'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    const generatedId = `ETO-SRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      inquiryReason: 'advisory',
      serviceType: 'mega_infrastructure',
      timeframe: 'immediate',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16">
      {/* 1. Page Header with Advisory Leadership Visual */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-[#333538] text-neutral-800 dark:text-neutral-200 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-black dark:text-white" />
            <span>Executive Services • Engineering &amp; Safety Advisory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Safety &amp; Advisory Services Powerhouse
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
            Uniting twenty-two years of high-consequence site command at Julius Berger PLC with peer-reviewed environmental science and international statutory credentials. Bespoke advisory for boards, mega-infrastructure ventures, and institutional authorities.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-neutral-700 dark:text-neutral-300">
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">ISO 45001 &amp; 14001 Auditing</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">Major Infrastructure Safety</span>
            <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-[#333538]">Executive Mentorship</span>
          </div>
        </div>

        {/* Advisory & Systems Governance Showcase Card */}
        <div className="lg:col-span-5 w-full">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-[#3c4043] bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
            <div className="relative h-64 sm:h-80 lg:h-[380px] w-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Executive Civil Engineering Safety Blueprint Analysis and Regulatory Systems Audit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.80] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            </div>

            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono self-start">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>COREN Reg. Civil Engineer • IRCA Lead Auditor</span>
              </div>

              <div className="space-y-1 text-left">
                <span className="text-[10px] sm:text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                  Systems Architecture &amp; Governance
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-white drop-shadow leading-snug">
                  Statutory &amp; Institutional Oversight
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2 drop-shadow">
                  Eliminating catastrophic single-point risk across complex multi-contractor environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. Interactive Tabbed Service Powerhouse */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-neutral-200 dark:border-[#333538] pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-semibold">
            Select Core Domain
          </span>
          <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
            5 Executive Advisory Capabilities
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {services.map((srv, idx) => (
            <button
              key={srv.number}
              onClick={() => setActiveServiceTab(idx)}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between space-y-4 cursor-pointer ${
                activeServiceTab === idx
                  ? 'bg-[#142C5C] text-white border-[#1C6CD4] shadow-xl font-black'
                  : 'bg-white dark:bg-[#131822] text-black dark:text-neutral-200 border-2 border-slate-200 dark:border-white/10 hover:border-[#1C6CD4] font-bold shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs font-mono font-black ${activeServiceTab === idx ? 'text-[#93c5fd]' : 'text-[#1C6CD4]'}`}>
                  {srv.number}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  activeServiceTab === idx
                    ? 'bg-[#1C6CD4]/20 text-[#93c5fd] border-[#1C6CD4]/40 font-bold'
                    : 'bg-white/5 text-neutral-300 border-white/10 font-bold'
                }`}>
                  {srv.tag}
                </span>
              </div>
              <h3 className={`text-sm font-display font-black leading-snug ${activeServiceTab === idx ? 'text-white' : 'text-neutral-300'}`}>
                {srv.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Active Tab Showcase Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11141c] text-white shadow-2xl border border-white/15 hover:border-[#1C6CD4]/50 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1C6CD4]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1C6CD4]/20 transition-all" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1C6CD4]/20 border border-[#1C6CD4]/30 text-[#93c5fd] text-xs font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#96E2A5]" />
                  <span>{services[activeServiceTab].tag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight leading-snug sm:leading-tight">
                  {services[activeServiceTab].title}
                </h2>
                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed pt-1 font-normal">
                  {services[activeServiceTab].desc}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#93c5fd] block font-bold">
                  Mandatory Key Deliverables &amp; Scopes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services[activeServiceTab].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-neutral-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#96E2A5] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-xs transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <span>Book Advisory Session</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <a
                  href="#inquiry-form-section"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs transition-colors cursor-pointer border border-white/20"
                >
                  Submit Written Project Brief
                </a>
              </div>
            </div>

            {/* Strategic Value Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/10 border border-white/20 space-y-4 backdrop-blur-md">
              <span className="text-xs font-mono uppercase text-[#93c5fd] font-bold block">
                Standard of Rigor
              </span>
              <div className="space-y-3 text-xs text-white/95 leading-relaxed font-normal">
                <p>
                  Engr. Osazee holds chartered status with the Institution of Occupational Safety and Health (CMIOSH #100175) and certified Lead Auditor status under IRCA (#423290).
                </p>
                <p>
                  Engagements are backed by documented field methodologies proven across 50,000,000+ incident-free man-hours on Julius Berger mega-infrastructure projects.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-white/15 space-y-2">
                <div className="text-[11px] font-mono text-[#93c5fd] uppercase font-bold">
                  Liaison Channel
                </div>
                <div className="text-xs font-mono text-white font-bold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#93c5fd]" />
                  <span>contact@iyenomaosazee.com</span>
                </div>
                <div className="text-[11px] text-sky-100 font-medium">
                  Abuja, Federal Capital Territory, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Formal Written Query & Project Dossier Submission Form */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        id="formal-written-query-section" 
        className="space-y-8 scroll-mt-28"
      >
        {/* Anchor for backward compatibility */}
        <div id="inquiry-form-section" className="-mt-28 pt-28 pointer-events-none" />
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Direct Formal Briefing Desk
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-black dark:text-white tracking-tight leading-snug sm:leading-tight">
            Submit a Formal Written Query
          </h2>
          <p className="text-sm text-neutral-800 dark:text-[#c4c7c5] leading-relaxed font-medium">
            Provide the parameters of your planned infrastructure venture, audit mandate, or conference keynote. You will receive an immediate reference receipt and direct follow-up.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-white/10 shadow-xl text-black dark:text-white">
            {submitted ? (
              <div className="p-8 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-[#444746] text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#154E20] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-black text-black dark:text-white leading-snug">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-black dark:text-neutral-300 max-w-md mx-auto leading-relaxed font-medium">
                  Your project dossier has been registered with reference ID:
                </p>
                <div className="p-3 rounded-xl bg-slate-100 text-black dark:bg-[#282a2c] dark:text-white font-mono text-sm font-black inline-block border-2 border-slate-300 dark:border-neutral-700">
                  {inquiryId}
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-400 font-medium">
                  Engr. Osazee&apos;s executive liaison team will review your requirements and respond via email within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#142C5C] hover:bg-[#1b3874] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 pb-2">
                  <label className="text-xs font-mono uppercase text-black dark:text-white font-black block tracking-wider">
                    What are you contacting me about? *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {INQUIRY_REASONS.map((r) => {
                      const isSelected = formData.inquiryReason === r.id;
                      return (
                        <button
                          type="button"
                          key={r.id}
                          onClick={() => setFormData({ ...formData, inquiryReason: r.id })}
                          className={`p-3 rounded-xl text-xs font-mono text-left border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#142C5C] text-white font-black border-[#142C5C] shadow-sm'
                              : 'bg-slate-50 dark:bg-white/5 text-black dark:text-neutral-300 border-slate-200 dark:border-white/5 hover:border-[#1C6CD4] font-bold'
                          }`}
                        >
                          <span className="block truncate">{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-black dark:text-neutral-300 block font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g., Dr. Chidi Okafor"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#1C6CD4] font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-black dark:text-neutral-300 block font-bold">
                      Organization / Agency *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g., Federal Ministry of Works"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#1C6CD4] font-medium transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-black dark:text-neutral-300 block font-bold">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@organization.gov.ng"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#1C6CD4] font-medium transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-black dark:text-neutral-300 block font-bold">
                      Advisory Domain *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-800 border-2 border-slate-200 dark:border-[#333538] text-black dark:text-white text-xs focus:outline-none focus:border-[#1C6CD4] font-bold transition-colors"
                    >
                      <option value="mega_infrastructure">Mega-Infrastructure Safety Governance</option>
                      <option value="iso_audit">ISO 45001 / 14001 Auditing &amp; Diagnostics</option>
                      <option value="thermal_stress">Bioclimatic Thermal Fatigue Mitigation</option>
                      <option value="sme_capacity">Construction SME Safety Capacity Building</option>
                      <option value="keynote_speaking">Keynote Address &amp; Executive Panels</option>
                      <option value="cmiosh_mentorship">Chartered CMIOSH Mentorship &amp; Guidance</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-black dark:text-neutral-300 block font-bold">
                    Execution Timeframe
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'immediate', label: 'Immediate / Urgent' },
                      { id: 'q1_q2', label: 'Within 30 Days' },
                      { id: 'q3_q4', label: 'Quarterly Planning' },
                      { id: 'retainer', label: 'Annual Retainer' }
                    ].map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => setFormData({ ...formData, timeframe: t.id })}
                        className={`py-2 px-3 rounded-xl text-xs font-mono border-2 transition-all cursor-pointer ${
                          formData.timeframe === t.id
                            ? 'bg-[#142C5C] text-white font-black border-[#142C5C]'
                            : 'bg-slate-50 dark:bg-white/5 text-black dark:text-neutral-400 border-slate-200 dark:border-white/5 hover:border-[#1C6CD4] font-bold'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-black dark:text-neutral-300 block font-bold">
                    Project Parameters &amp; Specific Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details on site location, project scale, contractor arrangements, and specific safety advisory objectives..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-[#333538] text-black dark:text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#1C6CD4] font-medium transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-[11px] text-neutral-800 dark:text-neutral-400 font-mono font-bold">
                    Official dispatches handled under strict confidentiality protocols.
                  </p>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-black text-xs transition-all shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <span>Dispatch Project Dossier</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Quick Contact Information Panel */}
          {/* SECTION BACKGROUND: "Get in Touch" Trust Navy (#142C5C)! */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-[#142C5C] text-white shadow-2xl border border-[#1C6CD4]/30 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#93c5fd] font-bold">
                Direct Executive Channels
              </span>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1">
                  <span className="text-[10px] font-mono text-sky-100 uppercase font-bold">
                    Primary Office
                  </span>
                  <div className="text-xs text-white font-bold">
                    HSE Directorate, Julius Berger Nigeria PLC
                  </div>
                  <div className="text-[11px] text-sky-200 font-mono">
                    Abuja, Federal Capital Territory, Nigeria
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1">
                  <span className="text-[10px] font-mono text-sky-100 uppercase font-bold">
                    Direct Email Liaison
                  </span>
                  <a
                    href="mailto:contact@iyenomaosazee.com"
                    className="text-xs text-white font-mono block hover:underline font-bold"
                  >
                    contact@iyenomaosazee.com
                  </a>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1">
                  <span className="text-[10px] font-mono text-sky-100 uppercase font-bold">
                    Statutory Registry
                  </span>
                  <div className="text-xs text-white font-bold">
                    Institution of Occupational Safety &amp; Health (UK)
                  </div>
                  <div className="text-[11px] text-sky-200 font-mono">
                    Chartered Fellow (CMIOSH #100175)
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/20">
                <button
                  type="button"
                  onClick={onOpenBookingModal}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#142C5C] font-black text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md hover:scale-105"
                >
                  <span>Book Consultation Call</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
