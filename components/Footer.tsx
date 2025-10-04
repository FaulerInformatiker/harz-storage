import { MapPin, Clock, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">HarzStorage</h3>
            <p className="text-gray-300 mb-4">
              Ihr zuverlässiger Partner für sichere Lagerung in Langelsheim.
              Flexible Lösungen für private und gewerbliche Kunden.
            </p>
            <div className="flex items-center text-gray-300 mb-2">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Industriestraße 15, 38685 Langelsheim</span>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <Phone className="w-5 h-5 mr-2" />
              <span>+49 (0) 5326 123456</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Mail className="w-5 h-5 mr-2" />
              <span>info@harzstorage.de</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Öffnungszeiten</h4>
            <div className="text-gray-300 space-y-2">
              <div className="flex justify-between">
                <span>Mo - Fr:</span>
                <span>9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Samstag:</span>
                <span>9:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sonntag:</span>
                <span>Geschlossen</span>
              </div>
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center text-primary-400">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Boxzugang: 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Service</h4>
            <ul className="text-gray-300 space-y-2">
              <li>
                <a
                  href="#preise"
                  className="hover:text-primary-400 transition-colors"
                >
                  Preise
                </a>
              </li>
              <li>
                <a
                  href="#kontakt"
                  className="hover:text-primary-400 transition-colors"
                >
                  Kontakt
                </a>
              </li>
              <li>
                <a
                  href="/impressum"
                  className="hover:text-primary-400 transition-colors"
                >
                  Impressum
                </a>
              </li>
              <li>
                <a
                  href="/datenschutz"
                  className="hover:text-primary-400 transition-colors"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href="/agb"
                  className="hover:text-primary-400 transition-colors"
                >
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HarzStorage. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
