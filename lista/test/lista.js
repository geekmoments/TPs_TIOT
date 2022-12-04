/*
En una lista vacía hay 0 elementos


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