import { useEffect } from 'react';
import { PageId, BookItem } from '../types';
import { applyDynamicSEO } from '../lib/seo';

/**
 * Custom React hook to dynamically sync document title, meta tags,
 * canonical link, and JSON-LD structured data with current page view.
 */
export function useDynamicSEO(
  currentPage: PageId, 
  isAdminView: boolean, 
  selectedBook?: BookItem | null
) {
  useEffect(() => {
    const activeRoute = isAdminView ? 'admin' : currentPage;
    applyDynamicSEO(activeRoute, selectedBook);
  }, [currentPage, isAdminView, selectedBook]);
}
