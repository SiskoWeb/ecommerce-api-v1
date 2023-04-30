const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
    {
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                color: String,
                price: Number,
            },
        ],
        totalCartPrice: Number,
        totalPriceAfterDiscount: Number,

        //bring user id from db  {who did this action}
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);