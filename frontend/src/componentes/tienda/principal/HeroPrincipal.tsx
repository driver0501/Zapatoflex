import Image from 'next/image';
import Link from 'next/link';

// Tennis.com.co usa heroes full-width con imagen grande y texto superpuesto mínimo
// Imagen de zapato premium de Unsplash
const HERO_IMG = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1920&q=85';

export default function HeroPrincipal() {
    return (
        <section className="relative w-full overflow-hidden bg-black" style={{ height: '90vh', maxHeight: '900px' }}>

            {/* IMAGEN FULL-BLEED */}
            <Image
                src={HERO_IMG}
                alt="Nueva Colección ZapatoFlex 2026"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* OVERLAY suave - izquierda más oscuro */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* CONTENIDO - lado izquierdo, tipografía bold en blanco */}
            <div className="absolute inset-0 flex items-end pb-20 px-8 md:px-16">
                <div className="space-y-5 max-w-lg">

                    <span className="block text-xs font-bold tracking-[0.3em] text-white/70 uppercase">
                        Colección 2026
                    </span>

                    <h1 className="text-5xl md:text-7xl font-black leading-none text-white uppercase tracking-tight">
                        Camina<br />sin<br />límites.
                    </h1>

                    <div className="flex items-center gap-4">
                        <Link href="/tienda/deportivos"
                            className="inline-block bg-white px-10 py-4 text-xs font-black tracking-widest text-black uppercase hover:bg-gray-100 transition-colors">
                            VER COLECCIÓN
                        </Link>
                        <Link href="/tienda/formales"
                            className="inline-block border border-white px-10 py-4 text-xs font-black tracking-widest text-white uppercase hover:bg-white/10 transition-colors">
                            FORMALES
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    );
}
