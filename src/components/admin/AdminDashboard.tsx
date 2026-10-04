import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Credential, InquiryMessage, BookItem } from '../../types';
import { Megaproject } from '../../data/projectsData';
import { 
  subscribeToCredentials, 
  subscribeToProjects, 
  subscribeToInquiries, 
  subscribeToBooks,
  addCredentialItem, 
  updateCredentialItem, 
  deleteCredentialItem,
  addProjectItem, 
  updateProjectItem, 
  deleteProjectItem,
  updateInquiryStatus,
  deleteInquiryItem,
  addBookItem,
  updateBookItem,
  deleteBookItem
} from '../../lib/portfolioService';
import { 
  LayoutDashboard, 
  Award, 
  Briefcase, 
  Mail, 
  LogOut, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  ArrowLeft, 
  X, 
  Save, 
  ShieldCheck, 
  Menu,
  Sparkles,
  Building2,
  Calendar,
  Layers,
  Clock,
  RefreshCw,
  Eye,
  BookOpen,
  Star,
  Check,
  Filter,
  ArrowUpRight,
  TrendingUp,
  FileText,
  User,
  Users,
  Phone,
  MessageSquare,
  Activity,
  Globe,
  MousePointerClick,
  BarChart3,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { getTrafficAnalytics } from '../../lib/analyticsService';

// Custom Frosted Tooltip for Area and Bar charts
const ChartCustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200/90 shadow-xl text-xs font-mono">
        <p className="font-bold text-slate-900 mb-2 pb-1 border-b border-slate-100 flex items-center justify-between gap-4">
          <span>{label}</span>
          <span className="text-[10px] text-slate-400 font-normal">Telemetry</span>
        </p>
        <div className="space-y-1.5">
          {payload.map((item: any, i: number) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
                <span>{item.name}:</span>
              </span>
              <span className="font-bold text-slate-900 font-mono">
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Pie Chart
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white/95 backdrop-blur-xl p-3 rounded-2xl border border-slate-200/90 shadow-xl text-xs font-mono">
        <p className="font-bold text-slate-900">{data.name}</p>
        <p className="text-emerald-700 font-bold mt-1">
          {data.value}% <span className="text-slate-500 font-normal">({data.payload?.sessions?.toLocaleString()} sessions)</span>
        </p>
      </div>
    );
  }
  return null;
};

type AdminTab = 'overview' | 'credentials' | 'projects' | 'books' | 'inquiries' | 'traffic';

