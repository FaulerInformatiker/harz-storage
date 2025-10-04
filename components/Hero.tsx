'use client'

import Image from 'next/image'
import { useTranslation } from '../lib/TranslationContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-storage.jpg"
          alt="Modern storage facility"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-white/90 text-sm font-medium">
              🏔️ Familienunternehmen im Harz seit 2020
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary">
              {t('hero.cta')}
            </a>
            <a href="#pricing" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              {t('hero.prices')}
            </a>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-6 text-white/80 text-sm">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Für Privatpersonen
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Für kleine Unternehmen
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
