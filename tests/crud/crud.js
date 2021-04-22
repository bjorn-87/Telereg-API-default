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

var id,
    line,
    tooLongNumber = newHeader.number.repeat(100),
    token = middleware.createToken("test@telereg.test");

chai.use(chaiHttp);

describe('Test CRUD for connections without lines', () => {
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
    describe('POST /headers (number === empty string)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .post(crudHeaderUrl)
                .set("authorization", token)
                .send({number: ""})
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
    });
    describe('GET /connections (Get the created post)', () => {
        it('200 OK', (done) => {
            chai.request(server)
                .get(crudConnection + `/id/${id}`)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.head.Id.should.be.an("number");
                    res.body.data.head.Id.should.be.equal(id);
                    res.body.data.head.Number.should.be.equal("Integrationtest");

                    done();
                });
        });
        describe('DELETE /connections (Delete the created post)', () => {
            it('204 NO CONTEND', (done) => {
                chai.request(server)
                    .delete(crudConnection)
                    .set("authorization", token)
                    .send({"id": id})
                    .end((err, res) => {
                        res.should.have.status(204);

                        done();
                    });
            });
        });
    });
    describe('DELETE /connections (without id in param)', () => {
        it('400 BAD REQUEST', (done) => {
            chai.request(server)
                .delete(crudConnection)
                .set("authorization", token)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an("object");
                    res.body.errors.title.should.be.equal("Bad request");

                    done();
                });
        });
    });
    describe('POST /headers (create a post with to long number)', () => {
        it('500 INTERNAL SERVER ERROR', (done) => {
            chai.request(server)
                .post(crudHeaderUrl)
                .set("authorization", token)
                .send({number: tooLongNumber})
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
describe('Test CRUD for connections with lines', () => {
    describe('POST /headers (create a new post)', () => {
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
        describe('POST /lines (create a line to the header)', () => {
            it('201 CREATED', (done) => {
                chai.request(server)
                    .post(crudLinesUrl)
                    .set("authorization", token)
                    .send({teleregid: id})
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.an("object");
                        res.body.data.title.should.be.an("string");
                        res.body.data.title.should.be.equal("CREATED");

                        done();
                    });
            });
        });
        describe('POST /lines (create another line to the header)', () => {
            it('201 CREATED', (done) => {
                chai.request(server)
                    .post(crudLinesUrl)
                    .set("authorization", token)
                    .send({teleregid: id})
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.an("object");
                        res.body.data.title.should.be.an("string");
                        res.body.data.title.should.be.equal("CREATED");

                        done();
                    });
            });
        });
        describe('GET /connections (Get connection with id)', () => {
            it('200 OK', (done) => {
                chai.request(server)
                    .get(crudConnection + `/id/${id}`)
                    .set("authorization", token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an("object");
                        res.body.data.line.should.be.an("array");
                        res.body.data.line.length.should.be.equal(2);

                        line = res.body.data.line[0].Id;

                        done();
                    });
            });
            describe('PUT /lines (update line with correct values)', () => {
                it('200 OK', (done) => {
                    chai.request(server)
                        .put(crudLinesUrl)
                        .set("authorization", token)
                        .send({id: line, position: 5, note: "test", rack: "test"})
                        .end((err, res) => {
                            res.should.have.status(200);

                            done();
                        });
                });
            });
            describe('DELETE /lines (Delete the created line)', () => {
                it('204 NO CONTENT', (done) => {
                    chai.request(server)
                        .delete(crudLinesUrl)
                        .set("authorization", token)
                        .send({id: line})
                        .end((err, res) => {
                            res.should.have.status(204);

                            done();
                        });
                });
            });
            describe('GET /connections (Check to see that line is deleted)', () => {
                it('200 OK', (done) => {
                    chai.request(server)
                        .get(crudConnection + `/id/${id}`)
                        .set("authorization", token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.an("object");
                            res.body.data.line.should.be.an("array");
                            res.body.data.line.length.should.be.equal(1);

                            done();
                        });
                });
            });
            describe('PUT /headers (edit the header)', () => {
                it('204 NO CONTENT', (done) => {
                    chai.request(server)
                        .put(crudHeaderUrl)
                        .set("authorization", token)
                        .send({id: id, number: "test12345"})
                        .end((err, res) => {
                            res.should.have.status(204);

                            done();
                        });
                });
            });
            describe('DELETE /connections (delete connection)', () => {
                it('204 NO CONTENT', (done) => {
                    chai.request(server)
                        .delete(crudConnection)
                        .set("authorization", token)
                        .send({id: id})
                        .end((err, res) => {
                            res.should.have.status(204);

                            done();
                        });
                });
            });
        });
    });
});
