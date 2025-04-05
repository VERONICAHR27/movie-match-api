import Movie from "../models/Movie.js";

// Controlador para mostrar un mensaje de bienvenida
function getWelcomeMessageController(req, res, next) {
    try {
        const welcomeMessage = { message: "Bienvenido a la API de películas. El servidor está corriendo correctamente." };
        res.status(200).json(welcomeMessage);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

// Controlador para obtener una película al azar
function getRandomMovieController(req, res, next) {
    try {
        const randomMovie = Movie.getRandom();
        res.status(200).json(randomMovie);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

// Controlador para obtener una película por ID o nombre
function getMovieByIdOrNameController(req, res, next) {
    try {
        const { identifier } = req.params;
        const movie = Movie.getByIdOrTitle(identifier);
        if (movie) {
            res.status(200).json(movie);
        } else {
            const error = new Error('NoResultsFound'); // Lanzar un error si no se encuentra la película
            next(error);
        }
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

// Controlador para buscar películas por múltiples criterios o género
function getMoviesController(req, res, next) {
    try {
        const { name, year, genre } = req.query; // Obtener los parámetros de consulta
        const criteria = {};

        if (name) criteria.name = name.trim(); // Agregar el criterio 'name' si está presente
        if (year) criteria.year = year.trim(); // Agregar el criterio 'year' si está presente
        if (genre) criteria.genre = genre.trim(); // Agregar el criterio 'genre' si está presente

        const movies = Movie.getByCriteria(criteria); // Llama al modelo para filtrar las películas

        if (movies.length > 0) {
            res.status(200).json(movies); // Devuelve las películas filtradas
        } else {
            const error = new Error('NoResultsFound'); // Lanzar un error si no se encuentran películas
            next(error);
        }
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

export { 
    getWelcomeMessageController, 
    getRandomMovieController, 
    getMovieByIdOrNameController, 
    getMoviesController
};
