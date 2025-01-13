import jwt from 'jsonwebtoken';
import { usuarioService } from '../services/Usuarios.js';

export const usuarioController = {
  async login(req, res) {
    try {
      console.log('Solicitud recibida en /login:', req.body);

      const { email, password } = req.body;

      if (!email || !password) {
        console.log('Faltan datos: email o password no proporcionados.');
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      }

      // Obtener usuario por email
      const usuarioData = await usuarioService.obtenerUsuarioPorEmail(email);
      console.log('Usuario obtenido:', usuarioData);

      if (!usuarioData) {
        console.log(`Usuario con email ${email} no encontrado.`);
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Comparar contraseñas
      if (password !== usuarioData.contrasenia) {
        console.log(`Contraseña inválida para el usuario con email ${email}.`);
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: usuarioData.id_usuario, email: usuarioData.email },
        process.env.JWT_SECRET || 'mi_secreto_jwt',
        { expiresIn: '1h' }
      );
      console.log('Token generado:', token);

      // Responder con éxito
      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuarioData.id_usuario,
          nombres: usuarioData.nombres,
          email: usuarioData.email,
        },
      });
    } catch (error) {
      console.error('Error interno en /login:', error.message);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  },
};
