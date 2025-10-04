'use client'

import Image from 'next/image'
import { useTranslation } from '../lib/TranslationContext'

export default function Pricing() {
  const { t } = useTranslation()

  const pricingPlans = [
    {
      size: '5m²',
      price: '25€',
      description: t('pricing.sizes.small.description'),
      features: t('pricing.sizes.small.features')
    },
    {
      size: '10m²',
      price: '45€',
      description: t('pricing.sizes.medium.description'),
      features: t('pricing.sizes.medium.features'),
      popular: true
    },
    {
      size: '20m²',
      price: '80€',
      description: t('pricing.sizes.large.description'),
      features: t('pricing.sizes.large.features')
    }
  ]

  return (
    <section id="preise" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('pricing.subtitle')}
          </p>
          <div className="relative w-full max-w-2xl mx-auto h-64 rounded-lg overflow-hidden mb-8">
            <Image
              src="/images/storage-units.jpg"
              alt="Storage units facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-lg p-8 relative ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {t('pricing.popular')}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-lg flex items-center justify-center">
                  {index === 0 && <span className="text-2xl">📦</span>}
                  {index === 1 && <span className="text-2xl">🏠</span>}
                  {index === 2 && <span className="text-2xl">🏢</span>}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.size}</h3>
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {plan.price}
                  <span className="text-lg text-gray-500">{t('pricing.month')}</span>
                </div>
                <p className="text-gray-600 mb-2">{plan.description}</p>
                <div className="text-xs text-gray-500 italic">
                  {index === 0 && "Perfekt für: Umzugskartons, Saisonware, Fahrrad"}
                  {index === 1 && "Perfekt für: 1-Zimmer-Wohnung, Büroausstattung"}
                  {index === 2 && "Perfekt für: Komplette Wohnung, Firmeninventar"}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {Array.isArray(plan.features) && plan.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-accent-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a href="#kontakt" className="w-full btn-primary block text-center">
                {t('pricing.request')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
