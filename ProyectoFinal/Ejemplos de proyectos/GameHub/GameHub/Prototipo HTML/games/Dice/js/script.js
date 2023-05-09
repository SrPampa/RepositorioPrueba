// El jugador en su primer lanzamiento debe obtener una suma de 7 o 11 puntos con los dados.
// Se pierde si se obtiene un 2, 3 o 12.
// Cuando sale cualquier otro número (4, 5, 6, 8, 9 o 10) este se convierte en el número de punto.
// Se tiran los dos dados hasta que:
// Salga dicho número, el número de punto, gana el jugador
// o
// Salga el 7, en este caso pierde el jugador.

let num_players = 0;
let num_dados = 2;
let colores = ["Magenta", "Green", "Red"];
let jugadores = ["MORADO", "VERDE", "ROJO"];
let div_dados = document.querySelector("#div-dados");
let btn_mode = document.querySelector("#mode");
let puntuaciones = document.querySelector("#puntuaciones");
let alt = "";
let tiradas = [0, 0, 0]
let hagirado;
let modo = true;

aniadirJugador();


//esta funcion añade jugadores dinamicamente hasta 3 como maximo
function aniadirJugador() {
  if (num_players < 3) {
    num_players++;
    let color;
    switch (num_players) {
      case 1:
        color = colores[0];
        break;
      case 2:
        color = colores[1];
        break;
      case 3:
        color = colores[2];
        break;
    }

    let sub_dados = document.createElement("div");
    sub_dados.setAttribute("class", "sub-dados sub-dados-" + num_players);
    div_dados.appendChild(sub_dados);

    for (let i = 1; i <= num_dados; i++) {
      let new_dice = document.createElement("img");
      new_dice.setAttribute("id", "dice-" + num_players + "-" + i);
      new_dice.setAttribute("class", "dice");
      new_dice.setAttribute("src", "img/dice" + color + "" + alt + "1.png");
      sub_dados.appendChild(new_dice);
    }

    let boton = document.createElement("button");

    boton.setAttribute("class", "roll roll-" + num_players);
    boton.setAttribute("onmousedown", "girarDados(" + num_players + ")");
    boton.setAttribute("onmouseup", "detener(" + num_players + ")");
    boton.innerHTML = "Roll da Dices";
    sub_dados.appendChild(boton);

    let h2_puntos = document.createElement("h2");
    h2_puntos.setAttribute("class", "puntos puntos-" + num_players);
    sub_dados.appendChild(h2_puntos);
  }
};
//Esta funcion se encarga de cambiar al "Modo Noche" es puramente estética pero es para hacer algo
//con las imagenes alternativas
function cambiarModo() {
  modo ? (modo = false) : (modo = true); //oscilamos entre modo dia y modo noche

  let dados = document.getElementsByClassName("dice");
  if (modo) {
    btn_mode.style.backgroundImage = "url('img/moon.png')";
    //MODO DIA
    alt = "";


    //realizamos substr para "recortar" el string del src de las imagenes para conservar los valores de cada dado
    for (let i = 0; i < dados.length; i++) {
      let dado_actual = dados[i].getAttribute("src");
      let valor_final = dado_actual.substring(0, dado_actual.length - 8) + dado_actual.substring(dado_actual.length - 5, dado_actual.length);
      dados[i].setAttribute("src", valor_final);
    }

    document.body.style.backgroundColor = "rgb(177, 152, 63)";
  } else {
    //MODO NOCHE
    document.body.style.backgroundColor = "rgb(51, 35, 97)";
    btn_mode.style.backgroundImage = "url('img/sun.png')";
    alt = "Alt";

    //realizamos substr para "recortar" el string del src de las imagenes para conservar los valores de cada dado
    //esta vez añadiendo la variable alt que contiene el añadido de "Alt" para los src
    for (let i = 0; i < dados.length; i++) {
      let dado_actual = dados[i].getAttribute("src");
      let valor_dado = dado_actual.substring(
        dado_actual.length - 5,
        dado_actual.length - 4
      );

      dado_actual = dado_actual.substring(0, dado_actual.length - 5);

      dados[i].setAttribute("src", dado_actual + alt + valor_dado + ".png");
    }
  }
};


let pixel = 1;
let timer;

