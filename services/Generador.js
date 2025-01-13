import { generacionModel } from '../models/Generador.js';
import sharp from 'sharp';

export const generacionService = {
  /**
   * Crear una nueva generación
   * @param {Object} data - Datos de la generación
   * @param {number} [data.id_usuario] - ID del usuario (opcional)
   * @param {string} data.distribucion - Nombre de la distribución
   * @param {Object} data.parametros - Parámetros de la generación
   * @param {Array<number>} data.resultados - Resultados generados
   * @param {Buffer} [data.grafica] - Buffer de la imagen del gráfico (opcional)
   * @param {Array<number>} [data.archivo_descarga] - Buffer del archivo descargable (opcional)
   */
  async crearGeneracion({ id_usuario, distribucion, parametros, resultados, grafica, archivo_descarga }) {
    try {
      // Procesar imagen del gráfico con Sharp
      let imagenProcesada = null;
      if (grafica) {
        imagenProcesada = await sharp(grafica)
          .resize(800, 600, { fit: 'inside' })
          .toFormat('jpeg')
          .jpeg({ quality: 80 })
          .toBuffer();
      }

      // Procesar archivo descargable
      const archivoProcesado = archivo_descarga
        ? Buffer.from(archivo_descarga.join('\n'), 'utf-8') // Convierte los resultados a un archivo de texto
        : null;

      // Guardar la generación en la base de datos
      const generacion = await generacionModel.crearGeneracion({
        id_usuario,
        distribucion,
        parametros,
        resultados: Buffer.from(JSON.stringify(resultados)),
        grafica: imagenProcesada,
        archivo_descarga: archivoProcesado,
      });

      return generacion;
    } catch (error) {
      console.error('Error en generarGeneracion:', error.message);
      throw new Error('No se pudo crear la generación');
    }
  },

  /**
   * Obtener todas las generaciones asociadas a un usuario
   * @param {number} id_usuario - ID del usuario
   */
  async obtenerGeneracionesPorUsuario(id_usuario) {
    try {
      return await generacionModel.obtenerGeneracionesPorUsuario(id_usuario);
    } catch (error) {
      console.error('Error en obtenerGeneracionesPorUsuario:', error.message);
      throw new Error('No se pudieron obtener las generaciones del usuario');
    }
  },

  /**
   * Obtener todas las generaciones sin usuario asociado
   */
  async obtenerGeneracionesSinUsuario() {
    try {
      return await generacionModel.obtenerGeneracionesSinUsuario();
    } catch (error) {
      console.error('Error en obtenerGeneracionesSinUsuario:', error.message);
      throw new Error('No se pudieron obtener las generaciones sin usuario');
    }
  },
};
