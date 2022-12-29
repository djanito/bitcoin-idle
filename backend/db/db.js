const sqlite3 = require('sqlite3').verbose();

let db;

module.exports = {
    connectDB: function() {
        db = new sqlite3.Database('./db/bitcoin_clicker.db', (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the datjbkjbabase!');
        });
    }
    ,
    getComponents: function() {
        return new Promise(function(resolve, reject) {
            var sql = "SELECT * FROM components;";
            db.all(sql, function(err, rows) {
                if(err) {
                    console.log("Impossible to get the comonents %s", err);
                    reject(null);
                }
                else
                {
                    console.log(`Components retrieved`);
                    resolve(rows);
                }
            });
        })
    }
}