//la funcion se ejecuta
function girarDados(num) {
  if (timer) return;
  //realizamos un intervalo de 100 miliseg en el que vamos rotando el dado
  timer = setInterval(() => {
    for (let i = 1; i <= num_dados; i++) {
      let dados_elevar = document.querySelector("#dice-" + num + "-" + i);
      dados_elevar.style.transform = "rotateZ(" + pixel + "deg)";
    }


    //si ha girado mas de una vuelta completa cambiamos el valor de dado
    if (pixel > 360) {
      rollThaDices(num);
    }



    //este if - else es para que no se haga infinito
    if (pixel < 360) {
      pixel *= 2;
    } else {
      pixel /= 2;
    }
  }, 100);
};

//esta funcion se ejecuta al mantener el click 
function rollThaDices(player) {
  hagirado = true; //si ha llegado hasta aqui es porque ha girado
  let sub_div = document.querySelector(".sub-dados-" + player);
  let todas_etiquetas_hijas = sub_div.children;
  let dados = [];

  for (let i = 0; i < todas_etiquetas_hijas.length; i++) {
    //recorremos todas las imagenes (dados)
    if (todas_etiquetas_hijas[i].tagName == "IMG") {
      dados.push(todas_etiquetas_hijas[i]);
    }
  }

  for (let i = 0; i < dados.length; i++) {
    tirarDados(dados[i], player);
  }
}


function detener(num) {
  clearInterval(timer);
  timer = null;
  setTimeout(() => {
    for (let i = 1; i <= num_dados; i++) {
      let dados_elevar = document.querySelector("#dice-" + num + "-" + i);
      dados_elevar.style.transform = "rotateZ(" + pixel + "deg)";
    }
  }, 600);
  tiradas[num - 1]++;
  if (hagirado) {
    comprobarPuntuacion(num);
  } else {
    document.querySelector("#norma-5").style.color = colores[num - 1];
    resaltame(document.querySelector("#norma-5"));
  }
  hagirado = false;
  pixel = 1;
};

function tirarDados(dado, player) {
  let random = Math.floor(1 + Math.random() * 6);
  setTimeout(() => {
    dado.setAttribute("src", "img/dice" + colores[player - 1] + "" + alt + "" + random + ".png");
  }, 300);
};


let primerlanzamiento = [true, true, true];
let numerodepunto = [0, 0, 0];


//comprobamos los puntos
function comprobarPuntuacion(dado) {
  let puntos = 0;
  let cadena = "";

  //obtenemos el valor 800 miliseg despues para que de tiempo a los dados a recolocarse
  setTimeout(() => {
    for (let i = 1; i <= num_dados; i++) {
      // img/diceMagenta5.png
      cadena = document.querySelector("#dice-" + dado + "-" + i);
      cadena = cadena.getAttribute("src");
      cadena = cadena.substring(cadena.length - 5, cadena.length - 4);
      puntos += parseInt(cadena);
    }
  }, 800);


  if (primerlanzamiento[dado - 1]) { //si es el primer lanzamiento indicamos el numero de puntos como objetivo
    setTimeout(() => {
      document.querySelector(".puntos-" + dado).innerHTML = "Objetivo: " + puntos;
      numerodepunto[dado - 1] = puntos;
      comprobarPuntos(dado, puntos);
      primerlanzamiento[dado - 1] = false;
    }, 1000);
  } else {
    setTimeout(() => {
      comprobarPuntos(dado, puntos);
    }, 1000);
  }
};

let finalizado = [];


