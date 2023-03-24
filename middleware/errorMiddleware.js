
const sendErrorForDev = (err, res) => res.status(err.statusCode).json({
    status: err.status, // 400 or 500 ... 
    error: err,
    message: err.message,

    stack: err.stack // whr is erro happend
})

const sendErrorForProd = (err, res) => res.status(err.statusCode).json({
    status: err.status, // 400 or 500 ... 

    message: err.message,


})



const globalError = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res)
    }
    else {
        sendErrorForProd(err, res)

    }

}


module.exports = globalError


// exports.globalError  = (err, req, res, next) => {

//     err.statusCode = err.statusCode || 500
//     err.status = err.status || 'error'

//     res.status(err.statusCode).json({
//         status: err.status, // 400 or 500 ...
//         error: err,
//         message: err.message,

//         stack: err.stack // whr is erro happend
//     })

// }