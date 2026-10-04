import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Calendar 
} from 'lucide-react';
import { PROFILE_SUMMARY } from '../../data/profileData';
import { submitInquiryToFirestore } from '../../lib/portfolioService';
import { InquirySegment } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    scope: 'executive_consultation',
    customScope: '',
    datePreference: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const generated = `DW-CALL-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefCode(generated);
    setSubmitted(true);

    try {
      await submitInquiryToFirestore({
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        name: formData.name,
        organization: formData.organization || 'Independent Request',
        email: formData.email,
        segment: (formData.scope === 'executive_consultation' ? 'Civil Megaproject HSE' : 'Corporate Governance') as InquirySegment,
        timeframe: formData.datePreference || 'Immediate / Flexible',
        message: formData.notes ? `[${formData.scope}] ${formData.notes}` : `Booking consultation requested for ${formData.scope}.`,
        status: 'new'
      });
    } catch (err) {
      console.warn('Inquiry could not be saved to Firestore:', err);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[88vh] rounded-3xl dialed-glass-card-elevated border border-white/20 shadow-2xl flex flex-col my-auto overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 bg-white/[0.04] backdrop-blur-xl flex items-center justify-between shrink-0">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full dialed-glass-pill text-xs font-mono text-neutral-200 mb-2">
              <Clock className="w-3 h-3 text-[#a8c7fa]" />
              <span>Direct Liaison Session</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-snug">
              Book an Executive Advisory Call
            </h3>
            <p className="text-xs text-[#c4c7c5] font-mono mt-1">
              Direct consultation with Engr. Iyenoma ThankGod Osazee (CMIOSH, MNSE)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content (Scrolls internally within screen range) */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-display font-bold text-black dark:text-white">
                  Appointment Request Logged
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">
                  Thank you, <strong className="text-black dark:text-white">{formData.name}</strong>. Your consultation coordinates have been reserved.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-[#3c4043] font-mono text-xs text-neutral-800 dark:text-neutral-300 max-w-sm mx-auto">
                Session Code: <span className="font-bold text-black dark:text-white text-sm">{refCode}</span>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                Our executive coordinator will confirm calendar availability and transmit secure meeting coordinates to <span className="text-black dark:text-white font-mono">{formData.email}</span> within 24 hours.
              </p>

              <button
                onClick={handleReset}
                className="mt-6 px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                    Your Name &amp; Salutation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                    Professional Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Construction Firm / Agency"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                    Advisory Focus
                  </label>
                  <select
                    value={formData.scope}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  >
                    <option value="executive_consultation">Mega-Infrastructure HSE Advisory</option>
                    <option value="iso_diagnostic">ISO 45001 / 14001 Audit Diagnostic</option>
                    <option value="occupational_health">Occupational Health &amp; Climate Ergonomics</option>
                    <option value="sme_framework">Construction SME Safety Framework</option>
                    <option value="keynote">Keynote / Conference Speaking</option>
                    <option value="cmiosh_mentorship">CMIOSH Peer Review Mentorship</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              {formData.scope === 'others' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                    Specify Advisory Focus *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bespoke safety audit, environmental remediation, expert witness testimony..."
                    value={formData.customScope}
                    onChange={(e) => setFormData({ ...formData, customScope: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                  Preferred Time Window
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next Tuesday morning (GMT+1) or any weekday afternoon"
                  value={formData.datePreference}
                  onChange={(e) => setFormData({ ...formData, datePreference: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-neutral-800 dark:text-neutral-300 block">
                  Brief Context or Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize project scale, immediate challenges, or conference theme..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-[#3c4043] text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-200 dark:text-black font-semibold text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Confirm Advisory Request</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
