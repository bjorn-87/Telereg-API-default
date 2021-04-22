"use strict";

const db = require('../../db/db.js');
const sql = require("mssql");

/**
 * Update Header
 *
 * @param {*} body request body
 * @param {*} pool connection pool
 * @returns void
 */
async function headerSqlInput(body, pool) {
    let id = body.id,
        number = body.number,
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
        other = body.other,
        updated = new Date();

    await pool.request()
        .input('id', sql.Int, id)
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
        .input('updated', sql.DateTime, updated)
        .query('UPDATE Telereg SET ' +
                'Number = @number, Name = @name, Func = @func, Address = @address, ' +
                'Drawing = @drawing, Apptype = @apptype, ' +
                'Document = @document, UserId = @userid, ' +
                'ApptypeTwo = @apptypetwo, UserFullName = @userfullname, Contact = @contact, ' +
                'Other = @other, Updated = @updated WHERE Id = @id');

    return;
}

/**
 * Update header and lines
 *
 * @param {*} body request body
 * @param {*} res response
 */
const updateHeader = async function(body, res) {
    let id = body.id,
        number = body.number,
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
        other = body.other,
        updated = new Date(),
        oldTeleregNumber;

    if (number && id) {
        try {
            const pool = await db;

            //Search Telereg to see if Number exists.
            const searchOldNumber = await pool.request()
                .input('id', sql.VarChar, id)
                .query('SELECT Number FROM Telereg WHERE Id = @id AND Deleted IS NULL');

            //If Old Number exists
            if (searchOldNumber.recordset.length > 0) {
                oldTeleregNumber = searchOldNumber.recordset[0].Number;

                if (oldTeleregNumber !== number) {
                    const searchNewNumber = await pool.request()
                        .input('number', sql.VarChar, number)
                        .query('SELECT Number FROM Telereg ' +
                            'WHERE Number = @number AND Deleted IS NULL');

                    // New Number exists
                    if (searchNewNumber.recordset.length !== 0) {
                        return res.status(409).json({
                            "error": {
                                "status": 409,
                                "title": "DUPLICATE",
                                "detail": "Number exists"
                            }
                        });
                    }

                    // Search Teletr to see if lines is connected to header
                    let searchTeletr = await pool.request()
                        .input('oldteleregnumber', sql.VarChar, oldTeleregNumber)
                        .query('SELECT * FROM Teletr WHERE TeleregNumber = @oldteleregnumber ' +
                            'AND Deleted IS NULL');

                    // If lines connected to header.
                    if (searchTeletr.recordset.length > 0) {
                        const transaction = await pool.transaction();

                        try {
                            // Start a transaction
                            await transaction.begin();

                            // Update Teletr with new TeleregNumber
                            await transaction.request()
                                .input('oldteleregnumber', sql.VarChar, oldTeleregNumber)
                                .input('teleregnumber', sql.VarChar, number)
                                .query('UPDATE Teletr SET TeleregNumber = @teleregnumber ' +
                                    'WHERE TeleregNumber = @oldteleregnumber AND Deleted IS NULL');

                            //Update Telereg
                            await transaction.request()
                                .input('id', sql.Int, id)
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
                                .input('updated', sql.DateTime, updated)
                                .query('UPDATE Telereg SET ' +
                                        'Number = @number, Name = @name, ' +
                                        'Func = @func, Address = @address, ' +
                                        'Drawing = @drawing, Apptype = @apptype, ' +
                                        'Document = @document, UserId = @userid, ' +
                                        'ApptypeTwo = @apptypetwo, ' +
                                        'UserFullName = @userfullname, Contact = @contact, ' +
                                        'Other = @other, Updated = @updated WHERE Id = @id');

                            //Commit the transaction
                            await transaction.commit();

                            //Return statuscode 204 NO CONTENT
                            return res.status(204).send();
                        } catch (err) {
                            await transaction.rollback();
                            return res.status(500).json({
                                "errors": {
                                    "status": 500,
                                    "title": "INTERNAL SERVER ERROR",
                                    "detail": "Transaction failed"
                                }
                            });
                        }
                    } else {
                        await headerSqlInput(body, pool);
                        return res.status(204).send();
                    }
                } else {
                    await headerSqlInput(body, pool);
                    return res.status(204).send();
                }
            } else {
                return res.status(404).json({
                    "errors": {
                        "status": 404,
                        "title": "NOT FOUND",
                        "detail": "Id not found"
                    }
                });
            }
        } catch (err) {
            return res.status(500).json({
                "errors": {
                    "status": 500,
                    "title": "INTERNAL SERVER ERROR",
                    "detail": err.message
                }
            });
        }
    } else {
        return res.status(400).json({
            "errors": {
                "status": 400,
                "title": "BAD REQUEST",
                "detail": "Number and/or id missing in body"
            }
        });
    }
};

module.exports = updateHeader;
