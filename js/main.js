/** Esta librería solo usa var, no let y const */
//// Tablero
var tablero = {
    width: 1280,
    height: 1962,
    intentos: 9,
    cantidadColores: 7,
    cantidadCombinacionColores: 5,
    background: "#f5f5dc",
    colores: [
        "rgb(0,0,255)", // 0 Azul
        "rgb(255,0,0)", // 1 Rojo
        "rgb(128,0,128)", // 2 Morado
        "rgb(255,165,0)", // 3 Naranja
        "rgb(0,255,0)", // 4 Verde
        "rgb(255,255,0)", // 5 Amarillo
        "rgb(0,255,255)", // 6 Cyan
    ],
    nombresColores: [
        "Azul", // 0
        "Rojo", // 1
        "Morado", // 2
        "Naranja", // 3
        "Verde", // 4
        "Amarillo", // 5
        "Cyan", // 6
    ],
    cantidadBotones: 3,
    botones: {
        0: "Nova partida",
        1: "Esborrar",
        2: "Comprova-ho",
    },
};

var canvas = document.getElementById("mastermind");
canvas.width = tablero.width;
canvas.height = tablero.height;
canvas.style.width = tablero.width + "px";
canvas.style.height = tablero.height + "px";

///// Datos de la partida actual
var partida = {
    intentoActual: 1,
    coloresSelecionado: null,
    numSeleccionados: 0,
    seleccionados: [null, null, null, null, null],
};

//// Carga de las funciones basicas del juego
// Combinación de colores aleatoria
var combinacionCorrecta = new Combinacion(
    tablero.intentos,
    tablero.nombresColores,
    tablero.cantidadColores,
    tablero.cantidadCombinacionColores
);
console.log("Combinacion correcta ->", combinacionCorrecta.combinacionGenerada);

////Cosas que repito el uso
// Mediadas y cosas estándar que se repitan varias veces
var estandar = {
    cornerSize: new Size(24, 24),
    background: "white",
    strokeColor: "black",
    textX: 65,
    textY: 100,
    filaIntentos: 180,
    columnaCuadradosInternos: 159.5,
    columnaCuadradosInternosColores: 160,
    columnaCuadradosInternosColoresPrimero: 157.5,
    columnaCirculitos: 80,
    columnaBotones: 424.25,
    coloresSelecionados: {
        blanco: "rgb(255,255,255)",
        gris: "rgb(211,211,211)",
        negro: "rgb(0,0,0)",
    },
};

//// Columna 1
// Cuadrado
var cuadrado = {
    size: new Rectangle(new Point(0, 0), new Point(160, 160)),
};

//// Columna 2
// Rectángulo, se usa también para la fila  de botones y colores
var rectangulo = {
    size: new Rectangle(new Point(200, 0), new Point(1000, 160)),
};
// Cuadrado interior, se usa para los cuadrados de colores
var cuadradoInterior = {
    size: new Rectangle(new Point(208.5, 7.5), new Point(353.5, 152.5)),
    x: 208.5,
    y: 7.5,
};
// Circulo
var circuloInterior = {
    x: 281,
    xReset: 281,
    y: 80,
    yReset: 80,
    radio: 40,
};

//// Columna 3
// Rectángulo respuestas
var rectanguloRespuestas = {
    size: new Rectangle(new Point(1040, 0), new Point(1280, 160)),
};
var circulitoRespuesta = {
    x: 1081,
    xSegundaFila: 1121,
    xReset: 1081,
    xResetSegundaFila: 1121,
    y: 40,
    ySegundaFila: 120,
    yReset: 40,
    yResetSegundaFila: 120,
    radio: 20,
};

//// Fila Botones
var rectanguloBotones = {
    x: 7.25,
    y: 1807.5,
    width: 417,
    height: 145,
};

//// Array principal donde se guarda la estructura del tablero
var paths = {
    0: {}, // NUmero intentos
    1: {
        // Combination colores
        0: {}, // Rectángulo
        1: {}, // Cuadrados internos
        2: {}, // Círculos
    },
    2: {}, // Resultado colores circulitos
    3: {
        // Colores disponibles
        0: {}, // Rectángulo colores
        1: {}, // Cuadrados internos colores
        2: {}, // Círculos colores
    },
    4: {
        // Botones
        0: {}, // Rectángulo botones
        1: {}, // botones
    },
};

