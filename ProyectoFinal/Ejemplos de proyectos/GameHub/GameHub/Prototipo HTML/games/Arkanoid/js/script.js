document.body.addEventListener("keydown", mover);
document.body.addEventListener("keyup", parar);

const jugador = document.querySelector("#player");
const wrapper = document.querySelector("#wrapper");
const div_ladrillos = document.querySelector("#ladrillos");
const bola = document.querySelector(".bola");

let coord_wrapper = wrapper.getBoundingClientRect();
let coord_player = jugador.getBoundingClientRect();
let coord_bola = bola.getBoundingClientRect();
let interval = 0;

let intervalBola = 0;
let mov = coord_player.left;
let top_bola;
let left_bola;
let matriz_ladrillos = [];
// let ladrillo;
document.body.onload = cargarJuego();

function cargarJuego() {



    for (let i = 0; i < 50; i++) {
        let mejora = Math.floor(Math.random() * 100);
        console.log(mejora);
        let nuevo_ladrillo = document.createElement('div');
        if (mejora <= 10) {
            nuevo_ladrillo.classList.add("mejora")
        } else if (mejora >= 70 && mejora <= 90) {
            nuevo_ladrillo.classList.add("empeora");
        } else if (mejora >= 90){
            nuevo_ladrillo.classList.add("ladrillobola");
        }
        nuevo_ladrillo.classList.add('ladrillo');
        div_ladrillos.append(nuevo_ladrillo);
        matriz_ladrillos.push(nuevo_ladrillo);
    }
    // ladrillo = matriz_ladrillos[7];
    // ladrillo.style.backgroundColor = "red";

    jugador.style.left = coord_wrapper.width / 2 - coord_player.width / 2 + "px";
    coord_player = jugador.getBoundingClientRect();

    let posicion_inicial_top = coord_player.top - coord_player.height;

    bola.style.top = posicion_inicial_top + "px";
    bola.style.left = coord_player.left + coord_player.width / 2 + "px";

    top_bola = posicion_inicial_top;
    left_bola = coord_player.left + coord_player.width / 2;
}

let vertical = -2; //comienza subiendo
let horizontal = 0.5; //comienza hacia la izquierda
let matriz_cayendo = [];

