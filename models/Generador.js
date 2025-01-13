import { db } from '../base de datos/Database.js';

export const generacionModel = {
  /**
   * Crear una nueva generación en la base de datos
   * @param {Object} generacion - Datos de la generación
   * @param {number} generacion.id_usuario - ID del usuario (puede ser nulo)
   * @param {string} generacion.distribucion - Nombre de la distribución
   * @param {Object} generacion.parametros - Parámetros en formato JSON
   * @param {Buffer} generacion.resultados - Resultados generados
   * @param {Buffer} generacion.grafica - Imagen del gráfico (puede ser nulo)
   * @param {Buffer} generacion.archivo_descarga - Archivo para descarga (puede ser nulo)
   */
  async crearGeneracion({ id_usuario, distribucion, parametros, resultados, grafica, archivo_descarga }) {
    const query = `
      INSERT INTO generaciones (id_usuario, distribucion, parametros, resultados, grafica, archivo_descarga)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const valores = [
      id_usuario || null,
      distribucion,
      JSON.stringify(parametros),
      resultados,
      grafica || null,
      archivo_descarga || null,
    ];

    try {
      const [result] = await db.query(query, valores);
      return { id_generacion: result.insertId };
    } catch (error) {
      console.error('Error al crear generación:', error.message);
      throw new Error('Error al guardar la generación en la base de datos');
    }
  },

  /**
   * Obtener todas las generaciones de un usuario por ID
   * @param {number} id_usuario - ID del usuario
   */
  async obtenerGeneracionesPorUsuario(id_usuario) {
    const query = `
      SELECT id_generacion, distribucion, parametros, resultados, grafica, archivo_descarga, fecha_hora
      FROM generaciones
      WHERE id_usuario = ?
      ORDER BY fecha_hora DESC
    `;
    try {
      const [generaciones] = await db.query(query, [id_usuario]);
      return generaciones;
    } catch (error) {
      console.error('Error al obtener generaciones:', error.message);
      throw new Error('Error al obtener las generaciones del usuario');
    }
  },

  /**
   * Obtener todas las generaciones sin usuario
   */
  async obtenerGeneracionesSinUsuario() {
    const query = `
      SELECT id_generacion, distribucion, parametros, resultados, grafica, archivo_descarga, fecha_hora
      FROM generaciones
      WHERE id_usuario IS NULL
      ORDER BY fecha_hora DESC
    `;
    try {
      const [generaciones] = await db.query(query);
      return generaciones;
    } catch (error) {
      console.error('Error al obtener generaciones sin usuario:', error.message);
      throw new Error('Error al obtener las generaciones sin usuario');
    }
  },
};
