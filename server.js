const express = require("express");
const { getAllMovies, getMoviesByGenre, getRandomMovie, getMovieByIdentifier } = require("./movieUtils");

const app = express();
const PORT = 3000;

// Ruta para obtener una película al azar
app.get("/", (req, res) => {
    try {
        const randomMovie = getRandomMovie(); // Llama a la función para obtener una película al azar
        res.status(200).json(randomMovie); // Responder con la película en formato JSON
    } catch (error) {
        console.error("Error al obtener una película al azar:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// Ruta para obtener todas las películas o filtrar por género
app.get("/movies", (req, res) => {
    try {
        const genre = req.query.genre; // Obtener el parámetro de consulta "genre"
        let movies;

        if (genre) {
            movies = getMoviesByGenre(genre); // Filtrar películas por género
        } else {
            movies = getAllMovies(); // Obtener todas las películas
        }

        res.status(200).json(movies); // Responder con las películas en formato JSON
    } catch (error) {
        console.error("Error al obtener las películas:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// Ruta para obtener los detalles de una película por id o nombre
app.get("/movies/:identifier", (req, res) => {
    try {
        const identifier = req.params.identifier; // Obtener el parámetro de la URL
        const movie = getMovieByIdentifier(identifier); // Llama a la función para buscar la película

        if (movie) {
            res.status(200).json(movie); // Responder con los detalles de la película
        } else {
            res.status(404).send("Película no encontrada"); // Responder con un error 404 si no se encuentra
        }
    } catch (error) {
        console.error("Error al obtener los detalles de la película:", error.message);
        res.status(500).send("Error interno del servidor");
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});