import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId, BookItem } from '../../types';
import { useLivePortfolioData } from '../../hooks/useLivePortfolioData';
import { MagneticButton } from '../common/MagneticButton';
import { 
  BookOpen, 
  ExternalLink, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  X
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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
    <div className="space-y-16 sm:space-y-24 pt-24 sm:pt-32 pb-24 text-slate-900 max-w-6xl mx-auto transition-colors duration-200">
      
      {/* =========================================================================
          HERO: AUTHOR'S LIBRARY
          ========================================================================= */}
      <section className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#142C5C]">
          <BookOpen className="w-3.5 h-3.5 text-[#1C6CD4]" />
          <span className="font-semibold">Scientific Authorship • Technical Library</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight leading-tight">
          Books &amp; Publications
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
          Practical knowledge, professional experience, and ideas captured in print. Written from frontline observation across two decades of high-consequence civil engineering.
        </p>
      </section>

      {/* =========================================================================
          1. FEATURED BOOK (Large Editorial Layout)
          ========================================================================= */}
      {featuredBook && (
        <section className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
            Featured Treatise
          </div>

          <article className="p-8 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-md border border-slate-200 hover:border-[#1C6CD4] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden transition-all duration-300 group">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#1C6CD4] font-bold border border-blue-200">
                  {featuredBook.format}
                </span>
                <span className="text-emerald-700 font-bold">{featuredBook.publishedYear}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 group-hover:text-[#1C6CD4] group-hover:underline decoration-[#1C6CD4] decoration-2 underline-offset-4 transition-all leading-snug">
                {featuredBook.title}
              </h2>

              <p className="text-xs sm:text-sm font-mono text-[#1C6CD4] font-bold">
                {featuredBook.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                {featuredBook.abstract}
              </p>

              {featuredBook.whatYoullLearn && (
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#1C6CD4] block mb-2 font-bold">
                    Core Findings &amp; Field Implementations:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {featuredBook.whatYoullLearn.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-black">✓</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-500 font-medium">
                  {featuredBook.citation}
                </div>

                <div className="flex items-center gap-3">
                  <MagneticButton
                    onClick={() => handleBookClick(featuredBook)}
                    className="px-6 py-2.5 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    <span>Explore the Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>

                  {featuredBook.accessUrl && (
                    <a
                      href={featuredBook.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
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
                className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 p-8 border border-slate-200 shadow-md flex flex-col justify-between cursor-pointer group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#1C6CD4] font-bold">
                    Applied Field Model
                  </span>
                  <h3 className="text-xl font-serif-editorial font-bold text-slate-900 group-hover:text-[#1C6CD4] transition-colors leading-snug">
                    {featuredBook.title}
                  </h3>
                </div>
                <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-600">
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1C6CD4] font-semibold">
              Archive &amp; Repository
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
              All Published Books &amp; Papers ({liveBooks.length})
            </h2>
          </div>

          {/* Expanding Search Bar Microinteraction */}
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'w-full sm:w-80' : 'w-full sm:w-64'}`}>
            <Search className={`w-4 h-4 absolute left-3 top-2.5 transition-colors ${isSearchFocused ? 'text-[#1C6CD4]' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search library..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#1C6CD4] focus:ring-2 focus:ring-[#1C6CD4]/20 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 p-0.5 rounded-full text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Remaining Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRemaining.map((book) => (
            <motion.article
              key={book.id}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1C6CD4] transition-all flex flex-col justify-between space-y-4 text-slate-900 cursor-pointer"
              onClick={() => handleBookClick(book)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#1C6CD4] font-black">{book.format}</span>
                  <span className="text-slate-500 font-bold">{book.publishedYear}</span>
                </div>

                <h3 className="text-xl font-display font-black text-slate-900 leading-snug">
                  {book.title}
                </h3>

                <p className="text-xs font-mono text-[#1C6CD4] font-bold">
                  {book.subtitle}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                  {book.abstract}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
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
                    className="p-2.5 rounded-full bg-slate-100 text-slate-700 hover:text-[#1C6CD4] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.article>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md"
            onClick={() => setSelectedBookModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 space-y-6 bg-white border border-slate-200 shadow-2xl text-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-[#1C6CD4] font-black">
                    {selectedBookModal.format} • {selectedBookModal.publishedYear}
                  </span>
                  <h3 className="text-2xl font-display font-black text-slate-900">
                    {selectedBookModal.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-bold">
                    {selectedBookModal.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBookModal(null)}
                  className="text-slate-600 hover:text-red-600 p-1 cursor-pointer font-bold text-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-black">Abstract</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedBookModal.abstract}
                </p>
              </div>

              {selectedBookModal.authorsNote && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <h5 className="text-xs font-mono text-[#1C6CD4] font-bold">Author&apos;s Note</h5>
                  <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                    &ldquo;{selectedBookModal.authorsNote}&rdquo;
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  {selectedBookModal.citation}
                </span>

                <div className="flex items-center gap-2">
                  {selectedBookModal.accessUrl && (
                    <a
                      href={selectedBookModal.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full border border-slate-300 text-xs font-mono font-bold text-slate-800 inline-flex items-center gap-1.5 hover:bg-slate-100"
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
      <section className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50 text-slate-900 text-center shadow-md border border-slate-200 hover:border-[#1C6CD4]/50 transition-all space-y-4 group">
        <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900">
          Collaborate or Request Technical Monographs
        </h2>
        <p className="text-xs sm:text-base text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
          Full text copies, institutional licenses, and academic review copies are available upon formal written inquiry.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => onSelectPage('contact')}
            className="px-8 py-3.5 rounded-full font-mono font-bold text-xs bg-[#1C6CD4] hover:bg-[#155ab3] text-white transition-all flex items-center gap-2 cursor-pointer shadow-md hover:scale-105"
          >
            <span>Submit Monograph Request</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </section>

    </div>
  );
};
