import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  UserCheck
} from 'lucide-react';
import { PROFILE_SUMMARY } from '../../data/profileData';

export const AdvisoryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    serviceType: 'iso45001_audit',
    timeframe: 'q1_q2',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState<string>('');

  const services = [
    {
      id: 'iso45001_audit',
      title: 'ISO 45001 / 14001 Audit & Systems Diagnostic',
      desc: 'Comprehensive gap analysis and management system auditing for construction, manufacturing, and extractive firms.'
    },
    {
      id: 'mega_infrastructure',
      title: 'Mega-Infrastructure Safety & Civil Risk Advisory',
      desc: 'Executive safety governance for large-scale bridge, highway, structural, and public works developments.'
    },
    {
      id: 'keynote_speaking',
      title: 'Keynote Address & Executive Panels',
      desc: 'Conference keynotes on Just Safety Culture, Bioclimatic Thermal Hazards, and Construction SME resilience.'
    },
    {
      id: 'sme_capacity',
      title: 'Construction SME Safety Capacity Building',
      desc: 'Scalable safety coaching based on research presented at the 23rd World Congress in Sydney.'
    },
    {
      id: 'cmiosh_mentorship',
      title: 'Chartered Safety Mentorship (CMIOSH Guidance)',
      desc: 'Executive coaching for senior safety professionals preparing for IOSH peer review interviews.'
    },
    {
      id: 'others',
      title: 'Others / Bespoke Advisory Mandates',
      desc: 'Custom forensic safety audits, statutory dispute conciliation, environmental impact assessments, and tailored corporate advisory.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;

    // Generate reference ticket
    const generatedId = `ETO-ADV-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      serviceType: 'iso45001_audit',
      timeframe: 'q1_q2',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="space-y-16 pt-24 sm:pt-28 pb-16 text-slate-900">
      {/* Header Section */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-4 max-w-4xl"
      >
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#142C5C] text-xs font-mono">
          <Mail className="w-3.5 h-3.5 text-[#1C6CD4]" />
          <span>Executive Consultation &amp; Direct Liaison</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight leading-snug sm:leading-tight">
          Advisory Services &amp; Professional Inquiries
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Engr. Iyenoma ThankGod Osazee is available for select high-level advisory engagements, international keynote addresses, corporate ISO 45001 management systems diagnostics, and institutional safety policy reviews.
        </p>
      </motion.section>

      {/* Advisory Capabilities Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium">
            Core Advisory Capabilities
          </span>
          <h2 className="text-2xl font-display font-bold text-slate-900 mt-1 leading-snug sm:leading-tight">
            Areas of Strategic Consultation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#1C6CD4]/40 transition-all space-y-3 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <span className="text-xs font-mono text-[#1C6CD4] font-semibold block mb-2">
                  Specialized Practice
                </span>
                <h3 className="text-base font-display font-bold text-slate-900 leading-snug">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Tailored Corporate Engagements</span>
                <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Booking & Inquiry Form + Contact Details */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">
              Initiate Consultation or Speaking Inquiry
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Submit your project scope, conference dates, or institutional review parameters for direct consideration.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xl font-display font-bold text-slate-900">
                  Inquiry Successfully Transmitted
                </h4>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Your consultation request has been logged.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-slate-200 font-mono text-xs text-slate-900 max-w-sm mx-auto shadow-xs">
                Reference ID: <span className="font-bold text-[#1C6CD4]">{inquiryId}</span>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Engr. Osazee&apos;s executive liaison will review your dossier and respond with availability and scheduling coordinates.
              </p>

              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2 rounded-lg bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="input-fullname" className="font-medium text-slate-700 block">
                    Full Name &amp; Salutation *
                  </label>
                  <input
                    id="input-fullname"
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Smith / Engr. Mohammed Ali"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1C6CD4]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="input-email" className="font-medium text-slate-700 block">
                    Professional Email Address *
                  </label>
                  <input
                    id="input-email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1C6CD4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="input-org" className="font-medium text-slate-700 block">
                    Organization or Institution
                  </label>
                  <input
                    id="input-org"
                    type="text"
                    placeholder="e.g. Civil Engineering Firm, Ministry, or University"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1C6CD4]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="select-service" className="font-medium text-slate-700 block">
                    Primary Service Requirement *
                  </label>
                  <select
                    id="select-service"
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1C6CD4]"
                  >
                    <option value="iso45001_audit">ISO 45001 / 14001 Management Systems Audit</option>
                    <option value="mega_infrastructure">Mega-Infrastructure Civil Safety Review</option>
                    <option value="keynote_speaking">Keynote Address / Conference Speaker</option>
                    <option value="sme_capacity">Construction SME Safety Framework</option>
                    <option value="cmiosh_mentorship">CMIOSH Chartered Mentorship</option>
                    <option value="academic_review">Academic / Technical Publication Review</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="select-timeframe" className="font-medium text-slate-700 block">
                  Anticipated Timeframe / Event Date
                </label>
                <select
                  id="select-timeframe"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-[#1C6CD4]"
                >
                  <option value="immediate">Immediate / Urgent (Next 30 Days)</option>
                  <option value="q1_q2">Upcoming Quarter (1–3 Months)</option>
                  <option value="later_year">Later in Year (6+ Months)</option>
                  <option value="exploratory">Exploratory / Ongoing Advisory</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="input-message" className="font-medium text-slate-700 block">
                  Scope of Engagement, Agenda, or Project Details *
                </label>
                <textarea
                  id="input-message"
                  required
                  rows={4}
                  placeholder="Outline the operational scale, site location, attendee profile, or specific regulatory objectives..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1C6CD4]"
                />
              </div>

              <button
                type="submit"
                id="btn-submit-advisory-form"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-semibold text-xs tracking-wide shadow-md transition-all cursor-pointer"
              >
                <span>Transmit Advisory Dossier</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Contact Coordinates & Verification Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Institutional Contact Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5 shadow-sm">
            <h4 className="text-base font-display font-bold text-slate-900 border-b border-slate-200 pb-3">
              Official Corporate &amp; Institutional Liaison
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <Building2 className="w-4 h-4 text-[#1C6CD4] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Corporate Base:</strong>
                  <span className="text-slate-700">Julius Berger Nigeria PLC</span>
                  <p className="text-slate-500 text-[11px]">Health, Safety &amp; Environment Division</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#1C6CD4] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Primary Location:</strong>
                  <span className="text-slate-700">Abuja, Federal Capital Territory, Nigeria</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#1C6CD4] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Direct Correspondence:</strong>
                  <span className="text-slate-700 font-mono">{PROFILE_SUMMARY.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <UserCheck className="w-4 h-4 text-[#1C6CD4] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-slate-900 block">Global Credentials Verification:</strong>
                  <span className="text-slate-500 text-[11px] font-mono block">
                    IOSH UK CMIOSH Credential ID: #100175
                  </span>
                  <span className="text-slate-500 text-[11px] font-mono block">
                    ISO 45001 Lead Auditor ID: #423290
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Standards & Ethics Commitment Note */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 space-y-3 shadow-xs">
            <div className="flex items-center space-x-2 text-slate-900 font-semibold text-xs font-mono">
              <ShieldCheck className="w-4 h-4 text-[#1C6CD4]" />
              <span>Professional Conduct &amp; Independence</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              All advisory activities, academic peer reviews, and speaking appearances adhere strictly to the IOSH Code of Professional Conduct, the Nigerian Society of Engineers standards, and statutory conflict-of-interest regulations under Nigerian law.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
