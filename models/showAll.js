"use strict";

const db = require("../db/db.js");
const sql = require("mssql");

var showAll = async function(req, res) {
    try {  
        // console.log("No params");
        const pool = await db;
        // console.log(pool);  
        const result = await pool.request()  
            .query('SELECT * FROM Telereg', function(err, result) {  
            if (err) {  
                console.log(err)  
            } else {  
                let data = {
                    data: result.recordset
                }
                // console.log(data);
                res.status(200).json(data);
            }  
        });  
        } catch (err) {
            res.status(500).json({
                "errors": {
                    "status": 500,
                    "detail": err.message
                }
            });
        }    
}

module.exports = showAll;