import express from "express" //const express = require("express");

import movieRoutes from "./routes/MovieRoutes.js"; // Importar las rutas de películas


const app = express();
const PORT = 3000;

//const movieRoutes = require("./routes/MovieRoutes"); // Importar las rutas de películas

app.use("/api", movieRoutes); // Usar las rutas de películas anidado a la ruta raíz '/api'


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});