import express from 'express';
import { usuarioController } from '../controllers/Usuarios.js';

const router = express.Router();

// Rutas para usuarios
router.get('/', usuarioController.getUsuarios);
router.get('/:id', usuarioController.getUsuario);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

router.post('/login', usuarioController.login); // Inicio de sesión
router.get('/session', usuarioController.getSession); // Verificar sesión activa
router.post('/logout', usuarioController.logout); // Cerrar sesión

export default router;
