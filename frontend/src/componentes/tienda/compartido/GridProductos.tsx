import TarjetaProducto, { Producto } from './TarjetaProducto';

interface PropsGrid {
    productos: Producto[];
}

export default function GridProductos({ productos }: PropsGrid) {
    if (productos.length === 0) {
        return (
            <div className="py-24 text-center">
                <p className="text-xs font-black tracking-[0.3em] uppercase text-gray-400">SIN PRODUCTOS</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {productos.map((p) => (
                <TarjetaProducto key={p.id} producto={p} />
            ))}
        </div>
    );
}
