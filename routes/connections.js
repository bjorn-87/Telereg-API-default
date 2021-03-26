"use strict";

const express = require("express");
const router = express.Router();
const showConnection = require('../models/showConnection.js');

router.get('/', function(req, res) {
    showConnection(req.query, res);
});

module.exports = router;
