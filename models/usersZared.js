const mysql = require('mysql2/promise');
//const dbConnect = require('../dbConnect');
//const connection = new dbConnect();

class User {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Zomrromr',
            database: 'apicursos',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async getAll() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id) {
        const [rows] = await this.pool.execute('CALL sp_ObtenerUsuarioPorId(?)', [id]);
        return rows[0];
    }

    async create({ email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate }) {
        const [result] = await this.pool.execute('CALL sp_RegistrarUsuario(?, ?, ?, ?, ?, ?, ?, ?)', [email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate]);
        //const id = result.insertId;
        return { email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate };
    }

    async update({ userId, email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate, borroImagen }) {
        if (imageProfile !== '' || borroImagen) {
            await this.pool.execute('CALL sp_ActualizarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, email, pass, userType, firstNames, lastNames, imageProfile, gender, birthDate, borroImagen]);
        } else {
            await this.pool.execute('CALL sp_ActualizarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userId, email, pass, userType, firstNames, lastNames, null, gender, birthDate, borroImagen]);
        }
        return true;
    }

    async delete(id) {
        await this.pool.query('DELETE FROM users WHERE userId = ?', [id]);
        return true;
    }

    async close() {
        await this.pool.end();
    }
}

module.exports = User;

