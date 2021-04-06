
"use strict";

// This is a template for the Database configuration
// enter correct values and change the name of the file to dbConfig.js

const dbConfig = {
    user: 'username',
    password: 'password',
    server: "localhost", // You can use 'localhost\\instance' to connect to named instance
    database: 'Database',
    options: {
        encrypt: true,
        enableArithAbort: false
    }
};

module.exports = dbConfig;
