"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");

/**
 * Connection report that shows occupied connections in Rack
 * @param {*} qry
 * @param {*} res
 */
var connectionReport = async function(query, res) {
    var rack = query.rack,
        field = query.field;

    if (!rack || !field) {
        res.status(400).json({
            errors: {
                status: 400,
                title: "BAD REQUEST",
                detail: "Rack or field not in querystring"
            }
        });
    } else {
        try {
            const pool = await db;
            let result = await pool.request()
                .input('rack', sql.VarChar, rack)
                .input('field', sql.VarChar, field)
                .query('SELECT * FROM Connections WHERE Rack = @rack AND Field = @field ' +
                    'ORDER BY Nr, Kl');

            let recordSet = result.recordset;

            res.status(200).json({
                "data": recordSet
            });
        } catch (err) {
            res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": err.message
                }
            });
        }
    }
};

module.exports = connectionReport;
