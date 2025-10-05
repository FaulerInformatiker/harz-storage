"use client";

import { useTranslation } from "@/lib/TranslationContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Subtle accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent dark:from-emerald-500/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Controls */}
        <div className="absolute top-6 right-6 flex gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-slate-900 dark:text-white">
              <span className="text-emerald-600">Harz</span>Storage
            </h1>
            <p className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 italic">
              {t("hero.personal")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#kontakt"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg"
              >
                {t("hero.cta")}
              </a>
              <a
                href="#preise"
                className="border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
              >
                {t("hero.prices")}
              </a>
            </div>

          </div>

          {/* Right Content - Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">🔑</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{t("hero.benefit1.title")}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t("hero.benefit1.desc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{t("hero.benefit2.title")}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t("hero.benefit2.desc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{t("hero.benefit3.title")}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{t("hero.benefit3.desc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-4">📍</div>
              <h3 className="font-semibold mb-2">{t("business.newInTown")}</h3>
              <p className="text-emerald-100 text-sm">{t("business.localPartner")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
