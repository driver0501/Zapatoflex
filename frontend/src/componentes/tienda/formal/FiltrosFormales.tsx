// SECCIÓN 2 - FILTROS: Panel de filtros para la línea Formal
const TALLAS = ['38', '39', '40', '41', '42', '43', '44'];
const MATERIALES = ['Cuero genuino', 'Cuero sintético', 'Nobuck', 'Charol'];

export default function FiltrosFormales() {
    return (
        <aside className="w-64 shrink-0 space-y-8">
            <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">Talla</h3>
                <div className="flex flex-wrap gap-2">
                    {TALLAS.map((t) => (
                        <button key={t} className="rounded-xl border border-amber-200 px-3 py-1 text-sm font-medium text-slate-600 hover:border-amber-700 hover:text-amber-800 transition-colors">
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">Material</h3>
                <div className="space-y-2 text-sm text-slate-600">
                    {MATERIALES.map((m) => (
                        <label key={m} className="flex items-center gap-2 cursor-pointer hover:text-amber-800">
                            <input type="checkbox" className="accent-amber-700" />
                            {m}
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">Precio</h3>
                <div className="space-y-2 text-sm text-slate-600">
                    {['Menos de $200.000', '$200.000 - $350.000', 'Más de $350.000'].map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer hover:text-amber-800">
                            <input type="radio" name="precio-formal" className="accent-amber-700" />
                            {r}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
