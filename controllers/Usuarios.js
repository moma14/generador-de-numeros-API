import jwt from 'jsonwebtoken';
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
      const { usuario, contrasenia } = req.body;

      // Validar credenciales
      const usuarioData = await usuarioService.obtenerUsuarioPorNombreUsuario(usuario);

      if (!usuarioData || usuarioData.contrasenia !== contrasenia) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: usuarioData.id_usuario, usuario: usuarioData.usuario },
        process.env.JWT_SECRET || 'mi_secreto_jwt',
        { expiresIn: '1h' }
      );

      // Crear sesión
      req.session.userId = usuarioData.id_usuario;

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
        usuario: {
          id: usuarioData.id_usuario,
          nombres: usuarioData.nombres,
          usuario: usuarioData.usuario,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al iniciar sesión' });
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