interface AdminDashboardProps {
  onBackToPortfolio: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToPortfolio }) => {
  const { currentUser, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Real-time Firestore state
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [projects, setProjects] = useState<Megaproject[]>([]);
  const [inquiries, setInquiries] = useState<InquiryMessage[]>([]);
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals for CRUD
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [isNewCredentialModalOpen, setIsNewCredentialModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Megaproject | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookItem | null>(null);
  const [isNewBookModalOpen, setIsNewBookModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryMessage | null>(null);

  // Feedback Notification
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Subscribe to real-time updates from Firebase
  useEffect(() => {
    setLoadingData(true);
    const unsubCreds = subscribeToCredentials((data) => {
      setCredentials(data);
      setLoadingData(false);
    });

    const unsubProjects = subscribeToProjects((data) => {
      setProjects(data);
    });

    const unsubInquiries = subscribeToInquiries((data) => {
      setInquiries(data);
    });

    const unsubBooks = subscribeToBooks((data) => {
      setBooks(data);
    });

    return () => {
      unsubCreds();
      unsubProjects();
      unsubInquiries();
      unsubBooks();
    };
  }, []);

  // Guarantee light mode background on document body while in Admin Dashboard
  useEffect(() => {
    const origBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#F8FAFC';
    return () => {
      document.body.style.backgroundColor = origBg;
    };
  }, []);

  // Bulletproof Filtered lists with safe null/undefined handling
  const safeQuery = (searchQuery || '').trim().toLowerCase();

  const filteredCredentials = (credentials || []).filter(c => {
    if (!c || typeof c !== 'object') return false;
    const titleMatch = (c.title || '').toLowerCase().includes(safeQuery);
    const desigMatch = (c.designation || '').toLowerCase().includes(safeQuery);
    const issuerMatch = (c.issuer || '').toLowerCase().includes(safeQuery);
    return titleMatch || desigMatch || issuerMatch;
  });

  const filteredProjects = (projects || []).filter(p => {
    if (!p || typeof p !== 'object') return false;
    const matchesSearch = 
      (p.title || '').toLowerCase().includes(safeQuery) ||
      (p.client || '').toLowerCase().includes(safeQuery) ||
      (p.summary || '').toLowerCase().includes(safeQuery);
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredBooks = (books || []).filter(b => {
    if (!b || typeof b !== 'object') return false;
    const titleMatch = (b.title || '').toLowerCase().includes(safeQuery);
    const pubMatch = Boolean(b.publisherOrJournal && (b.publisherOrJournal || '').toLowerCase().includes(safeQuery));
    const doiMatch = Boolean(b.doiOrRef && (b.doiOrRef || '').toLowerCase().includes(safeQuery));
    const topicMatch = Boolean(
      Array.isArray(b.keyTopics) && 
      b.keyTopics.some((t: any) => typeof t === 'string' && t.toLowerCase().includes(safeQuery))
    );
    return titleMatch || pubMatch || doiMatch || topicMatch;
  });

  const newInquiriesCount = (inquiries || []).filter(i => i && i.status === 'new').length;
  const reviewedInquiriesCount = (inquiries || []).filter(i => i && i.status === 'reviewed').length;
  const [trafficData, setTrafficData] = useState(() => getTrafficAnalytics());
  const [trafficTimeframe, setTrafficTimeframe] = useState<'14d' | '30d' | 'all'>('14d');
  
  // Custom Irreversible Action Confirmation Modal
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    isDestructive?: boolean;
    onConfirm: () => Promise<void> | void;
  } | null>(null);

  // Inbound Inquiries Filter & Search State
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<'all' | 'new' | 'reviewed'>('all');
  const [inquirySearch, setInquirySearch] = useState('');

  // Filtered inquiries calculation for both Contacts Directory and Organizations tables
  const filteredInquiries = (inquiries || []).filter((inq) => {
    if (!inq) return false;
    const matchesStatus =
      inquiryStatusFilter === 'all' ||
      (inquiryStatusFilter === 'new' && inq.status === 'new') ||
      (inquiryStatusFilter === 'reviewed' && inq.status === 'reviewed');

    if (!matchesStatus) return false;
    if (!inquirySearch.trim()) return true;

    const term = inquirySearch.toLowerCase();
    const nameMatch = inq.name?.toLowerCase().includes(term);
    const orgMatch = inq.organization?.toLowerCase().includes(term);
    const emailMatch = inq.email?.toLowerCase().includes(term);
    const msgMatch = inq.message?.toLowerCase().includes(term);
    const segmentMatch = inq.segment?.toLowerCase().includes(term);

    return !!(nameMatch || orgMatch || emailMatch || msgMatch || segmentMatch);
  });

  // Refresh live real-time traffic analytics when navigating tabs
  useEffect(() => {
    setTrafficData(getTrafficAnalytics());
  }, [currentTab]);

  const handleRefreshTraffic = () => {
    setTrafficData(getTrafficAnalytics());
    showNotification('Live real-time traffic analytics re-synchronized');
  };

  const getFormattedTimestamp = (inq: InquiryMessage) => {
    if (inq.createdAt) {
      try {
        const d = new Date(inq.createdAt);
        if (!isNaN(d.getTime())) {
          return {
            date: d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
          };
        }
      } catch {}
    }
    return {
      date: inq.date || 'Recent',
      time: 'Logged'
    };
  };

  const promptInquiryStatusChange = (inq: InquiryMessage, newStatus: 'new' | 'reviewed' | 'archived') => {
    if (inq.status === newStatus) return;
    const label = newStatus === 'reviewed' ? 'Reviewed' : newStatus === 'archived' ? 'Archived' : 'New';
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Status Change',
      message: `Are you sure you want to mark the inquiry regarding subject "${inq.segment || 'Inquiry'}" from "${inq.name}" (${inq.organization || 'Direct Contact'}) as ${label}? There will be no reverse for this action. Once confirmed, this change will be permanently saved to your dashboard.`,
      confirmLabel: `Yes, Mark as ${label} & Save`,
      isDestructive: false,
      onConfirm: async () => {
        try {
          await updateInquiryStatus(inq.id, newStatus);
          setInquiries(prev => prev.map(item => item.id === inq.id ? { ...item, status: newStatus } : item));
          showNotification(`Saved: Marked inquiry from ${inq.name} as ${label}`);
        } catch (err) {
          showNotification('Failed to save status change', 'error');
        } finally {
          setConfirmModal(null);
        }
      }
    });
  };

  const promptDeleteInquiry = (inq: InquiryMessage) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Permanent Deletion',
      message: `Are you sure you want to permanently delete the inquiry record from "${inq.name}" (${inq.organization || 'Direct Contact'}) regarding "${inq.segment || 'Subject'}"? There will be no reverse for this action. Once confirmed, this record will be permanently purged.`,
      confirmLabel: 'Yes, Delete Permanently & Save',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await deleteInquiryItem(inq.id);
          setInquiries(prev => prev.filter(item => item.id !== inq.id));
          if (selectedInquiry?.id === inq.id) {
            setSelectedInquiry(null);
          }
          showNotification(`Permanently deleted inquiry from ${inq.name}`);
        } catch (err) {
          showNotification('Failed to delete inquiry', 'error');
        } finally {
          setConfirmModal(null);
        }
      }
    });
  };

  const promptDeleteCredential = (cred: Credential) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Credential Deletion',
      message: `Are you sure you want to delete credential "${cred.title}" (${cred.designation})? There will be no reverse for this action. Once confirmed, this change will be permanently saved.`,
      confirmLabel: 'Yes, Delete & Save',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await deleteCredentialItem(cred.id);
          showNotification(`Deleted credential ${cred.designation}`);
        } catch (err) {
          showNotification('Failed to delete credential', 'error');
        } finally {
          setConfirmModal(null);
        }
      }
    });
  };

  const promptDeleteProject = (proj: Megaproject) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Project Deletion',
      message: `Are you sure you want to delete project "${proj.title}"? There will be no reverse for this action. Once confirmed, this change will be permanently saved.`,
      confirmLabel: 'Yes, Delete & Save',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await deleteProjectItem(proj.id);
          showNotification(`Deleted project "${proj.title}"`);
        } catch (err) {
          showNotification('Failed to delete project', 'error');
        } finally {
          setConfirmModal(null);
        }
      }
    });
  };

  const promptDeleteBook = (bk: BookItem) => {
    setConfirmModal({
      isOpen: true,
      title: 'Confirm Publication Deletion',
      message: `Are you sure you want to delete publication "${bk.title}"? There will be no reverse for this action. Once confirmed, this change will be permanently saved.`,
      confirmLabel: 'Yes, Delete & Save',
      isDestructive: true,
      onConfirm: async () => {
        try {
          await deleteBookItem(bk.id);
          showNotification(`Deleted publication "${bk.title}"`);
        } catch (err) {
          showNotification('Failed to delete publication', 'error');
        } finally {
          setConfirmModal(null);
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col md:flex-row font-sans selection:bg-amber-500/20 selection:text-amber-900 relative">
      {/* Ambient background glows for frosted blur depth */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(217,119,6,0.04),transparent_40%),radial-gradient(circle_at_85%_85%,rgba(16,185,129,0.04),transparent_40%)]" />
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-xs sticky top-0 z-30">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-amber-400 font-display font-black text-xs flex items-center justify-center shadow-sm border border-amber-400/30">
            TG
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-tight">Executive Studio</h1>
            <p className="text-[10px] text-emerald-700 font-mono font-semibold flex items-center gap-1">
              Live Connected
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sidebar Navigation (Crisp Light Frosted Glass) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white/85 backdrop-blur-2xl border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 shadow-xl md:shadow-none
        md:translate-x-0 md:static md:w-64 shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] flex items-center justify-center text-amber-400 font-display font-black text-sm shadow-md border border-amber-400/30">
                TG
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 font-display tracking-tight leading-snug">
                  Executive Studio
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-700">
                  <span>Real-Time Sync</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => { setCurrentTab('overview'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'overview'
                  ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${currentTab === 'overview' ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>Overview &amp; Telemetry</span>
            </button>

            <button
              onClick={() => { setCurrentTab('credentials'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'credentials'
                  ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className={`w-4 h-4 ${currentTab === 'credentials' ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Credentials</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                currentTab === 'credentials' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {credentials.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('projects'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'projects'
                  ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className={`w-4 h-4 ${currentTab === 'projects' ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>Megaprojects</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                currentTab === 'projects' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {projects.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('books'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'books'
                  ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={`w-4 h-4 ${currentTab === 'books' ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Publications</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                currentTab === 'books' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {books.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('inquiries'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'inquiries'
                  ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className={`w-4 h-4 ${currentTab === 'inquiries' ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Inbound Inquiries</span>
              </div>
              {newInquiriesCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-mono font-bold">
                  {newInquiriesCount} new
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-mono font-bold">
                  {inquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setCurrentTab('traffic'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentTab === 'traffic'
                  ? 'bg-[#1E293B] text-white shadow-md shadow-slate-900/10'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className={`w-4 h-4 ${currentTab === 'traffic' ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Traffic Insights</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                currentTab === 'traffic' 
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                Live
              </span>
            </button>
          </nav>

          {/* Quick Exit to Public Portfolio */}
          <div className="pt-4 border-t border-slate-200/80 space-y-1.5">
            <button
              onClick={onBackToPortfolio}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer border border-transparent hover:border-slate-200"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-600" />
              <span>Back to Public Site</span>
            </button>
          </div>
        </div>

        {/* User Profile & Sign Out (Charcoal & White Card) */}
        <div className="p-4 border-t border-slate-200/80 bg-slate-50/70 backdrop-blur-md space-y-3 m-3 rounded-2xl border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-amber-400/30 flex items-center justify-center text-xs font-bold text-amber-300 shadow-sm shrink-0">
              {currentUser?.email?.[0].toUpperCase() || 'E'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">
                {currentUser?.displayName || 'Engr. Iyenoma T. Osazee'}
              </p>
              <p className="text-[10px] text-slate-500 font-mono truncate">
                {currentUser?.email || 'admin@iyenomaosazee.com'}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (Luminous Frosted Canvas) */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
        
        {/* Top Breadcrumb & Status Bar */}
        <div className="mb-6 pb-4 border-b border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="font-semibold text-slate-900">Executive Studio</span>
            <span>/</span>
            <span className="capitalize text-slate-700 font-bold">{currentTab}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-700 font-bold">
              Live Telemetry
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-xs font-mono font-bold text-slate-700 shadow-xs transition-all cursor-pointer hover:border-slate-300"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>View Public Portfolio</span>
            </button>
          </div>
        </div>

        {/* Floating Notification Toast */}
        {notification && (
          <div className={`mb-6 p-4 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-xl animate-fade-in ${
            notification.type === 'success' 
              ? 'bg-emerald-50/95 border-emerald-300 text-emerald-800' 
              : 'bg-rose-50/95 border-rose-300 text-rose-800'
          }`}>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span className="font-semibold">{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =========================================================================
            TAB 1: OVERVIEW & TELEMETRY
            ========================================================================= */}
        {currentTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                  Executive Operations Overview
                </h1>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Real-time database records, content governance, and public engagement
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-600 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Metrics Bento Grid (Frosted White with Gold, Green, Charcoal Accents) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              
              {/* Credentials Card (Gold Accent) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Credentials</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Award className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {credentials.length}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                  <span>{(credentials || []).filter(c => c && c.highlight).length} Pinned to Hero</span>
                  <span className="text-amber-700 font-bold">★ Active</span>
                </div>
              </div>

              {/* Projects Card (Green Accent) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Megaprojects</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Briefcase className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {projects.length}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                  <span>Civil &amp; Marine Works</span>
                  <span className="text-emerald-700 font-bold">✓ Published</span>
                </div>
              </div>

              {/* Publications Card (Charcoal Accent) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Publications</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 border border-slate-200 text-[#1E293B] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <BookOpen className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {books.length}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                  <span>Monographs &amp; Treatises</span>
                  <span className="text-slate-800 font-bold">Scientific</span>
                </div>
              </div>

              {/* Inquiries Card (Gold / Green Accent) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Inquiries</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Mail className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {inquiries.length}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500 font-mono">
                  <span>{newInquiriesCount} Pending Review</span>
                  <span className={newInquiriesCount > 0 ? 'text-amber-600 font-bold' : 'text-slate-400 font-medium'}>
                    {newInquiriesCount > 0 ? '● New' : 'Up to date'}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Actions Panel */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 font-display">
                    Content Management Shortcuts
                  </h2>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Instant creation actions for live portfolio sections
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  Zero-Latency Persistence
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => { setCurrentTab('credentials'); setIsNewCredentialModalOpen(true); }}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200 text-left flex items-start gap-3 transition-all hover:shadow-sm cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                      Add Credential
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                      Chartered fellowship, ISO auditor seal, or engineering license
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setCurrentTab('projects'); setIsNewProjectModalOpen(true); }}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200 text-left flex items-start gap-3 transition-all hover:shadow-sm cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      Add Megaproject
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                      Publish a landmark civil marine bridge or highway milestone
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => { setCurrentTab('books'); setIsNewBookModalOpen(true); }}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200 text-left flex items-start gap-3 transition-all hover:shadow-sm cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-900/10 border border-slate-300 text-slate-800 flex items-center justify-center shrink-0 group-hover:bg-[#1C6CD4] group-hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-slate-900 transition-colors">
                      Add Publication
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                      Register research monographs, treatises, or safety codes
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Inbound Messages Spotlight */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Recent Inbound Inquiries
                  </h3>
                </div>
                <button
                  onClick={() => setCurrentTab('inquiries')}
                  className="text-xs font-mono font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All ({inquiries.length})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div className="py-8 text-center text-slate-400 font-mono text-xs">
                  No inquiries logged yet. All incoming consultation requests will populate here in real-time.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{inq.name}</span>
                          <span className="text-xs text-slate-500 font-mono">({inq.organization})</span>
                          {inq.status === 'new' && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-300 text-[10px] font-mono font-bold">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1 max-w-xl font-sans">
                          {inq.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <span className="text-[11px] font-mono text-slate-400">{inq.date || 'Recent'}</span>
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-semibold text-slate-700 cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Traffic & Telemetry Snapshot Bento in Overview */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-display">
                      Traffic &amp; Visitor Engagement Telemetry
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Real-time telemetry: visits, unique decision-makers, and modal conversion
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentTab('traffic')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-mono font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  <span>Open Full Traffic Suite</span>
                  <ArrowUpRight className="w-3 h-3 text-amber-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Total Verified Visits</span>
                  <div className="text-xl font-display font-bold text-slate-900 mt-1">
                    {trafficData.totalVisits.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-mono font-semibold mt-0.5">
                    Live Session Counter
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Modal Interaction Volume</span>
                  <div className="text-xl font-display font-bold text-slate-900 mt-1">
                    {trafficData.totalModalOpens.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-amber-700 font-mono font-semibold mt-0.5">
                    Verified Engagements
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Audience Referral</span>
                  <div className="text-xl font-display font-bold text-slate-900 mt-1">
                    Direct &amp; Professional
                  </div>
                  <div className="text-[10px] text-slate-600 font-mono font-semibold mt-0.5">
                    Industry stakeholders
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: CREDENTIALS MANAGER
            ========================================================================= */}
        {currentTab === 'credentials' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h1 className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight leading-tight">
                    Professional Credentials
                  </h1>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Manage certifications, chartered registrations, and auditing credentials in real-time
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewCredentialModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Add Credential</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search credentials by title, designation (e.g. CMIOSH, ISPON), or issuer..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
              />
            </div>

            {/* Data Table (Crisp White Card with Charcoal & Gold/Green Accents) */}
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/90 text-slate-600 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Credential &amp; Title</th>
                      <th className="py-3.5 px-4 font-bold">Designation</th>
                      <th className="py-3.5 px-4 font-bold">Issuing Authority</th>
                      <th className="py-3.5 px-4 font-bold">ID / Year</th>
                      <th className="py-3.5 px-4 font-bold">Hero Pin</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredCredentials.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                          No credentials found matching &quot;{searchQuery}&quot;.
                        </td>
                      </tr>
                    ) : (
                      filteredCredentials.map((cred) => (
                        <tr key={cred.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{cred.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">{cred.description}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                              {cred.designation}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {cred.issuer}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                            <div>{cred.credentialId || '—'}</div>
                            <div className="text-[10px] text-slate-400">{cred.year || '—'}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={async () => {
                                await updateCredentialItem(cred.id, { highlight: !cred.highlight });
                                showNotification(`Updated highlight status for ${cred.designation}`);
                              }}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-mono cursor-pointer transition-all flex items-center gap-1 ${
                                cred.highlight 
                                  ? 'bg-amber-50 text-amber-700 border border-amber-300 font-bold shadow-xs' 
                                  : 'bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${cred.highlight ? 'fill-amber-500 text-amber-600' : 'text-slate-400'}`} />
                              <span>{cred.highlight ? 'Pinned' : 'Standard'}</span>
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingCredential(cred)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                title="Edit Credential"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => promptDeleteCredential(cred)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer border border-rose-200"
                                title="Delete Credential (requires confirmation)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: MEGAPROJECTS MANAGER
            ========================================================================= */}
        {currentTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <h1 className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight leading-tight">
                    Megaproject Highlights
                  </h1>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Manage signature high-consequence civil safety and governance records
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewProjectModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Add Megaproject</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by title, client, or summary..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
              >
                <option value="all">All Categories</option>
                <option value="Bridges & Marine">Bridges &amp; Marine</option>
                <option value="Expressways & Corridors">Expressways &amp; Corridors</option>
                <option value="Heavy Civil & High-Rise">Heavy Civil &amp; High-Rise</option>
                <option value="Environmental & Industrial">Environmental &amp; Industrial</option>
                <option value="Statutory Governance">Statutory Governance</option>
              </select>
            </div>

            {/* Data Table */}
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/90 text-slate-600 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Project Title</th>
                      <th className="py-3.5 px-4 font-bold">Client / Entity</th>
                      <th className="py-3.5 px-4 font-bold">Category</th>
                      <th className="py-3.5 px-4 font-bold">Execution Period</th>
                      <th className="py-3.5 px-4 font-bold">Safety / Man-Hours</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                          No project highlights found matching current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 text-sm">{proj.title}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{proj.location}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {proj.client}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] font-bold">
                              {proj.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">
                            {proj.period}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px]">
                            <div className="text-slate-900 font-bold">{proj.manHours}</div>
                            <div className="text-[10px] text-emerald-700 font-semibold truncate max-w-[150px]">{proj.safetyRecord}</div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingProject(proj)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                title="Edit Project"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => promptDeleteProject(proj)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer border border-rose-200"
                                title="Delete Project (requires confirmation)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: PUBLICATIONS MANAGER
            ========================================================================= */}
        {currentTab === 'books' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 text-[#1E293B] flex items-center justify-center shadow-2xs">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <h1 className="text-base sm:text-lg font-display font-bold text-slate-900 tracking-tight leading-tight">
                    Authored Books &amp; Scientific Research
                  </h1>
                </div>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Manage published monographs, bioclimatic safety treatises, and academic publications
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsNewBookModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Add Publication</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by title, publisher, ISBN, or topic..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
              />
            </div>

            {/* Data Table */}
            <div className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/90 text-slate-600 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Publication Title</th>
                      <th className="py-3.5 px-4 font-bold">Publisher / Journal</th>
                      <th className="py-3.5 px-4 font-bold">Format / Year</th>
                      <th className="py-3.5 px-4 font-bold">Length &amp; Ref</th>
                      <th className="py-3.5 px-4 font-bold">Topics</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredBooks.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 font-mono">
                          No publications found matching &quot;{searchQuery}&quot;.
                        </td>
                      </tr>
                    ) : (
                      filteredBooks.map((bk) => (
                        <tr key={bk.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              {bk.imageUrl ? (
                                <img
                                  src={bk.imageUrl}
                                  alt={bk.title}
                                  className="w-9 h-12 object-cover rounded-lg border border-slate-200 shrink-0 shadow-2xs"
                                />
                              ) : (
                                <div className="w-9 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                                  <BookOpen className="w-4 h-4" />
                                </div>
                              )}
                              <div className="space-y-0.5">
                                <div className="font-bold text-slate-900 max-w-sm line-clamp-1">{bk.title}</div>
                                {bk.subtitle && (
                                  <div className="text-[11px] text-slate-500 max-w-sm line-clamp-1">{bk.subtitle}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-mono text-[11px] font-medium">
                            {bk.publisherOrJournal}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                            <div className="font-semibold text-slate-800">{bk.format}</div>
                            <div className="text-[10px] text-slate-400">{bk.publishedYear}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                            <div>{bk.pagesOrLength || '—'}</div>
                            {bk.doiOrRef && <div className="text-[10px] text-emerald-700 truncate max-w-[120px] font-semibold">{bk.doiOrRef}</div>}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {bk.keyTopics?.slice(0, 2).map((topic, i) => (
                                <span key={i} className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[10px] truncate max-w-[130px] font-semibold">
                                  {typeof topic === 'string' ? topic.replace(/^Chapter \d+:\s*/, '') : String(topic || '')}
                                </span>
                              ))}
                              {(bk.keyTopics?.length || 0) > 2 && (
                                <span className="text-[10px] font-mono text-slate-400 font-medium">
                                  +{(bk.keyTopics?.length || 0) - 2} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => setEditingBook(bk)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                title="Edit Book"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => promptDeleteBook(bk)}
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer border border-rose-200"
                                title="Delete Book (requires confirmation)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: INBOUND INQUIRIES (SEPARATED TABLES: CONTACTS & ORGANIZATIONS)
            ========================================================================= */}
        {currentTab === 'inquiries' && (
          <div className="space-y-6">
            {/* Header with Title and Search/Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                    <Mail className="w-4 h-4 text-amber-600" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                    Inbound Client Inquiries
                  </h1>
                </div>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Direct engagement records with timestamps, separated by Individual Client Contacts and Institutional Organizations
                </p>
              </div>

              {/* Status Filters & Search */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, org, email..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="pl-8.5 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs w-48 sm:w-56"
                  />
                  {inquirySearch && (
                    <button 
                      onClick={() => setInquirySearch('')}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-mono font-bold">
                  <button
                    type="button"
                    onClick={() => setInquiryStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      inquiryStatusFilter === 'all'
                        ? 'bg-[#1E293B] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({inquiries.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryStatusFilter('new')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      inquiryStatusFilter === 'new'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    New ({newInquiriesCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryStatusFilter('reviewed')}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      inquiryStatusFilter === 'reviewed'
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Reviewed ({reviewedInquiriesCount})
                  </button>
                </div>
              </div>
            </div>

            {/* ==========================================
                TABLE 1: CLIENT CONTACTS DIRECTORY
                ========================================== */}
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xl overflow-hidden shadow-2xs space-y-0">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-display">
                      Table 1: Client Contacts Directory (Individual Decision-Makers)
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Categorized by individual liaisons, official representatives, and direct communication coordinates
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-bold self-start sm:self-auto">
                  {filteredInquiries.length} Inquiries Recorded
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/90 text-slate-600 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Exact Timestamp</th>
                      <th className="py-3 px-4 font-bold">Client Contact Name</th>
                      <th className="py-3 px-4 font-bold">Direct Coordinates</th>
                      <th className="py-3 px-4 font-bold">Focus Area / Scope</th>
                      <th className="py-3 px-4 font-bold">Review Status</th>
                      <th className="py-3 px-4 font-bold text-right">Actions &amp; Confirmation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-400 font-mono text-xs">
                          No client contact inquiries match your active search filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const ts = getFormattedTimestamp(inq);
                        return (
                          <tr key={`contact-${inq.id}`} className="hover:bg-slate-50/70 transition-colors">
                            {/* Timestamp */}
                            <td className="py-3 px-4 whitespace-nowrap font-mono">
                              <div className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{ts.date}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 pl-5">{ts.time}</div>
                            </td>

                            {/* Client Contact Name */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-display font-bold text-[10px] flex items-center justify-center shrink-0">
                                  {inq.name?.[0]?.toUpperCase() || 'C'}
                                </div>
                                <span className="font-bold text-slate-900 text-xs">{inq.name}</span>
                              </div>
                            </td>

                            {/* Direct Coordinates */}
                            <td className="py-3 px-4 font-mono text-[11px]">
                              <div className="text-slate-800 font-semibold">{inq.email}</div>
                              {inq.phone && <div className="text-slate-500 text-[10px]">{inq.phone}</div>}
                            </td>

                            {/* Service Requirement */}
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                              <div className="font-semibold text-slate-800">{inq.segment}</div>
                              <div className="text-[10px] text-slate-400">{inq.timeframe}</div>
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                                inq.status === 'new'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : inq.status === 'reviewed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}>
                                {inq.status === 'new' ? '● New Inquiry' : inq.status === 'reviewed' ? '✓ Reviewed' : 'Archived'}
                              </span>
                            </td>

                            {/* Actions with Confirmation */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                  title="View Message Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {inq.status === 'new' && (
                                  <button
                                    type="button"
                                    onClick={() => promptInquiryStatusChange(inq, 'reviewed')}
                                    className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                                    title="Mark this inquiry as Reviewed (requires confirmation)"
                                  >
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>Mark Reviewed</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => promptDeleteInquiry(inq)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer border border-rose-200"
                                  title="Permanently Delete Inquiry (requires confirmation)"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ==========================================
                TABLE 2: INSTITUTIONAL & CORPORATE ORGANIZATIONS
                ========================================== */}
            <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xl overflow-hidden shadow-2xs space-y-0">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 font-display">
                      Table 2: Institutional &amp; Corporate Organizations (Ministries &amp; Firms)
                    </h2>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Categorized by corporate firm, government agency, ministry, or infrastructure consortium
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-bold self-start sm:self-auto">
                  {filteredInquiries.length} Entities Logged
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/90 text-slate-600 font-mono uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-bold">Exact Timestamp</th>
                      <th className="py-3 px-4 font-bold">Organization / Ministry / Firm</th>
                      <th className="py-3 px-4 font-bold">Designated Liaison Official</th>
                      <th className="py-3 px-4 font-bold">Institutional Scope</th>
                      <th className="py-3 px-4 font-bold">Review Status</th>
                      <th className="py-3 px-4 font-bold text-right">Actions &amp; Confirmation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-sans">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-slate-400 font-mono text-xs">
                          No institutional organization inquiries match your active search filter.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const ts = getFormattedTimestamp(inq);
                        return (
                          <tr key={`org-${inq.id}`} className="hover:bg-slate-50/70 transition-colors">
                            {/* Timestamp */}
                            <td className="py-3 px-4 whitespace-nowrap font-mono">
                              <div className="font-semibold text-slate-800 text-xs flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{ts.date}</span>
                              </div>
                              <div className="text-[10px] text-slate-400 pl-5">{ts.time}</div>
                            </td>

                            {/* Organization / Ministry */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                                </div>
                                <span className="font-bold text-slate-900 text-xs">
                                  {inq.organization || 'Independent Practice / Direct'}
                                </span>
                              </div>
                            </td>

                            {/* Designated Official */}
                            <td className="py-3 px-4">
                              <div className="font-semibold text-slate-800 text-xs">{inq.name}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{inq.email}</div>
                            </td>

                            {/* Institutional Scope */}
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                              <div className="font-semibold text-slate-800">{inq.segment}</div>
                              <div className="text-[10px] text-slate-400">{inq.timeframe}</div>
                            </td>

                            {/* Status */}
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                                inq.status === 'new'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : inq.status === 'reviewed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                              }`}>
                                {inq.status === 'new' ? '● New Inquiry' : inq.status === 'reviewed' ? '✓ Reviewed' : 'Archived'}
                              </span>
                            </td>

                            {/* Actions with Confirmation */}
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
                                  title="View Message Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {inq.status === 'new' && (
                                  <button
                                    type="button"
                                    onClick={() => promptInquiryStatusChange(inq, 'reviewed')}
                                    className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono text-[10px] font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                                    title="Mark this inquiry as Reviewed (requires confirmation)"
                                  >
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span>Mark Reviewed</span>
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => promptDeleteInquiry(inq)}
                                  className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer border border-rose-200"
                                  title="Permanently Delete Inquiry (requires confirmation)"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: TRAFFIC INSIGHTS & ENGAGEMENT TELEMETRY (RECHARTS)
            ========================================================================= */}
        {currentTab === 'traffic' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Title, Context, and Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-display font-bold text-slate-900 tracking-tight leading-tight">
                    Traffic &amp; Visitor Engagement Insights
                  </h1>
                </div>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  High-fidelity telemetric monitoring of verified audience visits, modal interaction frequencies, and conversion trajectories.
                </p>
              </div>

              {/* Timeframe Filter and Refresh Controls */}
              <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <div className="inline-flex items-center p-1 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-mono font-bold">
                  <button
                    type="button"
                    onClick={() => setTrafficTimeframe('14d')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      trafficTimeframe === '14d'
                        ? 'bg-[#1E293B] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    14 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrafficTimeframe('30d')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      trafficTimeframe === '30d'
                        ? 'bg-[#1E293B] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    30 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrafficTimeframe('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      trafficTimeframe === 'all'
                        ? 'bg-[#1E293B] text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All-Time
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleRefreshTraffic}
                  className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 shadow-2xs transition-colors cursor-pointer"
                  title="Re-sync Telemetry"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                </button>
              </div>
            </div>

            {/* KPI Telemetry Bento Cards (Compact, Real-time Only) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              
              {/* Total Visits Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Total Visits</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 border border-slate-200 text-[#1E293B] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Globe className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {trafficData.totalVisits.toLocaleString()}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] font-mono">
                  <span className="text-emerald-700 font-bold">Live Counter</span>
                  <span className="text-slate-500 font-medium">Real-Time Visits</span>
                </div>
              </div>

              {/* Unique Corporate Visitors Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Unique Decision-Makers</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <User className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {trafficData.uniqueVisitors.toLocaleString()}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] font-mono">
                  <span className="text-emerald-700 font-bold">Verified Audience</span>
                  <span className="text-slate-500 font-medium">Unique Visitors</span>
                </div>
              </div>

              {/* Modal Interaction Volume */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Modal Interactions</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <MousePointerClick className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {trafficData.totalModalOpens.toLocaleString()}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] font-mono">
                  <span className="text-amber-700 font-bold">Active Engagement</span>
                  <span className="text-slate-500 font-medium">Interactions</span>
                </div>
              </div>

              {/* Engagement Quality & Dwell Time */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-2 group">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">Avg Session Dwell</span>
                  <div className="w-6.5 h-6.5 rounded-lg bg-slate-100 border border-slate-200 text-[#1E293B] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Clock className="w-3 h-3" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                  {trafficData.avgDwellTime}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] font-mono">
                  <span className="text-emerald-700 font-bold">{trafficData.bounceRate} Bounce</span>
                  <span className="text-slate-500 font-medium">Immersion</span>
                </div>
              </div>

            </div>

            {/* CHART 1: Recharts AreaChart for Daily Traffic Trend */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                      Daily Traffic &amp; Visit Velocity
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    14-day chronological mapping of daily audience interaction trajectories
                  </p>
                </div>
              </div>

              <div className="w-full h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData.dailyTraffic} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradientTotalVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1E293B" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#1E293B" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="gradientUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="gradientPageViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D97706" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#D97706" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94A3B8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={{ stroke: '#E2E8F0' }} 
                    />
                    <YAxis 
                      stroke="#94A3B8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(1)}k` : String(v)}
                    />
                    <Tooltip content={<ChartCustomTooltip />} />
                    <Legend 
                      verticalAlign="top" 
                      height={36} 
                      content={() => (
                        <div className="flex items-center justify-end gap-3 pb-2 text-[11px] font-mono">
                          <span className="inline-flex items-center gap-1.5 text-slate-800">
                            <span className="w-2 h-2 rounded-full bg-[#1E293B]" />
                            Total Visits
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-emerald-800">
                            <span className="w-2 h-2 rounded-full bg-[#059669]" />
                            Unique Visitors
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-amber-800">
                            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                            Page Views
                          </span>
                        </div>
                      )}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="totalVisits" 
                      name="Total Visits" 
                      stroke="#1E293B" 
                      strokeWidth={2.5} 
                      fillOpacity={1} 
                      fill="url(#gradientTotalVisits)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="uniqueVisitors" 
                      name="Unique Visitors" 
                      stroke="#059669" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#gradientUniqueVisitors)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="pageViews" 
                      name="Page Views" 
                      stroke="#D97706" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#gradientPageViews)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CHART 2: Recharts BarChart for Modal Interaction Frequency */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-amber-600" />
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                      Modal Interaction Frequency &amp; Conversion Velocity
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Comparison of raw opens against active engagements across Credentials, Consultation Booking, Publications, and Query Desk
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-500 font-bold">High Engagement:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-xs font-bold">
                    Executive Credentials
                  </span>
                </div>
              </div>

              <div className="w-full h-72 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficData.modalInteractions} margin={{ top: 15, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748B" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={{ stroke: '#E2E8F0' }}
                      interval={0}
                    />
                    <YAxis 
                      stroke="#94A3B8" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip content={<ChartCustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                    <Bar 
                      dataKey="opens" 
                      name="Total Modal Opens" 
                      fill="#1E293B" 
                      radius={[6, 6, 0, 0]} 
                      barSize={24} 
                    />
                    <Bar 
                      dataKey="engagements" 
                      name="Active In-Modal Engagements" 
                      fill="#059669" 
                      radius={[6, 6, 0, 0]} 
                      barSize={24} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Modal Conversion Breakdown Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-3 border-t border-slate-100 font-mono text-xs">
                {trafficData.modalInteractions?.map((modal: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-800 text-[11px] truncate">{modal.name}</div>
                    <div className="text-slate-500 text-[10px]">{modal.opens} opens / {modal.engagements} acts</div>
                    <div className="text-emerald-700 font-bold text-xs">
                      {modal.rate}% Rate
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Row: Acquisition Channels (PieChart) & Top Portfolio Destinations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              
              {/* Left Column: Acquisition Channels (PieChart Donut) */}
              <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900 font-display">Traffic Acquisition Sources</h3>
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono">Visitor referral channels &amp; institutional networks</p>
                </div>

                <div className="w-full h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficData.trafficSources}
                        dataKey="share"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                      >
                        {trafficData.trafficSources?.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color || '#1E293B'} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 font-sans text-xs">
                  {trafficData.trafficSources?.map((source: any, i: number) => (
                    <div key={i} className="flex items-center justify-between text-slate-700">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                        <span className="truncate font-medium">{source.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0">{source.share}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Top Portfolio Destinations */}
              <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-amber-600" />
                      <h3 className="text-sm font-bold text-slate-900 font-display">Top Portfolio Destinations</h3>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">Page view distribution &amp; average dwell times</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                    Telemetry
                  </span>
                </div>

                <div className="divide-y divide-slate-100 font-sans text-xs">
                  {trafficData.pageEngagements?.map((item: any, i: number) => (
                    <div key={i} className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 px-2 rounded-xl transition-colors">
                      <div className="space-y-0.5 truncate">
                        <div className="font-bold text-slate-900 truncate">{item.label}</div>
                        <div className="font-mono text-[10px] text-slate-400">{item.path}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-mono font-bold text-slate-900">{item.views?.toLocaleString()} views</div>
                        <div className="font-mono text-[10px] text-emerald-700 font-semibold">Avg {item.avgTime} dwell</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            MODAL: ADD / EDIT CREDENTIAL (Frosted White Glass Panel)
            ========================================================================= */}
        {(isNewCredentialModalOpen || editingCredential) && (
          <CredentialModal
            initialData={editingCredential}
            onClose={() => {
              setIsNewCredentialModalOpen(false);
              setEditingCredential(null);
            }}
            onSave={async (data) => {
              if (editingCredential) {
                await updateCredentialItem(editingCredential.id, data);
                showNotification(`Updated credential ${data.designation}`);
              } else {
                await addCredentialItem(data);
                showNotification(`Added credential ${data.designation}`);
              }
              setIsNewCredentialModalOpen(false);
              setEditingCredential(null);
            }}
          />
        )}

        {/* =========================================================================
            MODAL: ADD / EDIT MEGAPROJECT (Frosted White Glass Panel)
            ========================================================================= */}
        {(isNewProjectModalOpen || editingProject) && (
          <ProjectModal
            initialData={editingProject}
            onClose={() => {
              setIsNewProjectModalOpen(false);
              setEditingProject(null);
            }}
            onSave={async (data) => {
              if (editingProject) {
                await updateProjectItem(editingProject.id, data);
                showNotification(`Updated project "${data.title}"`);
              } else {
                await addProjectItem(data);
                showNotification(`Added project "${data.title}"`);
              }
              setIsNewProjectModalOpen(false);
              setEditingProject(null);
            }}
          />
        )}

        {/* =========================================================================
            MODAL: ADD / EDIT PUBLICATION (Frosted White Glass Panel)
            ========================================================================= */}
        {(isNewBookModalOpen || editingBook) && (
          <BookModal
            initialData={editingBook}
            onClose={() => {
              setIsNewBookModalOpen(false);
              setEditingBook(null);
            }}
            onSave={async (data) => {
              if (editingBook) {
                await updateBookItem(editingBook.id, data);
                showNotification(`Updated publication "${data.title}"`);
              } else {
                await addBookItem(data);
                showNotification(`Added publication "${data.title}"`);
              }
              setIsNewBookModalOpen(false);
              setEditingBook(null);
            }}
          />
        )}

        {/* =========================================================================
            MODAL: VIEW INQUIRY DETAILS (Frosted White Glass Details)
            ========================================================================= */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xl animate-fade-in text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shadow-2xs">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">Inquiry Message Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Client Name</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedInquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Organization</span>
                    <span className="font-semibold text-slate-800">{selectedInquiry.organization || 'Independent'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Email</span>
                    <span className="font-mono text-emerald-800 font-semibold">{selectedInquiry.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Phone</span>
                    <span className="font-mono text-slate-700">{selectedInquiry.phone || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Focus Area</span>
                    <span className="font-medium text-slate-800">{selectedInquiry.segment}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase block">Timeline</span>
                    <span className="font-medium text-slate-800">{selectedInquiry.timeframe}</span>
                  </div>
                </div>

                <div>
                  <div className="text-slate-500 font-mono text-[11px] font-bold mb-1.5">Client Note / Scope of Inquiry:</div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.message}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">Status:</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                    selectedInquiry.status === 'new'
                      ? 'bg-amber-50 text-amber-800 border border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  }`}>
                    {selectedInquiry.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-xs font-mono font-bold text-white transition-colors cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CONFIRMATION DIALOG MODAL (Enforces Irreversible Action Confirmation)
            ========================================================================= */}
        {confirmModal && confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmModal.isDestructive 
                    ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                    : 'bg-amber-50 text-amber-600 border border-amber-200'
                }`}>
                  <AlertTriangle className={`w-4.5 h-4.5 ${confirmModal.isDestructive ? 'text-rose-600' : 'text-amber-600'}`} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    {confirmModal.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-500">
                Notice: Once confirmed, this change is permanently written to storage and cannot be automatically reversed.
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await confirmModal.onConfirm();
                  }}
                  className={`px-4 py-1.5 rounded-xl text-white text-xs font-mono font-bold transition-all shadow-sm cursor-pointer ${
                    confirmModal.isDestructive
                      ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  }`}
                >
                  {confirmModal.confirmLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ----------------- SUB-COMPONENTS: CREDENTIAL MODAL (Light Frosted) ----------------- //

interface CredentialModalProps {
  initialData: Credential | null;
  onClose: () => void;
  onSave: (data: Omit<Credential, 'id'>) => Promise<void>;
}

const CredentialModal: React.FC<CredentialModalProps> = ({ initialData, onClose, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [designation, setDesignation] = useState(initialData?.designation || '');
  const [issuer, setIssuer] = useState(initialData?.issuer || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [credentialId, setCredentialId] = useState(initialData?.credentialId || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [highlight, setHighlight] = useState(initialData?.highlight ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);
    try {
      await onSave({
        title,
        designation,
        issuer,
        year,
        credentialId,
        description,
        highlight
      });
    } catch (err: any) {
      console.error('Failed to save credential:', err);
      setModalError(err.message || 'Failed to save credential. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xl my-8 text-slate-800 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {initialData ? 'Edit Credential' : 'Add Professional Credential'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {modalError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono">
            {modalError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Credential Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chartered Safety and Health Professional"
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Designation Acronym *</label>
              <input
                type="text"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="e.g. CMIOSH"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Year / Issue Date</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. Issued Dec 2013"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Issuing Authority *</label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. Institution of Occupational Safety and Health"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Credential / Roll ID</label>
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="e.g. ID: 100175"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Professional Scope Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the significance, peer-review interview mandate, or chartered responsibilities..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <input
              type="checkbox"
              id="cred-highlight"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
              className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="cred-highlight" className="text-slate-800 font-semibold cursor-pointer select-none text-xs flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
              <span>Pin to public Hero badges (Highlighted credential)</span>
            </label>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>{submitting ? 'Saving...' : 'Save Credential'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------- SUB-COMPONENTS: PROJECT MODAL (Light Frosted) ----------------- //

interface ProjectModalProps {
  initialData: Megaproject | null;
  onClose: () => void;
  onSave: (data: Omit<Megaproject, 'id'>) => Promise<void>;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ initialData, onClose, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [client, setClient] = useState(initialData?.client || '');
  const [category, setCategory] = useState<Megaproject['category']>(initialData?.category || 'Bridges & Marine');
  const [location, setLocation] = useState(initialData?.location || '');
  const [period, setPeriod] = useState(initialData?.period || '');
  const [manHours, setManHours] = useState(initialData?.manHours || '');
  const [safetyRecord, setSafetyRecord] = useState(initialData?.safetyRecord || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [challenge, setChallenge] = useState(initialData?.challenge || '');
  const [hseSolution, setHseSolution] = useState(initialData?.hseSolution || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSave({
        title,
        client,
        category,
        location,
        period,
        startYear: initialData?.startYear || 2024,
        endYear: initialData?.endYear || 'Present',
        timelineDate: period,
        manHours,
        safetyRecord,
        summary,
        challenge,
        hseSolution,
        metrics: initialData?.metrics || [
          { label: 'Safety Record', value: safetyRecord || 'Zero Harm' },
          { label: 'Cumulative Man-Hours', value: manHours || 'Recorded' }
        ],
        tags: initialData?.tags || [category, 'Executive Directorship']
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-800 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {initialData ? 'Edit Megaproject Highlight' : 'Add Megaproject Highlight'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Second River Niger Bridge & Marine Foundation Works"
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Client / Regulatory Authority *</label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. Federal Ministry of Works"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="Bridges & Marine">Bridges &amp; Marine</option>
                <option value="Expressways & Corridors">Expressways &amp; Corridors</option>
                <option value="Heavy Civil & High-Rise">Heavy Civil &amp; High-Rise</option>
                <option value="Environmental & Industrial">Environmental &amp; Industrial</option>
                <option value="Statutory Governance">Statutory Governance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Geographic Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Asaba – Onitsha, Coastal Corridor"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Execution Period</label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="e.g. 2018 – 2023"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Safe Man-Hours</label>
              <input
                type="text"
                required
                value={manHours}
                onChange={(e) => setManHours(e.target.value)}
                placeholder="e.g. 18.6M Safe Hours"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Safety Record Headline</label>
              <input
                type="text"
                required
                value={safetyRecord}
                onChange={(e) => setSafetyRecord(e.target.value)}
                placeholder="e.g. 18.6M Safe Marine Hours Delivered"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Executive Scope Summary *</label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="High-level executive narrative of project execution..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Critical Engineering Challenge</label>
              <textarea
                rows={2}
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="e.g. Complex marine currents, deep pylon caissons..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">HSE &amp; Hygiene Solution</label>
              <textarea
                rows={2}
                value={hseSolution}
                onChange={(e) => setHseSolution(e.target.value)}
                placeholder="e.g. Acoustic radar perimeter, automated hydration..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>{submitting ? 'Saving...' : 'Save Megaproject'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------- SUB-COMPONENTS: BOOK MODAL (Light Frosted) ----------------- //

interface BookModalProps {
  initialData: BookItem | null;
  onClose: () => void;
  onSave: (data: Omit<BookItem, 'id'>) => Promise<void>;
}

const BookModal: React.FC<BookModalProps> = ({ initialData, onClose, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [authors, setAuthors] = useState(initialData?.authors?.join(', ') || 'Engr. Iyenoma ThankGod Osazee');
  const [publisherOrJournal, setPublisherOrJournal] = useState(initialData?.publisherOrJournal || '');
  const [publishedYear, setPublishedYear] = useState(initialData?.publishedYear || '');
  const [format, setFormat] = useState<BookItem['format']>(initialData?.format || 'Technical Monograph');
  const [pagesOrLength, setPagesOrLength] = useState(initialData?.pagesOrLength || '');
  const [doiOrRef, setDoiOrRef] = useState(initialData?.doiOrRef || '');
  const [badge, setBadge] = useState(initialData?.badge || 'Technical Monograph');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
  const [accessUrl, setAccessUrl] = useState(initialData?.accessUrl || '');
  const [citation, setCitation] = useState(initialData?.citation || '');
  const [abstract, setAbstract] = useState(initialData?.abstract || '');
  const [keyTopics, setKeyTopics] = useState(initialData?.keyTopics?.join('\n') || '');
  const [whatYoullLearn, setWhatYoullLearn] = useState(initialData?.whatYoullLearn?.join('\n') || '');
  const [whoIsThisFor, setWhoIsThisFor] = useState(initialData?.whoIsThisFor?.join('\n') || '');
  const [authorsNote, setAuthorsNote] = useState(initialData?.authorsNote || '');
  const [coverGradient] = useState(initialData?.coverGradient || 'from-purple-700 via-indigo-800 to-neutral-900');
  const [accentColor] = useState(initialData?.accentColor || 'purple');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSave({
        title,
        subtitle,
        authors: authors.split(',').map(a => a.trim()).filter(Boolean),
        publisherOrJournal,
        publishedYear,
        format,
        pagesOrLength,
        doiOrRef: doiOrRef || undefined,
        badge,
        imageUrl: imageUrl || undefined,
        accessUrl: accessUrl || undefined,
        citation: citation || `${authors}. (${publishedYear}). ${title}. ${publisherOrJournal}.`,
        abstract,
        keyTopics: keyTopics.split('\n').map(t => t.trim()).filter(Boolean),
        whatYoullLearn: whatYoullLearn.split('\n').map(l => l.trim()).filter(Boolean),
        whoIsThisFor: whoIsThisFor.split('\n').map(w => w.trim()).filter(Boolean),
        authorsNote,
        coverGradient,
        accentColor,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-2xl my-8 max-h-[90vh] overflow-y-auto text-slate-800 animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              {initialData ? 'Edit Publication' : 'Add Authored Publication'}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Publication Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Hazards and Risks Presented by the Thermal Environment"
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Subtitle / Thematic Focus</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Bioclimatic Ergonomics, Industrial Heat Mitigation & Civil Construction..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Publisher or Journal *</label>
              <input
                type="text"
                required
                value={publisherOrJournal}
                onChange={(e) => setPublisherOrJournal(e.target.value)}
                placeholder="e.g. ResearchGate Technical Monograph Series"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Published Year / Date *</label>
              <input
                type="text"
                required
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                placeholder="e.g. April 2021"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Format Category *</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as BookItem['format'])}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="Technical Monograph">Technical Monograph</option>
                <option value="Peer-Reviewed Paper">Peer-Reviewed Paper</option>
                <option value="Guidance Standard">Guidance Standard</option>
                <option value="Congress Paper">Congress Paper</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Pages or Volume Length</label>
              <input
                type="text"
                value={pagesOrLength}
                onChange={(e) => setPagesOrLength(e.target.value)}
                placeholder="e.g. 48 Pages • Monograph"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">DOI / Reference / ISBN</label>
              <input
                type="text"
                value={doiOrRef}
                onChange={(e) => setDoiOrRef(e.target.value)}
                placeholder="e.g. 10.13140/RG.2.2.21319.42408"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Badge Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Technical Monograph & Model"
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Cover Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Access / Download Link</label>
              <input
                type="url"
                value={accessUrl}
                onChange={(e) => setAccessUrl(e.target.value)}
                placeholder="https://www.researchgate.net/publication/..."
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Executive Abstract *</label>
            <textarea
              rows={3}
              required
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Detailed synthesis of the scientific investigation, methodology, and engineering findings..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Key Chapters / Topics (one per line)</label>
            <textarea
              rows={3}
              value={keyTopics}
              onChange={(e) => setKeyTopics(e.target.value)}
              placeholder={"The Physics of Human Heat Exchange\nEnvironmental Heat Instrumentation\nCognitive & Neuromuscular Impairment"}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">What Readers Learn (one per line)</label>
              <textarea
                rows={2}
                value={whatYoullLearn}
                onChange={(e) => setWhatYoullLearn(e.target.value)}
                placeholder={"Derivation of calibrated outdoor thermal heat indices\nDesign of non-punitive hydration protocols"}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-mono font-semibold mb-1">Intended Audience (one per line)</label>
              <textarea
                rows={2}
                value={whoIsThisFor}
                onChange={(e) => setWhoIsThisFor(e.target.value)}
                placeholder={"Civil Engineering Project Directors\nCorporate HSE Managers and Ergonomists"}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-mono font-semibold mb-1">Author's Field Note</label>
            <textarea
              rows={2}
              value={authorsNote}
              onChange={(e) => setAuthorsNote(e.target.value)}
              placeholder="Firsthand reflection on why this monograph or paper was written and its practical field impact..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-emerald-400" />
              <span>{submitting ? 'Saving...' : 'Save Publication'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
