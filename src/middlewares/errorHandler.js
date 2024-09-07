const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    res.status(status).json({
        status,
        message,
        data: error.message || 'No additional error data available',
    });
};

export default errorHandler;