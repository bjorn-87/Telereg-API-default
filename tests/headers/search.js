/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const middleware = require('../../middleware/index.js');

const testUrl = "/api/v1/headers/search";

chai.should();

chai.use(chaiHttp);
describe('Test GET/headers/search', () => {
    var token = middleware.createToken("test@telereg.test");

    describe('GET /headers/search without valid token', () => {
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
    describe('GET /headers/search (no params)', () => {
        it('404 Page Not Found', (done) => {
            chai.request(server)
                .get(testUrl)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("404 Page not found");

                    done();
                });
        });
    });
    describe('GET /headers/search with search=1', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?search=1")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers/search with search=1&type=function', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?search=1&type=function")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers/search with search=1&type=address', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?search=1&type=address")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers/search with search=1&type=name', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?search=1&type=name")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers/search with search=1&limit=101&offset=0', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?search=1&limit=101&offset=0")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.total.should.be.an("number");

                    done();
                });
        });
    });
    describe('GET /headers/search with search=1&limit=test&offset=test (expect fail)', () => {
        it('500 INTERNAL SERVER ERROR', (done) => {
            chai.request(server)
                .get(testUrl + "?search=1&limit=test&offset=test")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("INTERNAL SERVER ERROR");

                    done();
                });
        });
    });
});
