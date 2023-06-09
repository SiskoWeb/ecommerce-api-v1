const mongoose = require('mongoose')

const AddUrl = require('../middleware/addUrlImg')

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be Unique'],
        minlength: [3, 'Category to short'],
        maxlength: [32, 'Category to long'],
    },

    // if name has space : A and B comfert it to  A-and-B
    slug: {
        type: String,
        lowercase: true
    },
    image: {
        type: String
    }
},

    { timestamps: true }

)

const postUrl = new AddUrl(brandSchema)




postUrl.post('brands')
postUrl.save('brands')

const brandModel = mongoose.model('Brand', brandSchema)

module.exports = brandModel