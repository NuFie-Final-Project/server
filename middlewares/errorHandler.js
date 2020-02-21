function errorHandler(err, req, res, next) {
    console.log(err);

    let errorCode = err.errorCode || 500;
    let message = err.message || "Internal server error";

    res.status(errorCode).json({ message });
}

module.exports = errorHandler;