//// Bucle de impresión de 0, 1, 2 (numero intentos, combinación, y resultado)de la array principal
var grupoRectanguloIntentos = new Group();
var grupoRectanguloRespuestas = new Group();
var grupoNumCuadradoIntentos = new Group();
for (var intento = tablero.intentos; intento > 0; intento--) {
    // Columna 1
    paths[0][intento] = new Path.Rectangle(cuadrado.size, estandar.cornerSize);
    Object.assign(paths[0][intento], {
        strokeColor: estandar.strokeColor,
        fillColor: estandar.background,
    });
    if (partida.intentoActual === intento) {
        paths[0][intento].fillColor = "red";
    }
    grupoNumCuadradoIntentos.addChild(paths[0][intento]);

    // Columna 2
    var grupoRectanguloIntento = new Group();
    paths[1][0][intento] = new Path.Rectangle(
        rectangulo.size,
        estandar.cornerSize
    );
    Object.assign(paths[1][0][intento], {
        strokeColor: estandar.strokeColor,
        fillColor: estandar.background,
        name: "rectanguloIntento" + intento,
    });
    grupoRectanguloIntento.addChild(paths[1][0][intento]);

    // Columna 3
    var grupoRectanguloRespuesta = new Group();
    paths[2][intento] = new Path.Rectangle(
        rectanguloRespuestas.size,
        estandar.cornerSize
    );
    Object.assign(paths[2][intento], {
        strokeColor: estandar.strokeColor,
        fillColor: estandar.background,
        name: "rectanguloRespuesta" + intento,
    });
    grupoRectanguloRespuesta.addChild(paths[2][intento]);

    // Texto Columna 1
    var text = new PointText(new Point(estandar.textX, estandar.textY));
    Object.assign(text, {
        fillColor: "black",
        fontSize: 60,
        content: intento,
    });

    // Cuadrado interior, círculos columna 2 y 3
    var grupoColoresIntento = new Group();
    var grupoColoresRespuesta = new Group();
    cuadradoInterior.size.x = cuadradoInterior.x;
    circuloInterior.x = circuloInterior.xReset;
    for (
        var numColor = 0;
        numColor < tablero.cantidadCombinacionColores;
        numColor++
    ) {
        var grupoColorIntento = new Group();

        // Columna 2 Cuadrado interior
        paths[1][1][numColor] = new Path.Rectangle(
            cuadradoInterior.size,
            estandar.cornerSize
        );
        Object.assign(paths[1][1][numColor], {
            strokeColor: estandar.strokeColor,
            fillColor: estandar.background,
        });
        cuadradoInterior.size.x += estandar.columnaCuadradosInternos;
        grupoColorIntento.addChild(paths[1][1][numColor]);

        // Columna 2 Circulo
        paths[1][2][numColor] = new Path.Circle({
            center: [circuloInterior.x, circuloInterior.y],
            radius: circuloInterior.radio,
            strokeColor: estandar.strokeColor,
            fillColor: estandar.background,
            name: "circuloIntento" + numColor,
        });
        circuloInterior.x += estandar.columnaCuadradosInternos;
        grupoColorIntento.addChild(paths[1][2][numColor]);

        // Columna 3 Círculos pequeños respuesta
        if (numColor === 3) {
            circulitoRespuesta.x = circulitoRespuesta.xSegundaFila;
            circulitoRespuesta.y = circulitoRespuesta.ySegundaFila;
        }
        paths[2][numColor] = new Path.Circle({
            center: [circulitoRespuesta.x, circulitoRespuesta.y],
            radius: circulitoRespuesta.radio,
            strokeColor: estandar.strokeColor,
            fillColor: estandar.background,
        });
        circulitoRespuesta.x += estandar.columnaCirculitos;
        grupoColoresRespuesta.addChild(paths[2][numColor]);

        grupoColoresIntento.addChild(grupoColorIntento);
    }

    estandar.textY += estandar.filaIntentos;
    cuadrado.size.y += estandar.filaIntentos;
    rectangulo.size.y += estandar.filaIntentos;
    rectanguloRespuestas.size.y += estandar.filaIntentos;
    cuadradoInterior.size.y += estandar.filaIntentos;
    circuloInterior.y += estandar.filaIntentos;

    circulitoRespuesta.x = circulitoRespuesta.xReset;
    circulitoRespuesta.xSegundaFila = circulitoRespuesta.xResetSegundaFila;
    circulitoRespuesta.yReset += estandar.filaIntentos;
    circulitoRespuesta.y = circulitoRespuesta.yReset;
    circulitoRespuesta.yResetSegundaFila += estandar.filaIntentos;
    circulitoRespuesta.ySegundaFila = circulitoRespuesta.yResetSegundaFila;

    grupoRectanguloIntento.addChild(grupoColoresIntento);
    grupoRectanguloIntentos.addChild(grupoRectanguloIntento);

    grupoRectanguloRespuesta.addChild(grupoColoresRespuesta);
    grupoRectanguloRespuestas.addChild(grupoRectanguloRespuesta);
}

