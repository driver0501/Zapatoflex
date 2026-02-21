// SECCIÓN 1 - BANNER: Cabecera de la categoría Deportivos
export default function BannerDeportivos() {
    return (
        <section className="relative flex h-64 items-center overflow-hidden bg-blue-700">
            <div className="absolute inset-0 bg-[url('/deportivos-banner.webp')] bg-cover bg-center opacity-20" />
            <div className="relative mx-auto max-w-7xl px-6">
                <span className="block text-sm font-bold uppercase tracking-widest text-blue-200">Línea</span>
                <h1 className="mt-1 text-5xl font-black text-white">Deportivos</h1>
                <p className="mt-2 text-blue-200">Ingenería de alto rendimiento para tus pies.</p>
            </div>
        </section>
    );
}
