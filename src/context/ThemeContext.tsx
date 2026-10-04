import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove('dark', 'dark-theme');
      root.classList.add('light', 'light-theme');
      root.setAttribute('data-theme', 'light');
      root.style.backgroundColor = '#ffffff';
      if (document.body) {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#0f172a';
      }
      localStorage.setItem('portfolio-theme', 'light');
    } catch {
      // Ignore error
    }
  }, []);

  const toggleTheme = () => {
    setThemeState('light');
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
