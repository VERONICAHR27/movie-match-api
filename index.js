import express from "express";
import movieRoutes from "./routes/MovieRoutes.js"; // Importar solo las rutas de películas
import { logger } from "./middlewares/logger.js";
import  cors  from "./middlewares/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js"; 
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

const swaggerDocument = YAML.load("./docs/swagger.yaml"); 

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto definido en .env o el puerto 3000 por defecto

app.use(logger); // Activar el middleware de logging
app.use(cors); // Activar el middleware de CORS

app.use("/api", movieRoutes); // Usar las rutas de películas anidado a la ruta raíz '/api'

// Ruta para la documentación interactiva
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});