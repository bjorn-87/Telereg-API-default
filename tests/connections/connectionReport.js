/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const middleware = require('../../middleware/index.js');

const testUrl = "/api/v1/connections/report";
// var longtext = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
//     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" +
//     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

chai.should();

chai.use(chaiHttp);
describe('Test GET/connection/report', () => {
    var token = middleware.createToken("test@telereg.test");

    describe('GET /connections/report without valid token', () => {
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
    describe('GET /connections/report (no params)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .get(testUrl)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("BAD REQUEST");

                    done();
                });
        });
    });
    describe('GET /connections/report?rack=test (only rack)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .get(testUrl + "?rack=test")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("BAD REQUEST");

                    done();
                });
        });
    });
    describe('GET /connections/report?field=test (only field)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .get(testUrl + "?field=test")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("BAD REQUEST");

                    done();
                });
        });
    });
    describe('GET /connections/report?field=test&rack=test (both rack and field)', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(testUrl + "?rack=test&field=test&nrfrom=01&nrto=9999")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");

                    done();
                });
        });
    });
    // describe('GET /connections/ (too long input)', () => {
    //     it('Status 500', (done) => {
    //         chai.request(server)
    //             .get(testUrl + `?rack=${longtext}&field=test&nrfrom=01&nrto=9999`)
    //             .set("authorization", token)
    //             .end((err, res) => {
    //                 res.should.have.status(500);
    //                 res.body.should.be.an("object");
    //                 res.body.errors.title.should.be.equal("INTERNAL SERVER ERROR");

    //                 done();
    //             });
    //     });
    // });
});
