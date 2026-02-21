'use client';
import React from 'react';
import Link from 'next/link';
import { Heart, ChevronLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { useFavoritos } from '@/contexto/FavoritosContext';
import TarjetaProducto from '@/componentes/tienda/compartido/TarjetaProducto';

export default function PaginaFavoritos() {
    const { favoritos, toggleFavorito, cantidadFavoritos } = useFavoritos();

    return (
        <main className="bg-white min-h-screen pb-24">
            {/* CABECERA SECCIÓN */}
            <div className="bg-gray-50 py-16 border-b border-gray-100">
                <div className="max-w-screen-xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-full mb-6">
                        <Heart className="text-red-500 fill-red-500" size={24} />
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-black mb-2">Mis Favoritos</h1>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                        {cantidadFavoritos} {cantidadFavoritos === 1 ? 'Producto Guardado' : 'Productos Guardados'}
                    </p>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="max-w-screen-xl mx-auto px-6 mt-12">
                {cantidadFavoritos === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-full">
                            <Heart size={32} className="text-gray-200" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-xl font-black uppercase tracking-tight text-gray-400">Tu lista está vacía</h2>
                            <p className="text-sm text-gray-400 font-medium">Parece que aún no has guardado ningún producto en tus favoritos.</p>
                        </div>
                        <Link href="/" className="bg-black text-white px-10 py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-all shadow-xl">
                            Explorar Tienda
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {favoritos.map((producto: any) => (
                            <div key={producto.id} className="group relative">
                                <TarjetaProducto producto={producto} />
                                {/* Botón de eliminar rápido para la wishlist */}
                                <button
                                    onClick={() => toggleFavorito(producto)}
                                    className="absolute -top-2 -left-2 bg-white shadow-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500 text-gray-400 z-20"
                                    title="Quitar de favoritos"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* BOTÓN VOLVER */}
            <div className="max-w-screen-xl mx-auto px-6 mt-20 flex justify-center">
                <Link href="/" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">
                    <ChevronLeft size={16} /> Volver a la página principal
                </Link>
            </div>
        </main>
    );
}
