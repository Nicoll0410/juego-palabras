//total de pregunta del juego
const totalPreguntas = 10

//Tiempo del juego en segundos
const tiempoJuego = 60

//creamos la base de datos de preguntas
const bdJuego = [
    {
        id: 'A',
        pregunta: '¿Qué insecto produce miel?',
        respuesta: 'abeja'
    },
    {
        id: 'B',
        pregunta: '¿Qué animal tiene una gran cola y vive en el agua?',
        respuesta: 'ballena'
    },
    {
        id: 'C',
        pregunta: '¿Cómo se llama el color que es mezcla de amarillo, azul y rojo?',
        respuesta: 'cafe'
    },
    {
        id: 'D',
        pregunta: ' ¿Cómo se llama el proceso de descomposición de los alimentos en el sistema digestivo??',
        respuesta: 'digestion'
    },
    {
        id: 'E',
        pregunta: '¿Qué animal tiene una trompa larga y grandes orejas?',
        respuesta: 'elefante'
    },
    {
        id: 'F',
        pregunta: '¿Qué instrumento musical tiene teclas y se toca con las manos?',
        respuesta: 'flauta'
    },
    {
        id: 'G',
        pregunta: '¿Qué instrumento musical de cuerdas es grande y se toca con los dedos?',
        respuesta: 'guitarra'
    },
    {
        id: 'H',
        pregunta: '¿Qué animal es conocido por ser nocturno y por tener un buen oido y vision?',
        respuesta: 'hiena'
    },
    {
        id: 'I',
        pregunta: ' ¿Cómo se llama el sistema que permite la transmisión de información en las redes de computadoras?',
        respuesta: 'internet'
    },
    {
        id: 'J',
        pregunta: '¿Como se llama el animal que es muy alto y amarillo?',
        respuesta: 'jirafa'
    },
]

//voy a necesitar una estructura para saber que pregunta se ha respondido y cual no
//se mantendra en un arreglo, i : 0 indica que no se ha respondido, 1 que si
//coloco la cantidad de preguntas que hay, en este caso 10
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0

//variable que controla la pregunta actual, comienza en -1, porque la primera pregunta es la 0
var numPreguntaActual = -1

//variables para controlar el tiempo
const timer = document.getElementById("tiempo")
//variable que indica el tiempo restante
let timeLeft = tiempoJuego
//variable que maneja el contador
var countdown

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    largarTiempo();
    cargarPregunta();
});

//creamos las letras de la A a la Z de forma circular
const container = document.querySelector(".container");
for (let i = 1; i <= totalPreguntas; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / totalPreguntas) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

//Función que carga la pregunta
function cargarPregunta(){
    numPreguntaActual++;
    //controlo si he llegado al final de las preguntas, para comenzar de nuevo
    if(numPreguntaActual>=totalPreguntas){
        numPreguntaActual=0;
    }

    if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
        while(estadoPreguntas[numPreguntaActual]==1){
            numPreguntaActual++;
                if(numPreguntaActual>=totalPreguntas){
                    numPreguntaActual=0;
                }
        }

        document.getElementById("letra-pregunta").textContent = bdJuego[numPreguntaActual].id
        document.getElementById("pregunta").textContent = bdJuego[numPreguntaActual].pregunta
        var letra =  bdJuego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("pregunta-actual");
    } else {
        clearInterval(countdown);
        mostrarPantallaFinal();
    }
}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
    //detecto si la tecla presionada es ENTER
    if (event.keyCode === 13) {
        if(respuesta.value==""){
            alert("Debe ingresar un valor!!");
            return;
        }
        //obtengo la respuesta ingresada
        var txtRespuesta = respuesta.value;
        controlarRespuesta(txtRespuesta.toLowerCase());
    }
})

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
    //controlo si la respuesta es correcta
    if(txtRespuesta == bdJuego[numPreguntaActual].respuesta){
        //alert("Respuesta correcta")
        cantidadAcertadas++;

        //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
        estadoPreguntas[numPreguntaActual] = 1;
        var letra =  bdJuego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
    } else {
        //alert("respuesta incorrecta")
        //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
        estadoPreguntas[numPreguntaActual] = 1;
        var letra =  bdJuego[numPreguntaActual].id;
        //quito l clase del estilo de pregunta actual
        document.getElementById(letra).classList.remove("pregunta-actual");
        //agrego la clase del estilo de pregunta mal respondida
        document.getElementById(letra).classList.add("mal-respondida");
    }
    respuesta.value="";
    cargarPregunta();
}

//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
    var letra =  bdJuego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    cargarPregunta();
})

// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
    countdown = setInterval(() => {
        // Restar un segundo al tiempo restante
        timeLeft--;

        // Actualizar el texto del cronómetro con el tiempo restante
        timer.innerText = timeLeft;

        // Si el tiempo llega a 0, detener el cronómetro
        if (timeLeft < 0) {
            clearInterval(countdown);
            mostrarPantallaFinal();
        }
    }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
    document.getElementById("pantalla-juego").style.display =  "none";
    document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
    numPreguntaActual = -1;
    timeLeft = tiempoJuego;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;
    estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

    //quito las clases de los circulos
    var circulos = document.getElementsByClassName("circle");
    for(i=0;i<circulos.length;i++){
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    largarTiempo();
    cargarPregunta();
});