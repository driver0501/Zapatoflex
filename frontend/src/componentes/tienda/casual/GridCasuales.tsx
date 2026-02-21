// SECCIÓN 3 - GRID: Productos de la línea Casual
interface Producto { id: string; nombre: string; precio: number; marca: string; }

const MOCK: Producto[] = [
    { id: '1', nombre: 'Urban Walker', precio: 195000, marca: 'StreetCo' },
    { id: '2', nombre: 'Classic Slip', precio: 165000, marca: 'EasyFoot' },
    { id: '3', nombre: 'City Loafer', precio: 220000, marca: 'UrbanX' },
    { id: '4', nombre: 'Canvas Flex', precio: 140000, marca: 'StreetCo' },
    { id: '5', nombre: 'Weekend Pro', precio: 185000, marca: 'CasualCo' },
    { id: '6', nombre: 'Drift Sneaker', precio: 230000, marca: 'EasyFoot' },
];

export default function GridCasuales({ productos = MOCK }: { productos?: Producto[] }) {
    return (
        <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">{productos.length} productos encontrados</p>
                <select className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800">
                    <option>Más populares</option>
                    <option>Precio: menor a mayor</option>
                    <option>Precio: mayor a menor</option>
                </select>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {productos.map((p) => (
                    <div key={p.id} className="group rounded-3xl bg-slate-50 p-4 hover:shadow-2xl hover:bg-white transition-all duration-300">
                        <div className="aspect-square w-full rounded-2xl bg-stone-200" />
                        <div className="mt-4 space-y-1">
                            <p className="text-xs text-slate-400">{p.marca}</p>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">{p.nombre}</h3>
                                <span className="text-sm font-medium text-slate-700">${p.precio.toLocaleString('es-CO')}</span>
                            </div>
                            <button className="mt-3 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-all active:scale-95">
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
