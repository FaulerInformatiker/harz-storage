'use client'

import { Globe } from 'lucide-react'
import { useTranslation } from '../lib/TranslationContext'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const languages = ['de', 'en'] as const

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex space-x-1">
        {languages.map((lng) => (
          <button
            key={lng}
            onClick={() => setLanguage(lng)}
            className={`px-2 py-1 text-sm rounded transition-colors ${
              language === lng
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
