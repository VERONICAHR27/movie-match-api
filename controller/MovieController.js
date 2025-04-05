import Movie from "../models/Movie.js";

// Controlador para mostrar un mensaje de bienvenida
function getWelcomeMessageController(req, res) {
    try {
        const welcomeMessage = { message: "Bienvenido a la API de películas. El servidor está corriendo correctamente." };
        res.status(200).json(welcomeMessage);
    } catch (error) {
        console.error("Error al obtener el mensaje de bienvenida:", error.message);
        res.status(500).send("Error interno del servidor");
    }
}

// Controlador para obtener una película al azar
function getRandomMovieController(req, res) {
    try {
        const randomMovie = Movie.getRandom();
        res.status(200).json(randomMovie);
    } catch (error) {
        console.error("Error al obtener una película al azar:", error.message);
        res.status(500).send("Error interno del servidor");
    }
}

// Controlador para obtener una película por ID o nombre
function getMovieByIdOrNameController(req, res) {
    try {
        const { identifier } = req.params;
        const movie = Movie.getByIdOrTitle(identifier);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).send("Película no encontrada");
        }
    } catch (error) {
        console.error("Error al obtener la película:", error.message);
        res.status(500).send("Error interno del servidor");
    }
}

/*// Controlador para obtener todas las películas o filtrar por género
function getMoviesByGenreController(req, res) {
    try {
        const { genre } = req.query;
        const movies = Movie.getByGenre(genre);
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error al obtener las películas:", error.message);
        res.status(500).send("Error interno del servidor");
    }
}*/

// Controlador para buscar películas por múltiples criterios o género
function getMoviesController(req, res) {
    try {
        const { name, year, genre } = req.query; // Obtener los parámetros de consulta
        const criteria = {};

        if (name) criteria.name = name; // Agregar el criterio 'name' si está presente
        if (year) criteria.year = year; // Agregar el criterio 'year' si está presente
        if (genre) criteria.genre = genre; // Agregar el criterio 'genre' si está presente

        const movies = Movie.getByCriteria(criteria); // Llama al modelo para filtrar las películas
        res.status(200).json(movies); // Devuelve las películas filtradas
    } catch (error) {
        console.error("Error al buscar películas:", error.message);
        res.status(500).send("Error interno del servidor");
    }
}



export { 
    getWelcomeMessageController, 
    getRandomMovieController, 
    getMovieByIdOrNameController, 
	getMoviesController
};
