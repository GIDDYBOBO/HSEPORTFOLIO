import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  LayoutDashboard, 
  User, 
  BookOpen, 
  ShieldCheck, 
  Mail, 
  Settings, 
  Check, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Download, 
  Search, 
  Filter, 
  Save, 
  RotateCcw,
  CheckCircle2,
  Clock,
  Eye
} from 'lucide-react';
import { BOOKS_AND_PUBLICATIONS } from '../../data/booksData';
import { CREDENTIALS, PROFILE_SUMMARY } from '../../data/profileData';
import { InquiryMessage, BookItem, Credential } from '../../types';

interface ClientAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateBio?: (newBio: string) => void;
}

const INITIAL_MESSAGES: InquiryMessage[] = [
  {
    id: 'inq-01',
    date: '18 Sep 2026',
    name: 'Engr. Babatunde Adeyemi',
    organization: 'Federal Ministry of Works & Housing',
    email: 'b.adeyemi@works.gov.ng',
    phone: '+234 803 555 0192',
    segment: 'hse_consultation',
    timeframe: 'immediate',
    message: 'Requesting Engr. Osazee for an independent high-consequence safety audit regarding a dual-carriageway bridge launching girder operation across Niger River.',
    status: 'new'
  },
  {
    id: 'inq-02',
    date: '15 Sep 2026',
    name: 'Dr. Fiona Campbell',
    organization: 'Institution of Occupational Safety & Health (UK)',
    email: 'fiona.campbell@iosh.com',
    segment: 'speaking_training',
    timeframe: 'q3_q4',
    message: 'Formal invitation to deliver a keynote on "Human-Centered Safety Systems in Developing Infrastructure" at the Global Health & Safety Executive Forum.',
    status: 'reviewed'
  },
  {
    id: 'inq-03',
    date: '10 Sep 2026',
    name: 'Arch. Chukwudi Eze',
    organization: 'Apex Infrastructure Consortium',
    email: 'ceze@apexinfrang.com',
    phone: '+234 802 344 9901',
    segment: 'book_enquiry',
    timeframe: 'q1_q2',
    message: 'Seeking institutional bulk access and training licenses for the Bioclimatic Thermal Hazards & Ergonomics Monograph for 45 site engineers.',
    status: 'new'
  },
  {
    id: 'inq-04',
    date: '02 Sep 2026',
    name: 'Alhaji Sanusi Danbaba',
    organization: 'Northern Regional Transport Authority',
    email: 's.danbaba@nrta.gov.ng',
    segment: 'iso_audit',
    timeframe: 'retainer',
    message: 'Inquiry regarding preliminary gap analysis and advisory for transitioning regional contractor networks to ISO 45001:2018 certification.',
    status: 'reviewed'
  }
];

