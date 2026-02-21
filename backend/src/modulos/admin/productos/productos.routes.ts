import { Router } from 'express';
import * as controller from './productos.controller';

const router = Router();

router.get('/', controller.obtenerProductos);
router.get('/:id', controller.obtenerProductoPorId);
router.post('/', controller.crearProducto);
router.put('/:id', controller.actualizarProducto);
router.delete('/:id', controller.eliminarProducto);

// Ruta para carga de múltiples imágenes
router.post('/upload', controller.upload.array('imagenes', 8), controller.subirImagenes);

export default router;
