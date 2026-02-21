import Image from 'next/image';

// Banner estilo Tennis: imagen full-width de lado a lado + texto encima
const BANNER_IMG = 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1600&q=80';

export default function BannerPromocional() {
    return (
        <section className="w-full mt-6">

            {/* BANNER FULL-WIDTH SIN PADDING */}
            <div className="relative w-full overflow-hidden bg-black" style={{ height: '500px' }}>
                <Image
                    src={BANNER_IMG}
                    alt="Sale ZapatoFlex - Hasta 40% de descuento"
                    fill
                    className="object-cover object-center opacity-60"
                    sizes="100vw"
                />

                {/* CONTENIDO CENTRADO */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-6">
                    <span className="text-xs font-black tracking-[0.4em] uppercase text-white/70">Tiempo limitado</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none">
                        SALE<br />
                        <span className="text-5xl md:text-7xl">HASTA 40%</span>
                    </h2>
                    <p className="text-sm tracking-widest text-white/70 uppercase">En selección de calzado deportivo</p>
                    <button className="border border-white px-12 py-4 text-xs font-black tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all">
                        VER OFERTAS
                    </button>
                </div>

            </div>

        </section>
    );
}
