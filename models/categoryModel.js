const mongoose = require('mongoose')



// aanother style to create model
//1- create schema = create chak dyal data li an 7otoha fi db 
const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Category required'],
        unique:[true, 'Category must be Unique'],
        minlength:[3, 'Category to short'],
        maxlength:[32, 'Category to long'],
    },

    // if name has space : A and B comfert it to  A-and-B
    slug:{
        type:String,
        lowercase:true
    },
    images:{
        type:String
    }
} , 

{timestamps:true}

)
//2 create model 
const categoryModel = mongoose.model('Category' , categorySchema)

module.exports = categoryModel