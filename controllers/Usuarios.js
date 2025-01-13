import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usuarioService } from '../services/Usuarios.js';

export const usuarioController = {
  // Obtener todos los usuarios
  async getUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.obtenerTodosLosUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtener un usuario por ID
  async getUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuario = await usuarioService.obtenerUsuarioPorId(id);
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Crear un nuevo usuario
  async createUsuario(req, res) {
    try {
      const nuevoUsuario = req.body;
      const usuarioCreado = await usuarioService.crearUsuario(nuevoUsuario);
      res.status(201).json(usuarioCreado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Actualizar un usuario
  async updateUsuario(req, res) {
    try {
      const { id } = req.params;
      const datosActualizados = req.body;
      const usuarioActualizado = await usuarioService.actualizarUsuario(id, datosActualizados);
      res.status(200).json(usuarioActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Eliminar un usuario
  async deleteUsuario(req, res) {
    try {
      const { id } = req.params;
      const resultado = await usuarioService.eliminarUsuario(id);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Iniciar sesión
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validar credenciales
      if (!email || !password) {
        return res.status(400).render('login', { error: 'Email y contraseña son obligatorios' });
      }

      const usuario = await usuarioService.obtenerUsuarioPorEmail(email);

      if (!usuario) {
        return res.status(401).render('login', { error: 'Credenciales inválidas' });
      }

      // Comparar la contraseña
      const contraseniaValida = await bcrypt.compare(password, usuario.contrasenia);
      if (!contraseniaValida) {
        return res.status(401).render('login', { error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: usuario.id_usuario, email: usuario.email },
        process.env.JWT_SECRET || 'mi_secreto_jwt',
        { expiresIn: '1h' }
      );

      // Guardar token en sesión
      req.session.userId = usuario.id_usuario;

      res.redirect('/'); // Redirige al dashboard u otra vista
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      res.status(500).render('login', { error: 'Error interno del servidor' });
    }
  },

  // Obtener sesión activa
  async getSession(req, res) {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'No estás autenticado' });
    }

    res.status(200).json({ userId: req.session.userId });
  },

  // Cerrar sesión
  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al cerrar sesión' });
      }

      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    });
  },
};
