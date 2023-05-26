const mysql = require('mysql2');
require('mysql2/promise');
class dbConnect {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.LOCAL_IP,
            user: 'root',
            password: 'Pink$1624',
            database: 'apicursos',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    Connect() {
        this.connection.connect();
    }

    Disconnect() {
        this.connection.end();
    }

    async sp_login(sp_email, sp_password) {
        const [emailData] = await this.connection.promise().query(sp_email, true);
        const [passwordData] = await this.connection.promise().query(sp_password, true);
        const loginData = { "emailData": emailData, "passwordData": passwordData }
        return JSON.stringify(loginData);
    }

    async sp_call(sp) {
        await this.connection.promise().query(sp, true);
    }

    async sp_callGet(sp) {
        const [userData] = await this.connection.promise().query(sp, true);
        return JSON.stringify(userData);
    }
}

module.exports = dbConnect;