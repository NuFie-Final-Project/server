const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const promoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    partnerPromo: {
        type: Schema.Types.ObjectId,
        ref: 'PartnerPromo'
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

promoSchema.plugin(timestamp)

const Promo = mongoose.model('Promo', promoSchema)

module.exports = Promo