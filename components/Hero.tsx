'use client'

import Image from 'next/image'
import { useTranslation } from '../lib/TranslationContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-2 border-white/20 rounded-full animate-pulse delay-2000"></div>
      </div>
      
      {/* Main Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-storage.jpg"
          alt="Modern storage facility"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Distinctive Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-6 py-3 mb-8 shadow-lg transform hover:scale-105 transition-transform">
            <span className="text-white font-bold text-sm tracking-wide">
              🏔️ HARZ • LOKAL • SICHER
            </span>
          </div>
          
          {/* Large Typography */}
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            <span className="block">LAGER</span>
            <span className="block text-orange-400 text-6xl md:text-8xl">RAUM</span>
            <span className="block text-2xl md:text-3xl font-normal text-gray-300">in Langelsheim</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
            {t('hero.subtitle')}
          </p>
          
          {/* Distinctive Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#contact" className="group relative bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            <a href="#pricing" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105">
              {t('hero.prices')}
            </a>
          </div>
          
          {/* Unique Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 text-white/90">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">200+</div>
              <div className="text-sm">Kunden</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-sm">Zugang</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">5★</div>
              <div className="text-sm">Bewertung</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
