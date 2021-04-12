"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");
const header = require('./showAll');

/**
 * Function to search for headers
 * @param {*} req
 * @param {*} res
 */
var search = async function(req, res) {
    let search = req.query.search,
        type = req.query.type;

    if (search) {
        try {
            const pool = await db;
            const total = await header.countAll(res);

            var result;

            if (type === "function") {
                result = await pool.request()
                    .input('input_parameter', sql.VarChar, `${search}%`)
                    .query('SELECT * FROM Telereg WHERE Deleted IS NULL AND ' +
                        'Func LIKE @input_parameter ORDER BY Number ASC ' +
                        'OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY');
            } else if (type === "address") {
                result = await pool.request()
                    .input('input_parameter', sql.VarChar, `${search}%`)
                    .query('SELECT * FROM Telereg WHERE Deleted IS NULL AND ' +
                        'Address LIKE @input_parameter ORDER BY Number ASC ' +
                        'OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY');
            } else if (type === "name") {
                result = await pool.request()
                    .input('input_parameter', sql.VarChar, `${search}%`)
                    .query('SELECT * FROM Telereg WHERE Deleted IS NULL AND ' +
                        'Name LIKE @input_parameter ORDER BY Number ASC ' +
                        'OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY');
            } else {
                result = await pool.request()
                    .input('input_parameter', sql.VarChar, `${search}%`)
                    .query('SELECT * FROM Telereg WHERE Deleted IS NULL AND ' +
                        'Number LIKE @input_parameter ORDER BY Number ASC ' +
                        'OFFSET 0 ROWS FETCH NEXT 100 ROWS ONLY');
            }

            let data = {
                "data": result.recordset,
                "total": total
            };

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                "errors": {
                    "status": 500,
                    "Title": "INTERNAL SERVER ERROR",
                    "detail": err.message
                }
            });
        }
    } else {
        return res.status(404).json([{
            status: "404 Page not found",
            message: "The parameter 'search' is missing or has no value in the query"
        }]);
    }
};

module.exports = search;
