"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { submitContactForm, type ContactFormData } from "../lib/api";
import { validateContactForm, sanitizeInput } from "../lib/validation";
import { useTranslation } from "@/lib/TranslationContext";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    size: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);
    setSuccess(false);

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      size: sanitizeInput(formData.size),
      message: sanitizeInput(formData.message),
    };

    try {
      await submitContactForm(sanitizedData as ContactFormData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", size: "", message: "" });
    } catch (error) {
      setErrors([
        t("contact.form.error") ||
          "Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.",
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-20 left-10 w-64 h-64 border border-white/20 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-48 h-48 border border-white/20 rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("contact.title").toUpperCase()}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8">
              {t("contact.info")}
            </h3>

            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">
                    {t("contact.address")}
                  </h4>
                  <p className="text-gray-300">
                    HarzStorage
                    <br />
                    Musterstraße 123
                    <br />
                    38685 Langelsheim
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">
                    {t("contact.phone")}
                  </h4>
                  <p className="text-gray-300">+49 (0) 5326 123456</p>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">
                    {t("contact.email")}
                  </h4>
                  <p className="text-gray-300">info@harzstorage.de</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/20">
              <h4 className="font-semibold text-white mb-4 text-lg">
                {t("contact.hours")}
              </h4>
              <div className="text-gray-300 space-y-2">
                <p className="flex justify-between">
                  <span>{t("contact.schedule.weekdays")}</span>
                  <span className="font-medium">
                    {t("contact.schedule.weekdaysTime")}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>{t("contact.schedule.saturday")}</span>
                  <span className="font-medium">
                    {t("contact.schedule.saturdayTime")}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>{t("contact.schedule.sunday")}</span>
                  <span className="font-medium text-red-400">
                    {t("contact.schedule.closed")}
                  </span>
                </p>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <p className="text-orange-400 font-semibold">
                    🔑 {t("contact.access")}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">{t("contact.address")}</h4>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <a
                  href="https://www.google.com/maps/search/Langelsheim,+Deutschland"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative group"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 group-hover:border-primary-400 transition-colors">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                        <svg
                          className="w-8 h-8 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">
                        Langelsheim, Deutschland
                      </h5>
                      <p className="text-gray-600 mb-3">
                        {t("contact.mapDescription")}
                      </p>
                      <span className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors">
                        {t("contact.openMaps")}
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                📍 {t("contact.locationNote")}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              method="POST"
              className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20"
            >
              {success && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-2xl backdrop-blur-sm">
                  <p className="text-green-300 text-sm font-medium">
                    ✅ {t("contact.form.success")}
                  </p>
                </div>
              )}

              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
                  <ul className="text-red-300 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder={t("contact.form.placeholderName")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder={t("contact.form.placeholderEmail")}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("contact.form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder={t("contact.form.placeholderPhone")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="boxSize"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    {t("contact.form.boxSize")}
                  </label>
                  <select
                    id="boxSize"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white backdrop-blur-sm"
                  >
                    <option value="" className="text-gray-900">
                      {t("contact.form.select")}
                    </option>
                    <option value="5m²" className="text-gray-900">
                      📦 5m² - 25€/Monat
                    </option>
                    <option value="10m²" className="text-gray-900">
                      🏠 10m² - 45€/Monat
                    </option>
                    <option value="20m²" className="text-gray-900">
                      🏢 20m² - 80€/Monat
                    </option>
                    <option value="andere" className="text-gray-900">
                      {t("contact.form.other")}
                    </option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.placeholder")}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl"
              >
                {isSubmitting
                  ? `📤 ${t("contact.form.sending")}`
                  : `🚀 ${t("contact.form.submit")}`}
              </button>

              <p className="text-sm text-gray-400 mt-4 text-center">
                {t("contact.form.required")}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
