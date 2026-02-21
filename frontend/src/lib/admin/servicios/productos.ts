import { clienteAPI } from '../../compartido/api';
import { type Producto } from '@/componentes/admin/productos/ModalProducto';

export const productosServicio = {
    listar: async (): Promise<Producto[]> => {
        return clienteAPI.get('/api/productos');
    },
    obtenerPorId: async (id: string | number): Promise<Producto> => {
        return clienteAPI.get(`/api/productos/${id}`);
    },
    listarPorCategoria: async (categoria: string): Promise<Producto[]> => {
        const todos = await clienteAPI.get('/api/productos');
        return todos.filter((p: Producto) => p.categoria.toLowerCase() === categoria.toLowerCase());
    },
    crear: async (producto: Omit<Producto, 'id'>): Promise<Producto> => {
        return clienteAPI.post('/api/productos', producto);
    },
    actualizar: async (id: number, producto: Partial<Producto>): Promise<Producto> => {
        // clienteAPI.put no existe, lo implementaré en api.ts o usaré post con lógica de actualización
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        return res.json();
    },
    eliminar: async (id: number): Promise<void> => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/productos/${id}`, {
            method: 'DELETE',
        });
    },
    subirImagenes: async (archivos: File[]): Promise<{ urls: string[] }> => {
        const formData = new FormData();
        archivos.forEach(archivo => {
            formData.append('imagenes', archivo);
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/productos/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Error al subir las imágenes');
        return res.json();
    }
};
