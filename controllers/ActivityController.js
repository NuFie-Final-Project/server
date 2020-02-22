const Activity = require("../models/Activity.js");

class ActivityController {
    static async create(req, res, next) {
        try {
            const owner = req.userId;
            const {
                title,
                description,
                category,
                memberLimit,
                due_date,
                location,
                address,
                tags,
                status,
                isPromo
            } = req.body;

            const image =
                req.file && req.file.location ? req.file.location : "";

            const activity = await Activity.create({
                owner,
                title,
                description,
                image,
                category,
                memberLimit,
                due_date,
                location,
                address,
                tags,
                status,
                isPromo
            });

            res.status(201).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async read(req, res, next) {
        try {
            const limit = req.query && req.query.limit ? req.query.limit : 10;
            const page = req.query && req.query.page ? req.query.page : 1;

            const activities = await Activity.find()
                .limit(limit)
                .skip(limit * (page - 1));

            res.status(200).json({ activities });
        } catch (error) {
            next(error);
        }
    }

    static async getByCategory(req, res, next) {
        try {
            const limit = req.query && req.query.limit ? req.query.limit : 10;
            const page = req.query && req.query.page ? req.query.page : 1;
            const activities = await Activity.find({ category: req.params.category })
                .limit(limit)
                .skip(limit * (page - 1));

            res.status(200).json({ activities });
        } catch (error) {
            next(error);
        }
    }

    static async readOne(req, res, next) {
        try {
            const activity = await Activity.findById(req.userId);
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async updateOne(req, res, next) {
        try {
            const {
                title,
                description,
                category,
                memberLimit,
                due_date,
                location,
                address,
                tags,
                status,
                isPromo
            } = req.body;

            const image =
                req.file && req.file.location ? req.file.location : null;

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

            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                inputs
            );

            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async deleteOne(req, res, next) {
        try {
            const activity = await Activity.findByIdAndDelete(req.params.id);
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async commit(req, res, next) {
        try {
            const status = 'commit'
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async invite(req, res, next) {
        try {
            const { invitedMemberId } = req.body
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { pendingInvites: invitedMemberId } },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async inviteAccept(req, res, next) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { 
                    $addToSet: { members: req.userId },
                    $pull: { pendingInvites: req.userId }
                },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async inviteReject(req, res, next) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { $pull: { pendingInvites: req.userId } },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async kick(req, res, next) {
        try {
            const { kickedMemberId } = req.body
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { $pull: { members: kickedMemberId } },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async join(req, res, next) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { pendingJoins: req.userId } },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async joinAccept(req, res, next) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { 
                    $addToSet: { members: req.userId },
                    $pull: { pendingJoins: req.userId }
                },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async joinReject(req, res, next) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { $pull: { pendingJoins: req.userId } },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }

    static async leave(req, res, next) {
        try {
            const activity = await Activity.findByIdAndUpdate(
                req.params.id,
                { $pull: { members: req.userId } },
                { new: true }
            );
            res.status(200).json({ activity });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ActivityController;
