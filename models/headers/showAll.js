"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");

/**
 * Get all posts from table Telereg where Deleted is Null
 * @param {*} req
 * @param {*} res
 */
var showAll = async function(req, res) {
    let limit = req.query.limit ? req.query.limit : 50,
        offset = req.query.offset ? req.query.offset : 0;

    try {
        const pool = await db;
        const total = await countAll(res);

        // limit max 100
        if (limit > 100) {
            limit = 100;
        }

        const result = await pool.request()
            .input("limit", sql.Int, limit)
            .input("offset", sql.Int, offset)
            .query('SELECT * FROM Telereg ' +
                'WHERE Deleted IS NULL ' +
                'ORDER BY Number ASC ' +
                'OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY ');

        let data = {
            data: result.recordset,
            total: total
        };

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            "errors": {
                "status": 500,
                "detail": err.message
            }
        });
    }
};

/**
 * Counts all posts in Telereg where Deleted is NULL
 * @returns {Int} Total amount of posts in Telereg
 */
var countAll = async function(res) {
    try {
        const pool = await db;
        const result = await pool.request()
            .query('SELECT COUNT(Id) AS Total FROM Telereg ' +
                'WHERE Deleted IS NULL');

        return result.recordset[0].Total;
    } catch (error) {
        res.status(500).json({
            "errors": {
                "status": 500,
                "detail": error.message
            }
        });
    }
};

module.exports = showAll;
