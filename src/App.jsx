import React from 'react';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-red-600">TRACTO SERVICES</h1>
        <p className="mt-4 text-xl">Especialistas en Motores Diésel, Transmisiones y Diferenciales</p>
        <p className="mt-2 italic text-gray-400">Diseño actualizado - Bienvenido a nuestro sitio web oficial</p>
      </header>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-6">Nuestros Servicios</h2>
        <ul className="space-y-4 text-lg">
          <li>🔧 Reparación de motores Cummins, ISX, Caterpillar</li>
          <li>🛠️ Diagnóstico y mantenimiento diésel liviano y pesado</li>
          <li>⚙️ Reparación de cajas, transmisiones y diferenciales</li>
        </ul>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Galería de Trabajos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img
                src={`https://via.placeholder.com/400x250?text=Foto+${i}`}
                alt={`Trabajo ${i}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
        <iframe
          title="Ubicación Tracto Services"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.711102423231!2d-74.16754732524391!3d4.675238341292252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e0623a1c855%3A0xc52b0845b0f11970!2sParqueadero%20el%20Play%C3%B3n!5e0!3m2!1ses!2sco!4v1717000000000"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <div className="flex flex-col items-center gap-2 text-lg">
          <a href="tel:3112107708" className="flex items-center gap-2"><Phone /> 3112107708</a>
          <a href="mailto:tractoservices@gmail.com" className="flex items-center gap-2"><Mail /> tractoservices@gmail.com</a>
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Síguenos en redes sociales</h2>
        <div className="flex justify-center gap-6 text-2xl">
          <a href="https://instagram.com/tracto_services" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
          <a href="https://facebook.com/tracto_services" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
          <a href="https://tiktok.com/@tracto_services" target="_blank" rel="noreferrer" aria-label="TikTok"><SiTiktok /></a>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Tracto Services. Todos los derechos reservados.
      </footer>
    </div>
  );
}
