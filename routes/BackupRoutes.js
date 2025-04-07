import express from "express";
import { backupDataController, restoreDataController } from "../controller/BackupController.js";

const router = express.Router();

// Ruta para respaldar los datos
router.post("/backup", backupDataController);

// Ruta para restaurar los datos
router.post("/restore", restoreDataController);

export default router;
