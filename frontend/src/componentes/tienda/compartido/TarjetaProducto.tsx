import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useCarrito } from '@/contexto/CarritoContext';
import { useFavoritos } from '@/contexto/FavoritosContext';

export interface Producto {
    id: string | number;
    nombre: string;
    precio: number;
    precioAntes?: number | null;
    categoria: string;
    imagen: string;
    agotado?: boolean;
    nuevo?: boolean;
    talla?: string; // Talla predeterminada
}

interface Props {
    producto: Producto;
}

export default function TarjetaProducto({ producto: p }: Props) {
    const { agregarAlCarrito } = useCarrito();
    const { toggleFavorito, esFavorito } = useFavoritos();

    const handleAgregar = (e: React.MouseEvent) => {
        e.stopPropagation();
        agregarAlCarrito(p);
    };
    return (
        <div className="group relative cursor-pointer">
            <Link href={`/tienda/producto/${p.id}`}>
                {/* IMAGEN */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-sm">
                    <Image
                        src={(p as any).imagenes?.[0] || p.imagen || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'}
                        alt={p.nombre}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* BADGES */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {p.nuevo && !p.precioAntes && (
                            <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">
                                NUEVO
                            </span>
                        )}
                        {p.precioAntes && p.precioAntes > p.precio && (
                            <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">
                                -{Math.round((1 - p.precio / p.precioAntes) * 100)}%
                            </span>
                        )}
                        {p.agotado && (
                            <span className="bg-gray-400 text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">
                                AGOTADO
                            </span>
                        )}
                    </div>

                    {/* FAVORITO */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorito(p);
                        }}
                        className={`absolute top-2 right-2 p-2 hover:bg-white/20 rounded-full z-10 transition-all ${esFavorito(p.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        aria-label="Añadir a favoritos"
                    >
                        <Heart
                            size={18}
                            className={`stroke-2 drop-shadow-sm transition-colors ${esFavorito(p.id) ? 'fill-red-500 text-red-500' : 'text-black'}`}
                        />
                    </button>

                    {/* CARRITO EMERGENTE */}
                    {!p.agotado && (
                        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                            <button
                                onClick={handleAgregar}
                                className="w-full bg-black py-3 text-[10px] font-black tracking-[0.2em] text-white uppercase hover:bg-gray-800 transition-colors">
                                AÑADIR AL CARRITO
                            </button>
                        </div>
                    )}
                </div>

                {/* INFO */}
                <div className="mt-3 space-y-1">
                    <p className="text-[9px] font-black tracking-[0.2em] uppercase text-gray-400">
                        {p.categoria}
                    </p>
                    <h3 className="text-sm font-bold text-black leading-tight group-hover:text-gray-600 transition-colors">
                        {p.nombre}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black">
                            ${Number(p.precio).toLocaleString('es-CO')}
                        </span>
                        {p.precioAntes && p.precioAntes > p.precio && (
                            <span className="text-xs text-gray-400 line-through">
                                ${Number(p.precioAntes).toLocaleString('es-CO')}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}
