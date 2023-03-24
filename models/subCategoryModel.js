const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trime: true,
            required: [true, 'Category required'],
            unique: [true, 'Category must be Unique'],
            minlength: [2, 'Category to short'],
            maxlength: [32, 'Category to long'],
        },
        // if name has space : A and B comfert it to  A-and-B
        slug: {
            type: String,
            lowercase: true
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, 'SubCategory must be belong to parent category '],
        }

    },
    {
        timestamps: true
    }
)
const subcategoryModel = mongoose.model('SubCategory', subCategorySchema)


module.exports = subcategoryModel