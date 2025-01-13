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
   * @param {Array<number>} [data.archivo_descarga] - Array de resultados para archivo descargable (opcional)
   * @returns {Object} - Generación creada
   * @throws {Error} - En caso de fallo
   */
  async crearGeneracion({ id_usuario, distribucion, parametros, resultados, grafica, archivo_descarga }) {
    try {
      // Validaciones básicas
      if (!distribucion || !parametros || !Array.isArray(resultados)) {
        throw new Error('Faltan datos obligatorios: distribucion, parametros o resultados.');
      }
  
      // Log de los datos que se intentan guardar
      console.log('Datos recibidos para crear generación:');
      console.log('Distribución:', distribucion);
      console.log('Parámetros:', parametros);
      console.log('Resultados:', resultados);
  
      // Validar si parámetros y resultados son serializables
      try {
        JSON.stringify(parametros); // Validar si parámetros es serializable
      } catch (err) {
        console.error('Error al serializar parámetros:', parametros);
        throw new Error('Los parámetros no son válidos para JSON.');
      }
  
      try {
        JSON.stringify(resultados); // Validar si resultados es serializable
      } catch (err) {
        console.error('Error al serializar resultados:', resultados);
        throw new Error('Los resultados no son válidos para JSON.');
      }
  
      // Procesar imagen del gráfico con Sharp
      let imagenProcesada = null;
      if (grafica) {
        try {
          imagenProcesada = await sharp(grafica)
            .resize(800, 600, { fit: 'inside' })
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toBuffer();
        } catch (error) {
          console.error('Error al procesar la imagen del gráfico:', error.message);
          throw new Error('Error al procesar la imagen del gráfico.');
        }
      }
  
      // Procesar archivo descargable
      let archivoProcesado = null;
      if (archivo_descarga) {
        try {
          archivoProcesado = Buffer.from(archivo_descarga.join('\n'), 'utf-8');
        } catch (error) {
          console.error('Error al procesar el archivo descargable:', archivo_descarga);
          throw new Error('Error al procesar el archivo descargable.');
        }
      }
  
      // Guardar la generación en la base de datos
      const generacion = await generacionModel.crearGeneracion({
        id_usuario: id_usuario || null,
        distribucion,
        parametros: JSON.stringify(parametros), // Convertir a JSON
        resultados: Buffer.from(JSON.stringify(resultados)), // Convertir resultados a Buffer
        grafica: imagenProcesada,
        archivo_descarga: archivoProcesado,
      });
  
      return generacion;
    } catch (error) {
      console.error('Error en crearGeneracion:', error.message, error);
      throw new Error('No se pudo crear la generación: ' + error.message);
    }
  },

  /**
   * Obtener todas las generaciones asociadas a un usuario
   * @param {number} id_usuario - ID del usuario
   * @returns {Array<Object>} - Generaciones del usuario
   * @throws {Error} - En caso de fallo
   */
  async obtenerGeneracionesPorUsuario(id_usuario) {
    try {
      return await generacionModel.obtenerGeneracionesPorUsuario(id_usuario);
    } catch (error) {
      console.error('Error en obtenerGeneracionesPorUsuario:', error.message);
      throw new Error('No se pudieron obtener las generaciones del usuario.');
    }
  },

  /**
   * Obtener todas las generaciones sin usuario asociado
   * @returns {Array<Object>} - Generaciones sin usuario
   * @throws {Error} - En caso de fallo
   */
  async obtenerGeneracionesSinUsuario() {
    try {
      return await generacionModel.obtenerGeneracionesSinUsuario();
    } catch (error) {
      console.error('Error en obtenerGeneracionesSinUsuario:', error.message);
      throw new Error('No se pudieron obtener las generaciones sin usuario.');
    }
  },
};