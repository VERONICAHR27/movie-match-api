import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readCSVFile(relative_path_filename) {
	const csvFilePath = path.join(__dirname, "../", relative_path_filename);
	return fs.readFileSync(csvFilePath, "utf8");
}

export { readCSVFile };

