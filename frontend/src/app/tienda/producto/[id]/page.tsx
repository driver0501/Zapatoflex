'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ShoppingBag, ChevronLeft, Star, ShieldCheck, Truck, RefreshCw, Minus, Plus, Heart, Info, CheckCircle2 } from 'lucide-react';
import { useCarrito } from '@/contexto/CarritoContext';
import { useFavoritos } from '@/contexto/FavoritosContext';
import { productosServicio } from '@/lib/admin/servicios/productos';
import TarjetaProducto from '@/componentes/tienda/compartido/TarjetaProducto';

export default function PaginaDetalleProducto() {
    const { id } = useParams();
    const router = useRouter();
    const { agregarAlCarrito } = useCarrito();
    const { toggleFavorito, esFavorito } = useFavoritos();

    const [producto, setProducto] = useState<any>(null);
    const [cargando, setCargando] = useState(true);
    const [tallaSeleccionada, setTallaSeleccionada] = useState<string>('');
    const [imagenActiva, setImagenActiva] = useState(0);
    const [cantidad, setCantidad] = useState(1);
    const [relacionados, setRelacionados] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            cargarDatos();
        }
    }, [id]);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const data = await productosServicio.obtenerPorId(id as string);
            setProducto(data);

            // Cargar relacionados (misma categoría)
            const todos = await productosServicio.listarPorCategoria(data.categoria);
            setRelacionados(todos.filter((p: any) => p.id !== data.id));

            if (data.tallas?.length > 0) {
                setTallaSeleccionada(data.tallas[0]);
            }
        } catch (error) {
            console.error('Error al cargar producto:', error);
        } finally {
            setCargando(false);
        }
    };

    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Cargando Experiencia...</p>
                </div>
            </div>
        );
    }

    if (!producto) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
                <h1 className="text-2xl font-black uppercase mb-4">Producto no encontrado</h1>
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline"
                >
                    <ChevronLeft size={16} /> Volver a la tienda
                </button>
            </div>
        );
    }

    const imagenes = producto.imagenes || [producto.imagen || producto.img];

    return (
        <main className="bg-white min-h-screen">
            {/* VOLVER */}
            <div className="max-w-screen-xl mx-auto px-6 py-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                    <ChevronLeft size={14} /> Volver a la tienda
                </button>
            </div>

            <div className="max-w-screen-xl mx-auto px-6 lg:flex gap-16 pb-20">

                {/* LADO IZQUIERDO: GALERÍA DE ALTA FIDELIDAD */}
                <div className="lg:w-3/5">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Contenedor de Miniaturas (Izquierda en Desktop) */}
                        <div className="order-2 md:order-1 flex md:flex-col gap-3 w-full md:w-24 overflow-x-auto md:overflow-y-auto no-scrollbar py-1">
                            {imagenes.map((img: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setImagenActiva(idx)}
                                    onMouseEnter={() => setImagenActiva(idx)} // Opcional: cambio al pasar el mouse
                                    className={`relative flex-shrink-0 aspect-square w-16 md:w-full border-2 rounded-md transition-all duration-200 ${imagenActiva === idx ? 'border-black shadow-sm' : 'border-gray-50 opacity-60 hover:opacity-100 hover:border-gray-300'}`}
                                >
                                    <Image
                                        src={img}
                                        alt={`Vista ${idx + 1}`}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Contenedor Imagen Principal (Grande) */}
                        <div className="order-1 md:order-2 relative flex-1 aspect-square bg-gray-50 border border-gray-100 rounded-lg overflow-hidden group shadow-sm">
                            <Image
                                src={imagenes[imagenActiva]}
                                alt={producto.nombre}
                                fill
                                className="object-contain p-4 md:p-12 transition-all duration-500 group-hover:scale-110"
                                priority
                            />

                            {/* Tags sobre la imagen */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {producto.nuevo && (
                                    <span className="bg-black text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest shadow-lg">
                                        NUEVO
                                    </span>
                                )}
                                {producto.stock <= 3 && producto.stock > 0 && (
                                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 uppercase tracking-widest shadow-lg">
                                        ÚLTIMAS {producto.stock} UDS
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* LADO DERECHO: INFO */}
                <div className="lg:w-2/5 mt-10 lg:mt-0 space-y-8">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-black tracking-[0.3em] text-gray-400 uppercase">
                                {producto.categoria}
                            </p>
                            <span className={`text-[9px] font-black px-2 py-1 uppercase tracking-widest rounded-full ${producto.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {producto.activo ? 'Disponible' : 'No disponible'}
                            </span>
                        </div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-black leading-tight">
                            {producto.nombre}
                        </h1>
                        <div className="flex items-baseline gap-4 pt-2">
                            <span className="text-3xl font-black text-black">
                                ${Number(producto.precio).toLocaleString('es-CO')}
                            </span>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">IVA Incluido</span>
                        </div>
                    </div>

                    {/* DESCRIPCIÓN (Campo del Admin) */}
                    <div className="space-y-4">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-black flex items-center gap-2">
                            <Info size={14} className="text-gray-400" /> Descripción del Calzado
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                            {producto.descripcion}
                        </p>
                    </div>

                    {/* SELECTOR DE TALLAS */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black">Seleccionar Talla (EU)</label>
                            <button className="text-[10px] font-bold text-gray-400 underline uppercase tracking-widest">Guía de tallas</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {producto.tallas?.map((talla: string) => (
                                <button
                                    key={talla}
                                    onClick={() => setTallaSeleccionada(talla)}
                                    className={`w-14 h-12 text-xs font-black border transition-all ${tallaSeleccionada === talla
                                        ? 'bg-black text-white border-black shadow-lg scale-105'
                                        : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'
                                        }`}
                                >
                                    {talla}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CANTIDAD Y STOCK */}
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black">Cantidad</label>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stock: {producto.stock} uds.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center border border-gray-200 h-14">
                                <button
                                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                    className="px-5 h-full hover:bg-gray-50 text-black transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center text-sm font-black">{cantidad}</span>
                                <button
                                    onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                                    className="px-5 h-full hover:bg-gray-50 text-black transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <button
                                onClick={() => toggleFavorito(producto)}
                                className={`flex-1 flex items-center justify-center gap-2 border transition-colors text-[10px] font-black uppercase tracking-widest h-14 ${esFavorito(producto.id)
                                    ? 'bg-red-50 border-red-200 text-red-600'
                                    : 'border-gray-200 text-black hover:bg-gray-50'
                                    }`}
                            >
                                <Heart size={18} className={esFavorito(producto.id) ? 'fill-red-600' : ''} />
                                {esFavorito(producto.id) ? 'En Favoritos' : 'Favoritos'}
                            </button>
                        </div>
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="space-y-4 pt-4">
                        <button
                            onClick={() => {
                                for (let i = 0; i < cantidad; i++) agregarAlCarrito(producto, tallaSeleccionada);
                            }}
                            disabled={!tallaSeleccionada || producto.stock === 0}
                            className="w-full bg-white border-2 border-black text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all shadow-xl disabled:bg-gray-100 disabled:border-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed group"
                        >
                            <ShoppingBag size={18} />
                            {producto.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
                        </button>
                        <button
                            className="w-full bg-black text-white py-5 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-gray-800 transition-all shadow-xl"
                        >
                            Comprar Ahora
                        </button>
                    </div>

                    {/* GARANTÍAS */}
                    <div className="space-y-4 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 text-green-600">
                            <CheckCircle2 size={16} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Envío gratis disponible en este producto</p>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center space-y-2">
                                <Truck className="mx-auto text-gray-400" size={24} strokeWidth={1} />
                                <p className="text-[8px] font-bold uppercase tracking-widest leading-tight text-gray-400">Entrega<br />Global</p>
                            </div>
                            <div className="text-center space-y-2">
                                <ShieldCheck className="mx-auto text-gray-400" size={24} strokeWidth={1} />
                                <p className="text-[8px] font-bold uppercase tracking-widest leading-tight text-gray-400">Pago<br />Seguro</p>
                            </div>
                            <div className="text-center space-y-2">
                                <RefreshCw className="mx-auto text-gray-400" size={24} strokeWidth={1} />
                                <p className="text-[8px] font-bold uppercase tracking-widest leading-tight text-gray-400">Cambio<br />Garantizado</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN RELACIONADOS: TE PODRÍAN GUSTAR */}
            {relacionados.length > 0 && (
                <section className="bg-white py-24 border-t border-gray-100 overflow-hidden">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="flex flex-col items-center mb-16 text-center">
                            <p className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase mb-3">Recomendaciones para ti</p>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
                                TE PODRÍAN GUSTAR
                            </h2>
                            <div className="w-12 h-1 bg-black mt-6"></div>
                        </div>

                        {/* Carrusel horizontal */}
                        <div className="relative group">
                            <div className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar">
                                {relacionados.map((p) => (
                                    <div key={p.id} className="min-w-[280px] md:min-w-[320px] snap-start">
                                        <TarjetaProducto producto={p} />
                                    </div>
                                ))}
                            </div>

                            {/* Gradiente sutil para indicar más contenido */}
                            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-60"></div>
                        </div>
                    </div>
                </section>
            )}

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </main>
    );
}
