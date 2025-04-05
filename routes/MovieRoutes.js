import express from 'express'; // const express = require('express');
import Movie from "../models/Movie.js"; //const Movie = require("../models/Movie");
import { getRandom, getMovieByIdOrName, getMoviesByGenre, getWelcomeMessage} from '../controller/MovieController.js';


// Ruta para obtener todas las películas
const router = express.Router();

// Ruta para mostrar un mensaje de bienvenida
router.get("/", (req, res) => {
    const welcomeMessage = getWelcomeMessage(); // Llama al controlador para obtener el mensaje de bienvenida
    res.status(200).json(welcomeMessage); // Devuelve el mensaje en formato JSON
});

// Ruta para obtener una película al azar
router.get("/random", (req, res) => {
    const randomMovie = getRandom();
    res.json(randomMovie);
});


// Ruta para obtener una película por ID o nombre
router.get("/movies/:identifier", (req, res) => {
    const { identifier } = req.params;
    const movie = getMovieByIdOrName(identifier);
    res.json(movie);
   
});

// Ruta para obtener todas las películas o filtrar por géneroI
router.get("/movies", (req, res) => {
    const { genre } = req.query; // Obtener el género de los parámetros de consulta
    const movies = getMoviesByGenre(genre); // Llamar al controlador para filtrar por género
    res.json(movies); // Devolver las películas filtradas como respuesta JSON
});




export default router;