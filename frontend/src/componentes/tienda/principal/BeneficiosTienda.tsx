import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

const ITEMS = [
    { icono: <Truck size={22} strokeWidth={1.5} />, titulo: 'ENVÍO RÁPIDO', desc: 'A todo Colombia en 48 horas' },
    { icono: <ShieldCheck size={22} strokeWidth={1.5} />, titulo: 'PAGO SEGURO', desc: 'Contraentrega sin complicaciones' },
    { icono: <RefreshCw size={22} strokeWidth={1.5} />, titulo: 'DEVOLUCIONES', desc: 'Fácil y sin costo hasta 30 días' },
    { icono: <Headphones size={22} strokeWidth={1.5} />, titulo: 'ATENCIÓN 24/7', desc: 'Siempre disponibles para ayudarte' },
];

export default function BeneficiosTienda() {
    return (
        <section className="border-t border-b border-gray-200 bg-white py-10">
            <div className="mx-auto max-w-screen-xl px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
                    {ITEMS.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center px-6 py-2 space-y-2">
                            <div className="text-black">{item.icono}</div>
                            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-black">{item.titulo}</p>
                            <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
