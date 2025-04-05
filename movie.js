/*const { getMovieByTitle } = require("./movieUtils");
const { readCSVFile } = require("./lib/files");

// Recibimos el input del usuario
const inputTitle = process.argv[2];
if (!inputTitle) {
    console.log("Por favor, proporciona un título de película como argumento.");
    process.exit(1); // Salir con un código de error
}

// Mostrar el título proporcionado
console.log(`Buscando la película: ${inputTitle}`);

// Leer el archivo CSV
try {
    const csvMovies = readCSVFile("data/movies.csv");

    // Buscar la película por título
    const movie = getMovieByTitle(inputTitle, csvMovies);

    if (movie) {
        console.log("Película encontrada:", movie);
    } else {
        console.log("No se encontró ninguna película con ese título.");
    }
} catch (error) {
    console.error("Error al leer el archivo CSV o procesar los datos:", error.message);
    process.exit(1); // Salir con un código de error
}*/
