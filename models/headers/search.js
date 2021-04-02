"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");
const header = require('./showAll');

/**
 *
 * @param {*} req
 * @param {*} res
 */
var search = async function(req, res) {
    let qry = req.query;

    if (qry.search) {
        try {
            let search = qry.search;
            const pool = await db;
            const total = await header.countAll(res);

            const result = await pool.request()
                .input('input_parameter', sql.VarChar, `${search}%`)
                .query('SELECT * FROM Telereg WHERE Deleted IS NULL AND ' +
                        'Number LIKE @input_parameter' +
                        ' OR Name LIKE @input_parameter' +
                        ' OR Address LIKE @input_parameter' +
                        ' OR Func LIKE @input_parameter ORDER BY Number ASC' +
                        ' OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY');

            let data = {
                "data": result.recordset,
                "total": total
            };

            res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                "errors": {
                    "status": 500,
                    "Title": "INTERNAL SERVER ERROR",
                    "detail": err.message
                }
            });
        }
    } else {
        res.status(404).json([{
            status: "404 Page not found",
            message: "The parameter 'search' is missing or has no value in the query"
        }]);
    }
};

module.exports = search;
