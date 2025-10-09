"use client";

import { Globe } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const languages = ["de", "en"] as const;

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      <div className="flex space-x-1">
        {languages.map((lng) => (
          <button
            key={lng}
            onClick={() => setLanguage(lng)}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              language === lng
                ? "bg-blue-600 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
