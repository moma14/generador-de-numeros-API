/*import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usuarioService } from '../services/Usuarios.js';

export const usuarioController = {
  async login(req, res) {
    try {
      console.log('Solicitud recibida en /login:', req.body);

      const { email, password } = req.body;

      // Validar entrada
      if (!email || !password) {
        console.warn('Faltan datos: email o password no proporcionados.');
        return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      }

      // Obtener usuario por email
      const usuarioData = await usuarioService.obtenerUsuarioPorEmail(email);
      console.log('Usuario obtenido:', usuarioData);

      if (!usuarioData) {
        console.warn(`Usuario con email ${email} no encontrado.`);
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Comparar contraseñas (usando bcrypt)
      const contraseniaValida = await bcrypt.compare(password, usuarioData.contrasenia);
      console.log('Contraseña válida:', contraseniaValida);

      if (!contraseniaValida) {
        console.warn(`Contraseña inválida para el usuario con email ${email}.`);
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
      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuarioData.id_usuario,
          nombres: usuarioData.nombres,
          email: usuarioData.email,
        },
      });
    } catch (error) {
      console.error('Error interno en /login:', error);
      return res.status(500).json({ error: 'Error al iniciar sesión', detalles: error.message });
    }
  },
};*/
