document.getElementById("btnSearch").addEventListener("click",()=>{
    let texto = document.getElementById("textarea2").value;
    let palabra = document.getElementById("textField").value;

    buscar(texto, palabra);
});

function buscar(entrada, palabraAbuscar){
    let partes = entrada.split(/[\n ]/).filter(palabra => palabra !== "");
    let contadorPalabra = 0;

    for(let parte of partes){
        if(parte === palabraAbuscar){
            contadorPalabra++;
        } else if (parte !== palabraAbuscar || parte === " "){
            continue;
        }
    }

    if(contadorPalabra === 0){
        alert("NO SE HA ENCONTRADO EL SIMBOLO O LEXEMA")
    } else {
        resaltarPalabraEnTextarea(palabraAbuscar);
        alert("SE HA ENCONTRADO (" + palabraAbuscar + ") UN TOTAL DE " + contadorPalabra);
    }

    resaltarPalabraEnTextarea(palabraAbuscar);
}

function resaltarPalabraEnTextarea(palabra) {
    let textarea = document.getElementById("textarea2");
    let texto = textarea.value;
    let indice = texto.indexOf(palabra);

    if (indice !== -1) {
        textarea.focus(); // ENFOCA EL textarea
        textarea.setSelectionRange(indice, indice + palabra.length); // SELECCIONA LA PALABRA s
    }
}