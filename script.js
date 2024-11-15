//total de pregunta del juego
const totalPreguntas = 10

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