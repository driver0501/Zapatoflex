import { Request, Response } from 'express';
import { supabase } from '../../../lib/supabase';

export const obtenerPedidos = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearPedido = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .insert([req.body])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarEstadoPedido = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const { data, error } = await supabase
            .from('pedidos')
            .update({ estado })
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
