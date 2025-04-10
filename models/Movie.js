import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Added readCSVFile function from files.js
function readCSVFile(relative_path_filename) {
    const csvFilePath = path.join(__dirname, "../", relative_path_filename);
    return fs.readFileSync(csvFilePath, "utf8");
}

function Movie(id, title, year, genre, director, actors, plot, imdb_rating, runtime_minutes) {
    this.id = id; // ID de la película
    this.title = title; // Título de la película
    this.year = year; // Año de lanzamiento
    this.genre = genre; // Género de la película
    this.director = director; // Director de la película
    this.actors = actors; // Actores de la película
    this.plot = plot; // Sinopsis de la película
    this.imdb_rating = imdb_rating; // Calificación de IMDb
    this.runtime_minutes = runtime_minutes; // Duración en minutos
}

Movie.prototype.getFieldsToParseArray = function () {
    return ["genre", "director", "actors"]; // Campos a parsear
};

Movie.prototype.getFieldsWithCommas = function () {
    const fieldsWithCommas = [];
    for (const [key, value] of Object.entries(this)) {
        if (typeof value === "string" && value.includes(",")) {
            fieldsWithCommas.push(key);
        }
    }
    return fieldsWithCommas;
};

function parseStringToArray(str) {
    return str.split(",").map((item) => item.trim()); // Convierte una cadena en un array, eliminando espacios
}

Movie.prototype.getGenre = function() {
   return parseStringToArray(this.genre); // Devuelve el género de la película
};

Movie.prototype.getActors = function() {
   return parseStringToArray(this.actors); // Devuelve los actores de la película
};
Movie.prototype.getDirector = function() {
   return this.director; // Devuelve el director de la película
};

// Obtener todos los campos de la película
Movie.getAll = function() {
    const csvMovies = readCSVFile("data/movies.csv");
    const lines = csvMovies.split("\n");
    const headers = lines[0].split(",").map((item) => item.trim());
    const movies = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === "") continue; // Skip empty lines

        const values = [];
        let current = "";
        let insideQuotes = false;

        // Manejar campos con comas dentro de comillas
        for (const char of lines[i]) {
            if (char === '"' && (current === "" || current[current.length - 1] !== "\\")) {
                insideQuotes = !insideQuotes;
            } else if (char === "," && !insideQuotes) {
                values.push(current.trim());
                current = "";
            } else {
                current += char;
            }
        }
        if (current) values.push(current.trim());

        const movie = new Movie();
        headers.forEach((header, index) => {
            movie[header] = values[index];
        });

        // Convertir runtime_minutes a número
        if (movie.runtime_minutes) {
            movie.runtime_minutes = parseInt(movie.runtime_minutes, 10);
        }

        // Parse fields specified in getFieldsToParseArray
        const fieldsToParse = movie.getFieldsToParseArray();
        fieldsToParse.forEach((field) => {
            if (movie[field]) {
                movie[field] = parseStringToArray(movie[field]);
            }
        });

        movies.push(movie);
    }
    return movies;
}

// Obtener una película al azar
Movie.getRandom = function() {
	const movies = Movie.getAll(); // Obtener todas las películas
	if (movies.length === 0) {
		return null; // Si no hay películas, devolver null
	}
	const randomIndex = Math.floor(Math.random() * movies.length); // Generar un índice aleatorio
	return movies[randomIndex]; // Devolver una película al azar
};

// Obtener una película por ID o nombre
Movie.getByIdOrTitle = function(identifier) {
    const movies = Movie.getAll(); // Obtener todas las películas
    const movie = movies.find((movie) => 
        movie.id === identifier || 
        movie.title.toLowerCase() === identifier.toLowerCase() // Comparar ignorando mayúsculas/minúsculas
    );
    return movie || null; // Devolver la película encontrada o null si no existe
};

// Esta función permite filtrar películas por nombre, año y género
Movie.getByCriteria = function(criteria) {
    const movies = Movie.getAll(); // Obtener todas las películas

    return movies.filter((movie) => {
        let matches = true;

        // Filtrar por nombre parcial si el criterio 'name' está presente
        if (criteria.name) {
            const nameLower = criteria.name.toLowerCase();
            matches = matches && movie.title.toLowerCase().includes(nameLower);
        }

        // Filtrar por año si el criterio 'year' está presente
        if (criteria.year) {
            matches = matches && movie.year === criteria.year;
        }

        // Filtrar por rango de años si 'fromYear' o 'toYear' están presentes
        if (criteria.fromYear) {
            matches = matches && parseInt(movie.year) >= parseInt(criteria.fromYear);
        }
        if (criteria.toYear) {
            matches = matches && parseInt(movie.year) <= parseInt(criteria.toYear);
        }

        // Filtrar por género si el criterio 'genre' está presente
        if (criteria.genre) {
            if (Array.isArray(movie.genre)) {
                matches = matches && movie.genre.some(g => g.toLowerCase() === criteria.genre.toLowerCase());
            } else if (typeof movie.genre === "string") {
                const genres = movie.genre.toLowerCase().split(",").map(g => g.trim());
                matches = matches && genres.includes(criteria.genre.toLowerCase());
            } else {
                matches = false;
            }
        }

        
        return matches;
    });
};

export { readCSVFile, Movie }; // Exporting readCSVFile along with existing exports
export default Movie; // Exportar Movie como exportación por defecto
