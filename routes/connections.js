"use strict";

const express = require("express");
const router = express.Router();
const showConnection = require('../models/connections/showConnection.js');
const deleteConnection = require('../models/connections/deleteConnection.js');
const connectionReport = require('../models/connections/connectionReport.js');

router.get('/report', function(req, res) {
    connectionReport(req.query, res);
});

router.get('/id/:id', function(req, res) {
    showConnection(req.params, res);
});

router.delete('/', function(req, res) {
    deleteConnection(req.body, res);
});

module.exports = router;
