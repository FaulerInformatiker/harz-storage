import Image from 'next/image'
import { Camera, Lock, Shield } from 'lucide-react'

const securityFeatures = [
  {
    icon: Camera,
    title: 'Videoüberwachung',
    description: 'Hochauflösende Kameras überwachen das gesamte Gelände rund um die Uhr'
  },
  {
    icon: Lock,
    title: 'Elektronische Zugangskontrolle',
    description: 'Jeder Kunde erhält einen individuellen Zugangscode für maximale Sicherheit'
  },
  {
    icon: Shield,
    title: 'Versicherungsschutz',
    description: 'Optionale Versicherung für Ihre gelagerten Gegenstände verfügbar'
  }
]

export default function Security() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ihre Sicherheit ist unser Auftrag
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Modernste Sicherheitstechnik schützt Ihr Eigentum
          </p>
          <div className="relative w-full max-w-md mx-auto h-48 rounded-lg overflow-hidden">
            <Image
              src="/images/security-camera.jpg"
              alt="Security camera monitoring"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mb-4">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-300 mb-6">
            Zusätzlich empfehlen wir jedem Kunden, eine Hausratversicherung abzuschließen 
            oder zu prüfen, ob die bestehende Versicherung auch Gegenstände in Lagerboxen abdeckt.
          </p>
          <a href="#kontakt" className="btn-primary">
            Sicherheit anfragen
          </a>
        </div>
      </div>
    </section>
  )
}
