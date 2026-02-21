// SECCIÓN 2 - FILTROS + GRID: Casual usa los mismos filtros genéricos
// Componente reutilizable - recibe categoria como prop para escalar
const TALLAS = ['36', '37', '38', '39', '40', '41', '42', '43', '44'];
const COLORES = ['Negro', 'Beige', 'Café', 'Blanco', 'Verde'];

export default function FiltrosCasuales() {
    return (
        <aside className="w-64 shrink-0 space-y-8">
            <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">Talla</h3>
                <div className="flex flex-wrap gap-2">
                    {TALLAS.map((t) => (
                        <button key={t} className="rounded-xl border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 hover:border-slate-800 hover:text-slate-900 transition-colors">
                            {t}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">Color</h3>
                <div className="flex flex-wrap gap-2">
                    {COLORES.map((c) => (
                        <button key={c} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 hover:border-slate-800 hover:text-slate-900 transition-colors">
                            {c}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-900">Precio</h3>
                <div className="space-y-2 text-sm text-slate-600">
                    {['Menos de $150.000', '$150.000 - $250.000', 'Más de $250.000'].map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                            <input type="radio" name="precio-casual" className="accent-slate-800" />
                            {r}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
