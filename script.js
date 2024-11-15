//total de pregunta del juego
const totalPreguntas = 10

//variable que controla la pregunta actual, comienza en -1, porque la primera pregunta es la 0
var numPreguntaActual = -1

//voy a necesitar una estructura para saber que pregunta se ha respondido y cual no
//se mantendra en un arreglo, i : 0 indica que no se ha respondido, 1 que si
//coloco la cantidad de preguntas que hay, en este caso 10
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0]

//creamos la base de datos de preguntas
const bdJuego = [
    {
        id: 'A',
        pregunta: '¿Qué insecto produce miel?',
        respuesta: 'Abeja'
    },
    {
        id: 'B',
        pregunta: '¿Qué animal tiene una gran cola y vive en el agua?',
        respuesta: 'Ballena'
    },
    {
        id: 'C',
        pregunta: '¿Cómo se llama el color que es mezcla de rojo y blanco?',
        respuesta: 'Crema'
    },
    {
        id: 'D',
        pregunta: '¿Cómo se llama el continente donde se encuentra Australia?',
        respuesta: 'Oceania'
    },
    {
        id: 'E',
        pregunta: '¿Qué animal tiene una trompa larga y grandes orejas?',
        respuesta: 'Elefante'
    },
    {
        id: 'F',
        pregunta: '¿Qué instrumento musical tiene teclas y se toca con las manos?',
        respuesta: 'Flauta'
    },
    {
        id: 'G',
        pregunta: '¿Qué instrumento musical de cuerdas es pequeño y se toca con los dedos?',
        respuesta: 'Guitarra'
    },
    {
        id: 'H',
        pregunta: '¿Qué animal es conocido por sus saltos y orejas largas?',
        respuesta: 'Hiena'
    },
    {
        id: 'I',
        pregunta: ' ¿Cómo se llama el sistema que permite la transmisión de información en las redes de computadoras?',
        respuesta: 'Internet'
    },
    {
        id: 'J',
        pregunta: '¿Como se llama el animal que es muy grande y amarillo?',
        respuesta: 'Jirafa'
    },
]

//variables para controlar el tiempo
const timer = document.getElementById("tiempo")
//Tiempo del juego en segundos
const tiempoJuego = 60
//variable que indica el tiempo restante
let timeLeft = tiempoJuego
//variable que maneja el contador
var countdown

//creamos las letras de la A a la J de forma circular
const container = document.querySelector(".container")
for (let i = 1; i < totalPreguntas; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle")
    circle.textContent = String.fromCharCode(i + 96)
    circle.id = String.fromCharCode(i + 96)
    container.appendChild|(circle)

    const angle = ((i-1) / totalPreguntas) * Math.PI * 2 - (Math.PI / 2)
    const x = Math.round(95 + 120 * Math.cos(angle))
    const y = Math.round(95 + 120 * Math.sin(angle))
    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
}

var comenzar = document.getElementById("comenzar")
comenzar.addEventListener("click", function(event) {
    document.getElementById("pantalla-inicial").style.display = "none"
    document.getElementById("pantalla-juego").style.display = "block"

    //largamos el tiempo
    largarTiempo()
    cargarPregunta()
})

function largarTiempo() {
    countdown = setInterval(() => {
        //restar un segundo al tiempo restante
        timeLeft--
        //actualizamos el texto de cronometro con el tiempo restante
        timer.innerText = timeLeft
        //si el tiempo llega a 0, detener el cronometro
        if (timeLeft < 0) {
            clearInterval(countdown)
            // alert('Se acabo el tiempo')
            //mostrarPantallaFinal()
        }
    }, 1000)
}

//funcion que carga la pregunta
function cargarPregunta() {
    numPreguntaActual++
    //controlo si he llegado al final de las preguntas, para inciar de nuevo
    if (numPreguntaActual >= totalPreguntas) {
        numPreguntaActual = 0
    }
    //debo controlar que todavia hallan preguntas para contestar
    //es decir, si en el arreglo estadoPregutnas existe algun 0
    if (estadoPreguntas.indexOf(0) >= 0) {
        //aahora debo buscar cual de tosas es la que esta sin responder, es decir buscar el
        //primer 0 del arreglo
        while (estadoPreguntas[numPreguntaActual] == 1) {
            numPreguntaActual++
            if (numPreguntaActual >= totalPreguntas) {
                numPreguntaActual
            }
        }

        //ahora si busco la pregunto en la bd de las preguntas
        document.getElementById("letra-pregunta").textContent = bdJuego[numPreguntaActual].id
        document.getElementById("pregunta").textContent = bdJuego[numPreguntaActual].pregunta
        var letra = bdJuego[numPreguntaActual].id
        document.getElementById(letra).classList.add("pregunta-actual")
    } else {
        //significa que ya se han respondido todas las preguntas
        clearInterval(countdown)
        //mostrarPantallaFinal()
    }
}

//detectamos cada vez que haya un cambio en el input para ver cuando se presiona ENTER
//y controlar si lo que ingreso es correcto o no
var respuesta = document.getElementById("respuesta")
respuesta.addEventListener("keyup", function(event) {
    //detecto si presiono enter
    if (event.keyCode === 13) {
        if (respuesta.value="") {
            alert("Debe ingresar un valor")
        }
    }
})