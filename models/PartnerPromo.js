const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timestamp = require('mongoose-timestamp2')

const partnerPromoSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    location: {
        type: String
    }
})

partnerPromoSchema.plugin(timestamp)

const PartnerPromo = mongoose.model('PartnerPromo', partnerPromoSchema)

module.exports = PartnerPromo