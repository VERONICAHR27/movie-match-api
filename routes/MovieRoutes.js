import express from 'express';
import { getWelcomeMessageController, 
    getRandomMovieController, 
    getMovieByIdOrNameController, 
    getMoviesController 
} from '../controller/MovieController.js';


// Ruta para obtener todas las películas
const router = express.Router();

// Ruta para mostrar un mensaje de bienvenida
router.get("/", getWelcomeMessageController);

// Ruta para obtener una película al azar
router.get("/random", getRandomMovieController);

// Ruta para obtener una película por ID o nombre
router.get("/movies/:identifier", getMovieByIdOrNameController);

// Ruta para obtener todas las películas o filtrar por género
router.get("/movies/", getMoviesController);

export default router;