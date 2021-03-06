"use strict";

const db = require('../../db/db.js');
const sql = require("mssql");

/**
 * Create a new header for connection schema
 */
const newHeader = async function(body, res) {
    let number = body.number,
        name = body.name,
        func = body.func,
        address = body.address,
        drawing = body.drawing,
        apptype = body.apptype,
        document = body.document,
        userid = body.userid,
        apptypetwo = body.apptypetwo,
        userfullname = body.userfullname,
        contact = body.contact,
        other = body.other;

    if (number) {
        try {
            const pool = await db;

            const searchNumber = await pool.request()
                .input('number', sql.VarChar, number)
                .query('SELECT Number FROM Telereg WHERE Number = @number AND Deleted IS NULL');

            if (searchNumber.recordset.length > 0) {
                console.error("CONFLICT: Duplicate entry");
                return res.status(409).json({
                    "errors": {
                        "status": 409,
                        "title": "CONFLICT",
                        "detail": "Duplicate entry"
                    }
                });
            } else {
                await pool.request()
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
                    .input('contact', sql.VarChar, contact)
                    .input('other', sql.VarChar, other)
                    .query('INSERT INTO Telereg ' +
                            '(Number, Name, Func, Address, Drawing, Apptype, ' +
                            'Document, UserId, ApptypeTwo, UserFullName, Contact, Other) VALUES ' +
                            '(@number, @name, @func, @address, @drawing, @apptype, @document, ' +
                            '@userid, @apptypetwo, @userfullname, @contact, @other)');

                const idNumber = await pool.request()
                    .query('SELECT MAX(Id) AS NewId FROM Telereg');

                return res.status(201).json({
                    "data": {
                        "status": 201,
                        "title": "CREATED",
                        "message": "Successfully created",
                        "id": idNumber.recordset[0].NewId
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
    } else {
        console.error("BAD REQUEST: Number missing in body");
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "Number missing in body"
            }
        });
    }
};

module.exports = newHeader;
