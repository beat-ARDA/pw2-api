class User {
    constructor(id, usuario, contra) {
      this.id = id;
      this.usuario = usuario;
      this.contra = contra;
    }
  
    static findUser() {
      return [{ "id": 1, "name": "Alvaro", "contra": "123" }]
    }
  }
  
  module.exports = User;
  