// SECCIÓN 3 - GRID DE PRODUCTOS: Lista de zapatos deportivos filtrados
// En producción recibe `productos` desde lib/tienda/servicios/catalogo.servicio.ts
interface Producto {
    id: string;
    nombre: string;
    precio: number;
    marca: string;
}

const PRODUCTOS_MOCK: Producto[] = [
    { id: '1', nombre: 'Air Flex Pro', precio: 320000, marca: 'FlexRun' },
    { id: '2', nombre: 'Nova Runner', precio: 310000, marca: 'SprintX' },
    { id: '3', nombre: 'TurboStep', precio: 275000, marca: 'KickGo' },
    { id: '4', nombre: 'MaxBoost 360', precio: 390000, marca: 'FlexRun' },
    { id: '5', nombre: 'EcoSprint', precio: 210000, marca: 'GreenFit' },
    { id: '6', nombre: 'PowerStride', precio: 350000, marca: 'SprintX' },
];

export default function GridDeportivos({ productos = PRODUCTOS_MOCK }: { productos?: Producto[] }) {
    return (
        <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">{productos.length} productos encontrados</p>
                <select className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option>Más populares</option>
                    <option>Precio: menor a mayor</option>
                    <option>Precio: mayor a menor</option>
                    <option>Más recientes</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {productos.map((p) => (
                    <div key={p.id} className="group rounded-3xl bg-slate-50 p-4 hover:shadow-2xl hover:bg-white transition-all duration-300">
                        <div className="aspect-square w-full rounded-2xl bg-slate-200" />
                        <div className="mt-4 space-y-1">
                            <p className="text-xs text-slate-400">{p.marca}</p>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">{p.nombre}</h3>
                                <span className="text-sm font-medium text-blue-600">${p.precio.toLocaleString('es-CO')}</span>
                            </div>
                            <button className="mt-3 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-blue-600 transition-all active:scale-95">
                                Añadir al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
