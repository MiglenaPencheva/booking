const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function register(email, username, password) {
    let existingEmail = await User.findOne({ email });
    let existingUsername = await User.findOne({ username });
    if (existingEmail) throw { message:  'User with that email already exists' };
    if (existingUsername) throw { message:  'Username already exists, choose a new one' };

    let user = new User({ email, username, password });
    return await user.save();
}

async function login(username, password) {
    let user = await User.findOne({ username });
    if (!user) throw { message: 'User not found', status: 404 };

    let areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) throw { message: 'Wrong username or password', status: 404 };

    let token = jwt.sign({ _id: user._id, username: user.username }, SECRET);

    return token;
}

module.exports = {
    register,
    login
};