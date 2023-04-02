const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'to short product title'],
        maxlength: [100, 'to long product title'],

    }
    ,
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, ' product Description is required'],
        minlength: [20, ' to shot product description']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required']

    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        max: [200000, 'to long product price']
    },
    priceAfterDiscount: {
        type: Number
    },

    colors: [String],
    imageCover: {
        type: String,
        required: [true, 'image cover is required']

    },
    images: { String },


    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Product must be Belong to parent Category']
    },
    subcategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    }],

    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'

    },
    ratingsAverage: {
        type: Number,
        min: [1, 'rating mus be abouve or erual 1.0'],
        max: [5, 'rating mus be below or erual 1.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    }


}, { timestamps: true })

// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name -_id',
    });
    next();
});


const productModele = mongoose.model('Products', productSchema)

module.exports = productModele