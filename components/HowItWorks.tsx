"use client";

import { Search, FileText, Key } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Search,
      title: t("howItWorks.steps.select.title"),
      description: t("howItWorks.steps.select.description"),
    },
    {
      icon: FileText,
      title: t("howItWorks.steps.contract.title"),
      description: t("howItWorks.steps.contract.description"),
    },
    {
      icon: Key,
      title: t("howItWorks.steps.access.title"),
      description: t("howItWorks.steps.access.description"),
    },
  ];

  return (
    <section id="ablauf" className="py-20 bg-slate-100 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
