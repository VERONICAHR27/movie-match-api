const http = require("http");
const fs = require("fs");
const path = require("path");
const { parseCSVRow } = require("./movieUtils.js");

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        const csvFilePath = path.join(__dirname, "data", "movies.csv");

        // Leer el archivo CSV
        const csvData = fs.readFileSync(csvFilePath, "utf8");
        const lines = csvData.split("\n");
        const headers = parseCSVRow(lines[0]);

        // Seleccionar una película al azar
        const randomIndex = Math.floor(Math.random() * (lines.length - 1)) + 1; // Ignorar encabezados
        const values = parseCSVRow(lines[randomIndex]);

        // Crear un objeto con los datos de la película
        const movie = {};
        headers.forEach((header, index) => {
            movie[header] = values[index];
        });

        // Responder con los datos de la película en formato JSON
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(movie));
    } else {
        // Responder con 404 si la ruta no es "/"
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});