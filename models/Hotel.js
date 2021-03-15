const mongoose = require('mongoose');

const hotelScheme = new mongoose.Schema({
    hotel: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Title should be at least 4 characters long']
    },
    city: {
        type: String,
        required: ['Description is required'],
        minlength: [3, 'City should be at least 3 characters long']
    },
    freeRooms: {
        type: Number,
        required: ['Rooms number is required'],
        min: [1, 'The number of free rooms should be between 1 and 100'],
        max: [100, 'The number of free rooms should be between 1 and 100'],
    },
    imageUrl: {
        type: String,
        required: ['Image is required'],
        validate: {
            validator: (v) => /^https?:\/\//,
            message: (props) => `Invalid URL`
        }
    },
    usersBookedRoom: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Hotel', hotelScheme);