//comprobacion completa y EXTENSA de los puntos
function comprobarPuntos(dado, puntos) {

  if (primerlanzamiento[dado - 1]) {
    if (puntos == 7 || puntos == 11) {
      // ganas
      finalizado.push(dado + "-" + 1 + "-" + tiradas[dado - 1]);
      document.querySelector("#norma-1").style.color = colores[dado - 1];
      resaltame(document.querySelector("#norma-1"));

      let boton = document.querySelector('.roll-' + dado);
      boton.setAttribute("disabled", "true");

      setTimeout(document.querySelector("#victoria").style.opacity = "1", 200);

    } else if (puntos == 2 || puntos == 3 || puntos == 12) {
      // pierdes
      perder(dado);

      document.querySelector("#norma-2").style.color = colores[dado - 1];
      resaltame(document.querySelector("#norma-2"));
    } else {
      document.querySelector("#norma-3").style.color = colores[dado - 1];
      resaltame(document.querySelector("#norma-3"));

      //No pasa nada, vuelve a tirar
    }
  } else {
    if (puntos == numerodepunto[dado - 1]) {
      //gana
      finalizado.push(dado + "-" + 1 + "-" + tiradas[dado - 1]);
      let boton = document.querySelector('.roll-' + dado);
      boton.setAttribute("disabled", "true");

      document.querySelector("#norma-4-1").style.color = colores[dado - 1];
      resaltame(document.querySelector("#norma-4-1"));
    } else if (puntos == 7) {
      //pierde
      perder(dado);
      document.querySelector("#norma-4-2").style.color = colores[dado - 1];
      resaltame(document.querySelector("#norma-4-2"));
    } else {

      document.querySelector("#norma-4").style.color = colores[dado - 1];
      resaltame(document.querySelector("#norma-4"));
      //No pasa nada, vuelve a tirar
    }
  }

  //si ya han terminado todos los jugadores de jugar
  if (finalizado.length == num_players) {

    document.querySelector("#victoria").style.visibility = "visible";
    document.querySelector("#victoria").style.opacity = "1";
    for (let i = 0; i < finalizado.length; i++) {
      if (finalizado[i].charAt(2) == 1) { //LOS QUE HAN GANADO
        document.querySelector("#ganador").innerHTML += "EL JUGADOR " + jugadores[finalizado[i].charAt(0) - 1] + " HA GANADO <br>";
      }
    }
    document.querySelector("#ganador").innerHTML += "<hr>";
    for (let i = 0; i < finalizado.length; i++) {
      if (finalizado[i].charAt(2) == 0) { //LOS QUE HAN PERDIDO
        document.querySelector("#ganador").innerHTML += "EL JUGADOR " + jugadores[finalizado[i].charAt(0) - 1] + " HA PERDIDO<br>";
      }
    }
  }

};


function perder(dado) {
  finalizado.push(dado + "-" + 0 + "-" + 0);
  for (let i = 1; i <= num_dados; i++) {
    let dados = document.querySelector("#dice-" + dado + "-" + i);
    dados.classList.add("dice-lost");
    dados.classList.remove("dice");
    let numero_src = dados.getAttribute("src");
    let numero = numero_src.substr((numero_src.length - 5), numero_src.length);
    dados.setAttribute("src", "img/" + numero);
  }
  let boton = document.querySelector(".roll-" + dado);
  boton.classList.add('disabled');
  boton.setAttribute("disabled", "true");
}


//resaltamos la norma que queramos
function resaltame(elemento) {
  elemento.style.transition = "transform 0.25s";
  for (let i = 1.0; i < 1.2; i += 0.05) {
    elemento.style.transform = "scale(" + i + ")";
  }
  setTimeout(() => {
    for (let i = 1.2; i > 0.95; i -= 0.05) {
      elemento.style.transform = "scale(" + i + ")";
    }
  }, 200);

};


//reseteamos todo el codigo
function reiniciar() {
  document.querySelector("#ganador").innerHTML = "";
  primerlanzamiento = [true, true, true];
  numerodepunto = [0, 0, 0];
  finalizado = [];
  for (let i = 1; i <= num_players; i++) {
    for (let j = 1; j <= num_dados; j++) {
      let todos_dados = document.querySelector('#dice-' + i + "-" + j);
      let puntos = document.querySelector('.puntos-' + i);
      let boton = document.querySelector('.roll-' + i);

      todos_dados.classList.remove("dice-lost");
      todos_dados.classList.add("dice");
      boton.classList.remove("disabled");
      boton.removeAttribute("disabled");
      puntos.innerHTML = "";
      switch (i) {
        case 1:
          color = colores[0];
          todos_dados.setAttribute("src", "img/dice" + color + "" + alt + "1.png");
          break;
        case 2:
          color = colores[1];
          todos_dados.setAttribute("src", "img/dice" + color + "" + alt + "1.png");
          break;
        case 3:
          color = colores[2];
          todos_dados.setAttribute("src", "img/dice" + color + "" + alt + "1.png");
          break;
      }
    }
  }
  let normas = document.getElementsByClassName("norma");
  for (let norma of normas) {
    norma.style.color = "black";
  }
  document.querySelector("#victoria").style.visibility = "hidden";
};