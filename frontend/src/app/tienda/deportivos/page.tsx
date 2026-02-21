'use client';
import { useState, useEffect } from 'react';
import BannerCategoria from '@/componentes/tienda/compartido/BannerCategoria';
import FiltrosCategoria from '@/componentes/tienda/compartido/FiltrosCategoria';
import GridProductos from '@/componentes/tienda/compartido/GridProductos';
import { productosServicio } from '@/lib/admin/servicios/productos';
import { Loader2 } from 'lucide-react';

export default function DeportivosPage() {
    const [productos, setProductos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await productosServicio.listarPorCategoria('Deportivos');
                const adaptados = data.map(p => ({
                    ...p,
                    img: p.imagen
                }));
                setProductos(adaptados);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    return (
        <>
            <BannerCategoria
                titulo="Deportivos"
                subtitulo="Línea de alto rendimiento"
                img="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1600&q=80"
                totalProductos={productos.length}
            />
            <div className="mx-auto max-w-screen-xl px-6 py-10">
                <div className="flex gap-10">
                    <FiltrosCategoria />
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-zinc-200" size={40} />
                            </div>
                        ) : (
                            <GridProductos productos={productos} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
