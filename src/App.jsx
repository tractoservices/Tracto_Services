import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const supabase = createClient(
  'https://ebqfspgmnggizmgcznao.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVicWZzcGdtbmdnaXptZ2N6bmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjU1NDQsImV4cCI6MjA2NDEwMTU0NH0.WXAvcTUMtRJvUaFRcQVWuLo9mVxKEL65fg_DCDrf5X0'
);

export default function App() {
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      const { data } = await supabase.storage.from('backgrounds').download('background.jpg');
      if (data) {
        const url = URL.createObjectURL(data);
        setBackgroundUrl(url);
      }
    };
    loadImage();
  }, []);

  const handleLogin = () => {
    if (adminKey === 'luistractos2025') {
      setIsAdmin(true);
    } else {
      alert('Clave incorrecta');
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await supabase.storage.from('backgrounds').upload('background.jpg', file, {
      upsert: true,
    });
    const url = URL.createObjectURL(file);
    setBackgroundUrl(url);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="bg-black/70 w-full min-h-screen">
        {/* Barra de navegación superior */}
        <nav className="flex justify-end gap-4 px-6 py-4 bg-black bg-opacity-80 text-sm font-semibold uppercase tracking-wider sticky top-0 z-50 shadow-md backdrop-blur">
          {[
            { label: 'Inicio', id: 'inicio' },
            { label: 'Nosotros', id: 'nosotros' },
            { label: 'Servicio Técnico', id: 'servicio' },
            { label: 'Almacén', id: 'galeria' },
            { label: 'Contacto', id: 'contacto' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sección INICIO */}
        <section id="inicio" className="flex flex-col items-center justify-center h-screen text-center px-6 border-b border-white/20">
          <h1 className="text-6xl font-extrabold text-red-600 drop-shadow-xl">TRACTO SERVICES</h1>
          <p className="mt-6 text-2xl">Especialistas en Motores Diésel, Transmisiones y Diferenciales</p>
          <p className="mt-2 text-md italic text-gray-300">Diseño editable con fondo personalizado</p>

          {!isAdmin && (
            <div className="mt-6">
              <input
                type="password"
                placeholder="Clave de administrador"
                className="p-2 rounded text-black"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
              />
              <button className="ml-2 bg-red-600 px-4 py-2 rounded" onClick={handleLogin}>
                Entrar
              </button>
            </div>
          )}

          {isAdmin && (
            <div className="mt-6">
              <label className="block mb-2">Cambiar fondo:</label>
              <input type="file" accept="image/*" onChange={handleUpload} />
            </div>
          )}
        </section>

        {/* Sección NOSOTROS */}
        <section id="nosotros" className="py-20 px-6 bg-white text-black text-center border-b border-gray-300">
          <h2 className="text-4xl font-bold mb-4">Nosotros</h2>
          <p className="max-w-3xl mx-auto text-lg">En Tracto Services nos dedicamos a ofrecer soluciones profesionales en mecánica diésel pesada y liviana. Nuestro especialista Luis E. Cárdenas lidera un equipo con experiencia y compromiso.</p>
        </section>

        {/* Sección SERVICIOS */}
        <section id="servicio" className="py-20 px-6 bg-black text-white text-center border-b border-white/10">
          <h2 className="text-4xl font-bold mb-10 underline decoration-red-600 decoration-4 underline-offset-4">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Motores', desc: 'Reparación de motores Cummins, ISX, Caterpillar y más.' },
              { title: 'Transmisiones', desc: 'Diagnóstico y reparación profesional de transmisiones.' },
              { title: 'Diferenciales', desc: 'Mantenimiento de diferenciales pesados y livianos.' },
            ].map((s, i) => (
              <div key={i} className="bg-white text-black rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección GALERÍA */}
        <section id="galeria" className="py-20 px-6 bg-white text-black text-center border-b border-gray-300">
          <h2 className="text-4xl font-bold mb-10">Galería de Trabajos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={`https://via.placeholder.com/500x300?text=Trabajo+${i}`}
                  alt={`Trabajo ${i}`}
                  className="w-full h-auto transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Sección CONTACTO */}
        <section id="contacto" className="py-20 px-6 bg-black text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
          <div className="flex flex-col items-center gap-4 text-lg">
            <a href="tel:3112107708" className="flex items-center gap-2 hover:text-red-500"><Phone /> 3112107708</a>
            <a href="mailto:tractoservices@gmail.com" className="flex items-center gap-2 hover:text-red-500"><Mail /> tractoservices@gmail.com</a>
          </div>
        </section>

        {/* Redes sociales */}
        <section className="py-12 px-6 bg-white text-black text-center">
          <h2 className="text-2xl font-bold mb-4">Síguenos en redes sociales</h2>
          <div className="flex justify-center gap-8 text-3xl">
            <a href="https://instagram.com/tracto_services" target="_blank" rel="noreferrer" className="hover:text-pink-500"><Instagram /></a>
            <a href="https://facebook.com/tracto_services" target="_blank" rel="noreferrer" className="hover:text-blue-500"><Facebook /></a>
            <a href="https://tiktok.com/@tracto_services" target="_blank" rel="noreferrer" className="hover:text-gray-800"><SiTiktok /></a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-center text-sm text-gray-400 py-6 border-t border-white/10">
          &copy; {new Date().getFullYear()} Tracto Services. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

