"use client";

import { useTranslation } from "@/lib/TranslationContext";
import { Check, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getBoxes, Box } from "@/lib/api";

export default function Pricing() {
  const { t, language } = useTranslation();
  const [boxSizes, setBoxSizes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const loadBoxSizes = async () => {
      try {
        const data = await getBoxes();
        setBoxSizes(data);
      } catch (error) {
        console.error('Failed to load box sizes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBoxSizes();
  }, []);

  if (loading) {
    return (
      <section id="preise" className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">{t("pricing.loading")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="preise" className="py-20 bg-white dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {boxSizes.map((box) => (
            <div
              key={box.id}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                box.popular
                  ? "bg-emerald-700 text-white border-emerald-600 scale-105 shadow-2xl"
                  : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-lg hover:shadow-xl"
              } ${!box.available ? "opacity-75" : ""}`}
            >
              {box.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {t("pricing.popular")}
                  </span>
                </div>
              )}

              {!box.available && (
                <div className="absolute -top-4 right-4">
                  <span className="bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {t("pricing.soldOut")}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{box.icon}</div>
                <div className="text-4xl font-bold mb-2">{box.size}</div>
                <div className={`text-3xl font-bold mb-4 ${box.popular ? "text-white" : "text-emerald-700"}`}>
                  {box.price}{box.currency}
                  <span className={`text-lg font-normal ${box.popular ? "text-emerald-50" : "text-slate-500 dark:text-slate-400"}`}>
                    {t("pricing.month")}
                  </span>
                </div>
                <p className={`text-sm mb-4 ${box.popular ? "text-emerald-50" : "text-slate-600 dark:text-slate-400"}`}>
                  {box.description}
                </p>
                
                {/* Availability indicator */}
                <div className={`text-xs ${box.popular ? "text-emerald-50" : "text-slate-500 dark:text-slate-400"}`}>
                  {box.available ? (
                    <span className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {t("pricing.available")}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      {t("pricing.soldOut")}
                    </span>
                  )}
                </div>
              </div>

              <a
                href="#kontakt"
                className={`block w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                  !box.available
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : box.popular
                    ? "bg-white text-emerald-700 hover:bg-gray-100"
                    : "bg-emerald-700 text-white hover:bg-emerald-800"
                }`}
                onClick={!box.available ? (e) => e.preventDefault() : undefined}
              >
                {!box.available ? t("pricing.soldOut") : t("pricing.request")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
