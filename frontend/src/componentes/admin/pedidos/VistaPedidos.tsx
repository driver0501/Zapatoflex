'use client';
import { ShoppingBag, Clock, CheckCircle, Search, Filter, Eye, User, Calendar, CreditCard, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { pedidosServicio } from '@/lib/admin/servicios/pedidos';

interface Pedido {
    id: number;
    created_at: string;
    cliente_nombre: string;
    cliente_email: string;
    total: number;
    estado: 'pendiente' | 'entregado' | 'procesando' | 'cancelado';
    metodoPago?: string;
    items: any;
}

const ESTADOS = {
    entregado: { color: 'text-green-600 bg-green-50 border-green-100', icon: CheckCircle, label: 'Entregado' },
    procesando: { color: 'text-blue-600 bg-blue-50 border-blue-100', icon: Clock, label: 'En Proceso' },
    pendiente: { color: 'text-amber-600 bg-amber-50 border-amber-100', icon: Clock, label: 'Pendiente' },
    cancelado: { color: 'text-red-600 bg-red-50 border-red-100', icon: CheckCircle, label: 'Cancelado' }
};

export default function VistaPedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        cargarPedidos();
    }, []);

    const cargarPedidos = async () => {
        try {
            setLoading(true);
            const data = await pedidosServicio.listar();
            setPedidos(data);
        } catch (error) {
            console.error('Error al cargar pedidos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleActualizarEstado = async (id: number, nuevoEstado: string) => {
        try {
            await pedidosServicio.actualizarEstado(id, nuevoEstado);
            await cargarPedidos();
        } catch (error) {
            alert('Error al actualizar el estado');
        }
    };

    const pedidosFiltrados = pedidos.filter(p =>
        p.cliente_nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.id.toString().includes(busqueda)
    );

    // KPIs Reales
    const stats = [
        { label: 'Pedidos Hoy', value: pedidos.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).length.toString(), icon: ShoppingBag, color: 'text-black' },
        { label: 'En Proceso', value: pedidos.filter(p => p.estado === 'procesando').length.toString(), icon: Clock, color: 'text-blue-600' },
        { label: 'Pendientes', value: pedidos.filter(p => p.estado === 'pendiente').length.toString(), icon: Clock, color: 'text-amber-600' },
        { label: 'Total Ventas', value: `$${(pedidos.reduce((acc, curr) => acc + Number(curr.total), 0) / 1000000).toFixed(1)}M`, icon: CreditCard, color: 'text-green-600' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Resumen de actividad rápido */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map(stat => (
                    <div key={stat.label} className="bg-white p-6 border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</p>
                                <p className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
                            </div>
                            <stat.icon size={18} className="text-zinc-200" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de Lista */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 border border-zinc-100 shadow-sm rounded-xl">
                <div className="relative flex-1 w-full md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente, email o número de orden..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full bg-zinc-50 border-none pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 ring-black/5 transition-all outline-none rounded-lg"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-zinc-100 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-black hover:border-black transition-all rounded-lg">
                        <Filter size={14} /> Filtros
                    </button>
                    <button onClick={cargarPedidos} className="p-3 bg-zinc-50 text-zinc-400 hover:text-black transition-colors rounded-lg">
                        <Loader2 className={loading ? 'animate-spin' : ''} size={18} />
                    </button>
                </div>
            </div>

            {/* Tabla Premium */}
            <div className="bg-white border border-zinc-100 shadow-sm rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-zinc-200" size={40} />
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Consultando Transacciones...</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50/50 border-b border-zinc-100">
                                    <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Orden</th>
                                    <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Cliente</th>
                                    <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Total</th>
                                    <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">Estado</th>
                                    <th className="px-8 py-5 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {pedidosFiltrados.map(p => {
                                    const statusCfg = ESTADOS[p.estado] || ESTADOS.pendiente;
                                    return (
                                        <tr key={p.id} className="group hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-black group-hover:text-blue-600 transition-colors cursor-pointer">#ZF-{p.id}</p>
                                                <div className="flex items-center gap-1.5 mt-1 text-zinc-400">
                                                    <Calendar size={10} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest">
                                                        {new Date(p.created_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 uppercase font-black text-[10px]">
                                                        {p.cliente_nombre?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-black text-black uppercase tracking-tight">{p.cliente_nombre}</p>
                                                        <p className="text-[10px] font-medium text-zinc-400 lowercase">{p.cliente_email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-black">${Number(p.total).toLocaleString()}</p>
                                                <div className="flex items-center gap-1.5 mt-1 text-zinc-500">
                                                    <span className="text-[10px] font-black uppercase tracking-widest bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-400">Venta Online</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] border rounded-full ${statusCfg.color}`}>
                                                    <statusCfg.icon size={12} />
                                                    {statusCfg.label}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="inline-flex items-center gap-2 px-4 py-2 text-[9px] font-black uppercase tracking-widest border border-zinc-100 text-zinc-400 hover:text-black hover:border-black transition-all rounded-lg group/btn">
                                                    <Eye size={14} className="group-hover/btn:scale-110 transition-transform" /> Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {!loading && pedidosFiltrados.length === 0 && (
                    <div className="p-20 text-center">
                        <ShoppingBag className="mx-auto text-zinc-100 mb-4" size={48} />
                        <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">No se encontraron órdenes</p>
                    </div>
                )}
            </div>
        </div>
    );
}
