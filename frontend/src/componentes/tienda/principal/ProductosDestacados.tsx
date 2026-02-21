import Image from 'next/image';
import { Heart } from 'lucide-react';

// Imágenes reales de Unsplash
const IMGS = [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80',
];

const PRODUCTOS = [
    { id: '1', nombre: 'Air Flex Pro', marca: 'ZapatoFlex', precio: 320000, precioAntes: 390000, categoria: 'Deportivos', img: IMGS[0], agotado: false },
    { id: '2', nombre: 'Urban Walker', marca: 'ZapatoFlex', precio: 195000, precioAntes: null, categoria: 'Casuales', img: IMGS[1], agotado: false },
    { id: '3', nombre: 'Executive Oxford', marca: 'ZapatoFlex', precio: 280000, precioAntes: 320000, categoria: 'Formales', img: IMGS[2], agotado: false },
    { id: '4', nombre: 'Nova Runner X360', marca: 'ZapatoFlex', precio: 310000, precioAntes: null, categoria: 'Deportivos', img: IMGS[3], agotado: false },
    { id: '5', nombre: 'City Loafer Pro', marca: 'ZapatoFlex', precio: 220000, precioAntes: null, categoria: 'Casuales', img: IMGS[4], agotado: true },
    { id: '6', nombre: 'Monaco Slip On', marca: 'ZapatoFlex', precio: 265000, precioAntes: 300000, categoria: 'Formales', img: IMGS[5], agotado: false },
];

export default function ProductosDestacados() {
    return (
        <section className="bg-white py-12">
            <div className="mx-auto max-w-screen-xl px-6">

                {/* ENCABEZADO MINIMALISTA */}
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-xs font-black tracking-[0.3em] uppercase text-black">
                        NOVEDADES
                    </h2>
                    <button className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
                        VER TODO →
                    </button>
                </div>

                {/* GRID 3 COLUMNAS - tarjeta estilo Tennis: imagen + info + precio */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {PRODUCTOS.map((p) => (
                        <div key={p.id} className="group relative cursor-pointer">

                            {/* IMAGEN CUADRADA CON HOVER */}
                            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                <Image
                                    src={p.img}
                                    alt={p.nombre}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />

                                {/* BADGE DESCUENTO */}
                                {p.precioAntes && (
                                    <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                        -{Math.round((1 - p.precio / p.precioAntes) * 100)}%
                                    </span>
                                )}

                                {/* BADGE AGOTADO */}
                                {p.agotado && (
                                    <span className="absolute top-2 left-2 bg-gray-400 text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                        AGOTADO
                                    </span>
                                )}

                                {/* FAVORITO */}
                                <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Añadir a favoritos">
                                    <Heart size={20} className="text-black stroke-2" />
                                </button>

                                {/* BOTÓN AGREGAR AL CARRITO - aparece en hover en la base de la imagen */}
                                {!p.agotado && (
                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button className="w-full bg-black py-3 text-[11px] font-black tracking-widest text-white uppercase hover:bg-gray-800 transition-colors">
                                            AÑADIR AL CARRITO
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* INFORMACIÓN DEL PRODUCTO - debajo de la imagen */}
                            <div className="mt-3 space-y-1">
                                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{p.categoria}</p>
                                <h3 className="text-sm font-bold text-black leading-tight">{p.nombre}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-black">${p.precio.toLocaleString('es-CO')}</span>
                                    {p.precioAntes && (
                                        <span className="text-xs text-gray-400 line-through">${p.precioAntes.toLocaleString('es-CO')}</span>
                                    )}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
