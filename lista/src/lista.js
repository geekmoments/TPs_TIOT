module.exports = class Lista {
  
    #cantidad

    constructor() {
        this.#cantidad=0;
    
  }
    count() {
        return this.#cantidad;
    
    }

    add(clave,valor) {
        this.#cantidad++;

    
    }

  // ...
}