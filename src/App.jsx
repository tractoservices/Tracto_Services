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

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="bg-black/70 w-full min-h-screen">
        <section className="flex flex-col items-center justify-center h-screen text-center px-6">
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

        <section className="py-16 px-6 bg-white text-black text-center">
          <h2 className="text-4xl font-bold mb-10">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Motores',
                desc: 'Reparación de motores Cummins, ISX, Caterpillar y más.',
              },
              {
                title: 'Transmisiones',
                desc: 'Diagnóstico y reparación profesional de transmisiones.',
              },
              {
                title: 'Diferenciales',
                desc: 'Mantenimiento de diferenciales pesados y livianos.',
              },
            ].map((s, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 px-6 bg-black text-white text-center">
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

        <section className="py-16 px-6 bg-white text-black text-center">
          <h2 className="text-4xl font-bold mb-6">Ubicación</h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
            <iframe
              title="Ubicación Tracto Services"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.711102423231!2d-74.16754732524391!3d4.675238341292252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9e0623a1c855%3A0xc52b0845b0f11970!2sParqueadero%20el%20Play%C3%B3n!5e0!3m2!1ses!2sco!4v1717000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section className="py-16 px-6 bg-black text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Contáctanos</h2>
          <div className="flex flex-col items-center gap-4 text-lg">
            <a href="tel:3112107708" className="flex items-center gap-2 hover:text-red-500"><Phone /> 3112107708</a>
            <a href="mailto:tractoservices@gmail.com" className="flex items-center gap-2 hover:text-red-500"><Mail /> tractoservices@gmail.com</a>
          </div>
        </section>

        <section className="py-16 px-6 bg-white text-black text-center">
          <h2 className="text-4xl font-bold mb-6">Síguenos en redes sociales</h2>
          <div className="flex justify-center gap-8 text-3xl">
            <a href="https://instagram.com/tracto_services" target="_blank" rel="noreferrer" className="hover:text-pink-500"><Instagram /></a>
            <a href="https://facebook.com/tracto_services" target="_blank" rel="noreferrer" className="hover:text-blue-500"><Facebook /></a>
            <a href="https://tiktok.com/@tracto_services" target="_blank" rel="noreferrer" className="hover:text-gray-800"><SiTiktok /></a>
          </div>
        </section>

        <footer className="bg-black text-center text-sm text-gray-400 py-6">
          &copy; {new Date().getFullYear()} Tracto Services. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}

