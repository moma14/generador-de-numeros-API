import { usuarioModel } from '../models/Usuarios.js';

export const usuarioService = {
  // Obtener todos los usuarios
  async obtenerTodosLosUsuarios() {
    return await usuarioModel.getAllUsuarios();
  },

  // Obtener un usuario por ID
  async obtenerUsuarioPorId(id) {
    if (!id) {
      throw new Error('El ID del usuario es requerido');
    }
    const usuario = await usuarioModel.getUsuarioById(id);
    if (!usuario) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  },

  // Crear un nuevo usuario
  async crearUsuario(usuario) {
    if (!usuario.nombres || !usuario.apellido_paterno || !usuario.usuario || !usuario.contrasenia) {
      throw new Error('Faltan campos obligatorios para crear el usuario');
    }
    const id = await usuarioModel.createUsuario(usuario);
    return await usuarioModel.getUsuarioById(id); // Retorna el usuario recién creado
  },

  // Actualizar un usuario
  async actualizarUsuario(id, usuario) {
    if (!id) {
      throw new Error('El ID del usuario es requerido para la actualización');
    }
    const actualizado = await usuarioModel.updateUsuario(id, usuario);
    if (!actualizado) {
      throw new Error(`No se pudo actualizar el usuario con ID ${id}`);
    }
    return await usuarioModel.getUsuarioById(id);
  },

  // Eliminar un usuario
  async eliminarUsuario(id) {
    if (!id) {
      throw new Error('El ID del usuario es requerido para eliminar');
    }
    const eliminado = await usuarioModel.deleteUsuario(id);
    if (!eliminado) {
      throw new Error(`No se pudo eliminar el usuario con ID ${id}`);
    }
    return { mensaje: `Usuario con ID ${id} eliminado correctamente` };
  }
};
