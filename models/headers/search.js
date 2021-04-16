"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");

/**
 * Function to search for headers
 * @param {*} req
 * @param {*} res
 */
var search = async function(req, res) {
    let search = req.query.search,
        type = req.query.type,
        limit = req.query.limit ? req.query.limit : 50,
        offset = req.query.offset ? req.query.offset : 0,
        typeQuery,
        searchQuery;

    if (limit > 100) {
        limit = 100;
    }

    var selectStart = 'SELECT * FROM Telereg WHERE Deleted IS NULL AND ',
        selectCount = 'SELECT COUNT(Id) AS Total FROM Telereg WHERE Deleted IS NULL AND ',
        orderQuery = 'ORDER BY Number ASC',
        offsetRow = ' OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY';

    if (search) {
        try {
            const pool = await db;

            var total = 0;

            if (type === "function") {
                typeQuery = 'Func LIKE @input_parameter ';
            } else if (type === "address") {
                typeQuery = 'Address LIKE @input_parameter ';
            } else if (type === "name") {
                typeQuery = 'Name LIKE @input_parameter ';
            } else {
                typeQuery = 'Number LIKE @input_parameter ';
            }

            searchQuery = selectStart + typeQuery + orderQuery + offsetRow;

            const result = await pool.request()
                .input('input_parameter', sql.VarChar, `${search}%`)
                .input('limit', sql.Int, limit)
                .input('offset', sql.Int, offset)
                .query(searchQuery);

            const result2 = await pool.request()
                .input('input_parameter', sql.VarChar, `${search}%`)
                .query(selectCount + typeQuery);

            // Amount of results from search
            total = result2.recordset[0].Total;

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
