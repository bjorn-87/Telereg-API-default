"use strict";

const express = require("express");
const router = express.Router();

router.get('/', function(req, res) {
    const data = {
        routes: [
            {"GET /": "Shows this message"},
            {"Headers": {
                "GET /headers?limit=<number>&offset=<number>": "Shows all headers",
                "GET /headers/search?search=<string>&limit=<number>&offset=<number>":
                    "Search Headers",
                "PUT /headers": {
                    "Updates header with parameters in body": {
                        "id": "Required",
                        "number": "Required",
                        "name": "optional",
                        "func": "optional",
                        "address": "optional",
                        "drawing": "optional",
                        "apptype": "optional",
                        "document": "optional",
                        "userid": "optional",
                        "apptypetwo": "optional",
                        "userfullname": "optional",
                        "contact": "optional",
                        "other": "optional",
                    },
                },
                "POST /headers": {
                    "Creates a new header with parameter in body": {
                        "number": "Required",
                        "name": "optional",
                        "func": "optional",
                        "address": "optional",
                        "drawing": "optional",
                        "apptype": "optional",
                        "document": "optional",
                        "userid": "optional",
                        "apptypetwo": "optional",
                        "userfullname": "optional",
                        "contact": "optional",
                        "other": "optional",
                    },
                },
            }},
            {"Lines": {
                "POST /lines": {
                    "Create a new line with parameter in body": {
                        "teleregid": "Required"
                    },
                },
                "PUT /lines": {
                    "Updates an existing line": {
                        "id": "Required",
                        "position": "optional",
                        "note": "optional",
                        "rack": "optional",
                        "fieldfrom": "optional",
                        "nrfrom": "optional",
                        "klfrom": "optional",
                        "fieldto": "optional",
                        "nrto": "optional",
                        "klto": "optional",
                        "comment": "optional",
                        "userId": "optional",
                        "userFullName": "optional",
                    },
                },
                "DELETE /lines": {
                    "Deletes an existing line with parameter": {
                        "id": "Required"
                    },
                },
            }},
            {"Connections": {
                "GET /connections/:<id>": "Fetch a connection with parameter id",
                "GET/connection/report": {
                    "?rack=<string>&field=<string>&nrfrom=<string>&nrto=<string>": "Get a report",
                },
                "DELETE /connections": {
                    "Delete a connection with parameter in body": {
                        "id": "Required",
                    },
                },
            }},
        ],
    };

    res.status(200).json(data);
});

module.exports = router;
