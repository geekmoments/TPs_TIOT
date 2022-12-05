module.exports = class Lista {
  
     #elementos


    constructor() {
         this.#elementos=[];
    
  }
    indexOf(clave) {

        for (let i = 0; i < this.#elementos.length; i++) {
            if (this.#elementos[i].clave==clave) {
                return i;
            }
            
        }
        return NaN;
    
    }

    count() {
        return this.#elementos.length;
    
    }

    add(clave,valor) {
        if (typeof (clave) == 'string') {
             
            if (isNaN(this.indexOf(clave))) {
                this.#elementos.push({'clave':clave,'valor':valor});
            }
         
    }
    return false;
    
    }
    find(clave) {
      var  indice = this.indexOf(clave);
        if (!isNaN(indice)) {
            return {'indice':indice,'valor' :this.#elementos[indice].valor};
            
        }
        return false;
    
    
    }
    update(clave,valor) {
        var resultado = this.find(clave);

        if (resultado) {
            this.elementos[resultado.indice].valor = valor;
            return true;
        } else {
            return false;
        }
    }

  // ...
}