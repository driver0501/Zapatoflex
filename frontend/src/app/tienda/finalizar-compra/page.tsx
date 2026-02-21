'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { pedidosServicio } from '@/lib/admin/servicios/pedidos';
import {
    ChevronLeft,
    ShieldCheck,
    CreditCard,
    Truck,
    Lock,
    Info,
    ChevronRight,
    MapPin,
    Building,
    User,
    Mail,
    Phone
} from 'lucide-react';

const METODOS_PAGO = [
    { id: 'pse', nombre: 'PSE', desc: 'Transferencia bancaria inmediata', icon: '🏦' },
    { id: 'card', nombre: 'Tarjeta de Crédito', desc: 'Visa, Mastercard, AMEX', icon: '💳' },
    { id: 'bancolombia', nombre: 'Bancolombia', desc: 'Pago rápido desde la App', icon: '⚡' },
    { id: 'cash', nombre: 'Efecty / Su Red', desc: 'Pago en punto físico', icon: '💵' },
];

export default function CheckoutPage() {
    const [metodo, setMetodo] = useState('card');
    const [step, setStep] = useState(1); // 1: Datos, 2: Pago
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const subtotal = 320000;
    const envio = 0;
    const total = subtotal + envio;

    const handleSimularPago = async () => {
        setLoading(true);
        try {
            // Recolección de datos del formulario (Simplificado para el ejemplo)
            const datosPedido = {
                cliente_nombre: "Usuario Prueba", // Debería venir de un state del form
                cliente_email: "prueba@zapatoflex.co",
                direccion: "Calle Falsa 123",
                ciudad: "Bogotá",
                telefono: "3001234567",
                total: total,
                items: [{ id: 1, nombre: "Air Flex Pro 2026", cantidad: 1, precio: 320000 }]
            };

            await pedidosServicio.crear(datosPedido);

            setTimeout(() => {
                router.push('/tienda/finalizar-compra/exito');
            }, 1000);
        } catch (error) {
            alert('Error al procesar el pedido en el servidor');
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FDFDFD] min-h-screen pb-20">
            {/* Header Minimalista de Pago */}
            <header className="bg-white border-b border-zinc-100 py-6">
                <div className="mx-auto max-w-screen-xl px-6 flex justify-between items-center">
                    <Link href="/tienda/carrito" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-all">
                        <ChevronLeft size={16} /> Volver al Carrito
                    </Link>
                    <h1 className="text-sm font-black uppercase tracking-[0.4em] text-black">Finalizar Compra</h1>
                    <div className="flex items-center gap-2 text-emerald-500">
                        <ShieldCheck size={18} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Pago Seguro</span>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-screen-xl px-6 py-12 flex flex-col lg:flex-row gap-16">

                {/* Columna Izquierda: Formularios */}
                <div className="flex-1 space-y-12">

                    {/* PASOS VISUALES */}
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${step >= 1 ? 'text-black' : 'text-zinc-300'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-black bg-black text-white' : 'border-zinc-100 text-zinc-300'}`}>1</span>
                            Información
                        </div>
                        <div className="h-px w-10 bg-zinc-100"></div>
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${step >= 2 ? 'text-black' : 'text-zinc-300'}`}>
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-black bg-black text-white' : 'border-zinc-100 text-zinc-300'}`}>2</span>
                            Pago
                        </div>
                    </div>

                    {step === 1 ? (
                        <section className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                            <div className="space-y-6">
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2 border-b border-zinc-50 pb-4">
                                    <User size={14} /> Datos Personales
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Nombre Completo</label>
                                        <input className="w-full bg-white border border-zinc-100 px-4 py-3.5 text-xs font-bold focus:border-black focus:ring-4 ring-zinc-900/5 outline-none transition-all rounded-xl" placeholder="Juan Pérez" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Correo Electrónico</label>
                                        <input className="w-full bg-white border border-zinc-100 px-4 py-3.5 text-xs font-bold focus:border-black outline-none transition-all rounded-xl" placeholder="juan@email.com" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2 border-b border-zinc-50 pb-4">
                                    <MapPin size={14} /> Dirección de Entrega
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Dirección Principal</label>
                                        <input className="w-full bg-white border border-zinc-100 px-4 py-3.5 text-xs font-bold focus:border-black outline-none transition-all rounded-xl" placeholder="Calle 100 # 15-20" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Ciudad / Municipio</label>
                                            <input className="w-full bg-white border border-zinc-100 px-4 py-3.5 text-xs font-bold focus:border-black outline-none transition-all rounded-xl" placeholder="Bogotá D.C." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Teléfono de Contacto</label>
                                            <input className="w-full bg-white border border-zinc-100 px-4 py-3.5 text-xs font-bold focus:border-black outline-none transition-all rounded-xl" placeholder="300 000 0000" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setStep(2)} className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
                                Continuar al Pago
                            </button>
                        </section>
                    ) : (
                        <section className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-6">
                                <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2 border-b border-zinc-50 pb-4">
                                    <CreditCard size={14} /> Método de Pago
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {METODOS_PAGO.map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setMetodo(m.id)}
                                            className={`flex items-start gap-4 p-5 border rounded-2xl transition-all text-left group ${metodo === m.id
                                                ? 'border-black bg-zinc-50 shadow-lg shadow-zinc-100'
                                                : 'border-zinc-100 bg-white hover:border-black'
                                                }`}
                                        >
                                            <span className="text-2xl">{m.icon}</span>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-black mb-1">{m.nombre}</p>
                                                <p className="text-[9px] text-zinc-400 font-medium">{m.desc}</p>
                                            </div>
                                            {metodo === m.id && <div className="ml-auto w-4 h-4 bg-black rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-white rounded-full"></div></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {metodo === 'card' && (
                                <div className="p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 space-y-6 animate-in zoom-in-95 duration-300">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Número de Tarjeta</label>
                                            <div className="relative">
                                                <input className="w-full bg-white border border-zinc-200 px-4 py-4 text-sm font-bold tracking-[0.2em] focus:border-black outline-none transition-all rounded-xl" placeholder="0000 0000 0000 0000" />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                                                    <span className="w-6 h-4 bg-zinc-300 rounded-sm"></span>
                                                    <span className="w-6 h-4 bg-zinc-400 rounded-sm"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Expiración (MM/AA)</label>
                                                <input className="w-full bg-white border border-zinc-200 px-4 py-4 text-sm font-bold focus:border-black outline-none rounded-xl" placeholder="12/28" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400">CVC</label>
                                                <input className="w-full bg-white border border-zinc-200 px-4 py-4 text-sm font-bold focus:border-black outline-none rounded-xl" placeholder="***" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleSimularPago}
                                disabled={loading}
                                className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-2xl shadow-zinc-200 disabled:bg-zinc-200 disabled:translate-y-0"
                            >
                                {loading ? (
                                    <>Procesando...</>
                                ) : (
                                    <>
                                        <Lock size={14} /> Pagar ${total.toLocaleString('es-CO')}
                                    </>
                                )}
                            </button>
                        </section>
                    )}

                </div>

                {/* Columna Derecha: Resumen de Orden */}
                <aside className="w-full lg:w-[400px] shrink-0">
                    <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] sticky top-24 space-y-8 shadow-sm">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Tu Selección</h2>

                        <div className="space-y-6">
                            {[1].map((_, i) => (
                                <div key={i} className="flex gap-4 items-center">
                                    <div className="relative w-16 h-16 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-50">
                                        <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Zapato" fill className="object-cover scale-110" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-tight text-black">Air Flex Pro 2026</p>
                                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">Talla 42 • Cant: 1</p>
                                    </div>
                                    <p className="text-[10px] font-black text-black">$320.000</p>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-zinc-50 space-y-3">
                            <div className="flex justify-between text-xs font-medium text-zinc-400">
                                <span className="uppercase tracking-widest text-[9px] font-black">Subtotal</span>
                                <span className="font-bold text-black">${subtotal.toLocaleString('es-CO')}</span>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-zinc-400">
                                <span className="uppercase tracking-widest text-[9px] font-black">Envío DHL Express</span>
                                <span className="font-black text-emerald-500 text-[9px] tracking-widest">GRATIS</span>
                            </div>
                            <div className="pt-4 flex justify-between items-baseline border-t border-zinc-50">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Total</span>
                                <span className="text-2xl font-black text-black">${total.toLocaleString('es-CO')}</span>
                            </div>
                        </div>

                        <div className="p-4 bg-zinc-50 rounded-2xl flex items-center gap-4 border border-zinc-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Truck size={18} className="text-black" />
                            </div>
                            <p className="text-[9px] text-zinc-500 font-medium leading-relaxed">
                                Entrega estimada entre el <strong className="text-black">22 y 25 de Febrero</strong>.
                            </p>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
}
