function errorHandler(err, req, res, next) {
    console.log(err);

    let errorCode = err.errorCode || 500;
    let message = err.message || "Internal server error";

    if (err.errors){
      message = []
      for (field in err.errors){
        message.push(err.errors[field].message)
      }
    } 
    res.status(errorCode).json({ message });
}

module.exports = errorHandler;
