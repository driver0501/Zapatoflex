'use client';
// BarraNavegacion — sticky, con drawer de carrito integrado
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Heart, Menu } from 'lucide-react';
import ItemCarrito from '@/componentes/tienda/carrito/ItemCarrito';
import { useCarrito } from '@/contexto/CarritoContext';
import { useFavoritos } from '@/contexto/FavoritosContext';

const CATEGORIAS = [
    { nombre: 'INICIO', ruta: '/' },
    { nombre: 'DEPORTIVOS', ruta: '/tienda/deportivos' },
    { nombre: 'CASUALES', ruta: '/tienda/casuales' },
    { nombre: 'FORMALES', ruta: '/tienda/formales' },
];

export default function BarraNavegacion() {
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    const { cantidadTotal } = useCarrito();
    const { cantidadFavoritos } = useFavoritos();

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

                {/* BANNER PROMO */}
                <div className="bg-black py-2 text-center">
                    <p className="text-xs font-medium tracking-widest text-white uppercase">
                        Envío gratis en compras mayores a $200.000 · Devoluciones sin costo
                    </p>
                </div>

                {/* NAVBAR */}
                <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">

                    {/* LOGO */}
                    <Link href="/" className="text-2xl font-black tracking-[-0.05em] text-black uppercase">
                        ZapatoFlex
                    </Link>

                    {/* MENÚ */}
                    <div className="hidden items-center gap-8 md:flex">
                        {CATEGORIAS.map((c) => (
                            <Link key={c.ruta} href={c.ruta}
                                className="text-xs font-bold tracking-widest text-black transition-colors hover:text-gray-500 uppercase">
                                {c.nombre}
                            </Link>
                        ))}
                    </div>

                    {/* ICONOS */}
                    <div className="flex items-center gap-5 text-black">
                        <button className="hover:opacity-60 transition-opacity" aria-label="Buscar">
                            <Search size={20} />
                        </button>
                        <Link href="/acceso" className="hover:opacity-60 transition-opacity" aria-label="Mi cuenta">
                            <User size={20} />
                        </Link>
                        <Link href="/tienda/favoritos" className="relative hover:opacity-60 transition-opacity" aria-label="Favoritos">
                            <Heart size={20} />
                            {cantidadFavoritos > 0 && (
                                <span className="absolute -right-2.5 -top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                                    {cantidadFavoritos}
                                </span>
                            )}
                        </Link>

                        {/* CARRITO — abre drawer */}
                        <button
                            onClick={() => setCarritoAbierto(true)}
                            className="relative hover:opacity-60 transition-opacity"
                            aria-label="Abrir carrito">
                            <ShoppingBag size={20} />
                            {cantidadTotal > 0 && (
                                <span className="absolute -right-2.5 -top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">
                                    {cantidadTotal}
                                </span>
                            )}
                        </button>

                        <button className="md:hidden" aria-label="Menú">
                            <Menu size={22} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* DRAWER CARRITO — global, aparece en todas las pantallas */}
            <ItemCarrito
                abierto={carritoAbierto}
                onCerrar={() => setCarritoAbierto(false)}
            />
        </>
    );
}
