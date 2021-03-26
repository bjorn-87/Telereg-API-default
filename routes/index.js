"use strict";

const express = require("express");
const router = express.Router();
const showAll = require('../models/showAll.js');
const search = require('../models/search.js');

router.get('/', function(req, res) {
    const data = {
        routes: {
            "/": "Shows this message",
            "/all": "Shows all",
            "/search": "Search Connections"
        }
    };
    
    res.status(200).json(data);
});

router.get('/all', function(req, res) {
    showAll(req, res);
});

// router.get("/all", (req, res, next) => verifyToken(req, res, next),
//     (req, res) => showAll(req, res));

router.get('/search/', function(req, res) {
    search(req, res);
});





module.exports = router;