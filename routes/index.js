"use strict";

const express = require("express");
const router = express.Router();

router.get('/', function(req, res) {
    const data = {
        routes: {
            "GET/": "Shows this message",
            "GET/headers":  {
                "/": "Shows all headers",
                "/search?search=<input>": "Search Headers"
            },
        }
    };

    res.status(200).json(data);
});

module.exports = router;
