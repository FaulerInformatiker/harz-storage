'use client'

import { useTranslation } from '../lib/TranslationContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary">
              {t('hero.cta')}
            </a>
            <a href="#pricing" className="btn-secondary">
              {t('hero.prices')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
