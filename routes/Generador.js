import express from 'express';
import { generacionController } from '../controllers/Generador.js';

const router = express.Router();

// Rutas para generaciones
router.post('/crear', generacionController.crearGeneracion);
router.get('/usuario/:id_usuario', generacionController.obtenerGeneracionesPorUsuario);
router.get('/sin-usuario', generacionController.obtenerGeneracionesSinUsuario);

export default router;
