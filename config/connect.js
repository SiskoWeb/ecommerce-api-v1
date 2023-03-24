const mongoose = require('mongoose')


const dbConect = () =>{

    mongoose.connect('mongodb+srv://siskodb:sisko007SP@cluster0.2pdvdr6.mongodb.net/ecom_db_test?retryWrites=true&w=majority')
    .then(() => {
        console.log('conected')
    })
    // .catch((err) => {
    //     console.log(err)

    // })

}



    module.exports = dbConect;