// SECCIÓN 3 - CATEGORÍAS: Acceso rápido a cada línea de calzado
const CATS = [
    { nombre: 'Deportivos', descripcion: 'Máximo rendimiento y comodidad.', emoji: '👟', ruta: '/tienda/deportivos', color: 'from-blue-500 to-blue-700' },
    { nombre: 'Casuales', descripcion: 'Estilo para el día a día.', emoji: '👞', ruta: '/tienda/casuales', color: 'from-slate-500 to-slate-700' },
    { nombre: 'Formales', descripcion: 'Elegancia en cada ocasión.', emoji: '👔', ruta: '/tienda/formales', color: 'from-amber-600 to-amber-800' },
];

export default function AccesoCategorias() {
    return (
        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 space-y-1 text-center">
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Nuestras Líneas</span>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">¿Qué estás buscando?</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {CATS.map((cat) => (
                        <a
                            key={cat.ruta}
                            href={cat.ruta}
                            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.color} p-8 text-white transition-all hover:scale-105 hover:shadow-2xl`}
                        >
                            <div className="mb-4 text-5xl">{cat.emoji}</div>
                            <h3 className="text-2xl font-black">{cat.nombre}</h3>
                            <p className="mt-1 text-sm text-white/80">{cat.descripcion}</p>
                            <span className="mt-6 inline-block text-sm font-bold underline underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                                Explorar →
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
