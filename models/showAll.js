"use strict";

const db = require("../db/db.js");

/**
 *
 * @param {*} req
 * @param {*} res
 */
var showAll = async function(req, res) {
    try {
        const pool = await db;

        await pool.request()
            .query('SELECT * FROM Telereg', function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    let data = {
                        data: result.recordset
                    };

                    res.status(200).json(data);
                }
            });
    } catch (err) {
        res.status(500).json({
            "errors": {
                "status": 500,
                "detail": err.message
            }
        });
    }
};

module.exports = showAll;
