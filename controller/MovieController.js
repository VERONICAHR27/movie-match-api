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
         if (!randomMovie) {
            throw new Error('NoResultsFound'); // Lanzar un error si no se encuentra una película
        }
        res.status(200).json(randomMovie);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

// Controlador para obtener una película por ID o nombre
function getMovieByIdOrNameController(req, res, next) {
    try {
        const { identifier } = req.params;
        if (!identifier) {
            throw new Error('InvalidParameter'); // Validar que el parámetro esté presente
        }
        const movie = Movie.getByIdOrTitle(identifier);
        if (movie) {
            res.status(200).json(movie);
        } else {
            throw new Error('NoResultsFound'); // Lanzar un error si no se encuentra la película
        }
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
}

// Controlador para buscar películas por múltiples criterios o género
function getMoviesController(req, res, next) {
    try {
        const { name, year, genre, fromYear, toYear, } = req.query; // Obtener los parámetros de consulta
        const criteria = {};

        if (name) criteria.name = name.trim(); // Agregar el criterio 'name' si está presente
        if (year) {
            if (isNaN(year)) throw new Error('InvalidYear'); // Validar que el año sea un número
            criteria.year = year.trim();
        }
        if (fromYear) {
            if (isNaN(fromYear)) throw new Error('InvalidFromYear'); // Validar que 'fromYear' sea un número
            criteria.fromYear = fromYear.trim();
        }
        if (toYear) {
            if (isNaN(toYear)) throw new Error('InvalidToYear'); // Validar que 'toYear' sea un número
            criteria.toYear = toYear.trim();
        }
        if (genre) criteria.genre = genre.trim(); // Agregar el criterio 'genre' si está presente
        

        const movies = Movie.getByCriteria(criteria); // Llama al modelo para filtrar las películas

        if (movies.length > 0) {
            res.status(200).json(movies); // Devuelve las películas filtradas
        } else {
            throw new Error('NoResultsFound'); // Lanzar un error si no se encuentran películas
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
