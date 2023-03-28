const mysql = require('mysql2');
require('mysql2/promise');
class dbConnect {

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Pink$1624',
            database: 'apicursos'
        });
    }

    async Procedure(procedure) {
        this.connection.connect();
        const [rows] = await this.connection.promise().query(procedure, true);
        this.connection.end();
        return JSON.stringify(rows[0]);
    }
}

module.exports = dbConnect;