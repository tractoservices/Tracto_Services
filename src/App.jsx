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
      className="min-h-screen bg-cover bg-center text-white p-4 md:p-6 lg:p-10"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="backdrop-blur-sm bg-black/70 rounded-xl p-6">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-red-600 drop-shadow-lg">TRACTO SERVICES</h1>
          <p className="mt-4 text-xl">Especialistas en Motores Diésel, Transmisiones y Diferenciales</p>
          <p className="mt-2 italic text-gray-400">Diseño editable con fondo personalizado</p>

          {!isAdmin && (
            <div className="mt-4">
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
            <div className="mt-4">
              <label className="block mb-2">Cambiar fondo:</label>
              <input type="file" accept="image/*" onChange={handleUpload} />
            </div>
          )}
        </header>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Nuestros Servicios</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {["Motores", "Transmisiones", "Diferenciales"].map((serv, i) => (
              <div key={i} className="bg-white text-black rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{serv}</h3>
                <p className="text-sm">
                  {serv === "Motores" && "Reparación de motores Cummins, ISX, Caterpillar y más."}
                  {serv === "Transmisiones" && "Diagnóstico y reparación profesional de transmisiones."}
                  {serv === "Diferenciales" && "Mantenimiento de diferenciales pesados y livianos."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Galería de Trabajos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={`https://via.placeholder.com/400x250?text=Trabajo+${i}`}
                  alt={`Trabajo ${i}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Ubicación</h2>
          <div className="rounded-xl overflow-hidden shadow-lg">
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
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
          <div className="flex flex-col items-center gap-4 text-lg">
            <a href="tel:3112107708" className="flex items-center gap-2 hover:text-red-500"><Phone /> 3112107708</a>
            <a href="mailto:tractoservices@gmail.com" className="flex items-center gap-2 hover:text-red-500"><Mail /> tractoservices@gmail.com</a>
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Síguenos en redes sociales</h2>
          <div className="flex justify-center gap-6 text-3xl">
            <a href="https://instagram.com/tracto_services" target="_blank" rel="noreferrer" className="hover:text-pink-500"><Instagram /></a>
            <a href="https://facebook.com/tracto_services" target="_blank" rel="noreferrer" className="hover:text-blue-500"><Facebook /></a>
            <a href="https://tiktok.com/@tracto_services" target="_blank" rel="noreferrer" className="hover:text-white"><SiTiktok /></a>
          </div>
        </section>

        <footer className="text-center text-sm text-gray-400 pt-6">
          &copy; {new Date().getFullYear()} Tracto Services. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}


