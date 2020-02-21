const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp2");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, ""]
    },
    lastName: {
        type: String
    },
    profilePicture: {
        type: String
    },
    aboutMe: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: [true, ""],
        unique: [true, "This email has been registered"]
    },
    password: {
        type: String,
        required: [true, ""]
    },
    phoneNumber: {
        type: String
    },
    interests: [String],
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Activity"
        }
    ]
});

userSchema.plugin(timestamp);

userSchema.pre("save", function(next) {
    console.log("pre save");
    next();
});

userSchema.pre("findOneAndDelete", function(next) {
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
