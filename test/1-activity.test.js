const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const app = require("../app");
const { removeAllActivity } = require("./helpers");

chai.use(chaiHttp);

describe("/activities", function() {
    after(async function() {
        await removeAllActivity();
    });

    describe("POST /activities", function() {
        it("should create a new activity - (code: 201)", async function() {
            const data = {
                title: "Bikin NuFie",
                description: "Coding NuFie di Hacktiv8",
                image: "sample.jpg",
                category: "coding",
                memberLimit: 5,
                due_date: "2020-02-25",
                location: "Pondok Indah",
                address: "Jl. Sultan Iskandar Muda",
                tags: ["final", "project"],
                status: "open",
                isPromo: false
            };
            const response = await chai
                .request(app)
                .post("/activities")
                // .set('token', '')
                .send(data);

            expect(response).to.have.status(201);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("activity");
            expect(response.body.activity).to.have.property("_id");
            expect(response.body.activity).to.have.property("createdAt");
            expect(response.body.activity).to.have.property("updatedAt");

            expect(response.body.activity).to.have.property("members");
            expect(response.body.activity).to.have.property("pendingInvites");
            expect(response.body.activity).to.have.property("pendingJoins");

            expect(response.body.activity.members.length).to.equal(0);
            expect(response.body.activity.pendingInvites.length).to.equal(0);
            expect(response.body.activity.pendingJoins.length).to.equal(0);

            expect(response.body.activity).to.have.property("title");
            expect(response.body.activity).to.have.property("description");
            expect(response.body.activity).to.have.property("image");
            expect(response.body.activity).to.have.property("category");
            expect(response.body.activity).to.have.property("memberLimit");
            expect(response.body.activity).to.have.property("due_date");
            expect(response.body.activity).to.have.property("location");
            expect(response.body.activity).to.have.property("address");
            expect(response.body.activity).to.have.property("tags");
            expect(response.body.activity).to.have.property("status");
            expect(response.body.activity).to.have.property("isPromo");

            expect(response.body.activity.title).to.equal(data.title);
            expect(response.body.activity.description).to.equal(
                data.description
            );
            expect(response.body.activity.image).to.equal(data.image);
            expect(response.body.activity.category).to.equal(data.category);
            expect(response.body.activity.memberLimit).to.equal(
                data.memberLimit
            );
            expect(response.body.activity.due_date).to.includes(data.due_date);
            expect(response.body.activity.location).to.equal(data.location);
            expect(response.body.activity.address).to.equal(data.address);
            expect(response.body.activity.tags[0]).to.equal(data.tags[0]);
            expect(response.body.activity.tags[1]).to.equal(data.tags[1]);
            expect(response.body.activity.status).to.equal(data.status);
            expect(response.body.activity.isPromo).to.equal(data.isPromo);
        });

        it("should send errors - (Empty body, code: 400)", async function() {
            const data = {};
            const response = await chai
                .request(app)
                .post("/activities")
                .send(data);

            expect(response).to.have.status(400);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("message");
            expect(response.body.message[0]).to.equal("Title is required");
            expect(response.body.message[1]).to.equal(
                "Description is required"
            );
            //tambah validation2 yg lain
        });
    });

    describe("GET /activities", function() {
        it("should get all activity - (code: 200)", async function() {
            const response = await chai.request(app).get("/activities");
            console.log(response.body);
            expect(response).to.have.status(201);
            expect(response.body).to.be.an("object");
            expect(response.body).to.have.property("activity");
            expect(response.body.activity).to.have.property("_id");
            expect(response.body.activity).to.have.property("createdAt");
            expect(response.body.activity).to.have.property("updatedAt");

            expect(response.body.activity).to.have.property("members");
            expect(response.body.activity).to.have.property("pendingInvites");
            expect(response.body.activity).to.have.property("pendingJoins");

            expect(response.body.activity.members.length).to.equal(0);
            expect(response.body.activity.pendingInvites.length).to.equal(0);
            expect(response.body.activity.pendingJoins.length).to.equal(0);

            expect(response.body.activity).to.have.property("title");
            expect(response.body.activity).to.have.property("description");
            expect(response.body.activity).to.have.property("image");
            expect(response.body.activity).to.have.property("category");
            expect(response.body.activity).to.have.property("memberLimit");
            expect(response.body.activity).to.have.property("due_date");
            expect(response.body.activity).to.have.property("location");
            expect(response.body.activity).to.have.property("address");
            expect(response.body.activity).to.have.property("tags");
            expect(response.body.activity).to.have.property("status");
            expect(response.body.activity).to.have.property("isPromo");

            expect(response.body.activity.title).to.equal(data.title);
            expect(response.body.activity.description).to.equal(
                data.description
            );
            expect(response.body.activity.image).to.equal(data.image);
            expect(response.body.activity.category).to.equal(data.category);
            expect(response.body.activity.memberLimit).to.equal(
                data.memberLimit
            );
            expect(response.body.activity.due_date).to.includes(data.due_date);
            expect(response.body.activity.location).to.equal(data.location);
            expect(response.body.activity.address).to.equal(data.address);
            expect(response.body.activity.tags[0]).to.equal(data.tags[0]);
            expect(response.body.activity.tags[1]).to.equal(data.tags[1]);
            expect(response.body.activity.status).to.equal(data.status);
            expect(response.body.activity.isPromo).to.equal(data.isPromo);
        });
    });
});
