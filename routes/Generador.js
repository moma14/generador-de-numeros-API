import express from 'express';
import { generacionController } from '../controllers/Generador.js';
import { db } from '../base de datos/Database.js';

const router = express.Router();

// Rutas para generaciones
router.post('/crear', generacionController.crearGeneracion);
router.get('/usuario/:id_usuario', generacionController.obtenerGeneracionesPorUsuario);
router.get('/sin-usuario', generacionController.obtenerGeneracionesSinUsuario);
router.get('/descargar/:id_generacion', async (req, res) => {
    const { id_generacion } = req.params;
  
    try {
      // Consulta para obtener el archivo basado en el id_generacion
      const query = 'SELECT archivo_descarga FROM generaciones WHERE id_generacion = ?';
      const [result] = await db.query(query, [id_generacion]);
  
      if (result.length === 0 || !result[0].archivo_descarga) {
        return res.status(404).send('Archivo no encontrado');
      }
  
      const archivoBuffer = result[0].archivo_descarga; // Esto es un BLOB
      const archivoString = Buffer.from(archivoBuffer).toString('utf-8'); // Convertir el BLOB a una cadena de texto
  
      // Configurar encabezados para la descarga
      res.setHeader('Content-Disposition', `attachment; filename="resultados_${id_generacion}.txt"`);
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
      // Enviar el archivo como texto
      res.send(archivoString);
    } catch (error) {
      console.error('Error al descargar el archivo:', error.message);
      res.status(500).send('Error al procesar la descarga');
    }
  }); 
  

export default router;
