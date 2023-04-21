const mongoose = require('mongoose')

const dbUrl = process.env.DB_URL

const dbConect = () => {

    mongoose.connect(dbUrl)
        .then(() => {
            console.log('conected')
        })
    // .catch((err) => {
    //     console.log(err)

    // })

}



module.exports = dbConect;