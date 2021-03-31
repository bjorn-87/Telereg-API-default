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
        updated = new Date();

    if (id) {
        try {
            const pool = await db;

            const searchId = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT Id FROM Teletr WHERE Id = @id AND Deleted IS NULL');

            if (searchId.recordset.length === 0) {
                res.status(404).json({
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

                res.status(200).send();
            }
        } catch (err) {
            res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": "Database error"
                }
            });
        }
    } else {
        res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "id missing in body"
            }
        });
    }
};

module.exports = updateLine;
