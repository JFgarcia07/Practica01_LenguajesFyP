import { Token } from "./Token.js";

const token = new Token();

var letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var signosPuntuacion = [".", ",", ";", ":"];
var operadoresAritmeticos = ["^", "*", "/", "+", "-"];
var operadoresRacionales = ["<", ">", "<=", ">="];
var operadoresLogicos = ["AND", "&&", "OR", "||"];
var signosDeAgrupacion = ["(", ")", "[", "]", "{", "}"];
var asignacion = ["="];

/*
SE AGRERA UN ACTION LISTENER AL BOTON btnAnalizar Y ESTE OBTENDRA EL 
TEXTO QUE ESTE EN textarea Y LO COLOCA EN LA VARIABLE TEXTO
*/
document.getElementById("btnAnalizar").addEventListener("click", () => {
    let texto = document.getElementById("textarea").value;
    let { lexemas, errores } = tokenYlexemas(texto);

    llenarTablaLexemas(lexemas, errores);
    llenarTablaErrores(errores, texto);
    contadorDeLexemas(lexemas, errores);

});

function tokenYlexemas(entrada) {
    // Dividir el texto por saltos de línea primero
    let lineas = entrada.split("\n");
    let lexemas = [];
    let errores = [];
    let fila = 1, columna = 1;

    // Procesar cada línea
    for (let linea of lineas) {
        // Dividir cada línea por espacios
        let partes = linea.split(" ").filter(palabra => palabra !== "");

        for (let parte of partes) {
            // Procesar cada palabra (parte)
            let num = parseInt(parte, 10);
            if (letras.some(letra => parte.toUpperCase().startsWith(letra)) && (parte !== "AND" && parte !== "OR" && parte !== "_")) {
                //Si entra a la condicion entonces se creara un nuevo Token
                partes = parte.split("");
                for(let i=0; i < partes.length; i++){
                    if(partes[i] === "_"){
                        errores.push({ cadena: parte, fila, columna });
                        break;
                    } 
                }
                lexemas.push(new Token(parte, "Identificador", fila, columna));
            } else if (num < 10 || num > 0) {
                lexemas.push(new Token(parte, "Número", fila, columna));
            } else if (signosPuntuacion.includes(parte)) {
                lexemas.push(new Token(parte, "Signo de Puntuación", fila, columna));
            } else if (operadoresAritmeticos.includes(parte)) {
                lexemas.push(new Token(parte, "Operador Aritmético", fila, columna));
            } else if (operadoresRacionales.includes(parte)) {
                lexemas.push(new Token(parte, "Operador Racional", fila, columna));
            } else if (operadoresLogicos.includes(parte)) {
                lexemas.push(new Token(parte, "Operador Lógico", fila, columna));
            } else if (signosDeAgrupacion.includes(parte)) {
                lexemas.push(new Token(parte, "Signo de Agrupación", fila, columna));
            } else if (asignacion.includes(parte)) {
                lexemas.push(new Token(parte, "Asignación", fila, columna));
            } else {
                errores.push({ cadena: parte, fila, columna });
            }
            // Actualizamos la columna en función del tamaño de la palabra
            columna = columna + parte.length + 1; // +1 por el espacio
        }
        // Al final de cada línea, aumentamos la fila y reiniciamos la columna
        fila++;
        columna = 1;
    }
    return { lexemas, errores };
}
/**
 * Esta funcion llenara la tabla pra mostrar los lexemas, así mismo
 * si encuentra un error no mostrara el reporte de Lexemas
 * @param {*} lexemas 
 * @param {*} errores 
 * @returns 
 */
function llenarTablaLexemas(lexemas, errores) {
    let tbody = document.getElementById("tabla-lexemas");
    tbody.innerHTML = ""; 

    if (lexemas.length === 0) {
        tbody.innerHTML = `<tr><th colspan="4">No se encontraron tokens</th></tr>`;
        return;
    } else if(errores.length > 0){
        tbody.innerHTML = `<tr><th colspan="4">Se han dectectado errores, Arregle los errores para ver la tabla de Tokens y Lexemas</th></tr>`;
        return;
    }


    lexemas.forEach(token => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${token.getTipo()}</td>
            <td>${token.getSimbolo()}</td>
            <td>${token.fila}</td>
            <td>${token.columna}</td>
        `;
        tbody.appendChild(fila);
    });
}

/**
 * Llenara la tabla de reporte de errores
 * @param {*} errores 
 * @returns 
 */
function llenarTablaErrores(errores) {
    let tbody = document.getElementById("tabla-errores");
    tbody.innerHTML = ""; 

    if (errores.length === 0) {
        tbody.innerHTML = `<tr><th colspan="3">NO SE ENCONTRARON ERRORES</th></tr>`;
        return;
    }

    errores.forEach(error => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${error.cadena}</td>
            <td>${error.columna}</td>
            <td>${error.fila}</td>
        `;
        tbody.appendChild(fila);
    });
}

/**
 * Este metodo contara la cantidad de lexemas que haya en el codigo
 * @param {*} arrayLexemas 
 * @param {*} errores 
 */
function contadorDeLexemas(arrayLexemas, errores) {
    let simbolos = [];
    let cantidadLexemas = [];

    for (let i = 0; i < arrayLexemas.length; i++) {
        let simbolo = arrayLexemas[i].getSimbolo(); // OBTENEMOS LOS SIMBOLOS DE LOS LEXEMAS 
        
        let indice = simbolos.indexOf(simbolo); // BUSCA SI YA EXISTE

        if (indice === -1) {
            //Si el simbolo no esta en el arreglo de simbolos, le suma uno al contador de lexemas
            simbolos.push(simbolo);
            cantidadLexemas.push(1);
        } else {
            //Si esta el simbolo, significa que esta repetido entonces le suma 1 a la cantidad que ya tenia
            cantidadLexemas[indice]++;
        }
    }

    llenarTablaRecuento(simbolos, cantidadLexemas, errores);
}

/**
 * Metodo que llena la tabla de Recuento de Tokens
 * @param {*} simbolos 
 * @param {*} cantidadLexemas 
 * @param {*} errores 
 * @returns 
 */
function llenarTablaRecuento(simbolos, cantidadLexemas, errores) {
    let tbody = document.getElementById("tabla-recuento");
    tbody.innerHTML = "";

    if (simbolos.length === 0) { // Usamos simbolos.length en lugar de arrayLexemas
        tbody.innerHTML = `<tr><th colspan="2">No se encontraron tokens</th></tr>`;
        return;
    }  else if(errores.length > 0){
        tbody.innerHTML = `<tr><th colspan="2">Se han dectectado errores, Arregle los errores para ver la tabla de recuentos Lexemas</th></tr>`;
        return;
    }

    for (let i = 0; i < simbolos.length; i++) {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${simbolos[i]}</td> 
            <td>${cantidadLexemas[i]}</td> 
        `;
        tbody.appendChild(fila);
    }
}

