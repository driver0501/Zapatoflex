'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ItemCarrito {
    id: string | number;
    nombre: string;
    precio: number;
    img: string;
    talla: string;
    cantidad: number;
}

interface CarritoContextType {
    items: ItemCarrito[];
    agregarAlCarrito: (producto: any, talla?: string) => void;
    eliminarDelCarrito: (id: string | number, talla: string) => void;
    actualizarCantidad: (id: string | number, talla: string, cantidad: number) => void;
    limpiarCarrito: () => void;
    subtotal: number;
    cantidadTotal: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ItemCarrito[]>([]);
    const [inicializado, setInicializado] = useState(false);

    // Cargar desde localStorage al iniciar
    useEffect(() => {
        const guardado = localStorage.getItem('zapatoflex_carrito');
        if (guardado) {
            try {
                setItems(JSON.parse(guardado));
            } catch (error) {
                console.error('Error al cargar carrito:', error);
            }
        }
        setInicializado(true);
    }, []);

    // Guardar en localStorage cuando cambie
    useEffect(() => {
        if (inicializado) {
            localStorage.setItem('zapatoflex_carrito', JSON.stringify(items));
        }
    }, [items, inicializado]);

    const agregarAlCarrito = (producto: any, talla: string = '40') => {
        setItems(prev => {
            const existe = prev.find(item => item.id === producto.id && item.talla === talla);
            if (existe) {
                return prev.map(item =>
                    (item.id === producto.id && item.talla === talla)
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }
            return [...prev, {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                img: producto.img || producto.imagen,
                talla: talla,
                cantidad: 1
            }];
        });
    };

    const eliminarDelCarrito = (id: string | number, talla: string) => {
        setItems(prev => prev.filter(item => !(item.id === id && item.talla === talla)));
    };

    const actualizarCantidad = (id: string | number, talla: string, cantidad: number) => {
        if (cantidad < 1) return;
        setItems(prev => prev.map(item =>
            (item.id === id && item.talla === talla) ? { ...item, cantidad } : item
        ));
    };

    const limpiarCarrito = () => setItems([]);

    const subtotal = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CarritoContext.Provider value={{
            items,
            agregarAlCarrito,
            eliminarDelCarrito,
            actualizarCantidad,
            limpiarCarrito,
            subtotal,
            cantidadTotal
        }}>
            {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    const context = useContext(CarritoContext);
    if (context === undefined) {
        throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
    }
    return context;
}
