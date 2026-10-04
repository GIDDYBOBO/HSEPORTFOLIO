import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Check if error is from a browser extension (like MetaMask)
    const msg = (error?.message || '').toLowerCase();
    if (msg.includes('metamask') || msg.includes('ethereum')) {
      return { hasError: false };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const msg = (error?.message || '').toLowerCase();
    if (!msg.includes('metamask') && !msg.includes('ethereum')) {
      console.error('Uncaught application error:', error, errorInfo);
    }
  }

  private handleResetAndRecover = () => {
    try {
      localStorage.removeItem('hse_cached_credentials_v2');
      localStorage.removeItem('hse_cached_projects_v2');
      localStorage.removeItem('hse_cached_books_v2');
      localStorage.removeItem('hse_cached_inquiries_v2');
      localStorage.removeItem('hse_traffic_insights_v1');
      localStorage.removeItem('hse_executive_session');
      window.location.hash = '';
      window.history.replaceState(null, '', '/');
    } catch {}
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center font-bold text-lg">
              !
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900 leading-snug sm:leading-tight">
              Temporary View Interruption
            </h2>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              An unexpected condition occurred while rendering this interface. Your data remains completely safe.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-600 text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleResetAndRecover}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#0F172A] text-white font-mono font-bold text-xs transition-colors cursor-pointer shadow-md"
              >
                Reset Cache &amp; Return Home
              </button>
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-xs transition-colors cursor-pointer border border-slate-200"
              >
                Refresh View
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
