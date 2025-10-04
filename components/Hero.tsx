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
        </div>
      </div>
    </section>
  )
}
