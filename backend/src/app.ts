import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { registrador } from './lib/registrador';

// Importar Rutas
import rutasProductos from './modulos/admin/productos/productos.routes';
import rutasPedidos from './modulos/tienda/pedidos/pedidos.routes';

const app = express();

// Middlewares Globales
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas Base
app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenido a la API de ZapatoFlex' });
});

// Registrar Módulos
app.use('/api/productos', rutasProductos);
app.use('/api/pedidos', rutasPedidos);

export default app;
