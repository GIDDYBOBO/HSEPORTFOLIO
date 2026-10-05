import React, { useState, useEffect } from 'react';
import { PageId, BookItem } from './types';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BOOKS_AND_PUBLICATIONS } from './data/booksData';
import { seedInitialDataIfEmpty } from './lib/portfolioService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { WorksPage } from './components/pages/WorksPage';
import { BooksPage } from './components/pages/BooksPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { LeadershipPage } from './components/pages/LeadershipPage';
import { ContactPage } from './components/pages/ContactPage';
import { BookingModal } from './components/modals/BookingModal';
import { AllCredentialsModal } from './components/modals/AllCredentialsModal';
import { BookDetailModal } from './components/modals/BookDetailModal';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MorphBackground } from './components/common/MorphBackground';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { FloatingBackToTop } from './components/common/FloatingBackToTop';
import { AnimatePresence, motion } from 'motion/react';
import { recordRealVisit, recordRealPageView, recordModalInteraction } from './lib/analyticsService';
import { useDynamicSEO } from './hooks/useDynamicSEO';

function PortfolioApp() {
  const { theme } = useTheme();
  // HSE-Port Signature Design: Home, About, Works, Books, Services, Leadership, Contact
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);

  // Check if current URL is pointing to admin route (hash #mine, #admin, or path /admin, /mine)
  const checkIsAdminRoute = () => {
    if (typeof window === 'undefined') return false;
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    return hash === '#mine' || hash === '#admin' || path === '/admin' || path === '/mine';
  };

  // Admin Route: Activated via /#mine, /#admin, /admin, footer padlock, or Secret Shortcut (Ctrl+Shift+A / Cmd+Shift+A)
  const [isAdminView, setIsAdminView] = useState(() => checkIsAdminRoute());

  // Dynamic context-aware SEO management (titles, meta description, canonical URLs, social cards, JSON-LD)
  useDynamicSEO(currentPage, isAdminView, selectedBook);

  // Seed baseline data safely into Firestore and record initial real visit
  useEffect(() => {
    seedInitialDataIfEmpty().catch(err => {
      console.warn('Initial data seed notice:', err);
    });
    recordRealVisit();
    recordRealPageView('home');
  }, []);

  // Listen for hash navigation or popstate
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminRoute()) {
        setIsAdminView(true);
      } else if (isAdminView) {
        setIsAdminView(false);
      }
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [isAdminView]);

  // Secret Executive Keystroke: Ctrl + Shift + A (or Cmd + Shift + A on macOS)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsAdminView((prev) => {
          const next = !prev;
          if (next) {
            window.location.hash = 'mine';
          } else {
            window.history.replaceState(null, '', window.location.pathname.replace(/\/admin|\/mine/, '') || '/');
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExitAdmin = () => {
    setIsAdminView(false);
    window.history.replaceState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPage = (page: PageId) => {
    recordRealPageView(page);
    if (page === 'overview') {
      setCurrentPage('home');
    } else if (page === 'publications') {
      setCurrentPage('books');
    } else if (page === 'advisory') {
      setCurrentPage('services');
    } else {
      setCurrentPage(page);
    }
    const isTargetingQuery = 
      (page === 'services' || page === 'advisory') && 
      (window.location.hash === '#formal-query' || sessionStorage.getItem('hse_scroll_target') === 'formal-query');

    if (!isTargetingQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenBook = (book: BookItem) => {
    recordModalInteraction('book_detail');
    setSelectedBook(book);
  };

  const handleOpenBooking = () => {
    recordModalInteraction('booking');
    setBookingModalOpen(true);
  };

  const handleOpenCredentials = () => {
    recordModalInteraction('credentials');
    setCredentialsModalOpen(true);
  };

  // If in admin view, render ProtectedRoute and CMS Dashboard
  if (isAdminView) {
    return (
      <ProtectedRoute onBackToPortfolio={handleExitAdmin}>
        <AdminDashboard onBackToPortfolio={handleExitAdmin} />
      </ProtectedRoute>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-white text-slate-900 selection:bg-[#1C6CD4]/20 selection:text-[#142C5C] transition-colors duration-200">
      {/* Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* DialedWeb Signature Morphing Liquid Mesh & Ambient Glass Canvas */}
      <MorphBackground />

      {/* Top Main Navigation (Floating Capsule: Home, About, Works, Books, Services, Leadership + Book Call) */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenBookingModal={handleOpenBooking}
      />

      {/* Main Page Area: Original HSE-Port Suite with upgraded Home Page */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {(currentPage === 'home' || currentPage === 'overview') && (
              <HomePage
                onSelectPage={handleSelectPage}
                onSelectBook={handleOpenBook}
                onOpenBookingModal={handleOpenBooking}
              />
            )}

            {currentPage === 'about' && (
              <AboutPage
                onSelectPage={handleSelectPage}
                onOpenBookingModal={handleOpenBooking}
                onOpenCredentialsModal={handleOpenCredentials}
              />
            )}

            {currentPage === 'works' && (
              <WorksPage
                onSelectPage={handleSelectPage}
                onOpenBookingModal={handleOpenBooking}
              />
            )}

            {(currentPage === 'books' || currentPage === 'publications') && (
              <BooksPage
                onSelectBook={handleOpenBook}
                onSelectPage={handleSelectPage}
              />
            )}

            {(currentPage === 'services' || currentPage === 'advisory') && (
              <ServicesPage
                onSelectPage={handleSelectPage}
                onOpenBookingModal={handleOpenBooking}
              />
            )}

            {currentPage === 'leadership' && (
              <LeadershipPage />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onSelectPage={handleSelectPage}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Institutional Mega Footer */}
      <Footer
        onSelectPage={handleSelectPage}
        onOpenBookingModal={handleOpenBooking}
      />

      {/* Global Booking Consultation Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />

      {/* Verifiable Credentials Modal */}
      <AllCredentialsModal
        isOpen={credentialsModalOpen}
        onClose={() => setCredentialsModalOpen(false)}
      />

      {/* Book Detailed Reading Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onOpenInquiryForBook={() => {
            setSelectedBook(null);
            handleSelectPage('contact');
          }}
        />
      )}

      {/* Floating Back to Top Button with Scroll Progress Indicator */}
      <FloatingBackToTop />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PortfolioApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