function movimientoBola() {


    intervalBola = setInterval(() => {

        for (let i = 0; i < matriz_ladrillos.length; i++) {
            let ladrillo = matriz_ladrillos[i];

            let eliminado = ladrillo.style.backgroundColor == "transparent" ? true : false;
            //si choca con un ladrillo
            if (!eliminado &&
                top_bola <= ladrillo.getBoundingClientRect().bottom &&
                top_bola >= ladrillo.getBoundingClientRect().top &&
                //separar este if (hay que hacer que rebote desde el lateral horizontal * -1 )
                (left_bola >= ladrillo.getBoundingClientRect().left && left_bola <= ladrillo.getBoundingClientRect().right)) {
                // clearInterval(intervalBola);
                vertical = vertical * -1;
                ladrillo.style.backgroundColor = "transparent";
                ladrillo.style.border = "none";
                if (ladrillo.classList.contains("mejora")) {

                    //crear distintostipos de mejoras
                    let mejora = document.createElement("div");
                    mejora.classList.add("mejora");
                    mejora.classList.add("drop");
                    mejora.style.left = ladrillo.getBoundingClientRect().left + ladrillo.getBoundingClientRect().width / 2 + "px";
                    mejora.style.top = ladrillo.getBoundingClientRect().top + ladrillo.getBoundingClientRect().height / 2 + "px";
                    let temp = ladrillo.getBoundingClientRect().top;

                    let new_fall = setInterval(() => {
                        // console.log(vertical);;
                        temp += 1;
                        mejora.style.top = temp + "px";
                        // mejora.style.top = mejora.getBoundingClientRect().top++ + "px";
                        if (mejora.getBoundingClientRect().top >= wrapper.getBoundingClientRect().bottom) {
                            clearInterval(parseInt(mejora.getAttribute("interval")));
                        }
                        if (mejora.getBoundingClientRect().left > jugador.getBoundingClientRect().left &&
                            mejora.getBoundingClientRect().left < jugador.getBoundingClientRect().left + jugador.getBoundingClientRect().width &&
                            mejora.getBoundingClientRect().top >= jugador.getBoundingClientRect().top &&
                            mejora.getBoundingClientRect().top < jugador.getBoundingClientRect().bottom
                        ) {
                            console.log("dentri");
                            clearInterval(parseInt(mejora.getAttribute("interval")));
                            let ancho = jugador.getBoundingClientRect().width;
                            ancho += 10;
                            jugador.style.width = ancho + "px";
                        }
                    }, 1);


                    mejora.setAttribute("interval", new_fall);
                    div_ladrillos.append(mejora);
                    matriz_cayendo.push(new_fall);

                } else if (ladrillo.classList.contains("empeora")) {
                    let mejora = document.createElement("div");
                    mejora.classList.add("empeora");
                    mejora.classList.add("drop");
                    mejora.style.left = ladrillo.getBoundingClientRect().left + ladrillo.getBoundingClientRect().width / 2 + "px";
                    mejora.style.top = ladrillo.getBoundingClientRect().top + ladrillo.getBoundingClientRect().height / 2 + "px";
                    let temp = ladrillo.getBoundingClientRect().top;

                    let new_fall = setInterval(() => {
                        // console.log(vertical);;
                        temp += 1;
                        mejora.style.top = temp + "px";
                        // mejora.style.top = mejora.getBoundingClientRect().top++ + "px";
                        if (mejora.getBoundingClientRect().top >= wrapper.getBoundingClientRect().bottom) {
                            clearInterval(parseInt(mejora.getAttribute("interval")));
                        }
                        if (mejora.getBoundingClientRect().left > jugador.getBoundingClientRect().left &&
                            mejora.getBoundingClientRect().left < jugador.getBoundingClientRect().left + jugador.getBoundingClientRect().width &&
                            mejora.getBoundingClientRect().top >= jugador.getBoundingClientRect().top &&
                            mejora.getBoundingClientRect().top < jugador.getBoundingClientRect().bottom
                        ) {
                            console.log("dentri");
                            clearInterval(parseInt(mejora.getAttribute("interval")));
                            let ancho = jugador.getBoundingClientRect().width;
                            ancho -= 10;
                            jugador.style.width = ancho + "px";
                        }
                    }, 1);

                    mejora.setAttribute("interval", new_fall);
                    div_ladrillos.append(mejora);
                    matriz_cayendo.push(new_fall);

                }if (ladrillo.classList.contains("mejora")) {
                    let mejora = document.createElement("div");
                    mejora.classList.add("ladrillobola");
                    mejora.classList.add("drop");
                    mejora.style.left = ladrillo.getBoundingClientRect().left + ladrillo.getBoundingClientRect().width / 2 + "px";
                    mejora.style.top = ladrillo.getBoundingClientRect().top + ladrillo.getBoundingClientRect().height / 2 + "px";
                    let temp = ladrillo.getBoundingClientRect().top;

                    let new_fall = setInterval(() => {
                        // console.log(vertical);;
                        temp += 1;
                        mejora.style.top = temp + "px";
                        // mejora.style.top = mejora.getBoundingClientRect().top++ + "px";
                        if (mejora.getBoundingClientRect().top >= wrapper.getBoundingClientRect().bottom) {
                            clearInterval(parseInt(mejora.getAttribute("interval")));
                        }
                        if (mejora.getBoundingClientRect().left > jugador.getBoundingClientRect().left &&
                            mejora.getBoundingClientRect().left < jugador.getBoundingClientRect().left + jugador.getBoundingClientRect().width &&
                            mejora.getBoundingClientRect().top >= jugador.getBoundingClientRect().top &&
                            mejora.getBoundingClientRect().top < jugador.getBoundingClientRect().bottom
                        ) {
                            
                            clearInterval(parseInt(mejora.getAttribute("interval")));
                            
                            
                        }
                    }, 1);

                    mejora.setAttribute("interval", new_fall);
                    div_ladrillos.append(mejora);
                    matriz_cayendo.push(new_fall);

                }


            }
        }

        // console.log(top_bola);
        // console.log(wrapper.getBoundingClientRect().bottom);

        if (left_bola <= wrapper.getBoundingClientRect().left || left_bola >= (wrapper.getBoundingClientRect().right - bola.getBoundingClientRect().width)) {
            horizontal = horizontal * -1;
        }
        if (top_bola >= wrapper.getBoundingClientRect().bottom - bola.getBoundingClientRect().height || top_bola <= wrapper.getBoundingClientRect().top - bola.getBoundingClientRect().height) {
            vertical = vertical * -1;
            // clearInterval(intervalBola);
        }

        //calculamos si está dentro del jugador

        if (
            top_bola == (jugador.getBoundingClientRect().top - jugador.getBoundingClientRect().height) &&
            top_bola <= (jugador.getBoundingClientRect().top - jugador.getBoundingClientRect().height) &&
            (left_bola >= jugador.getBoundingClientRect().left && left_bola <= jugador.getBoundingClientRect().right)) {

            if (left_bola - jugador.getBoundingClientRect().left <= jugador.getBoundingClientRect().width / 2) {
                let diferencia = (jugador.getBoundingClientRect().width / 2) - (left_bola - jugador.getBoundingClientRect().left);
                // console.log(diferencia);
                // console.log("izqda");
                horizontal = diferencia / 60;
                if (horizontal < 0) {
                    horizontal = horizontal * -1;
                }
            } else {
                let diferencia = (left_bola - jugador.getBoundingClientRect().left) - (jugador.getBoundingClientRect().width / 2);
                // console.log(diferencia / 100);
                // console.log("izqda");

                horizontal = diferencia / 60;
                if (horizontal > 0) {
                    horizontal = horizontal * -1;
                }
                // console.log("dcha");
            }

            vertical = vertical * -1;
        }

        left_bola -= horizontal;
        top_bola -= vertical;
        bola.style.top = top_bola + "px";
        bola.style.left = left_bola + "px";
        // jugador.style.left = left_bola-jugador.getBoundingClientRect().width + "px";

    }, 1);

}




