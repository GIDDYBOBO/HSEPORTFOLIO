import React, { Component, ErrorInfo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { Shield, ArrowLeft, RefreshCw, AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onBackToPortfolio?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class AdminErrorBoundary extends Component<
  { onBackToPortfolio?: () => void; children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Admin Dashboard caught error:', error, errorInfo);
  }

  handleResetStorage = () => {
    try {
      localStorage.removeItem('hse_cached_credentials_v2');
      localStorage.removeItem('hse_cached_projects_v2');
      localStorage.removeItem('hse_cached_books_v2');
      localStorage.removeItem('hse_cached_inquiries_v2');
      localStorage.removeItem('hse_traffic_insights_v1');
      localStorage.removeItem('hse_executive_session');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center font-bold text-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold font-display text-slate-900 leading-snug">
                Executive Studio Recovery
              </h2>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                An isolated issue occurred while rendering the dashboard view. Your live database data is secure.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              {this.props.onBackToPortfolio && (
                <button
                  type="button"
                  onClick={this.props.onBackToPortfolio}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4 text-emerald-400" />
                  <span>Public Portfolio</span>
                </button>
              )}
              <button
                type="button"
                onClick={this.handleResetStorage}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-xs transition-colors cursor-pointer border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                <span>Reset &amp; Refresh</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  onBackToPortfolio 
}) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] text-slate-800">
        <div className="flex flex-col items-center space-y-4 p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xl">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shadow-sm">
              <Shield className="w-7 h-7 animate-pulse text-amber-600" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-amber-400/20 blur-md -z-10 animate-ping" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-slate-900 font-display tracking-tight">
              Verifying Executive Security Credentials
            </p>
            <p className="text-xs text-slate-500 font-mono flex items-center justify-center gap-1.5">
              <span>Checking Firebase Auth session...</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no logged in session exists, guard with AdminLogin component
  if (!isLoggedIn) {
    return <AdminLogin onBackToPortfolio={onBackToPortfolio} />;
  }

  // Session authenticated and authorized - wrap in AdminErrorBoundary
  return (
    <AdminErrorBoundary onBackToPortfolio={onBackToPortfolio}>
      {children}
    </AdminErrorBoundary>
  );
};
