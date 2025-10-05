import Link from "next/link";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Impressum
          </h1>
          <p className="text-xl text-blue-100">
            HarzStorage - Self-Storage in Langelsheim
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  <strong>HarzStorage</strong><br/>
                  [Name des Inhabers]<br/>
                  Musterstraße 123<br/>
                  38685 Langelsheim
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Kontakt
              </h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-2">
                  <strong>Telefon:</strong> +49 (0) 5326 123456
                </p>
                <p className="mb-4">
                  <strong>E-Mail:</strong>{" "}
                  <a href="mailto:info@harzstorage.de" className="text-blue-600 hover:text-blue-800 underline">
                    info@harzstorage.de
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Umsatzsteuer-ID
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br/>
                [USt-IdNr. eintragen]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Wirtschafts-ID
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Wirtschafts-Identifikationsnummer gemäß § 139c Abgabenordnung:<br/>
                [Wirtschafts-ID eintragen]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Aufsichtsbehörde
              </h2>
              <p className="text-gray-700 leading-relaxed">
                [Zuständige Aufsichtsbehörde eintragen, falls erforderlich]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <div className="text-gray-700 leading-relaxed">
                <p>
                  [Name des Inhabers]<br/>
                  Musterstraße 123<br/>
                  38685 Langelsheim
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                EU-Streitschlichtung
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br/>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Haftung für Inhalte
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte 
                fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine 
                rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Haftung für Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
                der Seiten verantwortlich.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                Urheberrecht
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>
          </div>

          {/* Warning Notice */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 border-l-4 border-blue-400 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">ℹ️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Hinweis
                </h3>
                <p className="text-sm text-blue-700">
                  Bitte ergänzen Sie die Platzhalter mit Ihren tatsächlichen Geschäftsdaten. 
                  Bei Fragen zur rechtlichen Vollständigkeit konsultieren Sie einen Rechtsanwalt.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
