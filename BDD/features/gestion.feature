# language: es
# encoding: utf-8

# En una lista vacia hay cero elementos almacenados 
# En una lista vacia, agrego un elemento y hay 1 elemento almacenado
# En lista vacia agrego dos elementos y hay 2 elementos almacenados
# En lista con elementos si trato de insertar una clave duplicada da error y la cantidad de elementos no cambia
#  Duplicar la primera, la ultima y alguna del medio. 
# Tratar de insertar elementos con claves que no sean cadenas y verificar que las rechaza
# Probar tambien con claves vacias. 
# Cargar una clave con un valor conocido, consultar el valor asociado a la clave y ver en que coinciden.
# Probar con mas de tres claves y buscando la primera, la ultima y alguna intermedia.
# Buscar una clave que no existe y comprobar el error.
# Armar una lista de mas de tres parejas, actualizar los valores de la primera,  la ultima y una al medio, 
# consultar el valor despues de la actualización y ver que es correcto. 
# En una lista con parejas, borro una clave y al buscarla no existe.
# En una lista con parejas borro una clave que no existe y tengo un error.
# En lista vacía, borro una clave y tengo un error
# cesar cruz
Característica: Gestionar las parejas almacenadas en la lista

Escenario: Verificar el estado de una lista vacia
    Dado una lista vacía
    Entonces la lista tiene 0 elemento almacenado
    Y si busco la clave "clave" no obtengo ningun valor

Escenario: Agregar un elemento a una lista vacia
    Dado una lista vacía
    Cuando agrego un elemento con clave "clave" y valor "valor"
    Entonces la lista tiene 1 elemento almacenado
    Y si busco la clave "clave" obtengo el valor "valor"

Escenario: Buscar un elemento en una lista con datos
    Dado una lista con los siguientes elementos
    | clave     | 1      |
    | claveUno  | valor1 |
    | claveDos  | valor2 |
    | claveTres |   3    |
    Entonces la lista tiene 3 elementos almacenados
    Y si busco la clave "claveUno" obtengo el valor "valor1"
    Y si busco la clave "claveDos" obtengo el valor "valor2"
    Y si busco la clave "claveTres" obtengo el valor "3"

Escenario: Buscar un elemento inexistente en una lista con datos
    Dado una lista con los siguientes elementos
    | clave     | 1      |
    | claveUno  | valor1 |
    | claveDos  | valor2 |
    | claveTres |   3    |
    Entonces la lista tiene 3 elementos almacenados
    Y si busco la clave "claveUno" obtengo el valor "valor1"
    Y si busco la clave "Noexiste" no obtengo ningun valor

Escenario: Eliminar un elemento existente en una lista con datos
    Dado una lista con los siguientes elementos
    | clave     | 1      |
    | claveUno  | valor1 |
    | claveDos  | valor2 |
    | claveTres |   3    |
    Entonces la lista tiene 3 elementos almacenados
    Cuando elimino un elemento con clave "claveDos"
    Entonces la lista tiene 2 elementos almacenados

Escenario: Eliminar un elemento que NO existe en una lista con datos
    Dado una lista con los siguientes elementos
    | clave     | 1      |
    | claveUno  | valor1 |
    | claveDos  | valor2 |
    | claveTres |   3    |
    Entonces la lista tiene 3 elementos almacenados
    Cuando elimino un elemento con clave "NoEsta"
    Entonces la lista tiene 3 elementos almacenados

Escenario: Actualizo el valor de un elemento de la lista de datos
    Dado una lista con los siguientes elementos
    | clave     | 1       |
    | claveUno  | valor1  |
    | claveDos  | valor2  |
    | claveTres |   3     |
    Entonces la lista tiene 3 elementos almacenados
    Cuando agrego un elemento con clave "claveDos" y valor "Actualizo"
    Entonces la lista tiene 3 elementos almacenados
    Y si busco la clave "claveDos" obtengo el valor "Actualizo"

Escenario: Agregar un elemento con clave no valida a una lista vacia
    Dado una lista vacía
    Cuando intento agregar un elemento con clave 14 y valor "valor"
    Entonces la lista tiene 0 elemento almacenado

Escenario: Agregar un elemento con clave no valida a una lista con datos
    Dado una lista con los siguientes elementos
    | clave     | 1      |
    | claveUno  | valor1 |
    | claveDos  | valor2 |
    | claveTres |   3    |
    Entonces la lista tiene 3 elementos almacenados
    Cuando intento agregar un elemento con clave 14 y valor "valor"
    Entonces la lista tiene 3 elemento almacenados

Escenario: Obtengo lista de claves ordenada alfateticamente
    Dado una lista con los siguientes elementos
    | clave     | 1      |
    | claveUno  | valor1 |
    | claveDos  | valor2 |
    | claveTres |   3    |
    Entonces obtengo las claves ordenadas alfabeticamente "claveDos","claveTres","claveUno"