const express = require('express')

const app = express()

const dotenv = require('dotenv')
// const fs = require('fs');
// const mprgan = require('morgan')
const ApiError = require('./utils/apiError')

dotenv.config({path:'./config.env'})


// make backend read json
app.use(express.json())
// app.use(mprgan('dev'))

const dbmongoose =  require('./config/connect')
const globalError = require('./middleware/errorMiddleware')

const categoryRoute = require('./routes/categoryRoute')
const brandRoute = require('./routes/brandRoute')
const subcategoryRoute = require('./routes/subCategoryRoute')
const productRoute = require('./routes/productRoute')
// const productModel = require('./models/productModel')
//conct db
dbmongoose()
// console.log(process.env.NODE_ENV)
//EndPoints to get images
app.use('/images' , express.static('./uploads'))


// endpoint
app.use('/api/v1/categories' , categoryRoute)
app.use('/api/v1/subcategories' , subcategoryRoute)
app.use('/api/v1/brand' , brandRoute)
app.use('/api/v1/product' , productRoute)


app.all('*',(req,res,next)=>{
    // const err = new Error(req.originalUrl)
    // next(`can't find this url ${err.message}`)
    next(new ApiError(`can't find this url: ${req.originalUrl}`, 400))
})


    // midelware handel error global  inide express = every error will handle
    app.use(globalError)
        


const servier = app.listen(3000, () => {
    console.log('server work')
})


// Events => list =? callback(err)  handle any error outside  express like mongoose ...
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`)
    servier.close(() => {
        console.error(`ShuttDown...`)

        process.exit(1)

    })
})




//     // midelware handel error global = every error will handle
// app.use((err, req, res, next) => {

//     err.statusCode = err.statusCode || 500
//     err.status = err.status || 'error'

//     res.status(err.statusCode).json({
//         status: err.status, // 400 or 500 ... 
//         error: err,
//         message: err.message,

//         stack: err.stack // whr is erro happend
//     })

// })
    



//V1
//     // midelware handel error global = every error will handle
// app.use((err,req,res,next)=>{
//     res.status(400).json({err})
    
//     })











