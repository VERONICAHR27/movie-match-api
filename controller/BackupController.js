import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupFilePath = path.join(__dirname, "../data/movies_backup.csv");
const originalFilePath = path.join(__dirname, "../data/movies.csv");

// Controlador para respaldar los datos
function backupDataController(req, res, next) {
    try {
        fs.copyFileSync(originalFilePath, backupFilePath);
        res.status(200).json({ message: "Respaldo realizado con éxito." });
    } catch (error) {
        next(error);
    }
}

// Controlador para restaurar los datos
function restoreDataController(req, res, next) {
    try {
        if (!fs.existsSync(backupFilePath)) {
            return res.status(404).json({ error: "No se encontró un respaldo para restaurar." });
        }
        fs.copyFileSync(backupFilePath, originalFilePath);
        res.status(200).json({ message: "Restauración realizada con éxito." });
    } catch (error) {
        next(error);
    }
}

export { backupDataController, restoreDataController };
