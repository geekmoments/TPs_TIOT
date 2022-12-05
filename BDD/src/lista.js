module.exports = class Lista {
    #elementos;

    constructor() {
        this.#elementos = [];
    }
    count() {
        return this.#elementos.length;
    }

    find(clave) {
        var indice = this.findIndex(this.#elementos, clave);
        if (indice != -1)
            return this.#elementos[indice].valor;
        else
            return NaN;
    }
    add(clave, valor) {
        if (typeof clave == "string") {
            var indice = this.findIndex(this.#elementos, clave);
            if (indice != -1)
                this.#elementos[indice].valor = valor;
            else
                this.#elementos.push({ clave, valor });
        }
    }

     delete(clave) {
        var indice = this.findIndex(this.#elementos, clave);
        if (indice != -1)
            this.#elementos.splice(indice, 1);
        else
            return NaN;
    }
     claves() {
        var clavesArray = [];
        for (var i = 0; i < this.#elementos.length; i++) {
            clavesArray.push(this.#elementos[i].clave)
        }
        return (clavesArray.sort());
    }

    findIndex(elementos, clave) {
        for (var indice = 0; indice < elementos.length; indice++) {
            if (elementos[indice].clave == clave)
                return indice;
        }
        return -1;
    }
}