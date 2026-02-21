// SECCIÓN 1 - BANNER: Cabecera de la categoría Casuales
export default function BannerCasuales() {
    return (
        <section className="relative flex h-64 items-center overflow-hidden bg-slate-700">
            <div className="absolute inset-0 bg-[url('/casuales-banner.webp')] bg-cover bg-center opacity-20" />
            <div className="relative mx-auto max-w-7xl px-6">
                <span className="block text-sm font-bold uppercase tracking-widest text-slate-300">Línea</span>
                <h1 className="mt-1 text-5xl font-black text-white">Casuales</h1>
                <p className="mt-2 text-slate-300">Estilo y confort para cada momento del día.</p>
            </div>
        </section>
    );
}
