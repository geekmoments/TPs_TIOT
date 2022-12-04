/*
En una lista vacía hay 0 elementos
Agregar un elemnto y comprobar que hay 1 elemento
En una lista vacía al agregar 2 elementos probar que hay 2 elementos
En una lista vacía probar el error al agregar con clave vacía o que no son cadenas
En una lista agregar una clave con un valor conocido consultar el valor asociado a la clave y comprobar que coinciden
*/

const assert = require('chai').assert;
const Lista = require('../src/lista.js');

describe('En una lista vacia', function() {

    var lista = new Lista();
    it("hay 0 elementos",function(){
    //assert.fail("test de error");
    assert.equal(lista.count(),0);

    })
    describe("Cuando se agregan claves que no son cadenas",function(){
        var resultado = lista.add(1,1);

        it("devuelve un error",function(){
            assert.isFalse(resultado);
         })
        it("no cambia el tamaño",function(){
             assert.equal(lista.count(),0);
        })
    
    });

});

describe("Al agregar un elento a lista vacía",function(){

    var lista = new Lista();
    lista.add("clave","valor");
    it("hay 1 elemento",function(){
        assert.equal(lista.count(),1);
    })
    it("se puede recuperar el valor apartir de la clave",function(){
        assert.equal(lista.find("clave"),"valor");
     });

});
describe("Al agregar 2 elentos a lista vacía",function(){

    var lista = new Lista();
    lista.add("clave","valor");
    lista.add("clave2","valor2");

    it("hay 2 elementos",function(){
        assert.equal(lista.count(),2);
    })
    it("se puede recuperar el 1er valor apartir de la clave",function(){
        assert.equal(lista.find("clave"),"valor");
     });
     it("se puede recuperar el 2do valor apartir de la clave",function(){
        assert.equal(lista.find("clave2"),"valor2");
     });

});
