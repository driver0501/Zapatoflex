import Image from 'next/image';
import Link from 'next/link';

// Imágenes de Unsplash de zapatos reales (libres de derechos)
const CATS = [
    {
        nombre: 'DEPORTIVOS',
        sub: 'Para él y para ella',
        ruta: '/tienda/deportivos',
        img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    },
    {
        nombre: 'CASUALES',
        sub: 'Estilo urbano',
        ruta: '/tienda/casuales',
        img: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    },
    {
        nombre: 'FORMALES',
        sub: 'Elegancia clásica',
        ruta: '/tienda/formales',
        img: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=800&q=80',
    },
];

export default function CategoriasDestacadas() {
    return (
        <section className="bg-white py-12">
            <div className="mx-auto max-w-screen-xl px-6">

                {/* TÍTULO DE SECCIÓN - estilo Tennis */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-black">
                        CATEGORÍAS
                    </h2>
                    <Link href="/tienda/deportivos" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
                        VER TODO →
                    </Link>
                </div>

                {/* GRID 3 COLUMNAS - imagen cuadrada + texto debajo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CATS.map((cat) => (
                        <Link key={cat.ruta} href={cat.ruta} className="group block">

                            {/* IMAGEN CUADRADA */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
                                <Image
                                    src={cat.img}
                                    alt={cat.nombre}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>

                            {/* TEXTO DEBAJO DE LA IMAGEN - exactamente como Tennis */}
                            <div className="mt-3 space-y-0.5">
                                <p className="text-xs font-bold tracking-[0.2em] uppercase text-black">{cat.nombre}</p>
                                <p className="text-xs text-gray-500">{cat.sub}</p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
