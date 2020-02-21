const User = require("../models/User.js");

class UserController {
    static async create(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                profilePicture,
                email,
                password,
                gender
            } = req.body;

            const user = await User.create({
                firstName,
                lastName,
                profilePicture,
                email,
                password,
                gender
            });

            res.status(201).json({ user });
        } catch (error) {
            next(error);
        }
    }

    static async readOne(req, res, next) {
        try {
            const user = await User.findOne({ _id: req.userId });
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }

    static async updateOne(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                profilePicture,
                email,
                password,
                gender
            } = req.body;

            const inputs = {};
            if (firstName) inputs.firstName = firstName;
            if (lastName) inputs.lastName = lastName;
            if (profilePicture) inputs.lastName = profilePicture;
            if (email) inputs.email = email;
            if (password) inputs.password = password;
            if (gender) inputs.gender = gender;

            const user = await User.findByIdAndUpdate(
                { _id: req.userId },
                inputs
            );

            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }

    static async deleteOne(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.userId);
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
