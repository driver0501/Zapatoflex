'use client';
// Sidebar de filtros izquierdo - estilo minimalista Tennis
// Filtros: Talla · Precio · Marca · Color
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const TALLAS_DEFAULT = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44'];
const MARCAS_DEFAULT = ['ZapatoFlex', 'Nike', 'Adidas', 'Puma', 'New Balance'];
const COLORES_DEFAULT = [
    { nombre: 'Negro', hex: '#111111' },
    { nombre: 'Blanco', hex: '#F5F5F5' },
    { nombre: 'Café', hex: '#7B4F2E' },
    { nombre: 'Azul', hex: '#1E3A5F' },
    { nombre: 'Rojo', hex: '#C0392B' },
    { nombre: 'Beige', hex: '#D4B896' },
];
const RANGOS_PRECIO = [
    { label: 'Menos de $150.000', valor: '0-150000' },
    { label: '$150.000 – $250.000', valor: '150000-250000' },
    { label: '$250.000 – $350.000', valor: '250000-350000' },
    { label: 'Más de $350.000', valor: '350000+' },
];

interface PropsFiltros {
    tallas?: string[];
    marcas?: string[];
}

function Acordeon({ titulo, children }: { titulo: string; children: React.ReactNode }) {
    const [abierto, setAbierto] = useState(true);
    return (
        <div className="border-b border-gray-100 py-4">
            <button
                onClick={() => setAbierto(!abierto)}
                className="flex w-full items-center justify-between text-left">
                <span className="text-[10px] font-black tracking-[0.25em] uppercase text-black">{titulo}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${abierto ? 'rotate-180' : ''}`} />
            </button>
            {abierto && <div className="mt-3">{children}</div>}
        </div>
    );
}

export default function FiltrosCategoria({ tallas = TALLAS_DEFAULT, marcas = MARCAS_DEFAULT }: PropsFiltros) {
    const [tallasActivas, setTallasActivas] = useState<string[]>([]);
    const [marcasActivas, setMarcasActivas] = useState<string[]>([]);
    const [coloresActivos, setColoresActivos] = useState<string[]>([]);
    const [precioActivo, setPrecioActivo] = useState<string | null>(null);

    const totalFiltros = tallasActivas.length + marcasActivas.length + coloresActivos.length + (precioActivo ? 1 : 0);

    function toggleArr<T>(arr: T[], setArr: (a: T[]) => void, val: T) {
        setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
    }

    function limpiarTodo() {
        setTallasActivas([]); setMarcasActivas([]); setColoresActivos([]); setPrecioActivo(null);
    }

    return (
        <aside className="w-56 shrink-0">

            {/* ENCABEZADO */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black">FILTRAR</span>
                {totalFiltros > 0 && (
                    <button onClick={limpiarTodo}
                        className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        LIMPIAR ({totalFiltros})
                    </button>
                )}
            </div>

            {/* TALLA */}
            <Acordeon titulo="Talla">
                <div className="flex flex-wrap gap-1.5">
                    {tallas.map((t) => (
                        <button key={t}
                            onClick={() => toggleArr(tallasActivas, setTallasActivas, t)}
                            className={`w-9 h-9 text-xs font-bold border transition-all ${tallasActivas.includes(t)
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-200 text-black hover:border-black'
                                }`}>
                            {t}
                        </button>
                    ))}
                </div>
            </Acordeon>

            {/* PRECIO */}
            <Acordeon titulo="Precio">
                <div className="space-y-2">
                    {RANGOS_PRECIO.map((r) => (
                        <label key={r.valor} className="flex items-center gap-2.5 cursor-pointer group">
                            <input
                                type="radio"
                                name="precio"
                                checked={precioActivo === r.valor}
                                onChange={() => setPrecioActivo(precioActivo === r.valor ? null : r.valor)}
                                className="hidden"
                            />
                            <span className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-all ${precioActivo === r.valor ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'
                                }`}>
                                {precioActivo === r.valor && <span className="text-white text-[8px]">✓</span>}
                            </span>
                            <span className={`text-xs transition-colors ${precioActivo === r.valor ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                                {r.label}
                            </span>
                        </label>
                    ))}
                </div>
            </Acordeon>

            {/* MARCA */}
            <Acordeon titulo="Marca">
                <div className="space-y-2">
                    {marcas.map((m) => (
                        <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
                            <span
                                onClick={() => toggleArr(marcasActivas, setMarcasActivas, m)}
                                className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-all cursor-pointer ${marcasActivas.includes(m) ? 'border-black bg-black' : 'border-gray-300 group-hover:border-black'
                                    }`}>
                                {marcasActivas.includes(m) && <span className="text-white text-[8px]">✓</span>}
                            </span>
                            <span
                                onClick={() => toggleArr(marcasActivas, setMarcasActivas, m)}
                                className={`text-xs cursor-pointer transition-colors ${marcasActivas.includes(m) ? 'text-black font-bold' : 'text-gray-500 group-hover:text-black'}`}>
                                {m}
                            </span>
                        </label>
                    ))}
                </div>
            </Acordeon>

            {/* COLOR */}
            <Acordeon titulo="Color">
                <div className="flex flex-wrap gap-2">
                    {COLORES_DEFAULT.map((c) => (
                        <button key={c.nombre}
                            onClick={() => toggleArr(coloresActivos, setColoresActivos, c.nombre)}
                            title={c.nombre}
                            className={`w-7 h-7 rounded-full border-2 transition-all ${coloresActivos.includes(c.nombre) ? 'border-black scale-110' : 'border-transparent hover:border-gray-400'
                                }`}
                            style={{ backgroundColor: c.hex }}
                        />
                    ))}
                </div>
                {coloresActivos.length > 0 && (
                    <p className="mt-2 text-[9px] text-gray-400 uppercase tracking-widest">
                        {coloresActivos.join(', ')}
                    </p>
                )}
            </Acordeon>

        </aside>
    );
}
