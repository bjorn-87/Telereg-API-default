"use strict";

const express = require("express");
const router = express.Router();

const newLine = require('../models/lines/newLine.js');
const updateLine = require('../models/lines/updateLine.js');
const deleteLine = require('../models/lines/deleteLine.js');

router.post('/', function(req, res) {
    newLine(req.body, res);
});

router.put('/', function(req, res) {
    updateLine(req.body, res);
});

router.delete('/', function(req, res) {
    deleteLine(req.body, res);
});


module.exports = router;
