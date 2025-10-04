"use client";

import { Clock, Shield, Euro, Calendar } from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";

export default function Advantages() {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: Clock,
      title: t("advantages.access.title"),
      description: t("advantages.access.description"),
    },
    {
      icon: Shield,
      title: t("advantages.security.title"),
      description: t("advantages.security.description"),
    },
    {
      icon: Euro,
      title: t("advantages.pricing.title"),
      description: t("advantages.pricing.description"),
    },
    {
      icon: Calendar,
      title: t("advantages.flexibility.title"),
      description: t("advantages.flexibility.description"),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("advantages.title")}
          </h2>
          <p className="text-xl text-gray-600">{t("advantages.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
