const {parseCSVRow} = require("./movieUtils.js");

const fs = require("fs");
const path = require("path");

const inputTitle = process.argv[2];
console.log(inputTitle);

const csvFilePath = path.join(__dirname, "data", "movies.csv");
const csvData = fs.readFileSync(csvFilePath, "utf8");


const lines = csvData.split("\n");
const headers = parseCSVRow(lines[0]);

let movie = {};

for (let i = 1; i < lines.length; i++) {
	const values = parseCSVRow(lines[i]);
	if (values[1] === inputTitle) {
		headers.forEach((header, index) => {
			movie[header] = values[index];
		});
		break;
	}
}

console.log(movie);
