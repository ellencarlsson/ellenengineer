/**
 * @file Language context for managing Swedish/English translations.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import sv from '../translations/sv';
import en from '../translations/en';

const translations = { sv, en };

const LanguageContext = createContext();

/** Provides language state and translation function to the app. */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'sv';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  /**
   * Returns the translated string for a given key.
   * @param {string} key - Dot-notation key like "nav.projects"
   * @returns {string} The translated string or the key if not found
   */
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Hook to access language context. */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
