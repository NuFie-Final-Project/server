function errorHandler(err, req, res, next) {
    console.log(err);
    // console.log(Object.keys(err.errors));

    let errorCode = err.errorCode || 500;
    let message = err.message || "Internal server error";

    if (err.errors) {
        message = [];
        for (let field in err.errors) {
            message.push(err.errors[field].message);
        }
    }

    console.log(message);
    res.status(errorCode).json({ message });
}

module.exports = errorHandler;
