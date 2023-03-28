const dbConnect = require('../dbConnect');
const conection = new dbConnect();
class User {
  constructor(id, usuario, contra) {
    this.id = id;
    this.usuario = usuario;
    this.contra = contra;
  }

  static async LogInPassword(email, password) {
    const dataLogin = await conection.Procedure(`CALL sp_LogInPassword('${email}', '${password}')`);
    console.log(dataLogin)
    //return JSON.parse(dataLogin)[0].userId;
  }
}

module.exports = User;