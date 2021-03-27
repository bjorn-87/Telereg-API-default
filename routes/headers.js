"use strict";

const express = require("express");
const router = express.Router();
const showAll = require('../models/headers/showAll.js');
const search = require('../models/headers/search.js');
const newHeader = require('../models/headers/newHeader.js');

router.get('/', function(req, res) {
    showAll(req, res);
});

router.get('/search/', function(req, res) {
    search(req, res);
});

// router.put('/', function(req, res) {
//     updateHeader(req, res);
// });

router.post('/', function(req, res) {
    newHeader(req.body, res);
});

module.exports = router;
