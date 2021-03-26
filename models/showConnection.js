"use strict";

const db = require("../db/db.js");
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

var showConnection = async function(qry, res) {

    console.log("qry:", qry);
    var teleregId = qry.id,
        data = {
            "head": [],
            "line": []
        };
    
    if (!teleregId) {
        res.status(404).json({
            data: {
                status: 404,
                msg: "Page not found"
            }
        });
    } else {
        try {  
            const pool = await db;
            let result1 = await pool.request()
                .input('input_parameter', sql.VarChar, teleregId)
                .query('SELECT * FROM Telereg WHERE Id = @input_parameter AND Deleted IS NULL')   
            
            // Header of the connectionschema
            let recordSet = nullToString(result1.recordset);

            if (recordSet[0]) {
                data.head = recordSet[0];

                let number = data.head.Number;
                

                let result2 = await pool.request()
                    .input('input_parameter', sql.VarChar, number)
                    .query('SELECT * FROM Teletr WHERE TeleregNumber = @input_parameter AND Deleted IS NULL ORDER BY Position')
                
                // Wireconnections of the connectionschema
                let recordSet2 = nullToString(result2.recordset);

                data.line = recordSet2;
            }

            res.status(200).json({
                data: data
            });

        } catch (err) {
            res.status(500);
            res.send(err.message);  
        }
    }
}

module.exports = showConnection;


    // try {  
    //     const pool = await db;
    //     await pool.request()
    //         .input('input_parameter', sql.VarChar, qry.number)
    //         .query('SELECT * FROM Telereg WHERE Number = @input_parameter', async function(err, result) {  
    //         if (err) {  
    //             console.log(err)  
    //         } else {
    //             // Adding result from
    //             // console.log(queryOne);   
    //             data.head = result.recordset;

    //             await pool.request()
    //             .input('input_parameter', sql.VarChar, qry.number)
    //             .query('SELECT * FROM Teletr WHERE TeleregNumber = @input_parameter', function(err, result) {  
    //             if (err) {  
    //                 console.log(err)  
    //             } else {  
    //                 data.line = result.recordset;
    //                 res.status(200).json({data: data});
    //                 // console.log(data);  
    //                 // res.json({"data": data});
    //             }  
    //         });
    //             // console.log(data);  
    //             // res.json(data);
    //         }  
    //     });
    //     // console.log(result);
    //     // if (data.head !== "") {
    //         // }
    //         // await console.log(number);

    //     // res.json(data);
    //     } catch (err) {
    //         res.status(500)  
    //         res.send(err.message)  
    //     }