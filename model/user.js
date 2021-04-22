const {Schema, model} = require('mongoose')

const User = new Schema({
    username: {type: String, required : true},
    email: {type: String, unique: true, required : true},
    registered: {type: Date, required : true},
    lastLogin: {type: Date, default: null},
    password: {type: String, required : true},
})

module.exports = model('User', User)