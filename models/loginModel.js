/*import { db } from '../base de datos/Database.js';

export const usuarioModel = {
  async getUsuarioByEmail(email) {
    try {
      console.log(`Consultando usuario con email: ${email}`);
      const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      console.log(`Resultado de la consulta para email ${email}:`, rows);
      return rows[0];
    } catch (error) {
      console.error('Error al consultar usuario por email:', error.message);
      throw error; // Lanza el error al controlador
    }
  },
};*/
