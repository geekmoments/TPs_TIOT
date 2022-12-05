/*
En una lista vacía hay 0 elementos
Agregar un elemnto y comprobar que hay 1 elemento
En una lista vacía al agregar 2 elementos probar que hay 2 elementos
En una lista vacía probar el error al agregar con clave vacía o que no son cadenas
En una lista agregar una clave con un valor conocido consultar el valor asociado a la clave y comprobar que coinciden
cuando se intenta agregar una clave duplicada devuelve error
cuando se intenta  agregar una clave duplicada no cambia el valor de la clave
cuando se intenta agrega una clave duplicada no cambia el tamaño de la lista
En una lista con elementos, comprobar el error al tratar de actualizar una clave que no existe
Cuando se actualiza un elemento se retorna true como exito de operación
En una lista con elementos, comprobar el error al buscar una clave que no existe
Cuando se elimina un elemento se retorna true como exito de operación
Cuando se intenta eliminae un elemento inexistente se retorna false como resultado de operación
Cesar Cruz
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
        assert.equal(lista.find("clave").valor,"valor");
     })

});
describe("Al agregar 2 elentos a lista vacía",function(){

    var lista = new Lista();
    lista.add("uno",1);
    lista.add("dos","2");

    it("hay 2 elementos",function(){
        assert.equal(lista.count(),2);
    })
    it("se puede recuperar el 1er valor apartir de la clave",function(){
        assert.equal(lista.find("uno").valor,1);
     });
     it("se puede recuperar el 2do valor apartir de la clave",function(){
        assert.equal(lista.find("dos").valor,2);
     });

     describe("al intentar agregar  clave duplicada",function(){
        var resultado = lista.add("uno",10);
        it("devuelve un error",function(){
            assert.isFalse(resultado);
         })
         it("no cambia el resultado asociado a la clave",function(){
            assert.equal(lista.find("uno").valor,1);
       })
        it("no cambia el tamaño",function(){
             assert.equal(lista.count(),2);
        })
    });
});

describe("Cuando se busca una clave inexistente", function() {
    var lista = new Lista();

    it("Retorna false como resultado de la operación", function() {
        assert.isFalse(lista.find("v"));
    });
});

describe("cuando se actualiza un elemento que existe", function() {

    var lista = new Lista();
    lista.add("uno", "1");

    it("retorna true como resultado de la operación", function() {
        assert.isTrue(lista.update("uno", "1"));
    });

    it("la cantidad de elementos no varía", function() {
        assert.equal(1, lista.count());
    });
});

describe("Cuando se actualiza un elemento que no existe", function() {

    var lista = new Lista();

    it("Retorna falso", function() {
        assert.isFalse(lista.update("nuevo", "valor"));
    });

   it("la cantidad de elementos no varía", function() {
      assert.equal(lista.count(),0);
    });
});

describe("Cuando se elimina un elemento que existente", function() {

    var lista = new Lista();
    lista.add("uno", 1);
    var resultado = lista.count();

    it("Valida con true confirmando la operación", function() {
        assert.isTrue(lista.delete("uno"));
    });

    it("Los disminuye el tamaño", function() {
        assert.equal(resultado - 1, lista.count());
    });
});

describe("Cuando se intenta eliminr elemento inexistente", function() {

    var lista = new Lista();
    lista.add("clave", "valor");

    it("retorna false como resultado de la operación", function() {
        assert.isFalse(lista.delete("uno"));
    });

    it("la cantidad de elementos no varía", function() {
        assert.equal(lista.count(),1);
    });
});
