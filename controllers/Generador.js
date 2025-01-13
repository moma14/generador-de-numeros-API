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
        console.log('=== Solicitud recibida en crearGeneracion ===');
        
        // Logs para el cuerpo de la solicitud
        console.log('Cuerpo (req.body):', req.body);

        // Logs para el archivo recibido
        if (req.file) {
          console.log('Archivo gráfico recibido:');
          console.log('Nombre:', req.file.originalname);
          console.log('Tipo:', req.file.mimetype);
          console.log('Tamaño:', req.file.size, 'bytes');
        } else {
          console.warn('Archivo gráfico no recibido (req.file es undefined)');
        }

        const { id_usuario, distribucion, parametros, resultados } = req.body;

        // Validar datos básicos
        if (!distribucion || !parametros) {
          console.error('Faltan datos obligatorios (distribucion o parametros)');
          return res.status(400).json({ error: 'Faltan datos obligatorios: distribucion o parametros' });
        }

        // Asegurar que los parámetros se envíen en formato JSON
        let parametrosParsed;
        try {
          parametrosParsed = JSON.parse(parametros);
          console.log('Parámetros parseados (JSON):', parametrosParsed);
        } catch (err) {
          console.error('Error al parsear parámetros:', parametros);
          return res.status(400).json({ error: 'Parámetros inválidos: deben estar en formato JSON' });
        }

        // Convertir resultados en array, si se envían
        let resultadosParsed = [];
        if (resultados) {
          try {
            resultadosParsed = JSON.parse(resultados);
            console.log('Resultados parseados (JSON):', resultadosParsed);
          } catch (err) {
            console.error('Error al parsear resultados:', resultados);
            return res.status(400).json({ error: 'Resultados inválidos: deben estar en formato JSON' });
          }
        }

        // Procesar archivo gráfico
        const grafica = req.file ? req.file.buffer : null;
        if (grafica) {
          console.log('Archivo gráfico procesado con éxito.');
        } else {
          console.warn('No se incluyó archivo gráfico en la solicitud.');
        }

        // Procesar archivo de descarga (opcional)
        const archivo_descarga = resultadosParsed.length > 0 ? resultadosParsed : null;

        // Llamar al servicio para guardar en la base de datos
        const nuevaGeneracion = await generacionService.crearGeneracion({
          id_usuario: id_usuario ? Number(id_usuario) : null,
          distribucion,
          parametros: parametrosParsed,
          resultados: resultadosParsed,
          grafica,
          archivo_descarga,
        });

        console.log('Generación creada con éxito:', nuevaGeneracion);

        res.status(201).json(nuevaGeneracion);
      } catch (error) {
        console.error('Error al crear generación:', error.message, error);
        res.status(500).json({ error: 'No se pudo crear la generación' });
      }
    },
  ],

  /**
   * Obtener todas las generaciones asociadas a un usuario
   */
  async obtenerGeneracionesPorUsuario(req, res) {
    try {
      console.log('Solicitud recibida en obtenerGeneracionesPorUsuario:', req.params);
      const { id_usuario } = req.params;
      const generaciones = await generacionService.obtenerGeneracionesPorUsuario(Number(id_usuario));
      res.status(200).json(generaciones);
    } catch (error) {
      console.error('Error al obtener generaciones por usuario:', error.message, error);
      res.status(500).json({ error: 'No se pudieron obtener las generaciones' });
    }
  },

  /**
   * Obtener todas las generaciones sin usuario
   */
  async obtenerGeneracionesSinUsuario(req, res) {
    try {
      console.log('Solicitud recibida en obtenerGeneracionesSinUsuario');
      const generaciones = await generacionService.obtenerGeneracionesSinUsuario();
      res.status(200).json(generaciones);
    } catch (error) {
      console.error('Error al obtener generaciones sin usuario:', error.message, error);
      res.status(500).json({ error: 'No se pudieron obtener las generaciones' });
    }
  },
};
