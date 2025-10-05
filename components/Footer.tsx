"use client";

import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">HarzStorage</h3>
            <p className="text-gray-300 mb-4">
              {t("footer.description")}
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Industriestraße 15, 38685 Langelsheim</span>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <Phone className="w-5 h-5 mr-2" />
              <span>+49 (0) 5326 123456</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@harzstorage.de</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.hours")}</h4>
            <div className="text-gray-300 space-y-2">
              <div className="flex justify-between">
                <span>{t("footer.schedule.weekdays")}</span>
                <span>{t("footer.schedule.weekdaysTime")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("footer.schedule.saturday")}</span>
                <span>{t("footer.schedule.saturdayTime")}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("footer.schedule.sunday")}</span>
                <span>{t("footer.schedule.closed")}</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center text-primary-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-semibold">{t("footer.access")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t("footer.service")}</h4>
            <ul className="text-gray-300 space-y-2">
              <li>
                <a
                  href="#preise"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t("footer.links.prices")}
                </a>
              </li>
              <li>
                <a
                  href="#kontakt"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t("footer.links.contact")}
                </a>
              </li>
              <li>
                <a
                  href="/impressum"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t("footer.links.imprint")}
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t("footer.links.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="/agb"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t("footer.links.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
