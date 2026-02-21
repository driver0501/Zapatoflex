// Componente GENÉRICO de banner para categorías - reutilizable en Deportivos, Casuales, Formales
import Image from 'next/image';

interface PropsBannerCategoria {
    titulo: string;
    subtitulo?: string;
    img: string;
    totalProductos?: number;
}

export default function BannerCategoria({ titulo, subtitulo, img, totalProductos }: PropsBannerCategoria) {
    return (
        <section className="relative w-full overflow-hidden bg-black" style={{ height: '55vh', maxHeight: '520px', minHeight: '340px' }}>

            {/* IMAGEN */}
            <Image
                src={img}
                alt={`Categoría ${titulo}`}
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

            {/* CONTENIDO */}
            <div className="absolute inset-0 flex items-end pb-12 px-8 md:px-16">
                <div className="space-y-3">
                    {subtitulo && (
                        <span className="block text-[10px] font-black tracking-[0.35em] text-white/60 uppercase">
                            {subtitulo}
                        </span>
                    )}
                    <h1 className="text-5xl md:text-6xl font-black leading-none text-white uppercase tracking-tight">
                        {titulo}
                    </h1>
                    {totalProductos !== undefined && (
                        <p className="text-xs text-white/50 tracking-widest uppercase">
                            {totalProductos} productos disponibles
                        </p>
                    )}
                </div>
            </div>

        </section>
    );
}
