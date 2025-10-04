'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import { submitContactForm, type ContactFormData } from '../lib/api'
import { validateContactForm, sanitizeInput } from '../lib/validation'
import { useTranslation } from '../lib/TranslationContext'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    size: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors([])
    setSuccess(false)
    
    // Validate form data
    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    // Sanitize input data
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      size: sanitizeInput(formData.size),
      message: sanitizeInput(formData.message)
    }
    
    try {
      await submitContactForm(sanitizedData as ContactFormData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', size: '', message: '' })
    } catch (error) {
      setErrors([t('contact.form.error') || 'Fehler beim Senden der Anfrage. Bitte versuchen Sie es erneut.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {t('contact.info')}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">{t('contact.address')}</h4>
                  <p className="text-gray-600">
                    HarzStorage<br />
                    Musterstraße 123<br />
                    38685 Langelsheim
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">{t('contact.phone')}</h4>
                  <p className="text-gray-600">+49 (0) 5326 123456</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">{t('contact.email')}</h4>
                  <p className="text-gray-600">info@harzstorage.de</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-white rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{t('contact.hours')}</h4>
              <div className="text-gray-600 space-y-1">
                <p>{t('contact.schedule.weekdays')} {t('contact.schedule.weekdaysTime')}</p>
                <p>{t('contact.schedule.saturday')} {t('contact.schedule.saturdayTime')}</p>
                <p>{t('contact.schedule.sunday')} {t('contact.schedule.closed')}</p>
                <p className="text-primary-600 font-semibold mt-2">
                  {t('contact.access')}
                </p>
              </div>
            </div>

            {/* Location Map */}
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Standort</h4>
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
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-2">Langelsheim, Deutschland</h5>
                      <p className="text-gray-600 mb-3">Klicken Sie hier, um die Route zu planen</p>
                      <span className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg group-hover:bg-primary-700 transition-colors">
                        In Google Maps öffnen
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                📍 Direkt im Herzen des Harzes - leicht erreichbar über die B82
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} method="POST" className="bg-white p-8 rounded-lg shadow-lg">
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-600 text-sm">
                    Vielen Dank für Ihre Anfrage! Wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                </div>
              )}
              
              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <ul className="text-red-600 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="boxSize" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.boxSize')}
                  </label>
                  <select
                    id="boxSize"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">{t('contact.form.select')}</option>
                    <option value="5m²">5m² - 25€/Monat</option>
                    <option value="10m²">10m² - 45€/Monat</option>
                    <option value="20m²">20m² - 80€/Monat</option>
                    <option value="andere">{t('contact.form.other')}</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.form.placeholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Wird gesendet...' : t('contact.form.submit')}
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                {t('contact.form.required')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
