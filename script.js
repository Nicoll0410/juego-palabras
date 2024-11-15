//total de pregunta del juego

const totalPreguntas = 10

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
})