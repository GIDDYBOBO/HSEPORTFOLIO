import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookItem } from '../../types';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  ListOrdered, 
  Quote, 
  Calendar, 
  Building, 
  FileText, 
  Copy, 
  Check, 
  Mail,
  Bookmark
} from 'lucide-react';

interface BookDetailModalProps {
  book: BookItem | null;
  onClose: () => void;
  onOpenInquiryForBook?: (bookTitle: string) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  onClose,
  onOpenInquiryForBook
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (book) {
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
  }, [book, onClose]);

  if (!book) return null;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(book.citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div 
        id="book-detail-modal-backdrop"
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden bg-slate-900/50 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-3xl lg:max-w-4xl max-h-[86vh] sm:max-h-[88vh] rounded-3xl bg-white border border-slate-200 text-slate-900 shadow-2xl flex flex-col my-auto overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Publication Imagery Hero Container */}
          {book.imageUrl && (
            <div className="relative h-40 sm:h-52 w-full overflow-hidden bg-slate-100 border-b border-slate-200 shrink-0">
              <img
                src={book.imageUrl}
                alt={book.imageAlt || `Cover and technical documentation for ${book.title}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.85] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
              
              {/* Close Button on image */}
              <button
                id="btn-close-book-modal"
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center transition-all border border-slate-200 active:scale-95 shadow-lg cursor-pointer backdrop-blur-md"
                aria-label="Close book details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-7 flex flex-wrap items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 font-bold uppercase tracking-wider text-[10px] shadow-sm">
                  {book.badge}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 flex items-center gap-1.5 text-[11px] font-bold shadow-sm">
                  <Calendar className="w-3 h-3 text-[#1C6CD4]" />
                  {book.publishedYear}
                </span>
              </div>
            </div>
          )}

          {/* Header Banner */}
          <div className="p-5 sm:p-7 bg-slate-50 text-slate-900 border-b border-slate-200 relative shrink-0">
            {/* Close Button when no image banner */}
            {!book.imageUrl && (
              <button
                id="btn-close-book-modal"
                onClick={onClose}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center transition-all border border-slate-300 active:scale-95 cursor-pointer backdrop-blur-md"
                aria-label="Close book details"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="relative z-10 space-y-2.5 max-w-2xl pr-10">
              {!book.imageUrl && (
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono pb-1">
                  <span className="px-3 py-0.5 rounded-full bg-blue-50 text-[#1C6CD4] border border-blue-200 font-semibold uppercase tracking-wider text-[10px]">
                    {book.badge}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3 h-3 text-[#1C6CD4]" />
                    {book.publishedYear}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                    {book.pagesOrLength}
                  </span>
                </div>
              )}

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-slate-900 tracking-tight leading-snug">
                {book.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                {book.subtitle}
              </p>

              <div className="text-xs text-slate-500 font-mono flex flex-wrap items-center gap-1.5 pt-1">
                <span>Authors:</span>
                <span className="text-[#1C6CD4] font-semibold">{book.authors.join(' • ')}</span>
              </div>
            </div>
          </div>

          {/* Modal Body (Scrolls smoothly internally, within screen range) */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6 text-slate-700 text-sm">
            
            {/* Action Bar (Publication info + STRICTLY SIDE-BY-SIDE Buttons) */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="text-xs font-mono text-slate-600">
                <span className="text-slate-500">Publication: </span>
                <span className="text-slate-900 font-semibold">{book.publisherOrJournal}</span>
                {book.doiOrRef && (
                  <span className="text-[#1C6CD4] ml-2 block sm:inline">({book.doiOrRef})</span>
                )}
              </div>

              {/* Side-by-Side Action Buttons (Strictly side-by-side on all screens, never wrap) */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
                <button
                  id="btn-copy-citation"
                  onClick={handleCopyCitation}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-[11px] sm:text-xs font-mono border border-slate-300 text-slate-800 transition-all whitespace-nowrap cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-emerald-600">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>

                <button
                  id="btn-request-copy"
                  onClick={() => {
                    onClose();
                    if (onOpenInquiryForBook) {
                      onOpenInquiryForBook(book.title);
                    }
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-[11px] sm:text-xs transition-all shadow-md whitespace-nowrap cursor-pointer active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Request Copy / Enquire</span>
                </button>
              </div>
            </div>

            {/* Section 1: Overview / Abstract */}
            <div className="space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-900 font-semibold">
                <BookOpen className="w-4 h-4 text-[#1C6CD4]" />
                <span>Executive Overview &amp; Abstract</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                {book.abstract}
              </p>
            </div>

            {/* Section 2: What You Will Learn */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What You Will Learn (Key Takeaways)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {book.whatYoullLearn.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-2.5 hover:border-[#1C6CD4] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C6CD4] shrink-0 mt-2" />
                    <span className="text-xs text-slate-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Who This Book Is For */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-900 font-semibold">
                <Users className="w-4 h-4 text-[#1C6CD4]" />
                <span>Target Audience &amp; Industry Applications</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {book.whoIsThisFor.map((audience, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-800 font-medium"
                  >
                    {audience}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Key Topics / Chapter Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-900 font-semibold">
                <ListOrdered className="w-4 h-4 text-[#1C6CD4]" />
                <span>Key Topics &amp; Structural Highlights</span>
              </div>
              <div className="space-y-2 font-mono text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {book.keyTopics.map((topic, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 py-1 border-b border-slate-200 last:border-0">
                    <span className="text-slate-900 font-bold shrink-0">{idx + 1}.</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Author's Note */}
            <div className="space-y-2.5 p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-slate-900 font-semibold">
                <Quote className="w-4 h-4 text-[#1C6CD4]" />
                <span>Author&apos;s Field Note • Engr. Iyenoma ThankGod Osazee</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed pl-2 border-l-2 border-[#1C6CD4]">
                &ldquo;{book.authorsNote}&rdquo;
              </p>
            </div>

            {/* Formal Citation Box */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono uppercase text-slate-500 block">
                Standard Academic Citation
              </span>
              <p className="font-mono text-xs text-slate-700 select-all">
                {book.citation}
              </p>
            </div>
          </div>

          {/* Footer Bar (Shrink-0, firmly in view) */}
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] font-mono text-slate-500">
              Published under international academic &amp; technical review standards.
            </span>
            <div className="flex items-center space-x-2.5">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  if (onOpenInquiryForBook) {
                    onOpenInquiryForBook(book.title);
                  }
                }}
                className="px-5 py-2 rounded-full bg-[#1C6CD4] hover:bg-[#155ab3] text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Inquire About Publication
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
