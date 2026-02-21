'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProductoFavorito {
    id: string | number;
    nombre: string;
    precio: number;
    imagen: string;
    categoria: string;
}

interface FavoritosContextType {
    favoritos: ProductoFavorito[];
    toggleFavorito: (producto: ProductoFavorito) => void;
    esFavorito: (id: string | number) => boolean;
    cantidadFavoritos: number;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
    const [favoritos, setFavoritos] = useState<ProductoFavorito[]>([]);
    const [inicializado, setInicializado] = useState(false);

    // Cargar desde localStorage
    useEffect(() => {
        const guardado = localStorage.getItem('zapatoflex_favoritos');
        if (guardado) {
            try {
                setFavoritos(JSON.parse(guardado));
            } catch (error) {
                console.error('Error al cargar favoritos:', error);
            }
        }
        setInicializado(true);
    }, []);

    // Guardar en localStorage
    useEffect(() => {
        if (inicializado) {
            localStorage.setItem('zapatoflex_favoritos', JSON.stringify(favoritos));
        }
    }, [favoritos, inicializado]);

    const toggleFavorito = (producto: ProductoFavorito) => {
        setFavoritos(prev => {
            const existe = prev.some(fav => fav.id === producto.id);
            if (existe) {
                return prev.filter(fav => fav.id !== producto.id);
            }
            return [...prev, producto];
        });
    };

    const esFavorito = (id: string | number) => {
        return favoritos.some(fav => fav.id === id);
    };

    const cantidadFavoritos = favoritos.length;

    return (
        <FavoritosContext.Provider value={{
            favoritos,
            toggleFavorito,
            esFavorito,
            cantidadFavoritos
        }}>
            {children}
        </FavoritosContext.Provider>
    );
}

export function useFavoritos() {
    const context = useContext(FavoritosContext);
    if (context === undefined) {
        throw new Error('useFavoritos debe usarse dentro de un FavoritosProvider');
    }
    return context;
}
