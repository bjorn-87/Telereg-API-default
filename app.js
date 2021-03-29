'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const port = 8383;

const middleware = require("./middleware/index.js");
const index = require('./routes');
const connections = require('./routes/connections.js');
const headers = require('./routes/headers.js');
const lines = require('./routes/lines.js');

// var date = new Date();
// console.log("standard", date);
// console.log("timestring", date.toLocaleTimeString());
// console.log("datestring", date.toLocaleDateString());
// var localdate = `${date.toLocaleString()}`;
// console.log(localdate);
// var newDate = new Date().setDate(localdate);
// console.log("new date", newDate);


// log incoming to console
app.use(middleware.logIncoming);

// Middleware CORS
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.all('*', middleware.verifyToken); // All routes need valid access-token

//routes
app.use('/api/v1/', index);
app.use('/api/v1/headers', headers);
app.use('/api/v1/lines', lines);
app.use('/api/v1/connections', connections);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
app.use(middleware.fourOFourHandler);
// Felhanterare
app.use(middleware.errorHandler);


// Start up server
const server = app.listen(port, () => console.log(`API listening on port ${port}!`));

module.exports = server;