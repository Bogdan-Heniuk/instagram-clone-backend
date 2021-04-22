const {Schema, model} = require('mongoose')

const Status = new Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },

    status : String
})

module.exports = model('Status', Status)