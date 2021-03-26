"use strict";

const db = require("../db/db.js");
const sql = require("mssql");

var search = async function(req, res) {
    let qry = req.query;
    let queryLength = Object.keys(qry).length;

    if (qry.search) {
        try {  
            let search = qry.search;
            const pool = await db;
    
            const result = await pool.request()
                .input('input_parameter', sql.VarChar, `%${search}%`)
                .query('SELECT * FROM Telereg WHERE Number LIKE @input_parameter' + 
                        ' OR Name LIKE @input_parameter' +
                        ' OR Address LIKE @input_parameter' +
                        ' OR Func LIKE @input_parameter', function(err, result) {  
                if (err) {  
                    console.log(err)  
                } else {  
                    let data = {
                        "data": result.recordset
                    };
                    res.status(200).json(data);
                }
            });  
            } catch (err) {
                console.log("Error");
                res.status(500)  
                res.send(err.message)  
            }
    } else {
        res.status(404).json([{
            status: "404 Page not found",
            message: "The parameter 'search' is missing or has no value in the query"
        }]);
    }
}

module.exports = search;