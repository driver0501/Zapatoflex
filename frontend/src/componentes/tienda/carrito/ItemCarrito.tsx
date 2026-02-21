'use client';
// ItemCarrito.tsx — Carrito deslizante global (drawer)
// Se activa desde el navbar y aparece en TODAS las pantallas
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

import { useCarrito } from '@/contexto/CarritoContext';

interface PropsItemCarrito {
    abierto: boolean;
    onCerrar: () => void;
}

export default function ItemCarrito({ abierto, onCerrar }: PropsItemCarrito) {
    const {
        items,
        eliminarDelCarrito,
        actualizarCantidad,
        subtotal,
        cantidadTotal: totalItems
    } = useCarrito();

    return (
        <>
            {/* OVERLAY oscuro de fondo */}
            {abierto && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 transition-opacity"
                    onClick={onCerrar}
                />
            )}

            {/* PANEL DESLIZANTE desde la derecha */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${abierto ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* CABECERA */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <div>
                        <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-black">MI CARRITO</h2>
                        {totalItems > 0 && (
                            <p className="text-[10px] text-gray-400 mt-0.5">{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
                        )}
                    </div>
                    <button onClick={onCerrar} className="p-1 text-gray-400 hover:text-black transition-colors" aria-label="Cerrar carrito">
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENIDO */}
                {items.length === 0 ? (
                    /* VACÍO */
                    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 space-y-4">
                        <ShoppingBag size={48} strokeWidth={0.8} className="text-gray-200" />
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Tu carrito está vacío</p>
                        <p className="text-xs text-gray-400">Agrega productos para verlos aquí</p>
                        <button onClick={onCerrar}
                            className="bg-black px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-gray-800 transition-colors">
                            SEGUIR COMPRANDO
                        </button>
                    </div>
                ) : (
                    <>
                        {/* LISTA DE ITEMS */}
                        <div className="flex-1 overflow-y-auto px-6 divide-y divide-gray-100">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 py-5">
                                    {/* Imagen */}
                                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 overflow-hidden">
                                        <Image src={item.img} alt={item.nombre} fill className="object-cover" sizes="80px" />
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between gap-2">
                                            <div>
                                                <h3 className="text-xs font-bold text-black leading-tight">{item.nombre}</h3>
                                                <p className="text-[10px] text-gray-400 mt-0.5">Talla: {item.talla}</p>
                                            </div>
                                            <button onClick={() => eliminarDelCarrito(item.id, item.talla)} className="text-gray-300 hover:text-black transition-colors p-0.5">
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            {/* Cantidad */}
                                            <div className="flex items-center border border-gray-100 divide-x divide-gray-200">
                                                <button onClick={() => actualizarCantidad(item.id, item.talla, item.cantidad - 1)}
                                                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                    <Minus size={11} />
                                                </button>
                                                <span className="w-8 text-center text-xs font-bold">{item.cantidad}</span>
                                                <button onClick={() => actualizarCantidad(item.id, item.talla, item.cantidad + 1)}
                                                    className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 transition-colors">
                                                    <Plus size={11} />
                                                </button>
                                            </div>
                                            {/* Precio */}
                                            <p className="text-xs font-black text-black">
                                                ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PIE: subtotal + botones */}
                        <div className="border-t border-gray-200 px-6 py-5 space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-[10px] font-black tracking-widest uppercase text-black">SUBTOTAL</span>
                                <span className="text-lg font-black text-black">${subtotal.toLocaleString('es-CO')}</span>
                            </div>
                            <p className="text-[10px] text-gray-400 -mt-2">Envío calculado al finalizar compra</p>
                            <Link href="/tienda/carrito" onClick={onCerrar}
                                className="block w-full bg-black py-4 text-center text-[11px] font-black tracking-[0.25em] uppercase text-white hover:bg-gray-800 transition-colors">
                                VER CARRITO
                            </Link>
                            <button onClick={onCerrar}
                                className="block w-full border border-black py-3 text-center text-[11px] font-black tracking-[0.25em] uppercase text-black hover:bg-black hover:text-white transition-colors">
                                SEGUIR COMPRANDO
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
