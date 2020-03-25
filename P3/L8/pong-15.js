console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

//-- Objeto: Bola
const bola = {

  //-- Constante: Tamaño de la bola
  size : 20,

  //-- Contante: Posicion inicial de la bola
  x_ini : 100,
  y_ini : 200,

  //-- Posicion generica de la bola
  x : 0,
  y : 0,

  //-- Velocidad inicial de la bola
  vx_ini : 6,
  vy_ini : 3,

  //-- Velocidad genérica de la bola
  //-- Inicialmente a cero
  vx : 0,
  vy : 0,
}

function bola_draw() {
  //----- Dibujar la Bola
  ctx.beginPath();
  ctx.fillStyle='red';

  //-- x,y, anchura, altura
  ctx.rect(bola.x, bola.y, bola.size, bola.size);
  ctx.fill();
}

function bola_init() {
  //-- Inicializa la bola: A su posicion inicial
  bola.x = bola.x_ini;
  bola.y = bola.y_ini;
}

function bola_update() {
  bola.x += bola.vx;
  bola.y += bola.vy;
}

//-- Objeto raqueta
const raqI = {
  //-- Constante: Tamaño de la raqueta
  width : 10,
  height: 40,

  //-- Constante: Posicion inicial
  x_ini : 50,
  y_ini : 100,

  //-- Constante: Velocidad
  v_ini : 3,

  //-- Velocidad (variable)
  v : 0,
}

function raqI_init() {
  raqI.x = raqI.x_ini;
  raqI.y = raqI.y_ini;
}

function raqI_update() {
  raqI.y += raqI.v;
}

function raqI_draw() {
  //------- Dibujar las raquetas
  ctx.beginPath();
  ctx.fillStyle='blue';

  //-- Raqueta izquierda
  ctx.rect(raqI.x, raqI.y, raqI.width, raqI.height);

  //-- Pintar!
  ctx.fill();
}

//-- Pintar todos los objetos en el canvas
function draw() {

  //----- Dibujar la Bola
  bola_draw();

  //-- Dibunar la raqueta izquierda
  raqI_draw();

  //------- Dibujar la raqueta derecha
  ctx.beginPath();
  ctx.fillStyle='blue';

  //-- Raqueta derecha
  ctx.rect(540, 300, 10, 40);

  //-- Pintar!
  ctx.fill();

  //--------- Dibujar la red
  ctx.beginPath();

  //-- Estilo de la linea: discontinua
  //-- Trazos de 10 pixeles, y 10 de separacion
  ctx.setLineDash([10, 10]);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 4;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 0);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();

  //------ Dibujar el tanteo
  ctx.font = "100px Comic";
  ctx.fillStyle = "#FDFD96";
  ctx.fillText("0", 200, 80);
  ctx.fillText("1", 340, 80);
}

//---- Bucle principal de la animación
function animacion() {

  //-- Actualizar las posiciones de los objetos móviles

  //-- Actualizar la raqueta con la velocidad actual
  raqI_update();

  //-- Comprobar si la bola ha alcanzado el límite derecho
  //-- Si es así, se cambia de signo la velocidad, para
  // que "rebote" y vaya en el sentido opuesto
  if (bola.x >= canvas.width) {
    //-- Hay colisión. Cambiar el signo de la bola
    bola.vx = bola.vx * -1;
  }

  //-- Comprobar si hay colisión con la raqueta izquierda
  if (bola.x >= raqI.x && bola.x <=(raqI.x + raqI.width) &&
      bola.y >= raqI.y && bola.y <=(raqI.y + raqI.height)) {
    bola.vx = bola.vx * -1;
  }

  //-- Actualizar coordenada x de la bola, en funcion de
  //-- su velocidad
  bola_update()

  //-- Borrar la pantalla
  ctx.clearRect(0,0, canvas.width, canvas.height);

  //-- Dibujar el nuevo frame
  draw();
}


//-- Inicializa la bola: A su posicion inicial
bola_init();

//-- Inicializar la raqueta a su posicion inicial
raqI_init();

//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Retrollamada de las teclas
window.onkeydown = (e) => {

  switch (e.key) {
    case "a":
      raqI.v = raqI.v_ini;
      break;
    case "q":
      raqI.v = raqI.v_ini * -1;
      break;
    case " ":
      //-- Llevar bola a su posicion incicial
      bola_init();

      //-- Darle velocidad
      bola.vx = bola.vx_ini;
    default:
  }
}

//-- Retrollamada de la liberacion de teclas
window.onkeyup = (e) => {
  if (e.key == "a" || e.key == "q"){
    //-- Quitar velocidad de la raqueta
    raqI.v = 0;
  }
}
