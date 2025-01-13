import { generacionService } from '../services/Generador.js';
import { upload } from '../config/multer.js';

export const generacionController = {
  /**
   * Crear una nueva generación
   */
  crearGeneracion: [
    upload.single('grafica'), // Manejo de la carga de un archivo gráfico
    async (req, res) => {
      try {
        const { id_usuario, distribucion, parametros } = req.body;

        // Asegurar que los parámetros se envíen en formato JSON
        const parametrosParsed = JSON.parse(parametros);

        // Procesar archivo gráfico, si se envió
        const grafica = req.file ? req.file.buffer : null;

        // Convertir resultados en array, si se envían
        const resultados = req.body.resultados ? JSON.parse(req.body.resultados) : [];

        // Procesar archivo de descarga (opcional)
        const archivo_descarga = resultados.length > 0 ? resultados : null;

        const nuevaGeneracion = await generacionService.crearGeneracion({
          id_usuario: id_usuario ? Number(id_usuario) : null,
          distribucion,
          parametros: parametrosParsed,
          resultados,
          grafica,
          archivo_descarga,
        });

        res.status(201).json(nuevaGeneracion);
      } catch (error) {
        console.error('Error al crear generación:', error.message);
        res.status(500).json({ error: 'No se pudo crear la generación' });
      }
    },
  ],

  /**
   * Obtener todas las generaciones asociadas a un usuario
   */
  async obtenerGeneracionesPorUsuario(req, res) {
    try {
      const { id_usuario } = req.params;
      const generaciones = await generacionService.obtenerGeneracionesPorUsuario(Number(id_usuario));
      res.status(200).json(generaciones);
    } catch (error) {
      console.error('Error al obtener generaciones por usuario:', error.message);
      res.status(500).json({ error: 'No se pudieron obtener las generaciones' });
    }
  },

  /**
   * Obtener todas las generaciones sin usuario
   */
  async obtenerGeneracionesSinUsuario(req, res) {
    try {
      const generaciones = await generacionService.obtenerGeneracionesSinUsuario();
      res.status(200).json(generaciones);
    } catch (error) {
      console.error('Error al obtener generaciones sin usuario:', error.message);
      res.status(500).json({ error: 'No se pudieron obtener las generaciones' });
    }
  },
};
