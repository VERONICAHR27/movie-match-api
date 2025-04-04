const fs = require("fs");

function readCSVFile(filePath) {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (error) {
        console.error(`Error al leer el archivo CSV: ${error.message}`);
        throw error;
    }
}

module.exports = { readCSVFile };

