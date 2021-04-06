"use strict";

const dbConfig = {
    user: 'test',
    password: 'Password1!',
    server: "localhost", // You can use 'localhost\\instance' to connect to named instance
    database: 'LKTelereg',
    options: {
        encrypt: true,
        enableArithAbort: false
    }
};

module.exports = dbConfig;
