// SECCIÓN 1 - BANNER: Cabecera de la categoría Formales
export default function BannerFormales() {
    return (
        <section className="relative flex h-64 items-center overflow-hidden bg-amber-900">
            <div className="absolute inset-0 bg-[url('/formales-banner.webp')] bg-cover bg-center opacity-20" />
            <div className="relative mx-auto max-w-7xl px-6">
                <span className="block text-sm font-bold uppercase tracking-widest text-amber-300">Línea</span>
                <h1 className="mt-1 text-5xl font-black text-white">Formales</h1>
                <p className="mt-2 text-amber-200">Elegancia y clase para las grandes ocasiones.</p>
            </div>
        </section>
    );
}
