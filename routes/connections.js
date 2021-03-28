"use strict";

const express = require("express");
const router = express.Router();
const showConnection = require('../models/connections/showConnection.js');
const deleteConnection = require('../models/connections/deleteConnection.js');

router.get('/:id', function(req, res) {
    showConnection(req.params, res);
});

router.delete('/:id', function(req, res) {
    deleteConnection(req.params, res);
});

module.exports = router;
