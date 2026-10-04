import React from 'react';

/**
 * Custom hook for perceived loading. Returns false immediately so data renders
 * instantaneously with zero delay or sluggishness.
 */
export function usePerceivedLoading(
  _triggerDeps: unknown[] = [], 
  _durationMs: number = 0
): boolean {
  // Return false immediately: renders real content instantaneously with zero wait
  return false;
}

/**
 * Base Atomic Skeleton Primitive with Shimmer Effect
 */
export const Skeleton: React.FC<{
  className?: string;
  variant?: 'shimmer' | 'pulse';
}> = ({ className = '', variant = 'shimmer' }) => {
  return (
    <div 
      className={`rounded-md bg-slate-200/80 ${
        variant === 'shimmer' ? 'skeleton-shimmer' : 'skeleton-pulse'
      } ${className}`}
      aria-hidden="true"
    />
  );
};

/**
 * Skeleton loader specifically calibrated for Publication Items (PublicationsPage)
 */
export const PublicationCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl dialed-glass-card space-y-5 animate-fadeIn">
      {/* Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-32 rounded-md hidden sm:block" />
        </div>
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>

      {/* Title & Citations */}
      <div className="space-y-2.5">
        <Skeleton className="h-6 sm:h-7 w-11/12 rounded-lg" />
        <Skeleton className="h-6 sm:h-7 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-md pt-1" />
      </div>

      {/* Abstract preview block */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-4/5 rounded" />
      </div>

      {/* Footer Tags & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full hidden sm:block" />
        </div>
        <Skeleton className="h-6 w-24 rounded-md" />
      </div>
    </div>
  );
};

export const PublicationsListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading research publications">
      {Array.from({ length: count }).map((_, idx) => (
        <PublicationCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Skeleton loader specifically calibrated for Books & Research Monograms (BooksPage)
 */
export const BookCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 sm:p-7 rounded-3xl dialed-glass-card flex flex-col justify-between space-y-5 h-full animate-fadeIn">
      {/* Cover / Visual Banner */}
      <Skeleton className="h-48 sm:h-56 w-full rounded-2xl" />

      {/* Header Badges */}
      <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>

      {/* Title & Subtitle */}
      <div className="space-y-2 flex-1">
        <Skeleton className="h-6 w-11/12 rounded-lg" />
        <Skeleton className="h-6 w-2/3 rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-md pt-1" />
        <Skeleton className="h-3.5 w-1/2 rounded-md" />
      </div>

      {/* Abstract excerpt */}
      <div className="space-y-1.5 pt-1">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-4/5 rounded" />
      </div>

      {/* Action Footer Button */}
      <div className="pt-3 border-t border-white/10">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </div>
  );
};

export const BooksGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" 
      aria-busy="true" 
      aria-label="Loading research monographs"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <BookCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Skeleton loader calibrated for Mega-Infrastructure Works & Case Studies (WorksPage)
 */
export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl dialed-glass-card space-y-6 animate-fadeIn">
      {/* Top Banner Image Placeholder */}
      <Skeleton className="h-52 sm:h-64 w-full rounded-2xl" />

      {/* Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>
        <Skeleton className="h-4 w-36 rounded-md" />
      </div>

      {/* Project Title & Summary */}
      <div className="space-y-2.5">
        <Skeleton className="h-7 w-5/6 rounded-lg" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-4/5 rounded" />
      </div>

      {/* Key Metric Highlights Grid (4 boxes) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
            <Skeleton className="h-3 w-16 rounded" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex justify-between items-center">
        <Skeleton className="h-4 w-40 rounded" />
        <Skeleton className="h-10 w-48 rounded-full" />
      </div>
    </div>
  );
};

export const ProjectsListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading infrastructure projects">
      {Array.from({ length: count }).map((_, idx) => (
        <ProjectCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Skeleton loader calibrated for Verifiable Credentials (AllCredentialsModal & Overview)
 */
export const CredentialCardSkeleton: React.FC = () => {
  return (
    <div className="p-5 rounded-2xl dialed-glass-card space-y-3.5 animate-fadeIn">
      {/* Top Badge & ID */}
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>

      {/* Title & Issuer */}
      <div className="space-y-1.5">
        <Skeleton className="h-5 w-4/5 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-3/4 rounded" />
      </div>

      {/* Status Footer */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>
    </div>
  );
};

export const CredentialsGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-4" 
      aria-busy="true" 
      aria-label="Loading credentials registry"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <CredentialCardSkeleton key={idx} />
      ))}
    </div>
  );
};

/**
 * Skeleton loader calibrated for Institutional Leadership & Governance (LeadershipPage)
 */
export const LeadershipCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl dialed-glass-card space-y-4 animate-fadeIn">
      {/* Top period & category */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-4 w-28 rounded" />
      </div>

      {/* Role & Org */}
      <div className="space-y-1.5">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>

      {/* Impact Box */}
      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/5 space-y-1.5">
        <Skeleton className="h-3.5 w-full rounded" />
        <Skeleton className="h-3.5 w-4/5 rounded" />
      </div>

      {/* Details */}
      <div className="space-y-1">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-3/4 rounded" />
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
    </div>
  );
};

export const LeadershipGridSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 gap-6" 
      aria-busy="true" 
      aria-label="Loading leadership appointments"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <LeadershipCardSkeleton key={idx} />
      ))}
    </div>
  );
};

