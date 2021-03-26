"use strict";

const express = require("express");
const router = express.Router();
const showConnection = require('../models/connections/showConnection.js');

router.get('/', function(req, res) {
    showConnection(req.query, res);
});

// router.delete('/', function(req, res) {
//     deleteConnection(req, res);
// });

module.exports = router;
