"use strict";

const db = require('../../db/db.js');
const sql = require("mssql");

/**
 * Delete a line
 *
 * @param {*} body request body containing id
 * @param {*} res response
 * @returns response
 */
const deleteLine = async function(body, res) {
    let id = body.id,
        deleted = new Date();

    if (id) {
        try {
            const pool = await db;

            const searchId = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT Id FROM Teletr WHERE Id = @id AND Deleted IS NULL');

            if (searchId.recordset.length === 0) {
                console.error("NOT FOUND: No line found");
                return res.status(404).json({
                    "errors": {
                        "status": 404,
                        "title": "Not Found",
                        "detail": "No line found"
                    }
                });
            } else {
                await pool.request()
                    .input('id', sql.Int, id)
                    .input('deleted', sql.DateTime, deleted)
                    .query('UPDATE Teletr SET Deleted = @deleted WHERE Id = @id');

                return res.status(204).send();
            }
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": "Database error"
                }
            });
        }
    } else {
        console.error("BAD REQUEST: Id missing in body");
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "id missing in body"
            }
        });
    }
};

module.exports = deleteLine;
