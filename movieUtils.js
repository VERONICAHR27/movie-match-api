/*const { readCSVFile } = require("./lib/files");

function parseCSVRow(row) {
    const result = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            if (insideQuotes && row[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                insideQuotes = !insideQuotes;
            }
        } else if (char === "," && !insideQuotes) {
            result.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}
function getMovieByTitle(title, csvMovies) {
    const lines = csvMovies.split("\n");
    const headers = parseCSVRow(lines[0]); // Obtener los encabezados del CSV
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Saltar líneas vacías
        const values = parseCSVRow(lines[i]);
        if (values[1].toLowerCase() === title.toLowerCase()) { // Comparar el título (columna 1)
            const movie = {};
            headers.forEach((header, index) => {
                movie[header] = values[index];
            });
            return movie; // Devolver la película encontrada
        }
    }
    return null; // Devolver null si no se encuentra la película
}
function getAllMovies() {
    const csvMovies = readCSVFile("data/movies.csv");
    const lines = csvMovies.split("\n");
    const headers = parseCSVRow(lines[0]);
    const movies = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Saltar líneas vacías
        const values = parseCSVRow(lines[i]);
        const movie = {};
        headers.forEach((header, index) => {
            movie[header] = values[index];
        });
        movies.push(movie);
    }

    return movies; // Devuelve todas las películas como un array de objetos
}

function getMoviesByGenre(genre) {
    const movies = getAllMovies();
    return movies.filter((movie) => {
        // Dividir los géneros por comas y eliminar espacios adicionales
        const genres = movie.genre.split(",").map((g) => g.trim().toLowerCase());
        return genres.includes(genre.toLowerCase()); // Verificar si el género buscado está en la lista
    });
}

function getRandomMovie() {
    const movies = getAllMovies();
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex]; // Devuelve una película al azar
}

function getMovieByIdentifier(identifier) {
    const movies = getAllMovies();
    const lowerIdentifier = identifier.toLowerCase();

    // Buscar la película por id o nombre
    return movies.find(
        (m) =>
            m.id.toLowerCase() === lowerIdentifier || // Comparar por id
            m.title.toLowerCase() === lowerIdentifier // Comparar por título
    );
}

module.exports = { getAllMovies, getMoviesByGenre, getRandomMovie, getMovieByIdentifier, getMovieByTitle };
*/