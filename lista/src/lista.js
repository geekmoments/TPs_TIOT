module.exports = class Lista {
  
    #cantidad
    #elementos


    constructor() {
        this.#cantidad=0;
        this.#elementos=[];
    
  }
    count() {
        return this.#cantidad;
    
    }

    add(clave,valor) {
        if (typeof (clave) == 'string') {
        this.#elementos.push({'clave':clave,'valor':valor});

        this.#cantidad++;
        
    }
    return false;
    
    }
    find(clave) {
       
        for (let i = 0; i < this.#elementos.length; i++) {
            if (this.#elementos[i].clave==clave) {
                return this.#elementos[i].valor;
            }
            
        }
    
    
    }

  // ...
}