const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const app = require('../app');
const { removeAllActivity } = require('./helpers');

chai.use(chaiHttp);

describe('/activities', function() {
	after(async function() {
		await removeAllActivity();
	});

	describe('POST /activities', function() {
		it('should create a new activity - (code: 201)', async function() {
			const data = {
				title: 'Bikin NuFie',
				description: 'Coding NuFie di Hacktiv8',
				image: 'sample.jpg',
				category: 'coding',
				memberLimit: 5,
				due_date: '2020-02-25',
				location: 'Pondok Indah',
				address: 'Jl. Sultan Iskandar Muda',
				tags: [ 'final', 'project' ],
				status: 'open',
				isPromo: false
			};
			const response = await chai.request(app).post('/activities')// .set('token', '')
			.send(data);

			expect(response).to.have.status(201);
			expect(response.body).to.be.an('object');
			expect(response.body).to.have.property('activity');
			expect(response.body.activity).to.have.property('_id');
			expect(response.body.activity).to.have.property('createdAt');
			expect(response.body.activity).to.have.property('updatedAt');

			expect(response.body.activity).to.have.property('members');
			expect(response.body.activity).to.have.property('pendingInvites');
			expect(response.body.activity).to.have.property('pendingJoins');

			expect(response.body.activity.members.length).to.equal(0);
			expect(response.body.activity.pendingInvites.length).to.equal(0);
			expect(response.body.activity.pendingJoins.length).to.equal(0);

			expect(response.body.activity).to.have.property('title');
			expect(response.body.activity).to.have.property('description');
			expect(response.body.activity).to.have.property('image');
			expect(response.body.activity).to.have.property('category');
			expect(response.body.activity).to.have.property('memberLimit');
			expect(response.body.activity).to.have.property('due_date');
			expect(response.body.activity).to.have.property('location');
			expect(response.body.activity).to.have.property('address');
			expect(response.body.activity).to.have.property('tags');
			expect(response.body.activity).to.have.property('status');
			expect(response.body.activity).to.have.property('isPromo');

			expect(response.body.activity.title).to.equal(data.title);
			expect(response.body.activity.description).to.equal(data.description);
			expect(response.body.activity.image).to.equal(data.image);
			expect(response.body.activity.category).to.equal(data.category);
			expect(response.body.activity.memberLimit).to.equal(data.memberLimit);
			expect(response.body.activity.due_date).to.includes(data.due_date);
			expect(response.body.activity.location).to.equal(data.location);
			expect(response.body.activity.address).to.equal(data.address);
			expect(response.body.activity.tags[0]).to.equal(data.tags[0]);
			expect(response.body.activity.tags[1]).to.equal(data.tags[1]);
			expect(response.body.activity.status).to.equal(data.status);
			expect(response.body.activity.isPromo).to.equal(data.isPromo);
		});

		it('should send errors - (Empty body, code: 400)', async function() {
			const data = {};
			const response = await chai.request(app).post('/activities').send(data);

			expect(response).to.have.status(400);
			expect(response.body).to.be.an('object');
			expect(response.body).to.have.property('message');
			expect(response.body.message[0]).to.equal('Title is required');
			expect(response.body.message[1]).to.equal('Description is required');
			//tambah validation2 yg lain
		});
	});

	describe('GET /activities', function() {
		it('should get all activity - (code: 200)', async function() {
			const response = await chai.request(app).get('/activities');
			console.log(response.body);
			expect(response).to.have.status(201);
			expect(response.body).to.be.an('object');
			expect(response.body).to.have.property('activity');
			expect(response.body.activity).to.have.property('_id');
			expect(response.body.activity).to.have.property('createdAt');
			expect(response.body.activity).to.have.property('updatedAt');

			expect(response.body.activity).to.have.property('members');
			expect(response.body.activity).to.have.property('pendingInvites');
			expect(response.body.activity).to.have.property('pendingJoins');

			expect(response.body.activity.members.length).to.equal(0);
			expect(response.body.activity.pendingInvites.length).to.equal(0);
			expect(response.body.activity.pendingJoins.length).to.equal(0);

			expect(response.body.activity).to.have.property('title');
			expect(response.body.activity).to.have.property('description');
			expect(response.body.activity).to.have.property('image');
			expect(response.body.activity).to.have.property('category');
			expect(response.body.activity).to.have.property('memberLimit');
			expect(response.body.activity).to.have.property('due_date');
			expect(response.body.activity).to.have.property('location');
			expect(response.body.activity).to.have.property('address');
			expect(response.body.activity).to.have.property('tags');
			expect(response.body.activity).to.have.property('status');
			expect(response.body.activity).to.have.property('isPromo');

			expect(response.body.activity.title).to.equal(data.title);
			expect(response.body.activity.description).to.equal(data.description);
			expect(response.body.activity.image).to.equal(data.image);
			expect(response.body.activity.category).to.equal(data.category);
			expect(response.body.activity.memberLimit).to.equal(data.memberLimit);
			expect(response.body.activity.due_date).to.includes(data.due_date);
			expect(response.body.activity.location).to.equal(data.location);
			expect(response.body.activity.address).to.equal(data.address);
			expect(response.body.activity.tags[0]).to.equal(data.tags[0]);
			expect(response.body.activity.tags[1]).to.equal(data.tags[1]);
			expect(response.body.activity.status).to.equal(data.status);
			expect(response.body.activity.isPromo).to.equal(data.isPromo);
		});
	});
	const app = require('../app');
	const { createUser, createActivity, removeAllUser, removeAllActivity } = require('./helpers');

	chai.use(chaiHttp);

	describe.only('/activities', function() {
		let token = '';
		let activity1Id = '';
		let activity2Id = '';
		const activity1 = {
			title: 'Coldplay',
			description: 'Nonton konser Coldplay',
			image: '',
			category: 'music',
			memberLimit: 5,
			due_date: '2020-02-25',
			location: 'BSD',
			address: 'Jl. Grand Boulevard',
			tags: [ 'coldplay', 'konser' ],
			status: 'open',
			isPromo: false
		};

		const activity2 = {
			title: 'Star Wars',
			description: 'Nonton Star Wars di bioskop',
			image: '',
			category: 'movie',
			memberLimit: 5,
			due_date: '2020-02-27',
			location: 'Pondok Indah',
			address: 'Jl. Sultan Iskandar Muda',
			tags: [ 'wars', 'star' ],
			status: 'open',
			isPromo: false
		};
		before(async function() {
			//blm tau cara create user dengan token dinamis, ini langsung create di DB
			let userData = {
				firstName: 'John',
				lastName: 'Doe',
				profilePicture: 'sample.png',
				email: 'john@mail.com',
				password: '123456',
				gender: 'male',
				interest: 'javascript',
				phoneNumber: '+6281212341234'
			};
			let data = await createUser(userData);
			token = data.token;
		});

		after(async function() {
			await removeAllActivity();
			await removeAllUser();
		});

		describe('POST /activities', function() {
			it('should create a new activity - (code: 201)', async function() {
				const response = await chai.request(app).post('/activities').set('token', token).send(activity1);

				expect(response).to.have.status(201);
				expect(response.body).to.be.an('object');
				expect(response.body).to.have.property('activity');
				expect(response.body.activity).to.have.property('_id');
				expect(response.body.activity).to.have.property('createdAt');
				expect(response.body.activity).to.have.property('updatedAt');

				expect(response.body.activity.members.length).to.equal(0);
				expect(response.body.activity.pendingInvites.length).to.equal(0);
				expect(response.body.activity.pendingJoins.length).to.equal(0);

				expect(response.body.activity.title).to.equal(activity1.title);
				expect(response.body.activity.description).to.equal(activity1.description);
				expect(response.body.activity.image).to.equal(activity1.image);
				expect(response.body.activity.category).to.equal(activity1.category);
				expect(response.body.activity.memberLimit).to.equal(activity1.memberLimit);
				expect(response.body.activity.due_date).to.includes(activity1.due_date);
				expect(response.body.activity.location).to.equal(activity1.location);
				expect(response.body.activity.address).to.equal(activity1.address);
				expect(response.body.activity.tags[0]).to.equal(activity1.tags[0]);
				expect(response.body.activity.tags[1]).to.equal(activity1.tags[1]);
				expect(response.body.activity.status).to.equal(activity1.status);
				expect(response.body.activity.isPromo).to.equal(activity1.isPromo);
			});

			it('should send errors - (Empty body, code: 400)', async function() {
				const data = {};
				const response = await chai.request(app).post('/activities').set('token', token).send(data);

				expect(response).to.have.status(400);
				expect(response.body).to.be.an('object');
				expect(response.body).to.have.property('message');
				expect(response.body.message[0]).to.equal('Title is required');
				expect(response.body.message[1]).to.equal('Description is required');
				//tambah validation2 yg lain
			});
		});

		describe('GET /activities', function() {
			before(async function() {
				let activity = await createActivity(activity2);
				activityId = activity._id;
			});

			it('should get all activity - (code: 200)', async function() {
				const response = await chai.request(app).get('/activities').set('token', token);
				expect(response).to.have.status(200);
				expect(response.body).to.be.an('object');
				expect(response.body).to.have.property('activities');
				expect(response.body.activities).to.be.an('array');
				expect(response.body.activities.length).to.equal(2);

				expect(response.body.activities[0].title).to.equal(activity1.title);
				expect(response.body.activities[0].description).to.equal(activity1.description);
				expect(response.body.activities[0].category).to.equal(activity1.category);
				expect(response.body.activities[0].location).to.equal(activity1.location);
				expect(response.body.activities[0].tags[0]).to.equal(activity1.tags[0]);
				expect(response.body.activities[0].tags[1]).to.equal(activity1.tags[1]);

				expect(response.body.activities[1].title).to.equal(activity2.title);
				expect(response.body.activities[1].description).to.equal(activity2.description);
				expect(response.body.activities[1].category).to.equal(activity2.category);
				expect(response.body.activities[1].location).to.equal(activity2.location);
				expect(response.body.activities[1].tags[0]).to.equal(activity2.tags[0]);
				expect(response.body.activities[1].tags[1]).to.equal(activity2.tags[1]);
			});

			it('should return user authentication error - (code: 400)', async function() {
				const response = await chai.request(app).get('/activities');

				expect(response).to.have.status(400);
				expect(response.body).to.be.an('object');
				expect(response.body).to.have.property('message');
				expect(response.body.message).to.equal('User authentication error: requires token');
			});

			it('should return one activity with details - (code: 200)', async function() {
				const response = await chai.request(app).get(`/activities/${activityId}`).set('token', token);

				expect(response).to.have.status(200);
				expect(response.body.activity.title).to.equal(activity2.title);
				expect(response.body.activity.description).to.equal(activity2.description);
				expect(response.body.activity.category).to.equal(activity2.category);
				expect(response.body.activity.location).to.equal(activity2.location);
				expect(response.body.activity.tags[0]).to.equal(activity2.tags[0]);
				expect(response.body.activity.tags[1]).to.equal(activity2.tags[1]);
			});

			it('should return activities with specified category - (code: 200)', async function() {
				const response = await chai.request(app).get(`/activities/category/movie`).set('token', token);

				expect(response).to.have.status(200);
				expect(response.body.activities[0].title).to.equal(activity2.title);
				expect(response.body.activities[0].description).to.equal(activity2.description);
				expect(response.body.activities[0].category).to.equal(activity2.category);
				expect(response.body.activities[0].location).to.equal(activity2.location);
				expect(response.body.activities[0].tags[0]).to.equal(activity2.tags[0]);
				expect(response.body.activities[0].tags[1]).to.equal(activity2.tags[1]);
			});

			it('should return invalid ID error - (code: 400)', async function() {
				const response = await chai.request(app).get(`/activities/invalidID`).set('token', token);

				expect(response).to.have.status(400);
				expect(response.body.message).to.equal('Invalid ID type');
			});
		});

		// describe('PATCH /activities', function() {
		//   it('should return edited activity - (code: 200)', async function() {
		//     const activityEdit = {
		//       title: 'Star Wars',
		//       description: 'Nonton Star Wars di bioskop',
		//       image: '',
		//       category: 'movie',
		//       memberLimit: 5,
		//       due_date: '2020-02-27',
		//       location: 'Pondok Indah Mall',
		//       address: 'Jl. Sultan',
		//       tags: ['wars', 'star'],
		//       status: 'open',
		//       isPromo: false
		//     };
		//     const response = await chai
		//         .request(app)
		//         .get(`/activities/${activityId}`)
		//         .set('token', token)
		//         console.log(response.body)
		//   });
	});
});
