// Configuración compartida de la API
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const clienteAPI = {
    get: async (endpoint: string) => {
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) throw new Error('Error en la petición');
        return res.json();
    },
    post: async (endpoint: string, datos: any) => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });
        return res.json();
    }
};
