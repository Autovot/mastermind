class Combinacion {
    /**
     *
     * @param intentos {number}
     * @param colores {Array<String>}
     * @param numeroColores {number}
     * @param combinaciones {number}
     */
    constructor(intentos, colores, numeroColores, combinaciones) {
        this._intentos = intentos;
        this._colores = colores;
        this._numeroColores = numeroColores;
        this._combinaciones = combinaciones;
        this._combinacionGenerada = this.regenerarCombinacion();
    }

    get intentos() {
        return this._intentos;
    }
    set intentos(value) {
        this._intentos = value;
    }

    get colores() {
        return this._colores;
    }
    set colores(value) {
        this._colores = value;
    }

    get numeroColores() {
        return this._numeroColores;
    }
    set numeroColores(value) {
        this._numeroColores = value;
    }

    get combinaciones() {
        return this._combinaciones;
    }
    set combinaciones(value) {
        this._combinaciones = value;
    }

    get combinacionGenerada() {
        return this._combinacionGenerada;
    }
    set combinacionGenerada(value) {
        this._combinacionGenerada = value;
    }

    regenerarCombinacion() {

        let combinacionGenereada = [];
        for (let i = 0; i < this.combinaciones; i++) {
            combinacionGenereada.push(this.colores[Math.floor(Math.random() * this.numeroColores)]);
        }
        return combinacionGenereada;
    }

    comprovarCombinacion(auxComprovar) {
        let auxCorrecte = [...this.combinacionGenerada];
        let auxCheck = [[], []];
        let auxReturn = [false, ['blanco', 'blanco', 'blanco', 'blanco', 'blanco']];

        let bolasGrises = 0;
        let bolasNegras = 0;

        if (auxCorrecte.toString() === auxComprovar.toString()) {
            auxReturn[0] = true;
        }

        // Comprobar dos arrays si estan en la misma posicion contar +1 a las bolasNegras y si esta pero en otra
        // posicion contar +1 a las bolasGrises



        for (let i = 0; i < auxCorrecte.length; i++) {
            if (auxCorrecte[i] === auxComprovar[i]) {
                bolasNegras++;
                auxComprovar.slice(i, 1);
                auxCorrecte.slice(i, 1);
            }
            else {
                auxCheck[0].push(auxCorrecte[i]);
                auxCheck[1].push(auxComprovar[i]);
            }
        }

        for (let i = 0; i < auxCheck[0].length; i++) {
            for (let j = 0; j < auxCheck[1].length; j++) {
                if (auxCheck[0][i] === auxCheck[1][j]) {
                    bolasGrises++;
                    break;
                }
            }
        }

        for (let i = 0; i < auxCorrecte.length; i++) {
            if (bolasNegras > 0) {
                auxReturn[1][i] = 'negro';
                bolasNegras--;
            }
            else if (bolasGrises > 0) {
                auxReturn[1][i] = 'gris';
                bolasGrises--;
            }
        }

        return auxReturn;
    }
}
let coloresDis = [
    'Azul',
    'Rojo',
    'Morado',
    'Naranja',
    'Verde',
    'Amarillo',
    'Cyan',
];
//
//
// let numIntentos = 9;
// let cantidadColores = 7;
// let numCombinaciones = 5;
//
//
// let test = new Combinacion(numIntentos, coloresDis, cantidadColores, numCombinaciones)
// console.log(test.combinacionGenerada);
// console.log(test.comprovarCombinacion(test.combinacionGenerada));
