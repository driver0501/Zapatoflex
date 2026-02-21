import HeroPrincipal from '@/componentes/tienda/principal/HeroPrincipal';
import CategoriasDestacadas from '@/componentes/tienda/principal/CategoriasDestacadas';
import ProductosDestacados from '@/componentes/tienda/principal/ProductosDestacados';
import BannerPromocional from '@/componentes/tienda/principal/BannerPromocional';
import BeneficiosTienda from '@/componentes/tienda/principal/BeneficiosTienda';
import LlamadaAccion from '@/componentes/tienda/principal/LlamadaAccion';

// Página principal: Navbar y Footer vienen del app/layout.tsx
export default function TiendaPage() {
    return (
        <>
            <HeroPrincipal />
            <CategoriasDestacadas />
            <ProductosDestacados />
            <BannerPromocional />
            <BeneficiosTienda />
            <LlamadaAccion />
        </>
    );
}
