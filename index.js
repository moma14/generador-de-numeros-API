import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import sharp from 'sharp';
import usuarioRoutes from './routes/Usuarios.js';
import generacionRoutes from './routes/Generador.js';
import { verificarConexion } from './base de datos/Database.js'; // Importar la función verificarConexion

// Configuración del servidor
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Middlewares para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Multer para manejo de archivos
const storage = multer.memoryStorage(); // Guarda los archivos en memoria para procesamiento
const upload = multer({ storage });

// Rutas para subir gráficos y procesarlos
app.post('/upload', upload.single('grafico'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    // Reducir el tamaño del gráfico utilizando Sharp
    const imagenProcesada = await sharp(req.file.buffer)
      .resize(800, 600, { fit: 'inside' }) // Redimensiona a 800x600 manteniendo proporciones
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toBuffer();

    res.status(200).json({ message: 'Gráfico procesado exitosamente', data: imagenProcesada.toString('base64') });
  } catch (error) {
    console.error('Error al procesar el archivo:', error.message);
    res.status(500).json({ error: 'Error interno al procesar el archivo' });
  }
});

// Rutas principales
app.use('/usuarios', usuarioRoutes);

// Rutas de las generaciones
app.use('/generador', generacionRoutes);

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('API del generador de números está activa');
  });
  
  // Verificar conexión a la base de datos
  verificarConexion();

// Iniciar servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
