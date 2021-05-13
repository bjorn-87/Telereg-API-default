
"use strict";

// This is for the Database configuration of the development server
// Create a .env file and add the values(See README.md)
// or hard code the values in this file.

const testDbConfig = {
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    server: process.env.DEV_DB_SERVER,
    database: process.env.DEV_DATABASE,
    options: {
        encrypt: true,
        enableArithAbort: false
    }
};

module.exports = testDbConfig;
