"use strict";

const express = require("express");
const router = express.Router();
const header = require('../models/headers/showAll.js');
const search = require('../models/headers/search.js');
const newHeader = require('../models/headers/newHeader.js');
const updateHeader = require('../models/headers/updateHeader.js');

router.get('/search/', function(req, res) {
    search(req, res);
});

router.get('/', function(req, res) {
    header.showAll(req, res);
});

router.put('/', function(req, res) {
    updateHeader(req.body, res);
});

router.post('/', function(req, res) {
    newHeader(req.body, res);
});

module.exports = router;
