import type { Metadata } from "next";
import "./globals.css";
import BarraNavegacion from "@/componentes/tienda/layout/BarraNavegacion";
import PiePagina from "@/componentes/tienda/layout/PiePagina";

export const metadata: Metadata = {
    title: "ZapatoFlex",
    description: "La mejor plataforma de venta de calzado en Colombia",
};

import { CarritoProvider } from "@/contexto/CarritoContext";
import { FavoritosProvider } from "@/contexto/FavoritosContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet" />
            </head>
            <body className="flex min-h-screen flex-col bg-white antialiased">
                <FavoritosProvider>
                    <CarritoProvider>
                        <BarraNavegacion />
                        <main className="flex-1">{children}</main>
                        <PiePagina />
                    </CarritoProvider>
                </FavoritosProvider>
            </body>
        </html>
    );
}
