// Simulación de servicios del catálogo en frontend
export const servicioCatalogo = {
    obtenerTodos: async () => {
        // LLAMADA AL BACKEND REAL: fetch(`${process.env.NEXT_PUBLIC_API_URL}/catalogo`)
        return [
            { id: '1', nombre: 'Zapato Runner Pro', precio: 250000, categoria: 'deportivos' },
            { id: '2', nombre: 'Mocasín Classy', precio: 180000, categoria: 'formales' },
        ];
    },
    obtenerPorCategoria: async (categoria: string) => {
        const productos = await servicioCatalogo.obtenerTodos();
        return productos.filter(p => p.categoria === categoria);
    }
};
