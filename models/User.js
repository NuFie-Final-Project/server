const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp2");

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    profilePicture: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    interests: [String],
    promoPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Promo"
        }
    ],
    interestPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Interest"
        }
    ],
    gender: {
        type: String
    }
});

userSchema.plugin(timestamp);

userSchema.pre("findOneAndRemove", function(next) {
    console.log("before remove");
});

const User = mongoose.model("User", userSchema);

module.exports = User;
