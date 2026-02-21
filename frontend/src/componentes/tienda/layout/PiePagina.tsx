import Link from 'next/link';

export default function PiePagina() {
    return (
        <footer className="border-t border-gray-200 bg-white">

            {/* CONTENIDO PRINCIPAL */}
            <div className="mx-auto max-w-screen-xl px-6 py-14">
                <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

                    {/* MARCA */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <h3 className="text-2xl font-black tracking-[-0.05em] uppercase text-black">
                            ZapatoFlex
                        </h3>
                        <p className="text-xs leading-relaxed text-gray-500">
                            Calzado para cada versión de ti. Deportivos, casuales y formales de la más alta calidad.
                        </p>
                        <div className="flex gap-4">
                            {['IG', 'TW', 'YT', 'TK'].map((r) => (
                                <button key={r}
                                    className="w-8 h-8 border border-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-600 hover:border-black hover:text-black transition-colors">
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* LINKS */}
                    {[
                        {
                            titulo: 'CATEGORÍAS',
                            links: [
                                { label: 'Deportivos', href: '/tienda/deportivos' },
                                { label: 'Casuales', href: '/tienda/casuales' },
                                { label: 'Formales', href: '/tienda/formales' },
                                { label: 'Sale', href: '/tienda/sale' },
                            ],
                        },
                        {
                            titulo: 'EMPRESA',
                            links: [
                                { label: 'Nosotros', href: '#' },
                                { label: 'Trabaja con nosotros', href: '#' },
                                { label: 'Prensa', href: '#' },
                                { label: 'Sostenibilidad', href: '#' },
                            ],
                        },
                        {
                            titulo: 'AYUDA',
                            links: [
                                { label: 'Preguntas frecuentes', href: '#' },
                                { label: 'Devoluciones', href: '#' },
                                { label: 'Tallas', href: '#' },
                                { label: 'Contacto', href: '#' },
                            ],
                        },
                    ].map((col) => (
                        <div key={col.titulo} className="space-y-4">
                            <h4 className="text-[10px] font-black tracking-[0.25em] uppercase text-black">{col.titulo}</h4>
                            <ul className="space-y-2.5">
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        <Link href={l.href} className="text-xs text-gray-500 hover:text-black transition-colors">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>

            {/* BARRA INFERIOR */}
            <div className="border-t border-gray-100 py-5">
                <div className="mx-auto max-w-screen-xl px-6 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-[11px] text-gray-400">
                        © {new Date().getFullYear()} ZapatoFlex S.A.S. Todos los derechos reservados.
                    </p>
                    <p className="text-[11px] text-gray-400">
                        Bogotá, Colombia · info@zapatoflex.co
                    </p>
                </div>
            </div>

        </footer>
    );
}