function parar() {
    clearInterval(interval);
    interval = 0;
};

function mover(event) {
    if (interval == 0) {
        interval = setInterval(() => {
            desplazamiento(event.keyCode)
        }, 1);
    }
}

function desplazamiento(teclapulsada) {
    // console.log(teclapulsada);

    intervalBola == 0 ? movimientoBola() : "";
    coord_wrapper = wrapper.getBoundingClientRect();
    coord_player = jugador.getBoundingClientRect();
    switch (teclapulsada) {
        case 37: //flecha izqda
        case 65:
            // mov = parseInt(mov);

            // console.log("Wrapper: " + (coord_wrapper.left + 2));
            // console.log("Jugador: " + (coord_player.left));

            (coord_wrapper.left + 2 >= coord_player.left) ? mov -= 0: mov -= 4;
            jugador.style.left = mov + "px";
            break;
        case 39: //flecha dcha
        case 68:
            // mov = jugador.style.left;

            // console.log("Wrapper: " + (coord_wrapper.right));
            // console.log("Jugador: " + (coord_player.right));

            // mov = parseInt(mov);
            (coord_wrapper.right - 2 <= coord_player.right) ? mov += 0: mov += 4;
            jugador.style.left = mov + "px";
            break;
        case 27:
            break;
    }

}