//// Bucle de impresión de 3 (Colores disponibles) de la array principal y impresión del rectángulo
// Grupo donde está el grupo de los botones de selecciona de colores con su padre
var grupoRectanguloColores = new Group();
Object.assign(rectangulo.size, {
    x: 81,
    y: 1620,
    width: 1120,
    height: 160,
});
paths[3][0] = new Path.Rectangle(rectangulo.size, estandar.cornerSize);
Object.assign(paths[3][0], {
    strokeColor: estandar.strokeColor,
    fillColor: estandar.background,
    name: "rectanguloColores",
});
grupoRectanguloColores.addChild(paths[3][0]);
// Grupo colores donde están los botones de selección de colores donde están los grupos de los cuadrados y los círculos
var grupoColores = new Group();
Object.assign(cuadradoInterior.size, {
    x: 90,
    y: 1627.5,
    width: 145,
    height: 145,
});
Object.assign(circuloInterior, {
    x: 163.5,
    y: 1700,
    radio: 40,
});
for (
    var numColorDisponible = 0;
    numColorDisponible < tablero.cantidadColores;
    numColorDisponible++
) {
    var grupoColor = new Group();
    paths[3][1][numColorDisponible] = new Path.Rectangle(
        cuadradoInterior.size,
        estandar.cornerSize
    );
    Object.assign(paths[3][1][numColorDisponible], {
        strokeColor: estandar.strokeColor,
        fillColor: estandar.background,
    });
    // Agregar cajita de color al grupo
    grupoColor.addChild(paths[3][1][numColorDisponible]);
    paths[3][2][numColorDisponible] = new Path.Circle({
        center: [circuloInterior.x, circuloInterior.y],
        radius: circuloInterior.radio,
        strokeColor: estandar.strokeColor,
        fillColor: tablero.colores[numColorDisponible],
        name: tablero.nombresColores[numColorDisponible],
    });

    // Agregar color al grupo
    grupoColor.addChild(paths[3][2][numColorDisponible]);

    if (numColorDisponible === 0) {
        cuadradoInterior.size.x += estandar.columnaCuadradosInternosColoresPrimero;
        circuloInterior.x += estandar.columnaCuadradosInternosColoresPrimero;
    } else {
        cuadradoInterior.size.x += estandar.columnaCuadradosInternosColores;
        circuloInterior.x += estandar.columnaCuadradosInternosColores;
    }
    // Agregar grupo de colores al grupo principal
    grupoColores.addChild(grupoColor);
}
grupoRectanguloColores.addChild(grupoColores);

