"use strict";

const db = require('../../db/db.js');
const sql = require("mssql");

/**
 * Update a Line
 *
 * @param {*} body request body
 * @param {*} res response
 * @returns response
 */
const updateLine = async function(body, res) {
    let id = body.id,
        position = body.position,
        note = body.note,
        rack = body.rack,
        fieldfrom = body.fieldfrom,
        nrfrom = body.nrfrom,
        klfrom = body.klfrom,
        fieldto = body.fieldto,
        nrto = body.nrto,
        klto = body.klto,
        comment = body.comment,
        userId = body.userid,
        userFullName = body.userfullname,
        updated = new Date();

    if (id) {
        try {
            const pool = await db;

            const searchId = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT Id, TeleregNumber FROM Teletr WHERE Id = @id AND Deleted IS NULL');

            if (searchId.recordset.length === 0) {
                console.error("NOT FOUND: ID not in database");
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
                    .input('position', sql.Int, position)
                    .input('note', sql.VarChar, note)
                    .input('rack', sql.VarChar, rack)
                    .input('fieldfrom', sql.VarChar, fieldfrom)
                    .input('nrfrom', sql.VarChar, nrfrom)
                    .input('klfrom', sql.VarChar, klfrom)
                    .input('fieldto', sql.VarChar, fieldto)
                    .input('nrto', sql.VarChar, nrto)
                    .input('klto', sql.VarChar, klto)
                    .input('comment', sql.VarChar, comment)
                    .input('updated', sql.DateTime, updated)
                    .query('UPDATE Teletr SET Position = @position, Note = @note, ' +
                        'Rack = @rack, FieldFrom = @fieldfrom, NrFrom = @nrfrom, ' +
                        'KlFrom = @klfrom, FieldTo = @fieldto, NrTo = @nrto, KlTo = @klto, ' +
                        'Comment = @comment, Updated = @updated  WHERE Id = @id');

                let teleregNumber = searchId.recordset[0].TeleregNumber;

                if (teleregNumber) {
                    await pool.request()
                        .input('updated', sql.DateTime, updated)
                        .input('userid', sql.VarChar, userId)
                        .input('userfullname', sql.VarChar, userFullName)
                        .input('number', sql.VarChar, teleregNumber)
                        .query('UPDATE Telereg SET Updated = @updated, ' +
                            'UserId = @userid, UserFullName = @userfullname WHERE ' +
                            'Number = @number AND Deleted IS NULL');
                }

                return res.status(200).send();
            }
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": "Database error" + err.message
                }
            });
        }
    } else {
        console.error("BAD REQUEST: id missing in body");
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "id missing in body"
            }
        });
    }
};

module.exports = updateLine;
