export const errorHandler = (err, req, res, next) => {
    if (err.message === 'NoResultsFound') {
        return res.status(404).json({ error: "No se encontraron resultados para la búsqueda." });
    }

    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
};