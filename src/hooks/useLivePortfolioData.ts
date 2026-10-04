import { useState, useEffect } from 'react';
import { Credential, BookItem } from '../types';
import { Megaproject, SIGNATURE_WORKS } from '../data/projectsData';
import { CREDENTIALS } from '../data/profileData';
import { BOOKS_AND_PUBLICATIONS } from '../data/booksData';
import { 
  subscribeToCredentials, 
  subscribeToBooks, 
  subscribeToProjects 
} from '../lib/portfolioService';

export function useLivePortfolioData() {
  const [credentials, setCredentials] = useState<Credential[]>(CREDENTIALS);
  const [books, setBooks] = useState<BookItem[]>(BOOKS_AND_PUBLICATIONS);
  const [projects, setProjects] = useState<Megaproject[]>(SIGNATURE_WORKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Listen for credentials live updates
    const unsubCreds = subscribeToCredentials((liveCreds) => {
      if (liveCreds && liveCreds.length > 0) {
        setCredentials(liveCreds);
      }
      setLoading(false);
    });

    // 2. Listen for books live updates
    const unsubBooks = subscribeToBooks((liveBooks) => {
      if (liveBooks && liveBooks.length > 0) {
        setBooks(liveBooks);
      }
    });

    // 3. Listen for projects live updates
    const unsubProjects = subscribeToProjects((liveProjects) => {
      if (liveProjects && liveProjects.length > 0) {
        setProjects(liveProjects);
      }
    });

    return () => {
      unsubCreds();
      unsubBooks();
      unsubProjects();
    };
  }, []);

  return {
    credentials,
    books,
    projects,
    loading
  };
}
