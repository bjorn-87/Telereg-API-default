var sql = require("mssql");
var dbConfig = require('../config/dbConfig.js');

const dbConnect = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = dbConnect;
