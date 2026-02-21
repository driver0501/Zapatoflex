'use client';
import { useState, useEffect, useRef } from 'react';
import { X, Upload, Save, Info, Tag, Layers, Database, Loader2, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { productosServicio } from '@/lib/admin/servicios/productos';

export interface Producto {
    id: any;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    imagenes: string[]; // Actualizado a array
    descripcion: string;
    tallas: string[];
    activo: boolean;
}

interface ModalProductoProps {
    producto?: Producto | null;
    onClose: () => void;
    onSave: (producto: Producto) => void;
}

const CATEGORIAS = ['Deportivos', 'Casuales', 'Formales'];
const TALLAS_DISPONIBLES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

export default function ModalProducto({ producto, onClose, onSave }: ModalProductoProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [subiendo, setSubiendo] = useState(false);
    const [errorImagen, setErrorImagen] = useState('');

    const [formData, setFormData] = useState<Partial<Producto>>({
        nombre: '',
        categoria: 'Deportivos',
        precio: 0,
        stock: 0,
        imagenes: [], // Inicializado como array vacío
        descripcion: '',
        tallas: [],
        activo: true
    });

    useEffect(() => {
        if (producto) {
            // Manejamos la compatibilidad si el producto viejo tiene 'imagen' en lugar de 'imagenes'
            const dataBase = { ...producto };
            if ((producto as any).imagen && !producto.imagenes) {
                dataBase.imagenes = [(producto as any).imagen];
            }
            setFormData(dataBase);
        }
    }, [producto]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? Number(value) : value
        }));
    };

    const toggleTalla = (talla: string) => {
        setFormData(prev => {
            const tallasActuales = prev.tallas || [];
            const nuevasTallas = tallasActuales.includes(talla)
                ? tallasActuales.filter(t => t !== talla)
                : [...tallasActuales, talla];
            return { ...prev, tallas: nuevasTallas };
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        await subirArchivos(Array.from(files));
    };

    const subirArchivos = async (files: File[]) => {
        try {
            setSubiendo(true);
            setErrorImagen('');
            const { urls } = await productosServicio.subirImagenes(files);
            setFormData(prev => ({
                ...prev,
                imagenes: [...(prev.imagenes || []), ...urls]
            }));
        } catch (error) {
            console.error('Error al subir imágenes:', error);
            setErrorImagen('Error al subir las imágenes. Intenta de nuevo.');
        } finally {
            setSubiendo(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const eliminarImagen = (index: number) => {
        setFormData(prev => ({
            ...prev,
            imagenes: (prev.imagenes || []).filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload: any = {
            nombre: formData.nombre || '',
            categoria: formData.categoria || 'Deportivos',
            precio: formData.precio || 0,
            stock: formData.stock || 0,
            imagenes: formData.imagenes || [],
            descripcion: formData.descripcion || '',
            tallas: formData.tallas || [],
            activo: formData.activo !== undefined ? formData.activo : true,
        };

        // Fallback para compatibilidad con código que aún busque 'imagen' (mira la primera del array)
        if (payload.imagenes.length > 0) {
            payload.imagen = payload.imagenes[0];
        }

        if (producto?.id) payload.id = producto.id;
        onSave(payload);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">

                {/* Cabecera */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
                            {producto ? <Layers className="text-gray-400" size={20} /> : <Tag className="text-gray-400" size={20} />}
                            {producto ? 'Gestionar Galería y Detalles' : 'Crear Nuevo Lanzamiento'}
                        </h2>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Selecciona múltiples fotos para tu producto</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Cuerpo con Scroll */}
                <div className="flex-1 overflow-y-auto p-8">
                    <form id="form-producto" onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Columna Izquierda: Información Básica */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Info size={12} /> Nombre del Calzado
                                    </label>
                                    <input
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full border-b-2 border-gray-100 py-2 font-bold text-lg focus:border-black outline-none transition-colors"
                                        placeholder="Ej: Air Max Flex v2"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Categoría</label>
                                        <select
                                            name="categoria"
                                            value={formData.categoria}
                                            onChange={handleChange}
                                            className="w-full border-b-2 border-gray-100 py-2 font-bold focus:border-black outline-none bg-transparent"
                                        >
                                            {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Precio (COP)</label>
                                        <input
                                            name="precio"
                                            type="number"
                                            value={formData.precio}
                                            onChange={handleChange}
                                            className="w-full border-b-2 border-gray-100 py-2 font-bold focus:border-black outline-none"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Descripción Detallada</label>
                                    <textarea
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full border-2 border-gray-100 p-4 font-medium text-sm focus:border-black outline-none transition-colors resize-none"
                                        placeholder="Materiales, tecnología y estilo..."
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                        <Database size={12} /> Tallas Disponibles
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {TALLAS_DISPONIBLES.map(talla => (
                                            <button
                                                key={talla}
                                                type="button"
                                                onClick={() => toggleTalla(talla)}
                                                className={`w-12 h-10 text-xs font-bold border transition-all ${formData.tallas?.includes(talla)
                                                    ? 'bg-black text-white border-black shadow-md'
                                                    : 'bg-white text-gray-400 border-gray-100 hover:border-gray-400 hover:text-black'
                                                    }`}
                                            >
                                                {talla}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha: Galería Múltiple */}
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center justify-between">
                                        <span className="flex items-center gap-2"><ImageIcon size={12} /> Galería de Fotos del Producto</span>
                                        <span className="text-[9px] lowercase text-gray-400">Máx. 8 fotos</span>
                                    </label>

                                    {/* ÁREA DE CARGA MÚLTIPLE */}
                                    <div
                                        onClick={() => !subiendo && fileInputRef.current?.click()}
                                        className={`relative aspect-video bg-gray-50 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${subiendo ? 'border-gray-100' : 'border-gray-200 hover:border-black hover:bg-gray-100/50'}`}
                                    >
                                        {subiendo && (
                                            <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center gap-2">
                                                <Loader2 size={32} className="animate-spin text-black" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.2em]">Subiendo galería...</p>
                                            </div>
                                        )}
                                        <div className="text-center p-6 space-y-2">
                                            <Upload className="mx-auto text-gray-300 group-hover:text-black transition-colors" size={28} />
                                            <p className="text-[10px] text-black font-black uppercase tracking-widest">Haz clic o arrastra fotos aquí</p>
                                            <p className="text-[8px] text-gray-400 font-medium uppercase tracking-widest">Puedes seleccionar varias fotos a la vez</p>
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                        />
                                    </div>

                                    {/* PREVISUALIZACIÓN DE GALERÍA */}
                                    {formData.imagenes && formData.imagenes.length > 0 && (
                                        <div className="grid grid-cols-4 gap-3 pt-2">
                                            {formData.imagenes.map((url, index) => (
                                                <div key={index} className="group relative aspect-square bg-white border border-gray-100 rounded-md overflow-hidden shadow-sm">
                                                    <Image src={url} alt={`Foto ${index + 1}`} fill className="object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => eliminarImagen(index)}
                                                        className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                    {index === 0 && (
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 text-center">
                                                            <p className="text-[7px] font-black text-white uppercase tracking-tighter">Portada</p>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {errorImagen && <p className="text-[9px] font-bold text-red-500 uppercase">{errorImagen}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stock Inicial</label>
                                        <input
                                            name="stock"
                                            type="number"
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className="w-full border-b-2 border-gray-100 py-2 font-bold focus:border-black outline-none bg-transparent"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-end pb-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div
                                                onClick={() => setFormData(prev => ({ ...prev, activo: !prev.activo }))}
                                                className={`w-12 h-6 rounded-full transition-colors relative ${formData.activo ? 'bg-black' : 'bg-gray-200'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.activo ? 'left-7' : 'left-1'}`} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover:translate-x-1 transition-transform">En Venta</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer del Modal */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        form="form-producto"
                        type="submit"
                        disabled={subiendo}
                        className="bg-black text-white px-10 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {producto ? <Save size={14} /> : <ImageIcon size={14} />} {producto ? 'Guardar Cambios' : 'Lanzar al Mercado'}
                    </button>
                </div>
            </div>
        </div>
    );
}
