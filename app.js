const path = require('path')

const express = require('express')

const app = express()

const dotenv = require('dotenv')
// const fs = require('fs');
// const mprgan = require('morgan')
const ApiError = require('./utils/apiError')

dotenv.config({path:'./config.env'})

// console.log(process.env.NODE_ENV)
// make backend read json
app.use(express.json())
// app.use(mprgan('dev'))

const dbmongoose =  require('./config/connect')
const globalError = require('./middleware/errorMiddleware')

// eslint-disable-next-line import/order
const fs = require('fs');

const categoryRoute = require('./routes/categoryRoute')
const brandRoute = require('./routes/brandRoute')
const subcategoryRoute = require('./routes/subCategoryRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const reviewRoute = require('./routes/reviewRoute')
const wishlistRoute = require('./routes/wishlistRoute')
const adressRoute = require('./routes/adressRoute')
const couponRoute = require('./routes/couponRoute')
const cartRoute = require('./routes/cartRoute')
const productModele = require('./models/productModel')
// const productModel = require('./models/productModel')
//conct db
dbmongoose()


// // Delete data from DB
// const destroyData = async () => {
//     try {
//         await productModele.deleteMany();
//         console.log('Data Destroyed');
//         // process.exit();
//     } catch (error) {
//         console.log(error);
//     }
// };


// destroyData()


// const products = JSON.parse(fs.readFileSync('./products.json'));


// // Insert data into DB
// const insertData = async () => {
//     try {
//         await productModele.create(products);

//         console.log('Data Inserted');
//         // process.exit();
//     } catch (error) {
//         console.log(error);
//     }
// };
// insertData()



// console.log(process.env.NODE_ENV)
// //EndPoints to get images
// app.use('/images' , express.static('./uploads'))
app.use( express.static(path.join(__dirname, 'uploads')))


// endpoint
app.use('/api/v1/categories' , categoryRoute)
app.use('/api/v1/subcategories' , subcategoryRoute)
app.use('/api/v1/brand' , brandRoute)
app.use('/api/v1/products' , productRoute)
app.use('/api/v1/users' , userRoute)
app.use('/api/v1/auth' , authRoute)
app.use('/api/v1/review' , reviewRoute)
app.use('/api/v1/wishlist' , wishlistRoute)
app.use('/api/v1/adress' , adressRoute)
app.use('/api/v1/coupon' , couponRoute)
app.use('/api/v1/cart', cartRoute);


app.all('*',(req,res,next)=>{
    // const err = new Error(req.originalUrl)
    // next(`can't find this url ${err.message}`)
    next(new ApiError(`can't find this url: ${req.originalUrl}`, 400))
})


    // midelware handel error global  inide express = every error will handle
    app.use(globalError)
        
    const PORT = process.env.PORT || 3000;

const servier = app.listen(PORT, () => {
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











