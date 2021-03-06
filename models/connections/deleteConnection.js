"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");

/**
 * Soft delete on a connection (header and lines)
 * @param {*} body
 * @param {*} res
 */
var deleteConnection = async function(body, res) {
    var teleregId = body.id,
        deleted = new Date(),
        teleregNumber;

    if (!teleregId) {
        console.error("BAD REQUEST: Id not in body");
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "Bad request",
                "detail": "id not in body"
            }
        });
    } else {
        try {
            const pool = await db;
            let searchForNumber = await pool.request()
                .input('input_parameter', sql.Int, teleregId)
                .query('SELECT Number FROM Telereg WHERE Id = @input_parameter ' +
                    'AND Deleted IS NULL');

            if (searchForNumber.recordset[0]) {
                teleregNumber = searchForNumber.recordset[0].Number;

                let searchTeletr = await pool.request()
                    .input('teleregnumber', sql.VarChar, teleregNumber)
                    .query('SELECT * FROM Teletr WHERE TeleregNumber = @teleregnumber ' +
                        'AND Deleted IS NULL');

                if (searchTeletr.recordset.length > 0) {
                    const transaction = pool.transaction();

                    try {
                        await transaction.begin();

                        await transaction.request()
                            .input('deleted', sql.DateTime, deleted)
                            .input('teleregnumber', sql.VarChar, teleregNumber)
                            .query('UPDATE Teletr SET Deleted = @deleted ' +
                                'WHERE TeleregNumber = @teleregnumber AND Deleted IS NULL');

                        await transaction.request()
                            .input('deleted', sql.DateTime, deleted)
                            .input('input_parameter', sql.VarChar, teleregId)
                            .query('UPDATE Telereg SET Deleted = @deleted ' +
                            'WHERE Id = @input_parameter AND Deleted IS NULL');

                        await transaction.commit();
                        return res.status(204).send();
                    } catch (err) {
                        await transaction.rollback();
                        console.error(err.message);
                        return res.status(500).json({
                            "error": {
                                "status": 500,
                                "title": "INTERNAL SERVER ERROR",
                                "detail": "Transaction failed"
                            }
                        });
                    }
                } else {
                    await pool.request()
                        .input('deleted', sql.DateTime, deleted)
                        .input('input_parameter', sql.VarChar, teleregId)
                        .query('UPDATE Telereg SET Deleted = @deleted ' +
                            'WHERE Id = @input_parameter AND Deleted IS NULL');

                    return res.status(204).send();
                }
            } else {
                console.error("NOT FOUND: Id not found in database");
                return res.status(404).json({
                    "errors": {
                        "status": 404,
                        "title": "Not found",
                        "detail": "Id not found"
                    }
                });
            }
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": err.message
                }
            });
        }
    }
};

module.exports = deleteConnection;
