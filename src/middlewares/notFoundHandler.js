import createError from 'http-errors';

const notFoundHandler = (req, res, next) => {
    const error = createError(404, `Route ${req.url} not found`);
    next(error);
};

export default notFoundHandler;