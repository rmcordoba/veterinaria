import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-warmth-100 via-warmth-50 to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-warmth-100 shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐾</span>
            <span className="font-bold text-warmth-700 hidden sm:block">
              Veterinaria Tucumán
            </span>
          </div>
          <nav className="flex gap-2 md:gap-4">
            <Link
              href="/auth/login"
              className="btn-secondary text-sm md:text-base"
            >
              Iniciar sesión
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-8 md:py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl leading-tight">
              Cuidamos de tus mascotas con <span className="text-warmth-600">confianza</span>
            </h1>
            <p className="text-lg text-warmth-700">
              Reserva turnos online, gestiona fichas clínicas y recibe recordatorios de vacunas. Todo en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pedir-turno" className="btn-primary text-center">
                Pedir turno →
              </Link>
              <Link
                href="/auth/login"
                className="btn-secondary text-center"
              >
                Ver mis turnos
              </Link>
            </div>
          </div>

          {/* Illustration area */}
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-nature-100 to-warmth-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl md:text-8xl mb-4">🏥</div>
              <p className="text-warmth-600 font-medium">
                Salud animal a tu alcance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-12 md:py-16 bg-white border-t border-warmth-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12">¿Por qué elegirnos?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📅",
                title: "Turnos online",
                desc: "Reserva de forma rápida y segura sin hacer llamadas",
              },
              {
                icon: "📋",
                title: "Fichas clínicas",
                desc: "Historial médico de tus mascotas siempre disponible",
              },
              {
                icon: "🔔",
                title: "Recordatorios",
                desc: "Notificaciones de vacunas y seguimientos médicos",
              },
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-warmth-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-warmth-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto card bg-gradient-to-r from-warmth-600 to-warmth-500 text-white text-center">
          <h2 className="text-white mb-4">¿Listo para agendar?</h2>
          <p className="mb-6 text-warmth-50">
            Selecciona a tu veterinario favorito y elige el día que mejor te venga
          </p>
          <Link href="/pedir-turno" className="bg-white text-warmth-600 hover:bg-warmth-50 font-medium py-3 px-6 rounded-lg inline-block transition-colors">
            Ir a pedir turno
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-warmth-100 px-4 py-8 bg-warmth-50">
        <div className="max-w-6xl mx-auto text-center text-warmth-600 text-sm">
          <p>Veterinaria Tucumán © 2026 - Cuidando mascotas con amor</p>
        </div>
      </footer>
    </main>
  );
}
