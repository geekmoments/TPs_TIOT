/**
 * En un juego nuevo el tablero está vacío y le toca mover al primer jugador x
 * Al marcar una casilla el primer jugador, el tablero tiene una casilla ocupada y le toca mover al segundo jugador x
 * Al marcar una casilla el segundo jugador, el tablero tiene dos casillas ocupadas y le toca mover al primer jugador x
 * No debería aceptar un movimiento de un jugador al que no le toca el turno
 * Si un jugador quiere marcar una casilla ocupada entonces tiene un error x
 * Si tres columnas tienen la marca de un mismo jugador entonces ese jugador gana la partida x
 * Si tres filas tienen la marca de un mismo jugador entonces ese jugador gana la partida 
 * Si una de las dos diagonales tienen la marca de un mismo jugador entonces este jugador gana la partida 
 * Si no hay mas lugares vacios en el tablero es un empate 
 
Cesar Cruz
*/

let chai = require("chai");
let chaihttp = require("chai-http");
let should = chai.should();
let servidor = require("../app");
chai.use(chaihttp)

describe("Juego  TATETI", async ()=>
{ 
    let movimientos = [
            { jugador: 'Cesar', columna: 0, fila: 0 },
            { jugador: 'Raul', columna: 1, fila: 0 },
            { jugador: 'Cesar', columna: 0, fila: 1 },
            { jugador: 'Raul', columna: 1, fila: 1 },
            { jugador: 'Cesar', columna: 0, fila: 2 },
            { jugador: 'Raul', columna: 0, fila: 0 },
    ];
    let juego = ['Cesar','Raul'];            
    describe("Empieza juego nuevo", async()=>
    {
        it ("Casilleros empiezan vacios", (done)=>
        {
            chai.request(servidor)
            .put("/empezar")
            .send(juego)
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;       
                res.should.to.be.a('object');  
                res.body.should.have.property('turno').eql('Cesar');
                res.body.should.have.property('estado').eql([
                    [' ',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                    ]);
                done();
            })
        })        
        it ("Marca el 1er jugador",(done)=>
        {
            chai.request(servidor)
            .put("/empezar")
            .send(juego)
            .end((err,res)=>
            {            
                res.should.have.status(200);            
                res.should.to.be.json;    
                res.should.to.be.a('object');     
                res.body.should.have.property('turno').eql('Cesar');
                res.body.should.have.property('estado').eql([
                    [' ',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            })
        })
    })
    describe(" movimientos", ()=>
    {        
        it ("El primer jugador marca un casillero y es turno del 2do jugador", (done)=>
        {
            chai.request(servidor).put("/empezar").send(juego).end();            
            chai.request(servidor)
            .put("/movimiento")
            .send(movimientos[0])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;     
                    res.should.to.be.a('object');    
                    res.body.should.have.property('turno').eql('Raul');
                    res.body.should.have.property('estado').eql([
                        ['x',' ',' '],
                        [' ',' ',' '],
                        [' ',' ',' '],
                    ]);
                    done()
                })
        })
        it ("Estando 2casilleros ocupados vuelve a marca el 1er jugador, luego del 2do ", (done)=>
        {
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos[0]).end();
            chai.request(servidor)
            .put("/movimiento")
            .send(movimientos[1])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;     
                    res.should.to.be.a('object');                    
                    res.body.should.have.property('turno').eql('Cesar');
                    res.body.should.have.property('estado').eql([
                        ['x','o',' '],
                        [' ',' ',' '],
                        [' ',' ',' '],
                    ]);
                    done();
                })
        })
        it ("Marca un jugador con turno equivocado", (done)=>
        {
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos[0]).end();
            chai.request(servidor)
            .put("/movimiento")
            .send(movimientos[2])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;     
                    res.should.to.be.a('object');                    
                    res.body.should.have.property('turno').eql('Raul');
                    res.body.should.have.property('estado').eql([
                        ['x',' ',' '],
                        [' ',' ',' '],
                        [' ',' ',' '],
                    ]);
                    done();
                })
        })
        it ("Uno de los jugadores marca una posicion ocupada salta un error pasa a su turno ", (done)=>
        {
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos[0]).end();
            chai.request(servidor)
            .put("/movimiento")
            .send(movimientos[5])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;    
                    res.should.to.be.a('object');                     
                    res.body.should.have.property('turno').eql('Raul');
                    res.body.should.have.property('estado').eql([
                        ['x',' ',' '],
                        [' ',' ',' '],
                        [' ',' ',' '],
                    ]);
                    done();
                })
        })
    })
    describe("Distintas opciones de finalizacion", ()=>
    {
        it("El juego termina cuando hay 3 marcas del mismo jugador en columna 1",(done)=>
        {
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos[4])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;                       
                    res.should.to.be.a('object');              
                    res.body.should.have.property('ganador').eql('Cesar');
                    res.body.should.have.property('estado').eql([
                        ['x','o',' '],
                        ['x','o',' '],
                        ['x',' ',' '],
                    ]);
                    done();
                })
        })
        it("El juego termina cuando hay 3 marcas del mismo jugador en columna 2",(done)=>
        {
            let movimientos_2 = [
                { jugador: 'Cesar', columna: 2, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 0 },
                { jugador: 'Cesar', columna: 2, fila: 1 },
                { jugador: 'Raul', columna: 1, fila: 1 },
                { jugador: 'Cesar', columna: 2, fila: 2 },
                { jugador: 'Raul', columna: 0, fila: 0 },
            ];
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos_2[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_2[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_2[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_2[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_2[4])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;                       
                    res.should.to.be.a('object');              
                    res.body.should.have.property('ganador').eql('Cesar');
                    res.body.should.have.property('estado').eql([
                        [' ','o','x'],
                        [' ','o','x'],
                        [' ',' ','x'],
                    ]);
                    done();
                })
        })    
        it("El juego termina cuando hay 3  marcas del mismo jugador en fila 1",(done)=>
        {
            let movimientos_3 = [
                { jugador: 'Cesar', columna: 0, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 2 },
                { jugador: 'Cesar', columna: 1, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 1 },
                { jugador: 'Cesar', columna: 2, fila: 0 },
                { jugador: 'Raul', columna: 0, fila: 1 },
            ];
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos_3[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_3[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_3[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_3[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_3[4])
            .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;                       
                    res.should.to.be.a('object');              
                    res.body.should.have.property('ganador').eql('Cesar');
                    res.body.should.have.property('estado').eql([
                        ['x','x','x'],
                        [' ','o',' '],
                        [' ','o',' '],
                    ]);
                    done();
                })
            })
        it("EEl juego termina cuando hay 3  marcas del mismo jugador en fila 2",(done)=>
        {
            let movimientos_4 = [
                { jugador: 'Cesar', columna: 0, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 1 },
                { jugador: 'Cesar', columna: 1, fila: 0 },
                { jugador: 'Raul', columna: 0, fila: 1 },
                { jugador: 'Cesar', columna: 2, fila: 2 },
                { jugador: 'Raul', columna: 2, fila: 1 },
            ];
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[4]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[5])
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('ganador').eql('Raul');
                res.body.should.have.property('estado').eql([
                    ['x','x',' '],
                    ['o','o','o'],
                    [' ',' ','x'],
                ]);
                done();
            })
        })
        it("EEl juego termina cuando hay 3  marcas del mismo jugador en diagonal 1",(done)=>
        {
            let movimientos_4 = [
                { jugador: 'Cesar', columna: 0, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 0 },
                { jugador: 'Cesar', columna: 1, fila: 1 },
                { jugador: 'Raul', columna: 0, fila: 1 },
                { jugador: 'Cesar', columna: 2, fila: 2 },
                { jugador: 'Raul', columna: 2, fila: 1 },
            ];
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[4])            
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('ganador').eql('Cesar');
                res.body.should.have.property('estado').eql([
                    ['x','o',' '],
                    ['o','x',' '],
                    [' ',' ','x'],
                ]);
                done();
            })        
        })
        it("EEl juego termina cuando hay 3  marcas del mismo jugador en diagonal 2",(done)=>
        {
            let movimientos_4 = [
                { jugador: 'Cesar', columna: 2, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 0 },
                { jugador: 'Cesar', columna: 1, fila: 1 },
                { jugador: 'Raul', columna: 0, fila: 1 },
                { jugador: 'Cesar', columna: 0, fila: 2 },
                { jugador: 'Raul', columna: 2, fila: 1 },
            ];
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_4[4])            
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('ganador').eql('Cesar');
                res.body.should.have.property('estado').eql([
                    [' ','o','x'],
                    ['o','x',' '],
                    ['x',' ',' '],
                ]);
                done();
                })        
        })
        it("El juego termina en empate ",(done)=>
        {
            let movimientos_5 = [
                { jugador: 'Cesar', columna: 0, fila: 0 },
                { jugador: 'Raul', columna: 1, fila: 0 },
                { jugador: 'Cesar', columna: 2, fila: 0 },
                { jugador: 'Raul', columna: 0, fila: 1 },
                { jugador: 'Cesar', columna: 1, fila: 1 },
                { jugador: 'Raul', columna: 2, fila: 1 },
                { jugador: 'Cesar', columna: 0, fila: 2 },
                { jugador: 'Raul', columna: 1, fila: 2 },
                { jugador: 'Cesar', columna: 2, fila: 2 },
                
            ];
            chai.request(servidor).put("/empezar").send(juego).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[0]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[1]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[2]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[3]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[4]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[5]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[6]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[7]).end();
            chai.request(servidor).put("/movimiento").send(movimientos_5[8])            
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('empate').eql('empate');
                res.body.should.have.property('estado').eql([
                    ['x','o','x'],
                    ['o','x','o'],
                    ['x','o','x'],
                ]);
                done();
            })
        })
    })      
})