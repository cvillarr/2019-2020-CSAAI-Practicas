console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Obtener Sonidos
const sonido_raqueta = new Audio("pong-raqueta.mp3");
const sonido_rebote = new Audio("pong-rebote.mp3");
const sonido_tanto = new Audio("pong-tanto.mp3");


//-- Estados del juego
const ESTADO = {
  INIT: 0,
  SAQUE: 1,
  JUGANDO: 2,
  FIN: 3,
};

//-- VARIABLES
//-- Variable de estado
//-- Arrancamos desde el estado inicial
let estado = ESTADO.INIT;
let marcador_J1 = 0;
let marcador_J2 = 0;
let jugador1 = "JUGADOR 1";
let jugador2 = "JUGADOR 2";
let ganador = "";


//-- Pintar todos los objetos en el canvas
function draw() {

  //----- Dibujar la Bola
  //-- Solo en el estado de jugando
  if (estado == ESTADO.JUGANDO){
    bola.draw();
  };

  //-- Dibujar las raquetas
  raqI.draw();
  raqD.draw();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = '#00FFFF';
  ctx.lineWidth = 4;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //------ Dibujar el tanteo
  ctx.font = "80px monospace";
  ctx.fillStyle = "#FDFD96";
  ctx.fillText("J1", 10, 80);
  ctx.fillText(marcador_J1, 200, 80);
  ctx.fillText("J2", 500, 80);
  ctx.fillText(marcador_J2, 340, 80);

  //-- Dibujar el texto de sacar
  if (estado == ESTADO.SAQUE) {
    ctx.font = "30px monospace";
    ctx.fillStyle = '#FDFD96';
    ctx.fillText("Saca!", 30, 350);
  };

  //-- Dibujar el texto de comenzar
  if (estado == ESTADO.INIT) {
    ctx.font = "30px monospace";
    ctx.fillStyle = '#FDFD96';
    ctx.fillText("Pulsa Start!", 30, 350);
  };

  if (estado == ESTADO.FIN) {
    ctx.font = "30px monospace";
    ctx.fillStyle = '#FF1493';
    ctx.fillText("GANA " + ganador + "!!! ENHORABUENA!!", 30, 200);
  };
};


//---- Bucle principal de la animación
function animacion()
{

  //-- Actualizar las posiciones de los objetos móviles

  //-- Actualizar la raqueta con la velocidad actual
  raqI.update();
  raqD.update();

  if (estado == ESTADO.INIT){
    marcador_J1 = 0;
    marcador_J2 = 0;
    raqI.init();
    raqD.init();
  };

  ////----- COLISIONES CON PAREDES ------//////

  //-- Comprobar si la bola ha alcanzado la porteria derecha
  //-- Si es así, punto para J1 y volvemos a ESTADO.SAQUE
  if (bola.x >= canvas.width) {
    estado = ESTADO.SAQUE;
    bola.init();
    bola.x_ini = 500;
    bola.y_ini = 200;
    console.log("GOL J1!!");
    marcador_J1++;

    //-- Reproducir sonido
    sonido_tanto.currentTime = 0;
    sonido_tanto.play();
    return;
  };


  //-- Comprobar si la bola ha alcanzado la porteria izquierda
  //-- Si es así, punto para J2 y volvermos a ESTADO.SAQUE
  if (bola.x <= 0) {
     estado = ESTADO.SAQUE;
     bola.init();
     bola.x_ini = 100;
     bola.y_ini = 200;
     console.log("GOL J2!!");
     marcador_J2++;


     //-- Reproducir sonido de gol
     sonido_tanto.currentTime = 0;
     sonido_tanto.play();
     return;
  };


  //-- Quien llegue a 11 gana
  if (marcador_J1 == 11) {
    ganador = jugador1;
    estado = ESTADO.FIN;
    bola.init();
    console.log("GANA JUGADOR 1!!! ENHORABUENA!!");
  };

  if (marcador_J2 == 11) {
    ganador = jugador2;
    estado = ESTADO.FIN;
    bola.init();
    console.log("GANA JUGADOR 2!!! ENHORABUENA!!");
  };


  //-- Comprobar si la bola ha chocado abajo
  //-- Si es así, se cambia de signo la velocidad para que choque y
  //-- vaya en sentido contrario

  if (bola.y >= canvas.height) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vy = bola.vy * -1;

    //-- Reproducir sonido de sonido_rebote
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();

  };

  //-- Comprobar si la bola ha chocado arriba
  //-- Si es así, se cambia de signo la velocidad para que choque y
  //-- vaya en sentido contrario
  if (bola.y <= 0) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vy = bola.vy * -1;

    //-- Reproducir sonido de sonido_rebote
    sonido_rebote.currentTime = 0;
    sonido_rebote.play();

 };

 /////----- COLISIONES CON RAQUETAS -----/////

  //-- Comprobar si hay colisión con la raqueta izquierda y la velocidad
  //-- dependiendo si la raqueta está parada o no
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
          if (raqI.v == 0){ //--velocidad de la raqueta = 0
            bola.vx = bola.vx * -1;
          }
          else{ //-- movimiento de raqueta
             bola.vx = bola.vx * -1;
             bola.vy = raqI.v;
          };
    //-- Reproducir sonido
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  };

  //-- Comprobar si hay colisión con la raqueta derecha y la Velocidad
  //-- dependiendo si la raqueta está parada o no

  if (bola.x >= raqD.x && bola.x <=(raqD.x + raqD.width) &&
      bola.y >= raqD.y && bola.y <=(raqD.y + raqD.height)) {
          if (raqD.v == 0){ //-- velocidad de la raqueta = 0
            bola.vx = bola.vx * -1;
          }
          else{ //-- movimiento de raqueta
            bola.vx = bola.vx * -1;
             bola.vy = raqD.v;
          };

    //-- Reproducir sonido
    sonido_raqueta.currentTime = 0;
    sonido_raqueta.play();
  };



  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola.update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();

};

//-- Inicializa la bola: Llevarla a su posicion inicial
const bola = new Bola(ctx);

//-- Crear las raquetas
const raqI = new raqueta(ctx);
const raqD = new raqueta(ctx);

//-- Cambiar las coordenadas de la raqueta derecha
raqD.x_ini = 540;
raqD.y_ini = 300;
raqD.init();

//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Retrollamada de las teclas
window.onkeydown = (e) => {
  //-- En el estado inicial no se
  //-- hace caso de las teclas
  if (estado == ESTADO.INIT)
    return;

  switch (e.key) {
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case "o":
      raqD.v = raqD.v_ini * -1;
      break;
    case "l":
      raqD.v = raqD.v_ini;
      break;
    case "s":
      //-- El saque solo funciona en el estado de SAQUE
      if (estado == ESTADO.SAQUE) {
        //-- Reproducir sonido
        sonido_raqueta.currentTime = 0;
        sonido_raqueta.play();

      //-- Llevar bola a su posicion incicial
      bola.init();

      //-- Darle velocidad
      bola.vx = bola.vx_ini;

      //-- Cambiar al estado de jugando!
      estado = ESTADO.JUGANDO;

      return false;
    }
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }

  if (e.key == "o" || e.key == "l") {
    raqD.v = 0;
  }
}

//-- Botón de arranque
const start = document.getElementById("start");

start.onclick = () => {
  estado = ESTADO.SAQUE;
  console.log("SAQUE!");
  canvas.focus();
}

//-- Boton de stop
const stop = document.getElementById("stop");

stop.onclick = () => {
  //-- Volver al estado inicial
  estado = ESTADO.INIT;
  bola.init();
  start.disabled = false;
}

console.log(estado);
