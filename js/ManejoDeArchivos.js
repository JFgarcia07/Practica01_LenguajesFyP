function copyText() {
    document.getElementById("textarea2").value = document.getElementById("textarea").value;
}
/*
ESTA PARTE DEL CODIGO LE AGREGA EL BOTON "btnSubmit" UN ACTION LISTENER.
AL DARLE CLIC AL BOTON ESTO HACE QUE SE DESPLIGUE UN EXPLORADOR DE ARCHIVOS
*/
document.getElementById("btnSubmit").addEventListener("click", ()=>{
    document.getElementById("fileInput").click();
});

/*
AGREGA UN ACTION LISTENER AL INPUT, ESTE DETECTA EN CUANDO EL USUARIO SELECCIONA
UN ARCHIVO Y LO LEERA
*/
document.getElementById("fileInput").addEventListener("change", function(event){
    const archivo = event.target.files[0]; // OBTIENE EL PRIMERO ARCHIVO SELECCIONADO
    if(!archivo) return; // SI NO ES SELECCIONADO NINGUN ARCHIVO SE DETIENE LE EJECUCION

    //EN LA ETIQUETA <p> SE MOSTRARA EL NOMBRE DEL ARCHIVO QUE SELECCIONO EL USUARIO
    nombreArchivo.textContent = `Archivo cargado: ${archivo.name}`;

    const entrada = new FileReader(); // SE CREA UN OBJETO FileReader
    entrada.onload = function(e){ 
        //e.targer.result CONTIENE EL TEXTO QUE CONTIENE EL ARCHIVO Y SE INSERTA EN EL textarea
        //ESTO SOLO PASA CUANDO LA FUNCION onload INICIE ESTO OCURRE CUANDO SE TERMINA DE LEER EL ARCHIVO
        document.querySelector("textarea").value = e.target.result; 
        copyText();
    };
    entrada.readAsText(archivo); //ESTO ES LO QUE LEE EL TEXTO QUE ESTA EN EL ARCHIVO
});

document.getElementById("btnChangeTxt").addEventListener("click", ()=>{
    let texto = document.getElementById("textarea").value;

    let blob = new Blob([texto], { type: 'text/plain' });
    let enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);
    enlace.download = "Texto Modificado - Analizador.txt";
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
});


