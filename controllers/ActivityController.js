const Activity = require('../models/Activity.js');
const User = require('../models/User.js');

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
				status,
				isPromo
			} = req.body;

			const image = req.file && req.file.location ? req.file.location : '';
			const tags = req.body && req.body.tags && req.body.tags != '[]' ? JSON.parse(req.body.tags) : [];

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

			await User.updateOne(
				{ _id: req.userId },
				{
					$push: {
						posts: activity._id
					}
				}
			);

			res.status(201).json({ activity });
		} catch (error) {
			next(error);
		}
	}

	static async read(req, res, next) {
		try {
			const limit = req.query && req.query.limit ? +req.query.limit : 10;
			const page = req.query && req.query.page ? +req.query.page : 1;

			const activities = await Activity.find().limit(limit).skip(limit * (page - 1));

			res.status(200).json({ activities });
		} catch (error) {
			next(error);
		}
	}

	static async getByInterest(req, res, next) {
		try {
			const limit = req.query && req.query.limit ? +req.query.limit : 10;
			const page = req.query && req.query.page ? +req.query.page : 1;
			const interest = req.params && req.params.interest ? req.params.interest : 'other';

			const activities = await Activity.find({ tags: interest }).limit(limit).skip(limit * (page - 1));
			res.status(200).json({ activities });
		} catch (error) {
			next(error);
		}
	}

	static async getByCategory(req, res, next) {
		try {
			const limit = req.query && req.query.limit ? +req.query.limit : 10;
			const page = req.query && req.query.page ? +req.query.page : 1;
			const activities = await Activity.find({
				category: req.params.category
			})
				.limit(limit)
				.skip(limit * (page - 1));

			res.status(200).json({ activities });
		} catch (error) {
			next(error);
		}
	}

	static async readOne(req, res, next) {
		try {
			const activity = await Activity.findById(req.params.id)
				.populate('owner', '-password -posts')
				.populate('members', '-password -posts')
				.populate('pendingInvites', '-password -posts')
				.populate('pendingJoins', '-password -posts');

			res.status(200).json({ activity });
		} catch (error) {
			next(error);
		}
	}

	static async updateOne(req, res, next) {
		try {
			const { title, description, category, memberLimit, due_date, location, address, isPromo } = req.body;

			const image = req.file && req.file.location ? req.file.location : null;
			const tags = req.body && req.body.tags && req.body.tags != '[]' ? req.body.tags : null;

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

			const activity = await Activity.findByIdAndUpdate(req.params.id, inputs, {
				new: true
			});

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
			const status = 'commit';
			const activity = await Activity.findByIdAndUpdate(req.params.id, { status }, { new: true });
			res.status(200).json({ activity });
		} catch (error) {
			next(error);
		}
	}

	static async invite(req, res, next) {
		try {
			const { targetId } = req.body;

			let activity = await Activity.findOne({
				members: targetId
			});

			if (activity)
				throw {
					errorCode: 400,
					message: 'You already have invited this user to this activity'
				};

			activity = await Activity.findByIdAndUpdate(
				req.params.id,
				{ $addToSet: { pendingInvites: targetId } },
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
			const { targetId } = req.body;
			const activity = await Activity.findByIdAndUpdate(
				req.params.id,
				{ $pull: { members: targetId } },
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
			const { targetId } = req.body;

			let activity = await Activity.findOne({
				_id: req.params.id,
				pendingJoins: targetId
			});

			if (!activity)
				throw {
					errorCode: 400,
					message: 'The user you want to accept is not in pending join'
				};

			activity = await Activity.findByIdAndUpdate(
				req.params.id,
				{
					$addToSet: { members: targetId },
					$pull: { pendingJoins: targetId }
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
			const { targetId } = req.body;

			const activity = await Activity.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						pendingJoins: targetId
					}
				},
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
