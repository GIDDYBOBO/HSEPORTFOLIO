import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

export interface UseScrollRevealOptions {
  /**
   * Percentage of element visibility required before triggering (0.0 to 1.0)
   * @default 0.06
   */
  threshold?: number;
  /**
   * Viewport root margin
   * @default '0px 0px -40px 0px'
   */
  rootMargin?: string;
  /**
   * Transition delay in milliseconds
   * @default 0
   */
  delayMs?: number;
  /**
   * Whether the animation should trigger only once
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Disable the observer completely (e.g. for testing or static rendering)
   * @default false
   */
  disabled?: boolean;
}

export interface ScrollRevealResult<T extends HTMLElement = HTMLElement> {
  ref: RefObject<T | null>;
  isVisible: boolean;
  className: string;
  style: React.CSSProperties;
}

/**
 * useScrollReveal
 * Hook for individual elements to observe scroll entry and apply 'fade-up-section' and 'is-visible' classes.
 * Manages IntersectionObserver lifecycle, unobserves upon entry for high performance,
 * and automatically accounts for prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealOptions = {}
): ScrollRevealResult<T> {
  const {
    threshold = 0.06,
    rootMargin = '0px 0px -40px 0px',
    delayMs = 0,
    triggerOnce = true,
    disabled = false,
  } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Check user preference for reduced motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    // Check if element is already within the viewport on initial render
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      if (triggerOnce) return;
    }

    // Safety fallback: ensure element is never stuck hidden if observer is delayed or blocked
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      clearTimeout(safetyTimer);
      return;
    }

    // IntersectionObserver instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          clearTimeout(safetyTimer);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled]);

  const className = `fade-up-section ${isVisible ? 'is-visible' : ''}`.trim();
  const style: React.CSSProperties = delayMs > 0 && isVisible ? { transitionDelay: `${delayMs}ms` } : {};

  return {
    ref,
    isVisible,
    className,
    style,
  };
}

export interface UseScrollRevealContainerOptions {
  /**
   * CSS selector for child sections to reveal
   * @default 'section, [data-scroll-reveal], .fade-up-section'
   */
  selector?: string;
  /**
   * Observer threshold
   * @default 0.08
   */
  threshold?: number;
  /**
   * Observer root margin
   * @default '0px 0px -50px 0px'
   */
  rootMargin?: string;
  /**
   * Whether animations trigger only once
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Dependency array that triggers a re-scan of the container (e.g. route or page transitions)
   */
  deps?: unknown[];
}

/**
 * useScrollRevealContainer
 * Container-level IntersectionObserver hook for landing pages and multi-section layouts.
 * Automatically discovers all major sections within the container, adds the 'fade-up-section' class,
 * and attaches a shared, high-performance IntersectionObserver that adds 'is-visible' automatically
 * as each section scrolls into view to create a cinematic scrollytelling experience.
 */
export function useScrollRevealContainer<T extends HTMLElement = HTMLElement>(
  options: UseScrollRevealContainerOptions = {}
) {
  const {
    selector = 'section, [data-scroll-reveal], .fade-up-section',
    threshold = 0.08,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    deps = [],
  } = options;

  const containerRef = useRef<T | null>(null);

  const initObserver = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced motion check
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sections = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (sections.length === 0) return;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      sections.forEach((sec) => {
        sec.classList.add('fade-up-section', 'is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    sections.forEach((sec, idx) => {
      // Ensure base animation class is applied
      if (!sec.classList.contains('fade-up-section')) {
        sec.classList.add('fade-up-section');
      }

      // Check if already in viewport (or the first section above the fold)
      const rect = sec.getBoundingClientRect();
      if (idx === 0 || (rect.top < window.innerHeight && rect.bottom > 0)) {
        sec.classList.add('is-visible');
      } else {
        observer.observe(sec);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [selector, threshold, rootMargin, triggerOnce]);

  useEffect(() => {
    // Slight frame delay to ensure React component DOM reconciliation has completed
    const frameId = requestAnimationFrame(() => {
      initObserver();
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initObserver, ...deps]);

  return {
    containerRef,
    refresh: initObserver,
  };
}

export { useIntersectionObserver, useFadeUpIntersectionObserver } from './useIntersectionObserver';
