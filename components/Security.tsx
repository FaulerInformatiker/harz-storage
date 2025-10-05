"use client";

import Image from "next/image";
import { Camera, Lock } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function Security() {
  const { t } = useTranslation();

  const securityFeatures = [
    {
      icon: Camera,
      titleKey: "security.video.title",
      descriptionKey: "security.video.description",
    },
    {
      icon: Lock,
      titleKey: "security.access.title", 
      descriptionKey: "security.access.description",
    },
  ];

  return (
    <section id="sicherheit" className="py-20 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("security.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("security.subtitle")}
          </p>
          <div className="relative w-full max-w-md mx-auto h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/security-camera.jpg"
              alt="Security camera monitoring"
              fill
              className="object-cover pointer-events-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 text-white rounded-full mb-4">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-gray-300">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            {t("security.note")}
          </p>
          <a href="#kontakt" className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
            {t("security.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
