import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { seedInitialDataIfEmpty } from '../lib/portfolioService';

interface LocalAdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | LocalAdminUser | null;
  loading: boolean;
  isLoggedIn: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const LOCAL_ADMIN_KEY = 'hse_executive_session';
const CUSTOM_PASSWORD_KEY = 'hse_custom_admin_pass';
const CUSTOM_EMAIL_KEY = 'hse_custom_admin_email';
const ADMIN_CONFIGURED_KEY = 'hse_admin_configured';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | LocalAdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // One-time cleanup of previous hardcoded or stale credentials to ensure clean setup
    if (localStorage.getItem('hse_credentials_cleaned_v5') !== 'true') {
      try {
        localStorage.removeItem(LOCAL_ADMIN_KEY);
        localStorage.removeItem(CUSTOM_PASSWORD_KEY);
        localStorage.removeItem(CUSTOM_EMAIL_KEY);
        localStorage.removeItem(ADMIN_CONFIGURED_KEY);
        localStorage.setItem('hse_credentials_cleaned_v5', 'true');
      } catch {}
    }

    // Check local admin session backup
    const savedLocalSession = localStorage.getItem(LOCAL_ADMIN_KEY);
    if (savedLocalSession) {
      try {
        const parsed = JSON.parse(savedLocalSession);
        setCurrentUser(parsed);
      } catch {
        localStorage.removeItem(LOCAL_ADMIN_KEY);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Engr. Iyenoma T. Osazee'
        }));
        // Seed initial collections in Firestore if needed
        seedInitialDataIfEmpty().catch(err => {
          console.warn('Initial data seeding error:', err);
        });
      } else if (!localStorage.getItem(LOCAL_ADMIN_KEY)) {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const customStoredPass = localStorage.getItem(CUSTOM_PASSWORD_KEY);
    const customStoredEmail = (localStorage.getItem(CUSTOM_EMAIL_KEY) || '').trim().toLowerCase();

    // 1. Try Firebase Auth sign in directly
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, pass);
      return;
    } catch (firebaseErr: any) {
      console.warn('Firebase signIn attempt:', firebaseErr?.code);

      // 2. Check local custom verified credentials (only matches actual saved email & password)
      const matchesCustom = customStoredPass && 
        customStoredPass === pass && 
        customStoredEmail && 
        customStoredEmail === cleanEmail;

      if (matchesCustom) {
        const sessionUser: LocalAdminUser = {
          uid: `exec-${Date.now()}`,
          email: cleanEmail,
          displayName: 'Engr. Iyenoma T. Osazee (Executive Admin)'
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(sessionUser));
        setCurrentUser(sessionUser);
        return;
      }

      // If credentials do not match
      throw new Error(firebaseErr?.message || 'Invalid email or password.');
    }
  };

  const registerWithEmail = async (email: string, pass: string, name?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    // Persist custom password & email configuration
    localStorage.setItem(CUSTOM_PASSWORD_KEY, pass);
    localStorage.setItem(CUSTOM_EMAIL_KEY, cleanEmail);
    localStorage.setItem(ADMIN_CONFIGURED_KEY, 'true');
    
    try {
      const res = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      if (res.user && name) {
        await updateProfile(res.user, { displayName: name });
      }
    } catch (err: any) {
      console.warn('Firebase register notice, activating local executive registration:', err);
      const sessionUser: LocalAdminUser = {
        uid: `exec-${Date.now()}`,
        email: cleanEmail,
        displayName: name || 'Engr. Iyenoma T. Osazee'
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        throw new Error('Google authentication could not be completed.');
      }
    }
  };

  const logout = async () => {
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    try {
      await signOut(auth);
    } catch {
      // Ignored
    }
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        isLoggedIn: !!currentUser,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
