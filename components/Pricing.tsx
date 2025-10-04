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
    <section id="preise" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            LAGER<span className="text-orange-500">PREISE</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('pricing.subtitle')}
          </p>
          <div className="relative w-full max-w-2xl mx-auto h-64 rounded-3xl overflow-hidden mb-8 shadow-2xl transform hover:scale-105 transition-transform">
            <Image
              src="/images/storage-units.jpg"
              alt="Storage units facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-sm font-medium">Unsere Lagerräume</div>
              <div className="text-xs opacity-80">Sauber • Sicher • Zugänglich</div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative group ${
                plan.popular 
                  ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white scale-110 shadow-2xl' 
                  : 'bg-white text-gray-900 shadow-xl hover:shadow-2xl'
              } rounded-3xl p-8 transition-all transform hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    ⭐ {t('pricing.popular')}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 ${plan.popular ? 'bg-white/20' : 'bg-orange-100'} rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform`}>
                  {index === 0 && <span className="text-4xl">📦</span>}
                  {index === 1 && <span className="text-4xl">🏠</span>}
                  {index === 2 && <span className="text-4xl">🏢</span>}
                </div>
                <h3 className="text-3xl font-black mb-2">{plan.size}</h3>
                <div className={`text-5xl font-black mb-2 ${plan.popular ? 'text-yellow-300' : 'text-orange-500'}`}>
                  {plan.price}
                  <span className={`text-lg font-normal ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>{t('pricing.month')}</span>
                </div>
                <p className={`${plan.popular ? 'text-white/90' : 'text-gray-600'} mb-2`}>{plan.description}</p>
                <div className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'} italic font-medium`}>
                  {index === 0 && "Perfekt für: Umzugskartons, Saisonware, Fahrrad"}
                  {index === 1 && "Perfekt für: 1-Zimmer-Wohnung, Büroausstattung"}
                  {index === 2 && "Perfekt für: Komplette Wohnung, Firmeninventar"}
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {Array.isArray(plan.features) && plan.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className={`flex items-center ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                    <span className={`w-5 h-5 ${plan.popular ? 'text-yellow-300' : 'text-orange-500'} mr-3 font-bold`}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <a href="#kontakt" className={`w-full block text-center py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                plan.popular 
                  ? 'bg-white text-orange-500 hover:bg-gray-100 shadow-lg' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
              }`}>
                {t('pricing.request')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
