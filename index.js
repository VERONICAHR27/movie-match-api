import express from "express";
import movieRoutes from "./routes/MovieRoutes.js"; // Importar las rutas de películas
import backupRoutes from "./routes/BackupRoutes.js"; // Importar las rutas de respaldo y restauración
import { logger } from "./middlewares/logger.js";
import cors from "./middlewares/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config(); // Cargar variables de entorno desde .env

const swaggerDocument = YAML.load("./docs/swagger.yaml");

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto definido en Render o el puerto 3000 por defecto

app.use(logger); // Activar el middleware de logging
app.use(cors); // Activar el middleware de CORS
app.use(rateLimiter); // Activar el middleware de limitación de solicitudes

app.use("/api", movieRoutes); // Registrar las rutas de películas
app.use("/api/backup", backupRoutes); // Registrar las rutas de respaldo y restauración

// Ruta para la documentación interactiva
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor solo si no está en un entorno manejado (como Render o Railway)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

export default app; // Exportar la aplicación para que Render o Railway la manejen