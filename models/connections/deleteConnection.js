"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");

/**
 * Soft delete on a connection (header and lines)
 * @param {*} params
 * @param {*} res
 */
var deleteConnection = async function(params, res) {
    var teleregId = params.id,
        deleted = new Date();

    if (!teleregId) {
        res.status(400).json({
            "errors": {
                "status": 400,
                "title": "Bad request",
                "detail": "Param id not in URL"
            }
        });
    } else {
        try {
            const pool = await db;
            let searchForNumber = await pool.request()
                .input('input_parameter', sql.VarChar, teleregId)
                .query('SELECT Number FROM Telereg WHERE Id = @input_parameter ' +
                    'AND Deleted IS NULL');

            if (searchForNumber.recordset[0]) {
                let teleregNumber = searchForNumber.recordset[0].Number;

                await pool.request()
                    .input('deleted', sql.DateTime, deleted)
                    .input('input_parameter', sql.VarChar, teleregId)
                    .query('UPDATE Telereg SET Deleted = @deleted WHERE Id = @input_parameter ' +
                        'AND Deleted IS NULL');

                let searchTeletr = await pool.request()
                    .input('teleregnumber', sql.VarChar, teleregNumber)
                    .query('SELECT * FROM Teletr WHERE TeleregNumber = @teleregnumber ' +
                        'AND Deleted IS NULL');

                if (searchTeletr.recordset.length > 0) {
                    await pool.request()
                        .input('deleted', sql.DateTime, deleted)
                        .input('teleregnumber', sql.VarChar, teleregNumber)
                        .query('UPDATE Teletr SET Deleted = @deleted ' +
                            'WHERE TeleregNumber = @teleregnumber AND Deleted IS NULL');
                }
                res.status(204).send();
            } else {
                res.status(404).json({
                    "errors": {
                        "status": 404,
                        "title": "Not found",
                        "detail": "Id not found"
                    }
                });
            }
        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }
};

module.exports = deleteConnection;
