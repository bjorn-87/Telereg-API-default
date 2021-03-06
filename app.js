/**
 * REST API For Telereg
 */
'use strict';

require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const NODE_PORT = process.env.NODE_PORT || 8080;
var NODE_ENV = process.env.NODE_ENV || 'development';

const middleware = require("./middleware/index.js");
const index = require('./routes');
const connections = require('./routes/connections.js');
const headers = require('./routes/headers.js');
const lines = require('./routes/lines.js');

// Attackers can use x-powered-by header (which is enabled by default)
// to detect apps running Express and then launch specifically-targeted attacks.
app.disable('x-powered-by');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

// Middleware Helmet
app.use(helmet());
// Middleware CORS
app.use(cors());

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.all('*', middleware.verifyToken); // All routes need valid access-token

//routes
app.use('/api/v1/', index);
app.use('/api/v1/headers', headers);
app.use('/api/v1/lines', lines);
app.use('/api/v1/connections', connections);

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
app.use(middleware.fourOFourHandler);
// Error Handler
app.use(middleware.errorHandler);

// Start up server
const server = app.listen(NODE_PORT, () =>
    console.log(`API listening on ${NODE_ENV}-server port:${NODE_PORT}`));

module.exports = server;
