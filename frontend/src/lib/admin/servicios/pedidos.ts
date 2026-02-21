import { clienteAPI } from '../../compartido/api';

export const pedidosServicio = {
    listar: async () => {
        return clienteAPI.get('/api/pedidos');
    },
    crear: async (pedido: any) => {
        return clienteAPI.post('/api/pedidos', pedido);
    },
    actualizarEstado: async (id: number, estado: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/pedidos/${id}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado }),
        });
        return res.json();
    }
};