//// Bucle impresión de la 4 (botones) del array principal y el rectángulo de los botones
var grupoRectanguloBotones = new Group();
Object.assign(rectangulo.size, {
    x: 0,
    y: 1800,
    width: 1280,
    height: 160,
});
paths[4][0] = new Path.Rectangle(rectangulo.size, estandar.cornerSize);
Object.assign(paths[4][0], {
    strokeColor: estandar.strokeColor,
    fillColor: estandar.background,
    name: "rectanguloBotones",
});
grupoRectanguloBotones.addChild(paths[4][0]);
var grupoBotones = new Group();
for (var numBotones = 0; numBotones < tablero.cantidadBotones; numBotones++) {
    var grupoBoton = new Group();
    Object.assign(rectangulo.size, {
        x: rectanguloBotones.x,
        y: rectanguloBotones.y,
        width: rectanguloBotones.width,
        height: rectanguloBotones.height,
    });
    paths[4][1][numBotones] = new Path.Rectangle(
        rectangulo.size,
        estandar.cornerSize
    );
    Object.assign(paths[4][1][numBotones], {
        strokeColor: estandar.strokeColor,
        fillColor: estandar.background,
    });
    // Agregar cajita de color al grupo
    grupoBoton.addChild(paths[4][1][numBotones]);
    // Texto botones
    estandar.textX = rectanguloBotones.x + 70;
    estandar.textY = rectanguloBotones.y + 85;
    var textBotones = new PointText(new Point(estandar.textX, estandar.textY));
    Object.assign(textBotones, {
        fillColor: "black",
        fontSize: 45,
        content: tablero.botones[numBotones],
        name: tablero.botones[numBotones],
    });
    // Agregar texto al grupo
    grupoBoton.addChild(textBotones);
    rectanguloBotones.x += estandar.columnaBotones;
    // Agregar grupo de colores al grupo principal
    grupoBotones.addChild(grupoBoton);
}
grupoRectanguloBotones.addChild(grupoBotones);

////
// Hacer lógica juego
////

var hitOptions = {
    stroke: true,
    fill: true,
    tolerance: 5,
};

