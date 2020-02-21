const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    // username: {
    //     type: String
    // },
    profile_picture: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    interests: [String],
    promoPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Promo'
    }],
    interestPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Interest'
    }],
    gender: {
        type: String
    }
})

userSchema.plugin(timestamp)

const User = mongoose.model('User', userSchema)

module.exports = User