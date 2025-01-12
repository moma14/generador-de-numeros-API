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
  }
};
