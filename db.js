
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "saidurga20",
    database: "college_events",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed:", err.message);
        return;
    }

    console.log("Connected to MySQL");
});

module.exports = db;