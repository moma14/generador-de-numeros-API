import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    console.log('Middleware verifyToken ejecutado'); // <-- Verificar si entra al middleware
  
    const authHeader = req.headers.authorization;
    console.log('Encabezado Authorization recibido:', authHeader); // <-- Verificar el encabezado
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No se encontró el token en los encabezados.');
      return res.status(401).json({ error: 'No estás autorizado para acceder a este recurso.' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mi_secreto_jwt'); // Verifica el token
      console.log('Token decodificado:', decoded); // <-- Log del contenido del token
      req.user = decoded; // Adjunta el usuario decodificado a la solicitud
      next(); // Continúa al siguiente middleware o controlador
    } catch (error) {
      console.error('Error al verificar el token:', error.message);
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
  };  