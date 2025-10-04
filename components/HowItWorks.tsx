'use client'

import Image from 'next/image'
import { Search, FileText, Key } from 'lucide-react'
import { useTranslation } from '../lib/TranslationContext'

export default function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      icon: Search,
      title: t('howItWorks.steps.select.title'),
      description: t('howItWorks.steps.select.description')
    },
    {
      icon: FileText,
      title: t('howItWorks.steps.contract.title'),
      description: t('howItWorks.steps.contract.description')
    },
    {
      icon: Key,
      title: t('howItWorks.steps.access.title'),
      description: t('howItWorks.steps.access.description')
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('howItWorks.subtitle')}
          </p>
          <div className="relative w-full max-w-lg mx-auto h-64 rounded-lg overflow-hidden">
            <Image
              src="/images/moving-boxes.jpg"
              alt="Moving boxes ready for storage"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-200 rotate-45"></div>
                </div>
              )}
              
              <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mb-4">
                <step.icon size={32} />
              </div>
              
              <div className="bg-white px-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
