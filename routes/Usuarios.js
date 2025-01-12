import express from 'express';
import { usuarioController } from '../controllers/Usuarios.js';

const router = express.Router();

// Rutas para usuarios
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuario);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

export default router;
