import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  /**
   * Optional CSS selector to observe child elements inside a container.
   * If provided, the returned containerRef/ref should be attached to the parent container,
   * and all matching child elements (e.g. 'section') will be observed.
   * If omitted, ref is attached to an individual target element.
   * @default 'section' when container mode is used
   */
  selector?: string;
  /**
   * The animation/trigger class to apply when an element intersects the viewport.
   * @default 'fade-up-section'
   */
  triggerClass?: string;
  /**
   * The active/visible class to apply when an element is in view.
   * @default 'is-visible'
   */
  activeClass?: string;
  /**
   * Intersection threshold (0.0 to 1.0)
   * @default 0.08
   */
  threshold?: number | number[];
  /**
   * Viewport root margin offset
   * @default '0px 0px -50px 0px'
   */
  rootMargin?: string;
  /**
   * Whether the reveal animation triggers only once
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Disable the observer completely
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional callback when an entry intersects
   */
  onIntersect?: (entry: IntersectionObserverEntry) => void;
  /**
   * Dependencies array to re-scan elements
   */
  deps?: unknown[];
}

export interface UseIntersectionObserverResult<T extends HTMLElement = HTMLElement> {
  /** Ref to attach to either the container (if selector is set) or target element */
  ref: RefObject<T | null>;
  /** Alias for ref when using container mode */
  containerRef: RefObject<T | null>;
  /** True if currently intersecting */
  isIntersecting: boolean;
  /** True once it has become visible */
  isVisible: boolean;
  /** True once triggered */
  hasTriggered: boolean;
  /** Combined CSS class for convenience */
  className: string;
  /** Force re-run observation query */
  refresh: () => void;
}

/**
 * useIntersectionObserver
 *
 * Custom Intersection Observer hook that triggers the 'fade-up-section' class automatically
 * as users scroll down the main landing page, enhancing the scrollytelling experience.
 *
 * Features:
 * - Dual mode: works on individual elements OR auto-observes child sections in a container
 * - Automatically applies 'fade-up-section' and 'is-visible' classes on viewport entry
 * - Unobserves elements once triggered for zero-overhead scrolling performance
 * - Pre-activates elements already above the fold on initial render
 * - Respects prefers-reduced-motion for full accessibility compliance
 * - Built-in safety fallback timeout preventing permanently hidden elements
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult<T> {
  const {
    selector,
    triggerClass = 'fade-up-section',
    activeClass = 'is-visible',
    threshold = 0.08,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    disabled = false,
    onIntersect,
    deps = [],
  } = options;

  const targetRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const initObserver = useCallback(() => {
    if (disabled) {
      setIsIntersecting(true);
      setIsVisible(true);
      setHasTriggered(true);
      return;
    }

    const currentEl = targetRef.current;
    if (!currentEl) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // CONTAINER MODE (selector provided)
    if (selector) {
      const targets = Array.from(currentEl.querySelectorAll<HTMLElement>(selector));
      if (targets.length === 0) return;

      if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
        targets.forEach((target) => {
          target.classList.add(triggerClass, activeClass);
        });
        setIsVisible(true);
        setHasTriggered(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(triggerClass);
              entry.target.classList.add(activeClass);
              if (onIntersect) onIntersect(entry);

              if (triggerOnce) {
                observer.unobserve(entry.target);
              }
            } else if (!triggerOnce) {
              entry.target.classList.remove(activeClass);
            }
          });
        },
        { threshold, rootMargin }
      );

      targets.forEach((target, index) => {
        // Ensure base trigger class is registered
        if (!target.classList.contains(triggerClass)) {
          target.classList.add(triggerClass);
        }

        // Elements already in the initial viewport or the first above-the-fold section reveal immediately
        const rect = target.getBoundingClientRect();
        if (index === 0 || (rect.top < window.innerHeight && rect.bottom > 0)) {
          target.classList.add(activeClass);
        } else {
          observer.observe(target);
        }
      });

      return () => {
        observer.disconnect();
      };
    }

    // SINGLE ELEMENT MODE
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      setIsVisible(true);
      setHasTriggered(true);
      currentEl.classList.add(triggerClass, activeClass);
      return;
    }

    // Pre-check if already visible
    const rect = currentEl.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsIntersecting(true);
      setIsVisible(true);
      setHasTriggered(true);
      currentEl.classList.add(triggerClass, activeClass);
      if (triggerOnce) return;
    }

    // Safety fallback timer to prevent permanently un-revealed content
    const safetyTimer = setTimeout(() => {
      setIsVisible(true);
      setHasTriggered(true);
      currentEl.classList.add(triggerClass, activeClass);
    }, 1200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          clearTimeout(safetyTimer);
          setIsIntersecting(true);
          setIsVisible(true);
          setHasTriggered(true);
          currentEl.classList.add(triggerClass, activeClass);
          if (onIntersect) onIntersect(entry);

          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
          setIsVisible(false);
          currentEl.classList.remove(activeClass);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentEl);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  }, [disabled, selector, triggerClass, activeClass, threshold, rootMargin, triggerOnce, onIntersect]);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      initObserver();
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initObserver, ...deps]);

  const className = `${triggerClass} ${isVisible ? activeClass : ''}`.trim();

  return {
    ref: targetRef,
    containerRef: targetRef,
    isIntersecting,
    isVisible,
    hasTriggered,
    className,
    refresh: initObserver,
  };
}

/**
 * Convenience alias for useIntersectionObserver specialized for scrollytelling fade-up sections
 */
export const useFadeUpIntersectionObserver = useIntersectionObserver;
