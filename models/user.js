const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    'username': { type: 'string', required: true },
    'password': { type: 'string', required: false },
    'role': { type: 'string', required: true },
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;