export const ClientAdminModal: React.FC<ClientAdminModalProps> = ({
  isOpen,
  onClose,
  onUpdateBio
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'books' | 'credentials' | 'messages' | 'settings'>('overview');
  
  // Editable state
  const [profile, setProfile] = useState({
    fullName: PROFILE_SUMMARY.fullName,
    primaryTitle: PROFILE_SUMMARY.primaryTitle,
    organization: PROFILE_SUMMARY.organization,
    location: PROFILE_SUMMARY.location,
    headline: "Advancing safer workplaces through professional HSE practice, engineering expertise and knowledge sharing.",
    bioOverview: PROFILE_SUMMARY.bioOverview,
    email: PROFILE_SUMMARY.email,
    phone: "+234 (0) 803 000 0000",
    yearsExperience: PROFILE_SUMMARY.yearsExperience,
    statusText: "Available for Strategic Advisory & Global Keynotes"
  });

  const [booksList, setBooksList] = useState<BookItem[]>(BOOKS_AND_PUBLICATIONS);
  const [credentialsList, setCredentialsList] = useState<Credential[]>(CREDENTIALS);
  const [messages, setMessages] = useState<InquiryMessage[]>(INITIAL_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<InquiryMessage | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [messageFilter, setMessageFilter] = useState<string>('all');

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    if (onUpdateBio) {
      onUpdateBio(profile.bioOverview);
    }
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportInquiries = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `iyenoma_osazee_inquiries_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const toggleMessageStatus = (id: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'new' ? 'reviewed' : 'new';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const filteredMessages = messages.filter(m => {
    if (messageFilter === 'all') return true;
    if (messageFilter === 'new') return m.status === 'new';
    if (messageFilter === 'reviewed') return m.status === 'reviewed';
    return m.segment === messageFilter;
  });

  return (
    <div 
      id="client-admin-modal-backdrop"
      className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-6xl h-[92vh] rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top App Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#1C6CD4] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-md">
              CMS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-slate-900 text-base">
                  Client Content Management Studio
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono border border-emerald-200">
                  Live CMS v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Direct administrative control for Engr. Iyenoma ThankGod Osazee Portfolio
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 transition-colors"
            >
              Exit Studio
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all border border-slate-200 cursor-pointer"
              aria-label="Close Admin Studio"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Studio Layout: Sidebar + Main Canvas */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50 p-3 sm:p-4 space-y-1.5 shrink-0 overflow-y-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 py-1 block">
              Management Modules
            </span>

            {[
              { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'profile', label: 'Profile & Biography', icon: <User className="w-4 h-4" /> },
              { id: 'books', label: 'Books & Publications', count: booksList.length, icon: <BookOpen className="w-4 h-4" /> },
              { id: 'credentials', label: 'Certifications Registry', count: credentialsList.length, icon: <ShieldCheck className="w-4 h-4" /> },
              { id: 'messages', label: 'Inbound Inquiries', count: messages.filter(m => m.status === 'new').length, badgeColor: 'bg-rose-500', icon: <Mail className="w-4 h-4" /> },
              { id: 'settings', label: 'Site Settings & Domain', icon: <Settings className="w-4 h-4" /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 font-semibold shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive 
                        ? 'bg-slate-100 text-slate-900 font-bold border border-slate-300' 
                        : (tab.badgeColor ? `${tab.badgeColor} text-white font-bold` : 'bg-slate-200 text-slate-700')
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-6 border-t border-slate-200 space-y-2 text-[11px] font-mono text-slate-500 p-2">
              <div className="flex items-center justify-between text-neutral-300">
                <span>Domain Status</span>
                <span className="text-emerald-400 font-bold">iyenomaosazee.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database Sync</span>
                <span className="text-sky-400">Live Client DB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Active Framework</span>
                <span>React 18 + Tailwind</span>
              </div>
            </div>
          </div>

          {/* Main Content Pane */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white text-slate-900">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-slate-900 leading-snug sm:leading-tight">Executive Command Overview</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Real-time digital portfolio status, engagement metrics, and pending client communications.
                  </p>
                </div>

                {/* 4 Quick Stat Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Total Visitors (30d)</span>
                    <div className="text-2xl font-display font-extrabold text-slate-900">4,820</div>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">+18% MoM (Global OSH)</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Inbound Inquiries</span>
                    <div className="text-2xl font-display font-extrabold text-slate-900">{messages.length}</div>
                    <span className="text-[10px] text-rose-600 font-mono font-bold">{messages.filter(m => m.status === 'new').length} requiring reply</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Published Books & Papers</span>
                    <div className="text-2xl font-display font-extrabold text-slate-900">{booksList.length}</div>
                    <span className="text-[10px] text-[#1C6CD4] font-mono font-bold">ResearchGate & World Congress</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Verified Credentials</span>
                    <div className="text-2xl font-display font-extrabold text-slate-900">{credentialsList.length}</div>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">CMIOSH • ISO 45001 • Fellow</span>
                  </div>
                </div>

                {/* Recent Inquiries Quick Table */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-display font-bold text-slate-900 uppercase tracking-wider leading-snug">
                      Recent Inbound Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-[#1C6CD4] hover:text-blue-700 font-mono font-bold cursor-pointer"
                    >
                      View All Messages &rarr;
                    </button>
                  </div>

                  <div className="space-y-2">
                    {messages.slice(0, 3).map((m) => (
                      <div
                        key={m.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-slate-900">{m.name}</span>
                            <span className="text-[11px] text-slate-500 font-mono">({m.organization})</span>
                            {m.status === 'new' && (
                              <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-[9px] font-mono font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1">
                            {m.message}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0 text-xs font-mono">
                          <span className="text-slate-500 text-[11px]">{m.date}</span>
                          <button
                            onClick={() => {
                              setSelectedMessage(m);
                              setActiveTab('messages');
                            }}
                            className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors text-xs cursor-pointer shadow-xs"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left space-y-1 transition-all"
                  >
                    <User className="w-4 h-4 text-sky-400" />
                    <div className="text-xs font-bold text-white">Update Bio & Contact</div>
                    <p className="text-[11px] text-neutral-400">Edit headline, phone number, and location.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('books')}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left space-y-1 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <div className="text-xs font-bold text-white">Manage Publications</div>
                    <p className="text-[11px] text-neutral-400">Add or edit monograph details and DOIs.</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-left space-y-1 transition-all"
                  >
                    <Settings className="w-4 h-4 text-amber-400" />
                    <div className="text-xs font-bold text-white">Domain & Metadata</div>
                    <p className="text-[11px] text-neutral-400">Configure SEO tags and domain mapping.</p>
                  </button>
                </div>
              </div>
            )}

            {/* 2. PROFILE TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white leading-snug sm:leading-tight">Profile & Identity Architecture</h2>
                    <p className="text-xs text-neutral-400 font-mono">
                      Modify biographical facts, executive titles, and public liaison coordinates.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs transition-all shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>

                {saveSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Profile updates committed successfully to live presentation layer!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300">Full Professional Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300">Primary Role</label>
                    <input
                      type="text"
                      value={profile.primaryTitle}
                      onChange={(e) => setProfile({ ...profile, primaryTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300">Organization</label>
                    <input
                      type="text"
                      value={profile.organization}
                      onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300">Location Base</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-300">Core Hero Statement (Review Item #2)</label>
                  <input
                    type="text"
                    value={profile.headline}
                    onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-300">Biographical Overview</label>
                  <textarea
                    rows={4}
                    value={profile.bioOverview}
                    onChange={(e) => setProfile({ ...profile, bioOverview: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300">Liaison Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-neutral-300">Executive Hotline</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-neutral-300">Live Availability Status Pill</label>
                  <input
                    type="text"
                    value={profile.statusText}
                    onChange={(e) => setProfile({ ...profile, statusText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                  />
                </div>
              </form>
            )}

            {/* 3. BOOKS & PUBLICATIONS TAB */}
            {activeTab === 'books' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white leading-snug sm:leading-tight">Books & Research Repository</h2>
                    <p className="text-xs text-slate-500 font-mono">
                      Curate published volumes, monographs, and international congress submissions.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {booksList.length} Active Publications
                  </span>
                </div>

                <div className="space-y-3">
                  {booksList.map((book) => (
                    <div
                      key={book.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#1C6CD4]/30 transition-all space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1C6CD4] text-[10px] font-mono uppercase font-bold border border-blue-200">
                          {book.format}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {book.publishedYear} • {book.publisherOrJournal}
                        </span>
                      </div>

                      <h3 className="text-base font-display font-bold text-slate-900 leading-snug">
                        {book.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {book.abstract}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>Ref: {book.doiOrRef || 'Standard Edition'}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-700 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Live on Site
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. CERTIFICATIONS REGISTRY TAB */}
            {activeTab === 'credentials' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900 leading-snug sm:leading-tight">Professional Credentials Registry</h2>
                    <p className="text-xs text-slate-500 font-mono">
                      Manage official chartered registrations, auditor IDs, and verification records.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {credentialsList.length} Registered Credentials
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {credentialsList.map((cred) => (
                    <div
                      key={cred.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1C6CD4] font-mono">
                          {cred.designation}
                        </span>
                        {cred.credentialId && (
                          <span className="text-[10px] font-mono text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded border border-slate-200">
                            {cred.credentialId}
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm font-display font-bold text-slate-900 leading-snug">
                        {cred.title}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {cred.issuer}
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2">
                        {cred.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. INBOUND MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900 leading-snug sm:leading-tight">Client Inbound Inquiries</h2>
                    <p className="text-xs text-slate-500 font-mono">
                      Structured audience-segmented leads and consultation requests.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleExportInquiries}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-mono text-slate-700 transition-colors border border-slate-200 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export (JSON)</span>
                    </button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  {[
                    { id: 'all', label: 'All Inquiries' },
                    { id: 'new', label: 'Unread / New' },
                    { id: 'reviewed', label: 'Reviewed' },
                    { id: 'hse_consultation', label: 'HSE Consultation' },
                    { id: 'book_enquiry', label: 'Books & Monographs' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setMessageFilter(f.id)}
                      className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                        messageFilter === f.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Messages List */}
                <div className="space-y-3">
                  {filteredMessages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        m.status === 'new'
                          ? 'bg-blue-50/50 border-blue-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                          <span className="text-xs text-slate-500 font-mono">({m.organization})</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono">
                            {m.segment.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-mono text-slate-500">{m.date}</span>
                          <button
                            onClick={() => toggleMessageStatus(m.id)}
                            className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                              m.status === 'new'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300 font-bold'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {m.status === 'new' ? 'Mark Reviewed' : 'Mark Unread'}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {m.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-mono text-slate-500">
                        <div className="flex items-center space-x-3">
                          <a href={`mailto:${m.email}`} className="text-[#1C6CD4] hover:underline font-bold">
                            {m.email}
                          </a>
                          {m.phone && <span>• {m.phone}</span>}
                        </div>
                        <span className="text-slate-500">Timeline: {m.timeframe}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SETTINGS & DOMAIN TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-bold text-slate-900 leading-snug sm:leading-tight">Production Settings &amp; Domain Mapping</h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Professional DNS routing, Search Engine Optimization (SEO), and portfolio attribution.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">Custom Domain Status (Review Item #12)</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Primary Production Route configured for <span className="text-[#1C6CD4] font-mono font-bold">iyenomaosazee.com</span> with automatic SSL TLS v1.3 encryption and Netlify edge reverse proxying.
                  </p>
                  <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>DNS A-Record &amp; CNAME Healthy • Zero Latency</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">Author &amp; Developer Attribution (Review Item #10)</h3>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs text-slate-700">
                    Website designed &amp; developed by <span className="text-slate-900 font-bold">Gideon Ogunyemi</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Official attribution rendered in the institutional footer, establishing full professional portfolio provenance.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">Structured SEO &amp; OpenGraph Payload</h3>
                  <div className="space-y-1.5 text-xs font-mono text-slate-600">
                    <div className="flex items-center justify-between py-1 border-b border-slate-200">
                      <span>Schema.org Type:</span>
                      <span className="text-[#1C6CD4] font-bold">Person &amp; Book (JSON-LD)</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-200">
                      <span>Canonical URL:</span>
                      <span className="text-[#1C6CD4] font-bold">https://iyenomaosazee.com</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-200">
                      <span>Social Share Card:</span>
                      <span className="text-emerald-700 font-bold">summary_large_image</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
