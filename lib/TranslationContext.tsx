"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import de from "./translations/de.json";
import en from "./translations/en.json";

const translations = { de, en };

type Language = "de" | "en";

interface TranslationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined,
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("de");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "de" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line security/detect-object-injection
    let value: unknown = translations[language];

    for (const k of keys) {
      if (typeof value === "object" && value !== null) {
        // eslint-disable-next-line security/detect-object-injection
        value = (value as Record<string, unknown>)[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage: changeLanguage, t }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    // Return a fallback during SSR or when context is not available
    return {
      language: "de" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
}
