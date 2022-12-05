let express = require('express');
let router = express.Router();

////

let tablero;
let turnoLocal;
let jugadores;
let marcaJugador;
let movimientos;

let ganador=false;
let empate=false;

const marcas=['o','x'];

/* GET home page. */

router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express' });
});


router.put('/empezar', function(request, response) 
{
  jugadores=request.body;
  movimientos=9;
  turnoLocal=0
  ganador=false;
  empate=false;
  tablero=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
     
  response.setHeader('Content-Type', 'application/json')    
  .send({
  'turno': jugadores[turnoLocal],
  'estado': tablero     
  })
  .status(200)    
});


router.put('/movimiento', function(request, response) 
{
  let columna=request.body.columna;
  let fila=request.body.fila;
  let respuesta={}  

  if(jugadores[turnoLocal]==request.body.jugador)
  {
    if (tablero[fila][columna]==" ")
    {
      movimientos= movimientos-1;      
      if(request.body.jugador==jugadores[0])
      {
        turnoLocal=1;    
        marcaJugador=marcas[1];
        tablero[fila][columna]=marcaJugador;  
      }
      else
      {
        turnoLocal=0;
        marcaJugador=marcas[0];
        tablero[fila][columna]=marcaJugador;  
      }

      if(movimientos==0)
      {        
        empate=true;  
      }  
    } 
  } 
  buscarGanador();
  if (ganador && !empate)
  {
    respuesta={ganador:request.body.jugador,estado:tablero}
  }
  else if(empate)
  {          
    respuesta={'empate' : "empate", 'estado': tablero}   
  }
  else if (!ganador && !empate)
  {
    respuesta={'turno' : jugadores[turnoLocal], 'estado': tablero}   
  }      
  response.setHeader('Content-Type', 'application/json');      
  response.send(respuesta).status(200);
});

module.exports = router;

function buscarGanador()
{
    for (i=0;i<3;i++)
    {
      if (revisarColumna(i))
      {
        ganador=true;
        return;
      }  
      else if (revisarFila(i))
      {
        ganador=true;
        return;
      }  
    }
    if (revisarDiagonal())
    {
      ganador=true;
      return;
    }  
}

function revisarDiagonal()
{
  let salida = false;
  if (tablero[0][0]==tablero[1][1]) 
  {
    if (tablero[2][2]==tablero[1][1]) 
    {
      if (tablero[0][0]!=" ")
      {
        return   salida=true;
      }
    }  
  }  
  if (tablero[0][2]==tablero[1][1]) 
  {
    if (tablero[2][0]==tablero[1][1])
    {
      if (tablero[1][1]!=" ")
      {
        return   salida=true;
      }
    }    
  }    
  return salida;
}

function revisarColumna(col)
{
  salida=false;
  if (tablero[0][col]==tablero[1][col]) 
  {
    if (tablero[1][col]==tablero[2][col])
    {
      if(tablero[0][col]!=" ")
      {
        return salida=true;
      }
    }
  }  
  return salida=false;
}

function revisarFila(fil)
{
  salida=false;
  if (tablero[fil][0]==tablero[fil][1]) 
  {
    if (tablero[fil][1]==tablero[fil][2])
    {
      if(tablero[fil][0]!=" ")
      {
        return salida=true;
      }
    }
  }  
  return salida=false;
}