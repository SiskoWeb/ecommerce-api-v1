const mongoose = require('mongoose')


// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'user required'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        lowercase: true,
        uniqe: true,
    },
    phone: String,
    profileImg: String,
    password: {
        type: String,
        required: [true, "passowrd requierd"],
        minlegth: [6, 'to short password'],

    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true,
    },
    // child reference (one to many)
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Products',
        },
    ],
    addresses: [
        {
            id: { type: mongoose.Schema.Types.ObjectId }, // generate id uniuq
            alias: String,
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        },
    ]
},

    { timestamps: true }

)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Hashing user password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const userModel = mongoose.model('User', userSchema)

module.exports = userModel