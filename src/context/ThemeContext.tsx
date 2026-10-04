import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('dark');

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.add('dark', 'dark-theme');
      root.classList.remove('light', 'light-theme');
      root.setAttribute('data-theme', 'dark');
      root.style.backgroundColor = '#0a0a0c';
      if (document.body) {
        document.body.style.backgroundColor = '#0a0a0c';
      }
      localStorage.setItem('portfolio-theme', 'dark');
    } catch {
      // Ignore error
    }
  }, []);

  const toggleTheme = () => {
    setThemeState('dark');
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
