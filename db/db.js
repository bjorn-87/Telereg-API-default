var sql = require("mssql");
var dbConfig;

if (process.env.NODE_ENV === "production") {
    dbConfig = require('../config/dbConfig.js');
} else {
    dbConfig = require('../config/testDbConfig.js');
    console.log("DevConfig");
}

const dbConnect = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = dbConnect;
