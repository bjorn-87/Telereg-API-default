"use strict";

const db = require('../../db/db.js');
const sql = require("mssql");

/**
 * Create a new Line
 *
 * @param {*} body request body
 * @param {*} res response
 * @returns response
 */
const newLine = async function(body, res) {
    let teleregId = body.teleregid,
        teleregnumber,
        position;

    // Checks if teleregId is not a number
    if (isNaN(teleregId)) {
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "Detail": "Id is not a number"
            }
        });
    }

    // Checks if teleregId is set, else return 404 not found
    if (teleregId) {
        try {
            const pool = await db;

            // Get the number from row in Telereg where Id = teleregId
            const searchNumber = await pool.request()
                .input('id', sql.Int, teleregId)
                .query('SELECT Number FROM Telereg WHERE Id = @id AND Deleted IS NULL');

            // If no row returned, return Not Found
            if (searchNumber.recordset.length === 0) {
                return res.status(404).json({
                    "errors": {
                        "status": 404,
                        "title": "Not Found",
                        "detail": "No header to connect to"
                    }
                });
            } else {
                teleregnumber = searchNumber.recordset[0].Number;

                // Get the max position from table Teletr by TeleregNumber
                const maxPos = await pool.request()
                    .input('number', sql.VarChar, teleregnumber)
                    .query('SELECT MAX(Position) AS MaxPos FROM Teletr ' +
                        'WHERE TeleregNumber = @number AND Deleted IS NULL');

                // Calculates the next position value for Teletr
                if (maxPos.recordset[0]) {
                    position = maxPos.recordset[0].MaxPos > 0 ? maxPos.recordset[0].MaxPos : 0;
                    position++;
                }

                // Insert a new row into Teletr
                await pool.request()
                    .input('teleregnumber', sql.VarChar, teleregnumber)
                    .input('position', sql.Int, position)

                    .query('INSERT INTO Teletr ' +
                            '(TeleregNumber, Position) VALUES ' +
                            '(@teleregnumber, @position)');

                return res.status(201).json({
                    "data": {
                        "status": 201,
                        "title": "CREATED",
                        "message": "Successfully created"
                    }
                });
            }
        } catch (err) {
            return res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": "Database error " + err.message
                }
            });
        }
    } else {
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "teleregid missing in body"
            }
        });
    }
};

module.exports = newLine;
