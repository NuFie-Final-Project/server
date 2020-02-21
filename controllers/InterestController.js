const Interest = require("../models/Interest.js");

class InterestController {
    static async create(req, res, next) {
        try {
            const owner = req.userId;
            const {
                title,
                description,
                image,
                category,
                memberLimit,
                due_date,
                location,
                address,
                tags
            } = req.body;

            const interest = await Interest.create({
                owner,
                title,
                description,
                image,
                category,
                memberLimit,
                due_date,
                location,
                address,
                tags
            });

            res.status(201).json({ interest });
        } catch (error) {
            next(error);
        }
    }

    static async read(req, res, next) {
        try {
            const limit = req.query && req.query.limit ? req.query.limit : 10;
            const page = req.query && req.query.page ? req.query.page : 1;

            const interests = await Interest.find()
                .limit(limit)
                .skip(limit * (page - 1));

            res.status(200).json({ interests });
        } catch (error) {
            next(error);
        }
    }

    static async readOne(req, res, next) {
        try {
            const interest = await Interest.findOne({ _id: req.userId });
            res.status(200).json({ interest });
        } catch (error) {
            next(error);
        }
    }

    static async updateOne(req, res, next) {
        try {
            const {
                title,
                description,
                image,
                category,
                memberLimit,
                due_date,
                location,
                address,
                tags
            } = req.body;

            const inputs = {};
            if (title) inputs.title = title;
            if (description) inputs.description = description;
            if (image) inputs.image = image;
            if (category) inputs.category = category;
            if (memberLimit) inputs.memberLimit = memberLimit;
            if (due_date) inputs.due_date = due_date;
            if (location) inputs.location = location;
            if (address) inputs.address = address;
            if (tags) inputs.tags = tags;

            const interest = await Interest.findOneAndUpdate(
                { _id: req.userId },
                inputs
            );

            res.status(200).json({ results });
        } catch (error) {
            next(error);
        }
    }

    static async deleteOne(req, res, next) {
        try {
            const interest = await Interest.findOneAndDelete({
                _id: req.userId
            });
            res.status(200).json({ interest });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = InterestController;
