import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por IP
    message: {
        error: "Demasiadas solicitudes desde esta IP, por favor intenta nuevamente después de 15 minutos."
    },
    standardHeaders: true, // Incluir información de límite en los encabezados estándar
    legacyHeaders: false, // Deshabilitar los encabezados X-Ratelimit
});

export default limiter;
