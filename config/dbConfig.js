
"use strict";

// This is for the Database configuration
// Create a .env file and add the values(See README.md)
// or hard code the values in this file.

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        enableArithAbort: false
    }
};


module.exports = dbConfig;
