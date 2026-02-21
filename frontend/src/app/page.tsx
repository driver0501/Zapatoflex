import HeroPrincipal from '@/componentes/tienda/principal/HeroPrincipal';
import CategoriasDestacadas from '@/componentes/tienda/principal/CategoriasDestacadas';
import ProductosDestacados from '@/componentes/tienda/principal/ProductosDestacados';
import BannerPromocional from '@/componentes/tienda/principal/BannerPromocional';
import BeneficiosTienda from '@/componentes/tienda/principal/BeneficiosTienda';
import LlamadaAccion from '@/componentes/tienda/principal/LlamadaAccion';

// Raíz de la tienda
export default function RootPage() {
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
