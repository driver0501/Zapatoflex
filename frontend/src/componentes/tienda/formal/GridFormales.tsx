// SECCIÓN 3 - GRID: Productos de la línea Formal
interface Producto { id: string; nombre: string; precio: number; marca: string; material: string; }

const MOCK: Producto[] = [
    { id: '1', nombre: 'Executive Oxford', precio: 280000, marca: 'EliteStep', material: 'Cuero genuino' },
    { id: '2', nombre: 'Classic Derby', precio: 245000, marca: 'FormalCo', material: 'Nobuck' },
    { id: '3', nombre: 'Monaco Loafer', precio: 310000, marca: 'EliteStep', material: 'Cuero genuino' },
    { id: '4', nombre: 'Business Brogue', precio: 265000, marca: 'SuitWear', material: 'Cuero sintético' },
    { id: '5', nombre: 'Diplomat Slip On', precio: 290000, marca: 'FormalCo', material: 'Charol' },
    { id: '6', nombre: 'GrandEvent Boot', precio: 340000, marca: 'EliteStep', material: 'Cuero genuino' },
];

export default function GridFormales({ productos = MOCK }: { productos?: Producto[] }) {
    return (
        <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">{productos.length} productos encontrados</p>
                <select className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-700">
                    <option>Más populares</option>
                    <option>Precio: menor a mayor</option>
                    <option>Precio: mayor a menor</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {productos.map((p) => (
                    <div key={p.id} className="group rounded-3xl bg-amber-50 p-4 hover:shadow-2xl hover:bg-white transition-all duration-300">
                        <div className="aspect-square w-full rounded-2xl bg-amber-100" />
                        <div className="mt-4 space-y-1">
                            <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>{p.marca}</span>
                                <span>{p.material}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">{p.nombre}</h3>
                                <span className="text-sm font-medium text-amber-700">${p.precio.toLocaleString('es-CO')}</span>
                            </div>
                            <button className="mt-3 w-full rounded-xl bg-amber-900 py-3 text-sm font-bold text-white hover:bg-amber-700 transition-all active:scale-95">
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
