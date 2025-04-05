import cors from 'cors';

export default cors({
    origin: '*', // Permitir todas las solicitudes de cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
});
