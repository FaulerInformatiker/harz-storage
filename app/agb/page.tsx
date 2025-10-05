import Link from "next/link";

export default function AGB() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Allgemeine Geschäftsbedingungen
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
                § 1 Geltungsbereich
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen 
                HarzStorage (Inhaber: [Name], [Adresse], [PLZ] Langelsheim) und dem Kunden 
                über die Vermietung von Lagerboxen.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 2 Vertragsgegenstand
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Gegenstand des Vertrages ist die zeitweise Überlassung von Lagerräumen 
                (Lagerboxen) zur Einlagerung von Gegenständen des Kunden.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 3 Vertragsabschluss
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Der Vertrag kommt durch die Annahme des Angebots des Kunden durch HarzStorage zustande. 
                Die Überlassung der Lagerbox erfolgt nach Zahlung der ersten Miete und Kaution.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 4 Miete und Zahlungsbedingungen
              </h2>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                <li>Die Miete ist monatlich im Voraus zu zahlen</li>
                <li>Bei Zahlungsverzug können Mahngebühren erhoben werden</li>
                <li>Eine Kaution in Höhe einer Monatsmiete ist zu hinterlegen</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 5 Kündigung
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Der Vertrag kann von beiden Seiten mit einer Frist von einem Monat 
                zum Monatsende gekündigt werden.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 6 Nutzung der Lagerbox
              </h2>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
                <li>Die Lagerung gefährlicher, illegaler oder verderblicher Güter ist untersagt</li>
                <li>Der Kunde haftet für Schäden durch unsachgemäße Nutzung</li>
                <li>Der Zugang erfolgt über persönlichen Zugangscode</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 7 Haftung
              </h2>
              <p className="text-gray-700 leading-relaxed">
                HarzStorage haftet nur für Vorsatz und grobe Fahrlässigkeit. 
                Eine Versicherung der eingelagerten Gegenstände wird empfohlen.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 8 Datenschutz
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{" "}
                <Link href="/datenschutz" className="text-blue-600 hover:text-blue-800 underline">
                  Datenschutzerklärung
                </Link>.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                § 9 Schlussbestimmungen
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Es gilt deutsches Recht. Gerichtsstand ist Goslar. 
                Sollten einzelne Bestimmungen unwirksam sein, bleibt die 
                Wirksamkeit des übrigen Vertrages unberührt.
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
                  Dies ist ein Basis-Template. Lassen Sie die AGB von einem Rechtsanwalt prüfen 
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
