import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';

interface AdminLoginProps {
  onBackToPortfolio?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToPortfolio }) => {
  const { loginWithEmail, registerWithEmail } = useAuth();
  
  // Check if admin password has already been created
  const [isConfigured, setIsConfigured] = useState<boolean>(() => {
    return localStorage.getItem('hse_admin_configured') === 'true';
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const configured = localStorage.getItem('hse_admin_configured') === 'true';
    setIsConfigured(configured);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError('Please enter both email and password.');
      return;
    }

    // If password hasn't been configured yet, we are in initial one-time create password mode
    if (!isConfigured) {
      if (cleanPass.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (cleanPass !== confirmPassword.trim()) {
        setError('Passwords do not match. Please re-check.');
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);

      if (!isConfigured) {
        // One-time password creation
        await registerWithEmail(cleanEmail, cleanPass, 'Engr. Iyenoma T. Osazee');
        setIsConfigured(true);
        localStorage.setItem('hse_admin_configured', 'true');
        setSuccessMsg('Executive credentials configured successfully.');
      } else {
        // Standard authentication
        await loginWithEmail(cleanEmail, cleanPass);
      }
    } catch (err: any) {
      console.error('Authentication attempt notice:', err);
      let msg = err.message || 'Authentication could not be completed.';
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        msg = 'Incorrect password entered.';
      }
      if (err.code === 'auth/user-not-found') {
        msg = 'No executive account found with this email.';
      }
      if (err.code === 'auth/invalid-email') {
        msg = 'Invalid email address format.';
      }
      if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters.';
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#F8FAFC] text-slate-800 font-sans relative overflow-hidden">
      <div className="w-full max-w-md">
        {/* Navigation / Return Link */}
        <div className="flex items-center justify-between mb-5">
          {onBackToPortfolio ? (
            <button
              type="button"
              id="btn-login-back-to-portfolio"
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" />
              <span>Return to Public Site</span>
            </button>
          ) : <div />}

          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">HSE-Port Security</span>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-2xl p-6 sm:p-7 shadow-xl space-y-5">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 mx-auto flex items-center justify-center shadow-2xs">
              <Shield className="w-4 h-4 text-amber-600" />
            </div>
            
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700">
              Executive Directorship Studio
            </div>

            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-display leading-snug">
              {isConfigured ? 'Executive Authentication' : 'Create Executive Password'}
            </h1>

            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              {isConfigured
                ? 'Sign in to access portfolio content management and client inquiry records.'
                : 'Initial Setup: Create your executive password to secure dashboard access.'}
            </p>
          </div>

          {/* One-time setup notification banner (only if not configured yet) */}
          {!isConfigured && (
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs font-mono flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="font-semibold text-[11px]">One-Time Password Setup: After this step, only login will be shown.</span>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-600" />
              <span className="font-medium text-[11px]">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-600" />
              <span className="font-medium text-[11px]">{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono font-semibold text-slate-700 mb-1">
                Executive Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter executive email"
                  required
                  autoComplete="username"
                  className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold text-slate-700 mb-1">
                {!isConfigured ? 'New Password (min 6 chars)' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={!isConfigured ? 'Create a secure password' : 'Enter your password'}
                  required
                  autoComplete={!isConfigured ? 'new-password' : 'current-password'}
                  className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                />
              </div>
            </div>

            {!isConfigured && (
              <div>
                <label className="block text-[11px] font-mono font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    autoComplete="new-password"
                    className="w-full pl-8.5 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-xs tracking-wide transition-all duration-200 shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-1"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {!isConfigured
                      ? 'Save Password & Enter Dashboard'
                      : 'Sign In to Executive Studio'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              Secure Verified Access
            </span>
            <span className="text-slate-400">CMS Role: Owner</span>
          </div>

        </div>
      </div>
    </div>
  );
};
