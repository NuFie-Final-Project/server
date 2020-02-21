const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const interestSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    category: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    memberLimit: {
        type: Number
    },
    due_date: {
        type: Date
    },
    location: {
        type: String
    },
    address: {
        type: String
    },
    tags: [String],
    status: {
        type: String
    }
})

interestSchema.plugin(timestamp)

const Interest = mongoose.model('Interest', interestSchema)

module.exports = Interest