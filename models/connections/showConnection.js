"use strict";

const db = require("../../db/db.js");
const sql = require("mssql");

/**
 * Convert null values in object to strings
 * @param {array} recordset
 * @returns array
 */
function nullToString(recordset) {
    recordset.forEach((value, key) => {
        Object.keys(value).forEach(val => {
            if (recordset[key][val] === null) {
                recordset[key][val] = "";
            }
        });
    });
    return recordset;
}

/**
 *
 * @param {*} qry
 * @param {*} res
 */
var showConnection = async function(params, res) {
    var teleregId = params.id,
        data = {
            "head": {},
            "line": []
        };

    if (!teleregId || isNaN(teleregId)) {
        console.error("BAD REQUEST: Param id missing in url or param id is not a number");
        return res.status(400).json({
            errors: {
                status: 400,
                title: "BAD REQUEST",
                detail: "Param id missing in url or param id is not a number"
            }
        });
    } else {
        try {
            const pool = await db;
            let result1 = await pool.request()
                .input('input_parameter', sql.VarChar, teleregId)
                .query('SELECT * FROM Telereg WHERE Id = @input_parameter AND Deleted IS NULL');

            // Header of the connectionschema
            let recordSet = nullToString(result1.recordset);

            if (recordSet[0]) {
                data.head = recordSet[0];

                let number = data.head.Number;

                let result2 = await pool.request()
                    .input('input_parameter', sql.VarChar, number)
                    .query('SELECT * FROM Teletr WHERE TeleregNumber = @input_parameter ' +
                            'AND Deleted IS NULL ORDER BY Position');

                // Wireconnections of the connectionschema
                let recordSet2 = nullToString(result2.recordset);

                data.line = recordSet2;
            }

            return res.status(200).json({
                data: data
            });
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

module.exports = showConnection;
