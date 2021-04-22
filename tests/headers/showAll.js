/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const middleware = require('../../middleware/index.js');

const testUrl = "/api/v1/headers";

chai.should();

chai.use(chaiHttp);
describe('Test GET/headers', () => {
    var token = middleware.createToken("test@telereg.test");

    describe('GET /headers without valid token', () => {
        it('401 Authentication failed', (done) => {
            chai.request(server)
                .get(testUrl)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("Authentication failed");

                    done();
                });
        });
    });
    describe('GET /headers (no limit or offset)', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(50);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=50&offset=0 ', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=50&offset=0")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(50);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=60&offset=0 ', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=60&offset=0")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(60);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=70&offset=0 ', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=70&offset=0")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(70);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=99', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=99")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(99);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=100', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=100")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(100);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=101 (should return 100) ', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=101")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.equal(100);
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers with limit=test (should return status 500) ', () => {
        it('500 INTERNAL SERVER ERROR', (done) => {
            chai.request(server)
                .get(testUrl + "?limit=test")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.status.should.be.equal(500);
                    res.body.errors.detail.should.be.an("string");

                    done();
                });
        });
    });
});
