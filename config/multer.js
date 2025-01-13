import multer from 'multer';

const storage = multer.memoryStorage(); // Almacena los archivos en memoria para procesarlos con Sharp
export const upload = multer({ storage });
