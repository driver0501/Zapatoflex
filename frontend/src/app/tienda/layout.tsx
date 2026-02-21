// El Navbar y Footer ya vienen del app/layout.tsx (layout raíz).
// Este layout solo propaga los children de las rutas bajo /tienda.
export default function TiendaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
