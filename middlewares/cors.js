import cors from 'cors';

export default cors({
    origin: ["https://tudominio.com"], // Permitir solo solicitudes desde tu dominio
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
});
