export class Token {
    constructor(simbolo, tipo, fila, columna) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
    }
    

    getSimbolo() {
        return this.simbolo;
    }
    
    getTipo() {
        return this.tipo;
    }

    getFila() {
        return this.fila;
    }

    getColumna(){
        return this.columna;
    }
}