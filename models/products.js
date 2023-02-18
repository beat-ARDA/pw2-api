class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  static findAll() {
    
    return [{ "id": 1, "name": "manzana", "price": 25 }]
  }

  static findById(id) {
    
  }

  static create(data) {
   
  }

  static update(id, data) {
   
  }

  static delete(id) {
   
  }
}

module.exports = Product;
