const User = require("../models/User.js");
const admin = require("../services/firebase-admin");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
    static async register(req, res, next) {
        try {
            const decodedToken = await admin
                .auth()
                .verifyIdToken(req.body.idToken);

            const email = decodedToken.email;

            const {
                firstName,
                lastName,
                password,
                gender,
                interest,
                phoneNumber
            } = req.body;

            const profilePicture =
                req.file && req.file.location ? req.file.location : "";

            const user = await User.create({
                firstName,
                lastName,
                profilePicture,
                email,
                password,
                gender,
                interest,
                phoneNumber
            });

            const payload = {
                userId: user._id
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET);

            res.status(201).json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async registerWithGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENTID);

            const ticket = await client.verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_SIGNIN_CLIENTID
            });

            const payload = ticket.getPayload();
            const email = payload.email;
            const password = Math.random()
                .toString(36)
                .slice(-8);
            const firstName = payload.given_name;
            const lastName = payload.family_name ? payload.family_name : "";
            const profilePicture = payload.picture ? payload.picture : "";

            const user = await User.create({
                email,
                password,
                firstName,
                lastName,
                profilePicture
            });

            const jwtPayload = {
                userId: user._id
            };

            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

            res.status(201).json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { idToken } = req.body;

            const decodedToken = await admin.auth().verifyIdToken(idToken);

            const user = await User.findOne({ email: decodedToken.email });

            const payload = {
                userId: user._id
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async loginWithGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENTID);

            const ticket = await client.verifyIdToken({
                idToken: req.body.idToken,
                audience: process.env.GOOGLE_SIGNIN_CLIENTID
            });

            const payload = ticket.getPayload();
            const user = await User.findOne({ email: payload.email });

            if (!user)
                throw {
                    errorCode: 400,
                    message: "Login with google has failed. Bad idToken"
                };

            const tokenPayload = {
                userId: user._id
            };

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                profilePicture,
                email,
                password,
                gender,
                interest
            } = req.body;

            const user = await User.create({
                firstName,
                lastName,
                profilePicture,
                email,
                password,
                gender,
                interest
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
                email,
                password,
                gender,
                phoneNumber
            } = req.body;

            const inputs = {};
            if (firstName) inputs.firstName = firstName;
            if (lastName) inputs.lastName = lastName;
            if (req.file && req.file.location)
                inputs.profilePicture = req.file.location;
            if (email) inputs.email = email;
            if (password) inputs.password = password;
            if (gender) inputs.gender = gender;
            if (phoneNumber) inputs.phoneNumber = phoneNumber;

            const user = await User.findByIdAndUpdate(
                { _id: req.userId },
                inputs,
                {
                    new: true,
                    runValidators: true
                }
            );

            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }

    static async deleteOne(req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.userId);
            if (!user) {
                throw {
                    errorCode: 400,
                    message: "User not found"
                };
            }
            res.status(200).json({ user });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
