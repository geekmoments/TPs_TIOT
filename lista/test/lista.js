/*
En una lista vacía hay 0 elementos
Agregar un elemnto y comprobar que hay 1 elemento


*/

const assert = require('chai').assert;
const Lista = require('../src/lista.js');

describe('En una lista vacia', function() {

    var lista = new Lista();
    it("hay 0 elementos",function(){
    //assert.fail("test de error");
    assert.equal(lista.count(),0);



    })

});

describe("Al agregar un elento a lista vacía",function(){

    var lista = new Lista();
    lista.add("clave","valor");
    it("hay 1 elemento",function(){
        assert.equal(lista.count(),1);
    })


});