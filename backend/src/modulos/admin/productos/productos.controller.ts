import { Request, Response } from 'express';
import { supabase } from '../../../lib/supabase';
import multer from 'multer';

// Configuración de Multer para memoria (para subir a Supabase directamente)
const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB por archivo
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes'));
        }
    }
});

/**
 * Sube múltiples imágenes al bucket de Supabase
 */
export const subirImagenes = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No se han subido archivos' });
        }

        const promesasSubida = files.map(async (file) => {
            const fileExt = file.originalname.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
            const filePath = `productos/${fileName}`;

            const { error } = await supabase.storage
                .from('productos')
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: false
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase.storage
                .from('productos')
                .getPublicUrl(filePath);

            return publicUrl;
        });

        const urls = await Promise.all(promesasSubida);
        res.json({ urls });
    } catch (error: any) {
        console.error('Error en controlador subirImagenes:', error.message);
        res.status(500).json({ error: error.message });
    }
};

export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const obtenerProductoPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('productos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return res.status(404).json({ error: 'Producto no encontrado' });

        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const crearProducto = async (req: Request, res: Response) => {
    try {
        // Aseguramos que el payload use el campo 'imagenes'
        const { data, error } = await supabase
            .from('productos')
            .insert([req.body])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const actualizarProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('productos')
            .update(req.body)
            .eq('id', id)
            .select();

        if (error) throw error;
        res.json(data[0]);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('productos')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ mensaje: 'Producto eliminado con éxito' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
