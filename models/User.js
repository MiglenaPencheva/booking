const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

const userScheme = new mongoose.Schema({
    username: {
        type: String,
        required: ['Username is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Password should be at least 6 characters long'],
        validate: {
            validator: /^[a-zA-z0-9]$/,
            message: 'Password should contains only english letters and digits'
        },
    },
    email: {
        type: String,
        required: ['Email is required'],
        unique: true,
        validate: {
            validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Valid email address required'
        },
    },
    hotelsBooked: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel',
    }],
    hotelsOffered: [{
        type: mongoose.Types.ObjectId,
        ref: 'Hotel',
    }]
});

userScheme.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

module.exports = mongoose.model('User', userScheme);
