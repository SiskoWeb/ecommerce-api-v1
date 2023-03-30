const fs = require('fs');



// const dotenv = require('dotenv');
const productModel = require('../models/productModel');

const dbConnection = require('../config/connect');

// dotenv.config({ path: '../../config.env' });

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));


// Insert data into DB
const insertData = async () => {
    try {
        await productModel.create(products);

        console.log('Data Inserted');
        // process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await productModel.deleteMany();
        console.log('Data Destroyed');
        // process.exit();
    } catch (error) {
        console.log(error);
    }
};


destroyData()

// node seeder.js -d
if (process.argv[2] === '-i') {
    insertData();
} else if (process.argv[2] === '-d') {
    destroyData();
}

productModel.create(products)