'use client';
// ResumenPedido.tsx — Panel lateral derecho del carrito
// Solo se usa en app/tienda/carrito/page.tsx
import Link from 'next/link';
import { useState } from 'react';
import { Truck, Tag, ShieldCheck, ChevronRight } from 'lucide-react';

interface PropsResumenPedido {
    subtotal: number;
    cantidadItems: number;
}

export default function ResumenPedido({ subtotal, cantidadItems }: PropsResumenPedido) {
    const [codigo, setCodigo] = useState('');
    const [cuponOk, setCuponOk] = useState(false);
    const [cuponErr, setCuponErr] = useState(false);

    const descuento = cuponOk ? Math.round(subtotal * 0.1) : 0;
    const envio = subtotal >= 200_000 ? 0 : 15_000;
    const total = subtotal - descuento + envio;

    function aplicar() {
        if (!codigo.trim()) return;
        if (codigo.trim().length >= 4) { setCuponOk(true); setCuponErr(false); }
        else { setCuponErr(true); setCuponOk(false); }
    }

    return (
        <aside className="w-80 shrink-0">
            <div className="border border-gray-200 sticky top-24 divide-y divide-gray-100">

                {/* TÍTULO */}
                <div className="px-6 py-5">
                    <h2 className="text-[10px] font-black tracking-[0.3em] uppercase text-black">RESUMEN DEL PEDIDO</h2>
                </div>

                {/* DESGLOSE */}
                <div className="px-6 py-5 space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal ({cantidadItems} {cantidadItems === 1 ? 'producto' : 'productos'})</span>
                        <span className="font-bold">${subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    {cuponOk && (
                        <div className="flex justify-between text-green-600">
                            <span className="flex items-center gap-1"><Tag size={12} /> Descuento 10%</span>
                            <span className="font-bold">-${descuento.toLocaleString('es-CO')}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1.5 text-gray-500"><Truck size={13} /> Envío</span>
                        {envio === 0
                            ? <span className="text-[11px] font-black text-green-600 uppercase tracking-wide">GRATIS</span>
                            : <span className="font-bold">${envio.toLocaleString('es-CO')}</span>}
                    </div>
                    {subtotal < 200_000 && (
                        <p className="text-[11px] text-gray-400 bg-gray-50 px-3 py-2 leading-relaxed">
                            Agrega <strong className="text-black">${(200_000 - subtotal).toLocaleString('es-CO')}</strong> más para envío gratis
                        </p>
                    )}
                </div>

                {/* CUPÓN */}
                <div className="px-6 py-5 space-y-2">
                    <p className="text-[9px] font-black tracking-[0.2em] uppercase text-black">CUPÓN DE DESCUENTO</p>
                    <div className="flex">
                        <input
                            value={codigo}
                            onChange={e => { setCodigo(e.target.value.toUpperCase()); setCuponErr(false); }}
                            placeholder="CÓDIGO"
                            className="flex-1 border border-gray-200 border-r-0 px-3 py-2.5 text-[11px] uppercase tracking-widest placeholder-gray-300 focus:outline-none focus:border-black transition-colors"
                        />
                        <button onClick={aplicar}
                            className="bg-black px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white hover:bg-gray-800 transition-colors">
                            OK
                        </button>
                    </div>
                    {cuponOk && <p className="text-[11px] font-bold text-green-600">✓ 10% OFF aplicado</p>}
                    {cuponErr && <p className="text-[11px] text-red-500">Código inválido. Intenta otro.</p>}
                </div>

                {/* TOTAL */}
                <div className="px-6 py-5 flex items-baseline justify-between">
                    <span className="text-[10px] font-black tracking-widest uppercase">TOTAL</span>
                    <span className="text-2xl font-black">${total.toLocaleString('es-CO')}</span>
                </div>

                {/* CTA FINALIZAR */}
                <div className="px-6 py-5 space-y-4">
                    <Link href="/tienda/finalizar-compra"
                        className="flex items-center justify-center gap-2 w-full bg-black py-4 text-[11px] font-black tracking-[0.25em] uppercase text-white hover:bg-gray-800 transition-colors">
                        FINALIZAR COMPRA <ChevronRight size={14} />
                    </Link>
                    <p className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 uppercase tracking-widest">
                        <ShieldCheck size={13} /> Compra 100% segura
                    </p>
                    <div className="flex justify-center flex-wrap gap-1.5">
                        {['VISA', 'MC', 'PSE', 'NEQUI', 'EFECTY'].map(m => (
                            <span key={m} className="border border-gray-200 px-2.5 py-1 text-[8px] font-black tracking-wider text-gray-400">{m}</span>
                        ))}
                    </div>
                </div>

            </div>
        </aside>
    );
}
