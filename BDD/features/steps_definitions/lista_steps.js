
const { Before, Given, When, Then } = require('@cucumber/cucumber')
const expect = require("chai").expect;
const Lista = require("../../src/lista.js");

let contexto = {};

Given('una lista vacía', function () {
    contexto.lista = new Lista();
});

Given('una lista con los siguientes elementos', function (vector) {
    vector = vector.rawTable;
    contexto.lista = new Lista();
    for (var indice = 1; indice < vector.length; indice++) {
        contexto.lista.add(vector[indice][0],vector[indice][1]);
    }
});

When('agrego un elemento con clave {string} y valor {string}',function (clave,valor) {
    contexto.lista.add(clave,valor);
});

When('intento agregar un elemento con clave {int} y valor {string}',function (clave,valor) {
    contexto.lista.add(clave,valor);
});

When('elimino un elemento con clave {string}',function (clave) {
    contexto.lista.delete(clave);
});

Then('obtengo las claves ordenadas alfabeticamente {string},{string},{string}',function (a,b,c) {
    expect(contexto.lista.claves()).to.be.eql([a,b,c]);
});

Then('la lista tiene {int} elemento(s) almacenado(s)', function (int) {
    expect(contexto.lista.count()).to.be.equal(int);
});

Then('si busco la clave {string} no obtengo ningun valor', function (clave) {
    expect(contexto.lista.find(clave)).to.be.NaN;
});

Then('si busco la clave {string} obtengo el valor {string}', function (clave,valor) {
    expect(contexto.lista.find(clave)).to.be.equal(valor);
});