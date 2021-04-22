/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const middleware = require('../../middleware/index.js');

const testUrl = "/api/v1/connections/id/";

chai.should();

chai.use(chaiHttp);
describe('Test GET/connection', () => {
    var token = middleware.createToken("test@telereg.test");

    describe('GET /connections without valid token', () => {
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
    describe('GET /connections (no params)', () => {
        it('404 Page Not Found', (done) => {
            chai.request(server)
                .get(testUrl)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.errors[0].title.should.be.an("string");
                    res.body.errors[0].title.should.be.equal("Not Found");

                    done();
                });
        });
    });
    describe('GET /connection/id/ param=1', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "1")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.head.should.be.an("object");
                    res.body.data.line.should.be.an("array");

                    done();
                });
        });
    });
    describe('GET /connection/id/ param=9999999', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "9999999")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.head.should.be.an("object");
                    res.body.data.line.should.be.an("array");

                    done();
                });
        });
    });
    describe('GET /connection/id/ param=test (id not int)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .get(testUrl + "test")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.should.be.an("object");
                    res.body.errors.title.should.be.equal("BAD REQUEST");

                    done();
                });
        });
    });
});
