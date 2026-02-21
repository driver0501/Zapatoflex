'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package, Search, Filter, Loader2 } from 'lucide-react';
import Image from 'next/image';
import ModalProducto, { type Producto } from './ModalProducto';
import { productosServicio } from '@/lib/admin/servicios/productos';

export default function GestionProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState<Producto | null>(null);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            setLoading(true);
            const data = await productosServicio.listar();
            setProductos(data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (producto: any) => {
        try {
            if (productoAEditar) {
                await productosServicio.actualizar(productoAEditar.id, producto);
            } else {
                await productosServicio.crear(producto);
            }
            await cargarProductos();
            closeModal();
        } catch (error: any) {
            console.error('Error detallado:', error);
            const mensajeError = error.response?.data?.error || error.message || 'Error desconocido';
            alert(`Error al guardar el producto: ${mensajeError}`);
        }
    };

    const openModal = (p?: Producto) => {
        if (p) setProductoAEditar(p);
        setModalAbierto(true);
    };

    const closeModal = () => {
        setModalAbierto(false);
        setProductoAEditar(null);
    };

    const handleEliminar = async (id: number) => {
        if (confirm('¿Seguro que desea eliminar este producto del catálogo?')) {
            try {
                await productosServicio.eliminar(id);
                setProductos(productos.filter(p => p.id !== id));
            } catch (error) {
                alert('Error al eliminar el producto');
            }
        }
    };

    const productosFiltrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="space-y-10">
            {/* Header de Sección con Filtros */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 border border-zinc-100 shadow-sm rounded-xl">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-black flex items-center gap-3">
                        Inventario <span className="bg-zinc-50 text-zinc-400 text-[10px] px-3 py-1 rounded-full">{productos.length}</span>
                    </h2>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Panel de control de mercacía</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o categoría..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full bg-zinc-50 border-none pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 ring-black/5 transition-all outline-none rounded-lg"
                        />
                    </div>
                    <button className="p-3 bg-zinc-50 text-zinc-300 hover:text-black transition-colors rounded-lg">
                        <Filter size={18} />
                    </button>
                    <button
                        onClick={() => openModal()}
                        className="bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-zinc-800 transition-all shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] rounded-lg"
                    >
                        <Plus size={16} /> Alta de Producto
                    </button>
                </div>
            </div>

            {/* Lista de Productos Premium */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-zinc-200" size={40} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Sincronizando Inventario Real...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {productosFiltrados.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-dashed border-zinc-200 rounded-3xl">
                            <Package size={48} className="mx-auto text-zinc-100 mb-4" />
                            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">No hay productos en esta categoría</p>
                        </div>
                    ) : (
                        productosFiltrados.map(p => (
                            <div key={p.id} className="group bg-white p-6 border border-zinc-100 shadow-sm rounded-xl flex flex-col md:flex-row items-center gap-8 transition-all hover:shadow-md hover:border-zinc-200">
                                {/* Imagen con badge de estado */}
                                <div className="relative w-32 h-32 flex-shrink-0 bg-zinc-50 overflow-hidden rounded-lg">
                                    <a href={p.imagen} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group/img">
                                        <Image src={p.imagen || 'https://via.placeholder.com/128'} alt={p.nombre} fill className="object-cover group-hover/img:scale-110 transition-transform duration-500" sizes="128px" />
                                        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors flex items-center justify-center">
                                            <Plus className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity" size={24} />
                                        </div>
                                    </a>
                                    <div className={`absolute top-2 left-2 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-sm ${p.activo ? 'bg-emerald-500 text-white' : 'bg-zinc-400 text-white'}`}>
                                        {p.activo ? 'Activo' : 'Pausado'}
                                    </div>
                                </div>

                                {/* Información Central */}
                                <div className="flex-1 space-y-3 w-full">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">{p.categoria}</span>
                                            <h3 className="text-xl font-black text-black uppercase tracking-tight group-hover:text-zinc-700 transition-colors lowercase first-letter:uppercase">{p.nombre}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-black tracking-tight">${Number(p.precio).toLocaleString()}</p>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Precio Unitario</p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-zinc-500 line-clamp-1 font-medium">{p.descripcion}</p>

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-100">
                                            <Package size={12} className="text-zinc-300" />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${p.stock < 10 ? 'text-red-500' : 'text-zinc-600'}`}>
                                                Stock: {p.stock} UNI
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-md border border-zinc-100">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Tallas:</span>
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                                                {p.tallas?.slice(0, 3).join(', ')}{p.tallas?.length > 3 ? '...' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Acciones Laterales */}
                                <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                    <button
                                        onClick={() => openModal(p)}
                                        className="flex-1 md:w-32 flex items-center justify-center gap-2 border border-zinc-100 py-3 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-black hover:border-black transition-all rounded-lg group/btn"
                                    >
                                        <Edit size={14} className="group-hover/btn:scale-110 transition-transform" /> Editar
                                    </button>
                                    <button
                                        onClick={() => handleEliminar(p.id)}
                                        className="flex-1 md:w-32 flex items-center justify-center gap-2 border border-zinc-100 py-3 text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all rounded-lg group/btn"
                                    >
                                        <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Modal de Producto */}
            {modalAbierto && (
                <ModalProducto
                    producto={productoAEditar}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}
