'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCarrito } from '@/contexto/CarritoContext';
import { Minus, Plus, X, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function PaginaCarrito() {
    const { items, eliminarDelCarrito, actualizarCantidad, subtotal, cantidadTotal } = useCarrito();

    const costoEnvio = 0; // Podría calcularse según subtotal
    const total = subtotal + costoEnvio;

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-screen-xl px-6 py-24 text-center space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag size={40} strokeWidth={1} className="text-gray-300" />
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tight">Tu bolsa está vacía</h1>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">Parece que aún no has añadido nada. Explora nuestras colecciones exclusivas para encontrar tu par perfecto.</p>
                <Link href="/tienda/deportivos" className="inline-block bg-black text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
                    Ver Catálogo
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-screen-xl px-6 py-16">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-10 flex items-center gap-4">
                Tu Bolsa <span className="text-gray-300 text-lg">({cantidadTotal} items)</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* LISTA DE ITEMS */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="border-t border-gray-100 divide-y divide-gray-100 font-medium">
                        {items.map(item => (
                            <div key={`${item.id}-${item.talla}`} className="py-8 flex gap-6">
                                <div className="relative w-32 aspect-square bg-gray-50 overflow-hidden">
                                    <Image src={item.img} alt={item.nombre} fill className="object-cover" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-black leading-tight mb-1 uppercase tracking-tight">{item.nombre}</h3>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Talla: {item.talla}</p>
                                        </div>
                                        <button
                                            onClick={() => eliminarDelCarrito(item.id, item.talla)}
                                            className="text-gray-300 hover:text-black transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        {/* Selector Cantidad */}
                                        <div className="flex items-center border border-gray-200">
                                            <button
                                                onClick={() => actualizarCantidad(item.id, item.talla, item.cantidad - 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-12 text-center font-bold text-sm">{item.cantidad}</span>
                                            <button
                                                onClick={() => actualizarCantidad(item.id, item.talla, item.cantidad + 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <p className="font-black text-xl">
                                            ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RESUMEN DE COMPRA */}
                <div className="space-y-8">
                    <div className="bg-gray-50/50 p-8 border border-gray-100 space-y-6">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Resumen de Pedido</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-bold">${subtotal.toLocaleString('es-CO')}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Envío Estimado</span>
                                <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest">Gratis</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between items-baseline">
                                <span className="text-xs font-black uppercase tracking-widest">Total</span>
                                <span className="text-3xl font-black">${total.toLocaleString('es-CO')}</span>
                            </div>
                        </div>

                        <Link
                            href="/tienda/finalizar-compra"
                            className="block w-full bg-black text-white text-center py-5 text-[10px] font-black uppercase tracking-[0.25em] hover:bg-gray-800 transition-all shadow-xl flex items-center justify-center gap-3 group"
                        >
                            Finalizar Compra <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="space-y-4 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-gray-400">
                                <ShieldCheck size={16} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Pago 100% Seguro</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Truck size={16} />
                                <span className="text-[9px] font-bold uppercase tracking-widest">Entrega Express 24-48h</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center p-6 border border-dashed border-gray-200">
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">¿Tienes un código?</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="CÓDIGO PROMO"
                                className="flex-1 bg-white border border-gray-200 px-4 py-2 text-[10px] font-bold focus:border-black outline-none uppercase"
                            />
                            <button className="px-4 py-2 bg-black text-white text-[9px] font-black uppercase">Aplicar</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
