
import Movie from "../models/Movie.js";

function getAllMovies() {
	return Movie.getAll();
}

function getRandom() {
	return Movie.getRandom();
}

function getMovieByIdOrName(identifier) {
	return Movie.getByIdOrTitle(identifier);
}

function getMoviesByGenre(genre) {
    return Movie.getByGenre(genre); // Llama al modelo para filtrar películas por género
}

// Nueva función para manejar la ruta de bienvenida
function getWelcomeMessage() {
    return { message: "Bienvenido a la API de películas. El servidor está corriendo correctamente." };
}




export { getAllMovies, getRandom, getMovieByIdOrName, getMoviesByGenre,getWelcomeMessage, getStatsByGenre };