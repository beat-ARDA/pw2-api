const dbConnect = require('../dbConnect');
const conection = new dbConnect();

class UserLogin {
  constructor(email, pass) {
    this.email = email;
    this.pass = pass;
    this.userId = null;
    this.attemps = null;
  }

  async Login() {
    let dataLogin = { "message": "No se pudo obtener la informacion requerida", "status": 500 };

    try {
      conection.Connect();
      const data = JSON.parse(await conection.sp_login(`CALL sp_LogInEmail('${this.email}')`, `CALL sp_LogInPassword('${this.email}', '${this.pass}')`));

      this.attemps = data.emailData[0].length > 0 ? data.emailData[0][0].attemps : null;
      this.userId = data.passwordData[0].length > 0 ? data.passwordData[0][0].userId : null;

      if (this.attemps && this.userId)
        if (this.attemps == 3)
          dataLogin = { "message": `Tu usuario esta bloqueado, ponte en contacto con el administrador`, "status": 403 }
        else
          dataLogin = { "message": "Credenciales correctas!", "userId": this.userId, "status": 200 }
      else if (this.attemps == null)
        dataLogin = { "message": "No existe una cuenta con ese correo dentro de nuestra base de datos", "status": 404 }
      else if (this.userId == null) {
        if (this.attemps == 3)
          dataLogin = { "message": `Tu usuario esta bloqueado, ponte en contacto con el administrador`, "status": 403 }
        else {
          let restAttemps = this.attemps + 1;
          restAttemps = 3 - restAttemps;
          if (restAttemps == 0)
            dataLogin = { "message": `Tu usuario esta bloqueado, ponte en contacto con el administrador`, "status": 403 }
          else
            dataLogin = { "message": `La contraseña ingresada es icorrecta, numero de intentos restantes: ${restAttemps}`, "status": 403 }
          await conection.sp_updateAttemps(`CALL sp_IncrementUserAttemps('${this.attemps + 1}', '${this.email}')`);
        }
      }
    } catch (error) { console.log(error); }

    return dataLogin;
  }
}

module.exports = UserLogin;