var path;
function ChangeColorSelection(event, output, colorCalled, clearCheck) {
    var hit = project.hitTest(event.point, hitOptions).item._parent;
    var hitParent = hit._parent._children;
    var hitChild = hit._children;

    if (
        hitChild[0].fillColor._canvasStyle ===
        estandar.coloresSelecionados["blanco"]
    ) {
        if (clearCheck) {
            hitParent.forEach(function (element) {
                element._children[0].fillColor._canvasStyle =
                    estandar.coloresSelecionados["blanco"];
            });
        }

        hitChild[0].fillColor = estandar.coloresSelecionados["gris"];

        if (colorCalled) {
            partida.coloresSelecionado = hitChild[1].name;
        }
    } else if (
        hitChild[0].fillColor._canvasStyle === estandar.coloresSelecionados["gris"]
    ) {
        hitChild[0].fillColor = estandar.coloresSelecionados["blanco"];

        if (colorCalled) {
            partida.coloresSelecionado = null;
        }
    } else {
        console.log("No se encontró color");
    }

    if (output) {
        console.log("Objeto que estamos tocando ->", hitChild[1].name);
    }
    return hitChild;
}
function onMouseDown(event) {
    function checkSelectedColor() {
        var childColor = ChangeColorSelection(event, true, true, true);
    }
    function checkSelectedButton() {
        var childButton = ChangeColorSelection(event, true, false, true);
        var calcIntento = tablero.intentos - partida.intentoActual;
        var fillRectanguloIntento = grupoRectanguloIntentos.children[calcIntento];
        var fillRectanguloRespuesta =
            grupoRectanguloRespuestas.children[calcIntento];
        var fillCuadradoNumIntento = grupoNumCuadradoIntentos.children[calcIntento];

        switch (childButton[1].name) {
            case "Nova partida":
                location.reload();
                break;
            case "Esborrar":
                var borrarIntento = fillRectanguloIntento.children[1].children;
                for (
                    var clearIntento = 0;
                    clearIntento < borrarIntento.length;
                    clearIntento++
                ) {
                    borrarIntento[clearIntento].fillColor =
                        estandar.coloresSelecionados["blanco"];
                }
                partida.numSeleccionados = 0;
                break;
            case "Comprova-ho":
                var resultado = combinacionCorrecta.comprovarCombinacion(
                    partida.seleccionados
                );
                console.log("Resultado ->", resultado);

                if (partida.numSeleccionados < tablero.cantidadCombinacionColores) {
                    console.log("No se han seleccionado todos los colores");
                    return;
                }

                if (!resultado[0] && partida.intentoActual <= tablero.intentos) {
                    fillCuadradoNumIntento.fillColor =
                        estandar.coloresSelecionados["gris"];
                    fillRectanguloIntento.children[0].fillColor =
                        estandar.coloresSelecionados["gris"];
                    for (
                        var fillResposta = 0;
                        fillResposta < tablero.cantidadCombinacionColores;
                        fillResposta++
                    ) {
                        fillRectanguloRespuesta.children[1].children[
                            fillResposta
                        ].fillColor =
                            estandar.coloresSelecionados[resultado[1][fillResposta]];
                    }
                    partida.intentoActual++;
                    console.log("Intento fallido", partida.intentoActual);
                    if (partida.intentoActual !== tablero.intentos + 1) {
                        grupoNumCuadradoIntentos.children[
                            tablero.intentos - partida.intentoActual
                        ].fillColor = "red";
                    }

                    partida.numSeleccionados = 0;
                    partida.seleccionados = [null, null, null, null, null];
                }

                if (resultado[0]) {
                    project.clear();
                    var textoFinalWin = new PointText(new Point(200, 200));
                    // textoFinal.justification = 'center';
                    textoFinalWin.fillColor = "black";
                    textoFinalWin.fontSize = 100;
                    textoFinalWin.content = "Felicidades has ganado!";
                }

                if (partida.intentoActual === tablero.intentos + 1) {
                    project.clear();
                    var textoFinalLoose = new PointText(new Point(200, 200));
                    // textoFinal.justification = 'center';
                    textoFinalLoose.fillColor = "black";
                    textoFinalLoose.fontSize = 100;
                    textoFinalLoose.content = "Has perdido!";
                }
                break;
        }
    }
    function fillSelectedColor() {
        if (partida.coloresSelecionado === null) {
            // alert('Seleccione un color antes de jugar');
            console.log("Seleccione un color antes de jugar");
            return;
        }
        var childSelected = ChangeColorSelection(event, false, false, false);
        var tempColor =
            tablero.colores[
            tablero.nombresColores.indexOf(partida.coloresSelecionado)
            ];
        var clickPos = parseInt(
            childSelected[1].name[childSelected[1].name.length - 1]
        );

        if (childSelected[1].fillColor._canvasStyle === tempColor) {
            childSelected[1].fillColor = estandar.coloresSelecionados["blanco"];
            partida.numSeleccionados--;
            partida.seleccionados[clickPos] = null;
        } else {
            childSelected[1].fillColor = tempColor;
            childSelected[0].fillColor = estandar.coloresSelecionados["gris"];
            partida.numSeleccionados++;
            partida.seleccionados[clickPos] = partida.coloresSelecionado;
        }
        console.log("Numero de seleccionados ->", partida.numSeleccionados);
        console.log("Seleccionados ->", partida.seleccionados);
    }
    try {
        var fondo = project.hitTest(event.point, hitOptions);
        var hitTest = project.hitTest(event.point, hitOptions).item._parent._parent
            ._parent._children[0].name;
    } catch (e) {
        if (e instanceof TypeError) {
            console.log("No hay nada ->", null);
            return;
        }
    }

    if (hitTest === null) {
        console.log("No hay nada ->", null);
    } else {
        console.log("Seccion donde estas pulsando ->", hitTest);
    }

    switch (hitTest) {
        case "rectanguloColores":
            checkSelectedColor();
            break;
        case "rectanguloBotones":
            checkSelectedButton();
            break;
        case "rectanguloIntento" + partida.intentoActual:
            fillSelectedColor();
            break;
    }
}
function onMouseUp(event) {
    try {
        var fondo = project.hitTest(event.point, hitOptions);
        var hitTest = project.hitTest(event.point, hitOptions).item._parent._parent
            ._parent._children[0].name;
    } catch (e) {
        if (e instanceof TypeError) {
            return;
        }
    }

    switch (hitTest) {
        case "rectanguloBotones":
            ChangeColorSelection(event, false, false, true);
            break;
    }
}
