"use strict";

const db = require('../../db/db.js');
const sql = require("mssql");

/**
 * Create a new header for connection schema
 */
const newHeader = async function(req, res) {
    let number,
        name,
        func,
        address,
        drawing,
        apptype,
        document,
        userid,
        apptypetwo,
        userfullname,
        other;

    if (number) {
        try {
            const pool = await db;

            const searchNumber = await pool.request()
                .input('number', sql.VarChar, number)
                .query('SELECT Number FROM Telereg WHERE Number = @number AND Deleted IS NULL');

            if (searchNumber.recordset.length > 0) {
                res.status(409).json({
                    "errors": {
                        "status": 409,
                        "title": "CONFLICT",
                        "detail": "Duplicate entry"
                    }
                });
            } else {
                const result = await pool.request()
                    .input('number', sql.VarChar, number)
                    .input('name', sql.VarChar, name)
                    .input('func', sql.VarChar, func)
                    .input('address', sql.VarChar, address)
                    .input('drawing', sql.VarChar, drawing)
                    .input('apptype', sql.VarChar, apptype)
                    .input('document', sql.VarChar, document)
                    .input('userid', sql.VarChar, userid)
                    .input('apptypetwo', sql.VarChar, apptypetwo)
                    .input('userfullname', sql.VarChar, userfullname)
                    .input('other', sql.VarChar, other)
                    .query('INSERT INTO Telereg ' +
                            '(Number, Name, Func, Address, Drawing, Apptype, ' +
                            'Document, UserId, ApptypeTwo, UserFullName, Other) VALUES ' +
                            '(@number, @name, @func, @address, @drawing, @apptype, @document, ' +
                            '@userid, @apptypetwo, @userfullname, @other)');

                console.log(result);

                res.status(201).json({
                    "data": {
                        "status": 201,
                        "title": "CREATED",
                        "message": "Successfully created"
                    }
                });
            }
        } catch (err) {
            res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": err.message
                }
            });
        }
    } else {
        res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "Number missing in body"
            }
        });
    }
};

module.exports = newHeader;
