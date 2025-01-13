import { db } from '../base de datos/Database.js';

export const usuarioModel = {
  // Obtener todos los usuarios
  async getAllUsuarios() {
    const [rows] = await db.query('SELECT * FROM usuarios');
    return rows;
  },

  // Obtener un usuario por ID
  async getUsuarioById(id) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    return rows[0] || null; // Retorna un único usuario o null si no existe
  },

  // Obtener un usuario por email
  async getUsuarioByEmail(email) {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0] || null; // Retorna el usuario encontrado o null si no existe
  },

  // Crear un nuevo usuario
  async createUsuario(usuario) {
    const {
      nombres,
      apellido_paterno,
      apellido_materno,
      telefono,
      email,
      usuario: username,
      contrasenia,
    } = usuario;

    const [result] = await db.query(
      `INSERT INTO usuarios 
      (nombres, apellido_paterno, apellido_materno, telefono, email, usuario, contrasenia) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombres, apellido_paterno, apellido_materno, telefono, email, username, contrasenia]
    );

    return result.insertId; // Retorna el ID del usuario creado
  },

  // Actualizar un usuario
  async updateUsuario(id, usuario) {
    const {
      nombres,
      apellido_paterno,
      apellido_materno,
      telefono,
      email,
      usuario: username,
      contrasenia,
    } = usuario;

    const [result] = await db.query(
      `UPDATE usuarios 
      SET nombres = ?, apellido_paterno = ?, apellido_materno = ?, telefono = ?, email = ?, usuario = ?, contrasenia = ?
      WHERE id_usuario = ?`,
      [nombres, apellido_paterno, apellido_materno, telefono, email, username, contrasenia, id]
    );

    return result.affectedRows > 0; // Retorna true si se actualizó
  },

  // Eliminar un usuario
  async deleteUsuario(id) {
    const [result] = await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows > 0; // Retorna true si se eliminó
  },
};
