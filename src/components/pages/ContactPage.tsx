import React, { useState } from 'react';
import { PageId } from '../../types';
import { submitInquiryToFirestore } from '../../lib/portfolioService';
import { 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

interface ContactPageProps {
  onSelectPage?: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSelectPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    organization: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setError(null);
    try {
      await submitInquiryToFirestore({
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        name: formData.name,
        email: formData.email,
        organization: formData.organization || 'Individual',
        segment: 'general_enquiry',
        timeframe: 'Immediate',
        message: formData.message,
        status: 'new',
        createdAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err: any) {
      setError('Unable to transmit inquiry. Please try again or reach out directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-24 sm:pt-32 pb-24 text-[#333333] dark:text-[#e3e3e3] max-w-5xl mx-auto transition-colors duration-200">
      
      {/* Page Header */}
      <section className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C6CD4]/10 dark:bg-white/10 border border-[#1C6CD4]/25 dark:border-white/15 text-xs font-mono text-[#142C5C] dark:text-neutral-200">
          <Mail className="w-3.5 h-3.5 text-[#1C6CD4] dark:text-[#a8c7fa]" />
          <span className="font-semibold">Executive Liaison • Direct Engagement</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0f172a] dark:text-white tracking-tight leading-tight">
          Let&apos;s Talk About Safety.
        </h1>

        <p className="text-base sm:text-lg text-[#444444] dark:text-[#c4c7c5] max-w-2xl leading-relaxed">
          Whether you want to learn more about the work, discuss a publication, explore professional collaboration, or simply connect, feel free to reach out.
        </p>

        {onSelectPage && (
          <div className="p-4 rounded-2xl bg-[#1C6CD4]/10 dark:bg-white/5 border border-[#1C6CD4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-[#142C5C] dark:text-[#cbd5e1] font-medium">
              Looking to submit a formal corporate tender, project safety dossier, or institutional inquiry?
            </span>
            <button
              type="button"
              onClick={() => {
                onSelectPage('services');
                const scrollTarget = () => {
                  const el = document.getElementById('formal-written-query-section') || document.getElementById('inquiry-form-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                };
                scrollTarget();
                setTimeout(scrollTarget, 100);
                setTimeout(scrollTarget, 300);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-[11px] whitespace-nowrap cursor-pointer transition-all shrink-0 shadow-xs hover:scale-102"
            >
              <span>Go to Formal Written Query Desk →</span>
            </button>
          </div>
        )}
      </section>

      {/* Grid: Clean Contact Form & Verified Direct Liaison Details */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl dialed-glass-card border border-slate-200 dark:border-white/15">
          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#154E20]/08 dark:bg-white/5 border border-[#154E20]/20 dark:border-white/10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#154E20] dark:bg-white text-white dark:text-[#131314] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-display font-bold text-[#0f172a] dark:text-white">Message Received</h2>
              <p className="text-xs sm:text-sm text-[#444444] dark:text-[#c4c7c5] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out. Engr. Osazee reviews all legitimate professional inquiries and will respond promptly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '', organization: '' });
                  }}
                  className="text-xs font-mono text-[#1C6CD4] dark:text-[#a8c7fa] hover:underline cursor-pointer font-semibold"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-xs">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-neutral-400 font-semibold">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-[#1C6CD4] transition-colors shadow-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-neutral-400 font-semibold">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-[#1C6CD4] transition-colors shadow-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-neutral-400 font-semibold">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Safety Directorship, Keynote Presentation, Book Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-[#1C6CD4] transition-colors shadow-xs"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-[#64748b] dark:text-neutral-400 font-semibold">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your request or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm focus:outline-none focus:border-[#1C6CD4] transition-colors resize-y shadow-xs"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer shadow-md shadow-[#1C6CD4]/25 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Verified Details & Location */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl dialed-glass-card border border-slate-200 dark:border-white/15 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] dark:text-[#a8c7fa] font-semibold">
              Operational Base
            </span>
            <div className="flex items-start gap-2.5 text-sm text-[#0f172a] dark:text-white font-medium">
              <MapPin className="w-4 h-4 text-[#1C6CD4] dark:text-[#a8c7fa] shrink-0 mt-0.5" />
              <span>Abuja, Federal Capital Territory, Nigeria</span>
            </div>
            <p className="text-xs text-[#64748b] dark:text-[#8e918f] leading-relaxed pt-1">
              Federal Capital Territory operations across major national infrastructure developments.
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-200 dark:border-white/10 pt-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] dark:text-[#a8c7fa] font-semibold">
              Direct Contact
            </span>
            <div className="flex items-center gap-2.5 text-sm text-[#0f172a] dark:text-white font-medium">
              <Mail className="w-4 h-4 text-[#1C6CD4] dark:text-[#a8c7fa] shrink-0" />
              <a href="mailto:contact@iyenomaosazee.com" className="hover:text-[#1C6CD4] underline transition-colors">
                contact@iyenomaosazee.com
              </a>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-200 dark:border-white/10 pt-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] dark:text-[#a8c7fa] font-semibold">
              Verified Standing
            </span>
            <p className="text-xs text-[#444444] dark:text-[#c4c7c5] leading-relaxed">
              Chartered Safety &amp; Health Professional (CMIOSH #100175, IOSH UK), Registered Engineer (MNSE), Fellow ISPON.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
};
