const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const User = require("../models/User.js");
const Activity = require("../models/Activity.js");

const app = require("../app");
const {
    removeAllUser,
    createUser,
    createActivity,
    removeAllActivity
} = require("./helpers");

chai.use(chaiHttp);

const activityCreatorUser = {
    firstName: "creator",
    email: "creator@mail.com",
    password: "asd123"
};

const user1Data = {
    firstName: "user1",
    email: "user1@mail.com",
    password: "asd123",
    interests: ["javascript", "react"]
};

const user2Data = {
    firstName: "user2",
    email: "user2@mail.com",
    password: "asd123",
    interests: ["programming"]
};

const activity1Data = {
    title: "activity1",
    description: "description1"
};

let createdUser0, createdUser1, createdUser2;
let createdActivity1;

describe.only("/user", function() {
    before(async function() {
        createdUser0 = await createUser(activityCreatorUser);
        createdUser1 = await createUser(user1Data);
        createdUser2 = await createUser(user2Data);

        // createdActivity1 = await Activity.create({
        //     owner: createdUser0._id,
        //     title: activity1Data.title,
        //     description: activity1Data.description,
        //     tags: JSON.stringify(["react", "vue", "javascript"])
        // });

        // createdActivity1 = tempActivityResp.activity._id;
    });

    after(async function() {
        await removeAllUser();
        await removeAllActivity();
    });

    describe("Edit user profile: PATCH /users/:id", function() {
        it("should return a modified user object - status code 200", async function() {
            const updateData = {
                lastName: "Bond"
            };

            const response = await chai
                .request(app)
                .patch("/users")
                .set({
                    token: createdUser1.token
                })
                .send(updateData);

            expect(response).to.have.status(200);
            expect(response.body.user.lastName).to.equal("Bond");
        });
    });

    describe("Get self detail: GET /users/:id", function() {
        it("Return a user object with the post populated - status 200", async function() {
            const activityResp = await chai
                .request(app)
                .post("/activities")
                .set({
                    token: createdUser0.token
                })
                .send(activity1Data);

            const activity = activityResp.body.activity;

            const response = await chai
                .request(app)
                .get("/users")
                .set({
                    token: createdUser0.token
                });

            // console.log(response.body.user.posts[0], "isi body");
            expect(response).to.have.status(200);
            expect(response.body.user.posts[0]).to.equal(activity._id);
        });
    });
});
