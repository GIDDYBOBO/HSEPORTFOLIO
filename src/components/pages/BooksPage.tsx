import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, BookItem } from '../../types';
import { useLivePortfolioData } from '../../hooks/useLivePortfolioData';
import { 
  BookOpen, 
  ExternalLink, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  X,
  Sparkles
} from 'lucide-react';

interface BooksPageProps {
  onSelectPage: (page: PageId) => void;
  onSelectBook?: (book: BookItem) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({ 
  onSelectPage,
  onSelectBook 
}) => {
  const { books: liveBooks } = useLivePortfolioData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookModal, setSelectedBookModal] = useState<BookItem | null>(null);

  const featuredBook = liveBooks[0] || null;
  const remainingBooks = liveBooks.slice(1);

  const filteredRemaining = remainingBooks.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.abstract.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookClick = (book: BookItem) => {
    if (onSelectBook) {
      onSelectBook(book);
    } else {
      setSelectedBookModal(book);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pt-24 sm:pt-32 pb-24 text-[#333333] dark:text-[#e3e3e3] max-w-6xl mx-auto transition-colors duration-200">
      
      {/* =========================================================================
          HERO: AUTHOR'S LIBRARY
          ========================================================================= */}
      <section className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1C6CD4]/10 dark:bg-white/10 border border-[#1C6CD4]/25 dark:border-white/15 text-xs font-mono text-[#142C5C] dark:text-neutral-200">
          <BookOpen className="w-3.5 h-3.5 text-[#1C6CD4] dark:text-[#a8c7fa]" />
          <span className="font-semibold">Scientific Authorship • Technical Library</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-[#0f172a] dark:text-white tracking-tight leading-tight">
          Books &amp; Publications
        </h1>

        <p className="text-base sm:text-xl text-[#444444] dark:text-[#c4c7c5] max-w-3xl leading-relaxed">
          Practical knowledge, professional experience, and ideas captured in print. Written from frontline observation across two decades of high-consequence civil engineering.
        </p>
      </section>

      {/* =========================================================================
          1. FEATURED BOOK (Large Editorial Layout)
             SECTION BACKGROUND: "Get in Touch" Trust Navy (#142C5C)!
          ========================================================================= */}
      {featuredBook && (
        <section className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Featured Treatise
          </div>

          <article className="p-8 sm:p-12 rounded-3xl bg-[#11141c] hover:bg-[#141824] text-white shadow-2xl border border-white/10 hover:border-[#1C6CD4]/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden transition-all duration-300 group">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-[#1C6CD4]/20 text-[#93c5fd] font-bold border border-[#1C6CD4]/40">
                  {featuredBook.format}
                </span>
                <span className="text-[#96E2A5] font-bold">{featuredBook.publishedYear}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-black text-white group-hover:text-[#93c5fd] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                {featuredBook.title}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-[#93c5fd] font-bold">
                {featuredBook.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans font-normal">
                {featuredBook.abstract}
              </p>

              {featuredBook.whatYoullLearn && (
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#93c5fd] block mb-2 font-bold">
                    Core Findings &amp; Field Implementations:
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-200">
                    {featuredBook.whatYoullLearn.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#96E2A5] font-black">✓</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-neutral-400 font-medium">
                  {featuredBook.citation}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleBookClick(featuredBook)}
                    className="px-6 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105"
                  >
                    <span>Explore the Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {featuredBook.accessUrl && (
                    <a
                      href={featuredBook.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
                      title="Direct Paper Repository Access"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Book Graphic / Cover Preview */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div 
                onClick={() => handleBookClick(featuredBook)}
                className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#142C5C] via-[#0f172a] to-black p-8 border border-white/20 shadow-2xl flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#93c5fd]">
                    Applied Field Model
                  </span>
                  <h3 className="text-xl font-serif-editorial font-bold text-white group-hover:text-amber-100 transition-colors leading-snug">
                    {featuredBook.title}
                  </h3>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs font-mono text-neutral-300">
                  {featuredBook.authors[0]}
                </div>
              </div>
            </div>

          </article>
        </section>
      )}

      {/* =========================================================================
          2. ALL BOOKS (The Full Collection)
          ========================================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] dark:text-[#a8c7fa] font-semibold">
              Archive &amp; Repository
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#0f172a] dark:text-white tracking-tight">
              All Published Books &amp; Papers ({liveBooks.length})
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-[#0f172a] dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#1C6CD4] shadow-xs"
            />
          </div>
        </div>

        {/* Remaining Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRemaining.map((book) => (
            <article
              key={book.id}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#131822] border-2 border-slate-200 dark:border-white/10 shadow-lg hover:border-[#1C6CD4] transition-all flex flex-col justify-between space-y-4 text-black dark:text-white"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#1C6CD4] font-black">{book.format}</span>
                  <span className="text-black dark:text-[#8e918f] font-bold">{book.publishedYear}</span>
                </div>

                <h3 className="text-xl font-display font-black text-black dark:text-white leading-snug">
                  {book.title}
                </h3>

                <p className="text-xs font-mono text-[#142C5C] dark:text-[#93c5fd] font-bold">
                  {book.subtitle}
                </p>

                <p className="text-xs text-black dark:text-[#c4c7c5] leading-relaxed line-clamp-3 font-medium">
                  {book.abstract}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-slate-100 dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleBookClick(book)}
                  className="px-5 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Examine Monograph</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {book.accessUrl && (
                  <a
                    href={book.accessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-100 dark:bg-white/5 text-black dark:text-[#8e918f] hover:text-[#1C6CD4] dark:hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBookModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedBookModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 space-y-6 bg-white dark:bg-[#1e1f20] border-2 border-slate-200 dark:border-white/20 shadow-2xl text-black dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#1C6CD4] font-black">
                    {selectedBookModal.format} • {selectedBookModal.publishedYear}
                  </span>
                  <h3 className="text-2xl font-display font-black text-black dark:text-white">
                    {selectedBookModal.title}
                  </h3>
                  <p className="text-xs text-[#142C5C] dark:text-[#8e918f] font-bold">
                    {selectedBookModal.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBookModal(null)}
                  className="text-black hover:text-red-600 dark:text-white p-1 cursor-pointer font-bold text-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-black dark:text-neutral-400 font-black">Abstract</h4>
                <p className="text-xs sm:text-sm text-black dark:text-[#c4c7c5] leading-relaxed font-medium">
                  {selectedBookModal.abstract}
                </p>
              </div>

              {selectedBookModal.authorsNote && (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-1">
                  <h5 className="text-xs font-mono text-[#1C6CD4] font-bold">Author&apos;s Note</h5>
                  <p className="text-xs text-black dark:text-neutral-300 italic leading-relaxed font-medium">
                    &ldquo;{selectedBookModal.authorsNote}&rdquo;
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-black dark:text-[#8e918f] font-bold">
                  {selectedBookModal.citation}
                </span>

                <div className="flex items-center gap-2">
                  {selectedBookModal.accessUrl && (
                    <a
                      href={selectedBookModal.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-slate-300 dark:border-white/20 text-xs font-mono font-bold text-black dark:text-white inline-flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                      <span>Repository Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setSelectedBookModal(null);
                      onSelectPage('contact');
                    }}
                    className="px-5 py-2 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white text-xs font-bold cursor-pointer shadow-md"
                  >
                    Inquire on Publication
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Invitation */}
      <section className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-[#11141c] to-[#161c28] text-white text-center shadow-2xl border border-white/15 hover:border-[#1C6CD4]/50 transition-all space-y-4 group">
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
          Collaborate or Request Technical Monographs
        </h2>
        <p className="text-xs sm:text-base text-neutral-300 max-w-xl mx-auto font-sans leading-relaxed">
          Full text copies, institutional licenses, and academic review copies are available upon formal written inquiry.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onSelectPage('contact')}
            className="px-8 py-3.5 rounded-full font-mono font-bold text-xs bg-[#1C6CD4] hover:bg-[#155ab3] text-white transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105"
          >
            <span>Submit Monograph Request</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </section>

    </div>
  );
};
