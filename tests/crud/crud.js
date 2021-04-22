/* eslint-env mocha */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');
const middleware = require('../../middleware/index.js');

const crudHeaderUrl = "/api/v1/headers";
const crudLinesUrl = "/api/v1/lines";
const crudConnection = "/api/v1/connections";

chai.should();

var newHeader = {
    number: "Integrationtest",
    name: "name",
    func: "func",
    address: "address",
    drawing: "drawing",
    apptype: "apptype",
    document: "document",
    userid: "userid",
    apptypetwo: "apptypetwo",
    userfullname: "userfullname",
    contact: "contact",
    other: "other"
};

var id;

chai.use(chaiHttp);
describe('Test CRUD for headers and lines', () => {
    var token = middleware.createToken("test@telereg.test");

    describe('POST /headers (no params in body)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .post(crudHeaderUrl)
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
    describe('POST /headers (create a post)', () => {
        it('201 CREATED', (done) => {
            chai.request(server)
                .post(crudHeaderUrl)
                .set("authorization", token)
                .send(newHeader)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.data.title.should.be.an("string");
                    res.body.data.title.should.be.equal("CREATED");

                    id = res.body.data.id;

                    done();
                });
        });
    });
    describe('POST /headers (create the same post again)', () => {
        it('409 CREATED', (done) => {
            chai.request(server)
                .post(crudHeaderUrl)
                .set("authorization", token)
                .send(newHeader)
                .end((err, res) => {
                    res.should.have.status(409);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.an("string");
                    res.body.errors.title.should.be.equal("CONFLICT");

                    done();
                });
        });
        describe('GET /connections (Get the created post)', () => {
            it('200 OK', (done) => {
                chai.request(server)
                    .get(crudConnection + `/id/${id}`)
                    .set("authorization", token)
                    .end((err, res) => {
                        console.log(id);
                        res.should.have.status(200);
                        res.body.should.be.an("object");
                        res.body.data.head.Id.should.be.an("number");
                        res.body.data.head.Id.should.be.equal(id);
                        res.body.data.head.Number.should.be.equal("Integrationtest");

                        done();
                    });
            });
        });
        describe('DELETE /connections (Delete the created post)', () => {
            it('204 NO CONTEND', (done) => {
                chai.request(server)
                    .delete(crudConnection)
                    .set("authorization", token)
                    .send({"id": id})
                    .end((err, res) => {
                        console.log(id);
                        res.should.have.status(204);

                        done();
                    });
            });
        });
    });
});
