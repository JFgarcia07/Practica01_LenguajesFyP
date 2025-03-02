/** 
 * Añade un listener al boton "btnSearch", se obtiene el texto en el textarea
 * y la palabra a buscar que esta en el input
*/
document.getElementById("btnSearch").addEventListener("click",()=>{
    let texto = document.getElementById("textarea2").value;
    let palabra = document.getElementById("textField").value;

    buscar(texto, palabra);
});


function buscar(entrada, palabraAbuscar){
    //Se para la entrada cada salto de pagina, y elimina los espacios en blanco 
    let partes = entrada.split(/[\n ]/).filter(palabra => palabra !== "");
    let contadorPalabra = 0;

    //Recorremos la entrada, y si la parte de la entrada coincide con la palabraAbuscar 
    //entonces le sumamos 1 al contadorPalabra
    for(let parte of partes){
        if(parte === palabraAbuscar){
            contadorPalabra++;
        } else if (parte !== palabraAbuscar || parte === " "){
            continue;
        }
    }

    //Lo que nos indica si la palabra fue encontrada es el contadorPalabra, y colocamos un
    //mensaje segun la cantidad de contadorPalabra
    if(contadorPalabra === 0){
        alert("NO SE HA ENCONTRADO EL SIMBOLO O LEXEMA")
        document.getElementById("resultado").textContent = "NO SE HA ENCONTRADO EL SIMBOLO O LEXEMA";
    } else {
        resaltarPalabraEnTextarea(palabraAbuscar);
        document.getElementById("resultado").textContent = "La palabra/símbolo: (" + palabraAbuscar + ") se ha encontrado un total de " + contadorPalabra + " veces";
    }

    resaltarPalabraEnTextarea(palabraAbuscar);
}

function resaltarPalabraEnTextarea(palabra) {
    //Se obtiene el texto que esta en el textarea2
    let textarea = document.getElementById("textarea2");
    let texto = textarea.value;
    //Busca la primera aparicion de palabraAbusca y devolvera el indice
    let indice = texto.indexOf(palabra); 

    //Si si encuentra el indice entonces reslatara la palabra
    if (indice !== -1) {
        textarea.focus(); // ENFOCA EL textarea
        textarea.setSelectionRange(indice, indice + palabra.length); // SELECCIONA LA PALABRA s
    }
}