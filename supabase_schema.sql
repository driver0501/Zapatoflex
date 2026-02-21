-- Esquema de Base de Datos para ZapatoFlex

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    nombre TEXT NOT NULL,
    categoria TEXT NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    imagen TEXT,
    descripcion TEXT,
    tallas TEXT[], -- Array de strings para las tallas
    activo BOOLEAN DEFAULT TRUE,
    slug TEXT UNIQUE
);

-- 2. Tabla de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    cliente_nombre TEXT NOT NULL,
    cliente_email TEXT NOT NULL,
    direccion TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    telefono TEXT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    estado TEXT DEFAULT 'pendiente', -- pendiente, procesando, enviado, completado, cancelado
    items JSONB NOT NULL -- Detalle de los productos comprados
);

-- 3. Habilitar RLS (Row Level Security) - Opcional para pruebas iniciales
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Políticas para Productos
DROP POLICY IF EXISTS "Lectura pública de productos" ON productos;
CREATE POLICY "Lectura pública de productos" ON productos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insertar productos" ON productos;
CREATE POLICY "Insertar productos" ON productos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Actualizar productos" ON productos;
CREATE POLICY "Actualizar productos" ON productos FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Eliminar productos" ON productos;
CREATE POLICY "Eliminar productos" ON productos FOR DELETE USING (true);

-- Políticas para Pedidos
DROP POLICY IF EXISTS "Insertar pedidos pública" ON pedidos;
CREATE POLICY "Insertar pedidos pública" ON pedidos FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Lectura de pedidos admin" ON pedidos;
CREATE POLICY "Lectura de pedidos admin" ON pedidos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Actualizar pedidos admin" ON pedidos;
CREATE POLICY "Actualizar pedidos admin" ON pedidos FOR UPDATE USING (true);
