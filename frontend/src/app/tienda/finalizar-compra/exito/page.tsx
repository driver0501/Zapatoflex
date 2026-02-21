'use client';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
    const orderNumber = "ZF-" + Math.floor(Math.random() * 90000 + 10000);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-white">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20 scale-150"></div>
                <div className="relative bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={48} className="text-emerald-500" strokeWidth={1.5} />
                </div>
            </div>

            <div className="space-y-4 max-w-sm">
                <h1 className="text-sm font-black uppercase tracking-[0.4em] text-black">¡Pedido Confirmado!</h1>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                    Gracias por confiar en nosotros. Tu pedido <strong className="text-black">{orderNumber}</strong> ha sido procesado con éxito.
                </p>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest pt-2">
                    Recibirás un correo con el detalle de tu envío.
                </p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/tienda" className="flex-1 flex items-center justify-center gap-3 bg-black text-white py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-100">
                    <ShoppingBag size={14} /> Seguir Comprando
                </Link>
                <Link href="/" className="flex-1 flex items-center justify-center gap-3 border border-zinc-100 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-black hover:border-black transition-all">
                    Ir al Inicio <ArrowRight size={14} />
                </Link>
            </div>

            <div className="mt-20 p-6 border-t border-zinc-50 flex items-center gap-4 max-w-xs opacity-50">
                <Package size={20} className="text-zinc-300" />
                <p className="text-[9px] text-zinc-400 font-bold text-left uppercase tracking-widest">
                    Tu calzado boutique está siendo preparado cuidadosamente por nuestro equipo.
                </p>
            </div>
        </div>
    );
}
