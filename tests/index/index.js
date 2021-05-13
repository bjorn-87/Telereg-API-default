/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const middleware = require('../../middleware/index.js');

const testUrl = "/api/v1/";

chai.should();

chai.use(chaiHttp);
describe('Test index page', () => {
    var token = middleware.createToken("test@telereg.test");

    describe('GET / (index)', () => {
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
    describe('GET / (index)', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get(testUrl)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.routes.should.be.an("array");
                    res.body.routes[0]["GET /"].should.be.an("string");

                    done();
                });
        });
    });
    describe('GET / page that does not exist', () => {
        it('404 Page Not Found', (done) => {
            chai.request(server)
                .get(testUrl + "testing")
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.errors[0].should.be.an("object");
                    res.body.errors[0].title.should.be.an("string");
                    res.body.errors[0].title.should.be.equal("Not Found");

                    done();
                });
        });
    });
});
