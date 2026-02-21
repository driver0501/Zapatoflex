import { Router } from 'express';
import * as controller from './pedidos.controller';

const router = Router();

router.get('/', controller.obtenerPedidos);
router.post('/', controller.crearPedido);
router.patch('/:id/estado', controller.actualizarEstadoPedido);

export default router;
