'use client';
import { useState } from 'react';
import { LayoutGrid, Package, ListOrdered, LogOut } from 'lucide-react';
import GestionProductos from '@/componentes/admin/productos/GestionProductos';
import VistaPedidos from '@/componentes/admin/pedidos/VistaPedidos';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const [tab, setTab] = useState<'productos' | 'pedidos'>('productos');
    const router = useRouter();

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar ya está en layout, pero aquí manejamos el contenido */}
            <div className="flex-1 p-10 max-w-6xl mx-auto">
                <div className="mb-12 flex justify-between items-end border-b border-gray-200 pb-8">
                    <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Bienvenido de nuevo</span>
                        <h1 className="text-4xl font-black text-black uppercase tracking-tighter mt-1">Consola de Control</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setTab('productos')}
                            className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'productos' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:border-black hover:text-black'
                                }`}
                        >
                            <Package size={14} /> Productos
                        </button>
                        <button
                            onClick={() => setTab('pedidos')}
                            className={`flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'pedidos' ? 'bg-black text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:border-black hover:text-black'
                                }`}
                        >
                            <ListOrdered size={14} /> Pedidos
                        </button>
                        <button
                            onClick={() => router.push('/')}
                            className="flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all ml-4"
                        >
                            <LogOut size={14} /> Salir
                        </button>
                    </div>
                </div>

                {tab === 'productos' ? <GestionProductos /> : <VistaPedidos />}
            </div>
        </div>
    );
}
