import Link from "next/link";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Datenschutzerklärung
          </h1>
          <p className="text-xl text-blue-100">
            HarzStorage - Self-Storage in Langelsheim
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <p className="text-sm text-gray-500 mb-8">
            Stand: {new Date().toLocaleDateString('de-DE')}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                1. Verantwortlicher
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Verantwortlicher für die Datenverarbeitung auf dieser Website ist:<br/>
                <strong>HarzStorage</strong><br/>
                [Name des Inhabers]<br/>
                [Straße und Hausnummer]<br/>
                [PLZ] Langelsheim<br/>
                E-Mail: [E-Mail-Adresse]<br/>
                Telefon: [Telefonnummer]
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                2. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Wir erheben und verwenden Ihre personenbezogenen Daten nur, soweit dies gesetzlich erlaubt ist oder Sie in die Datenerhebung einwilligen.
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Beim Besuch der Website:</h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2 mb-4">
                <li>IP-Adresse</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Browser-Typ und Version</li>
                <li>Betriebssystem</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Bei Kontaktaufnahme:</h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                <li>Name</li>
                <li>E-Mail-Adresse</li>
                <li>Telefonnummer</li>
                <li>Nachrichteninhalt</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                3. Zweck der Datenverarbeitung
              </h2>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                <li>Bereitstellung der Website</li>
                <li>Bearbeitung von Anfragen</li>
                <li>Vertragsabwicklung</li>
                <li>Sicherstellung der IT-Sicherheit</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                4. Rechtsgrundlage
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung), 
                Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigte Interessen).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                5. Speicherdauer
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ihre Daten werden nur so lange gespeichert, wie dies für die Erfüllung der Zwecke erforderlich ist 
                oder gesetzliche Aufbewahrungsfristen bestehen.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                6. Ihre Rechte
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">Sie haben folgende Rechte:</p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                7. Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Diese Website verwendet nur technisch notwendige Cookies für die Sprachauswahl. 
                Diese Cookies werden lokal in Ihrem Browser gespeichert und enthalten keine personenbezogenen Daten.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                8. Kontaktformular
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Bei Nutzung des Kontaktformulars werden Ihre Angaben zur Bearbeitung der Anfrage 
                und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                9. Beschwerderecht
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Sie haben das Recht, sich bei einer Aufsichtsbehörde über die Verarbeitung 
                Ihrer personenbezogenen Daten zu beschweren.
              </p>
            </section>
          </div>

          {/* Warning Notice */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Rechtlicher Hinweis
                </h3>
                <p className="text-sm text-orange-700">
                  Dies ist ein Basis-Template. Lassen Sie die Datenschutzerklärung von einem Rechtsanwalt prüfen 
                  oder nutzen Sie professionelle Services wie <strong>eRecht24</strong> oder{" "}
                  <strong>IT-Recht Kanzlei</strong> für rechtssichere Texte.
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
