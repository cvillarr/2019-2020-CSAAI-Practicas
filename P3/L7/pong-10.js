console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

let bola_x = 50;
let bola_vx = 0;

//pintar todos los objetos del canvas
function draw() {

      //----- Dibujar la Bola
      ctx.beginPath();
      ctx.fillStyle='red';

      //-- x,y, anchura, altura
      ctx.rect(bola_x, 200, 20, 20);
      ctx.fill();

      //------- Dibujar las raquetas
      ctx.beginPath();
      ctx.fillStyle='blue';

      //-- Raqueta izquierda
      ctx.rect(50, 100, 10, 40);

      //-- Raqueta derecha
      ctx.rect(550, 300, 10, 40);

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
      ctx.fillStyle = '#FDFD96';
      ctx.fillText("0", 200, 80);
      ctx.fillText("1", 340, 80);
}

function animacion(){

  //-- Comprobar si la bola ha alcanzado el límite derecho
//-- Si es así, se cambia de signo la velocidad, para
// que "rebote" y vaya en el sentido opuesto
    if (bola_x >= canvas.width) {
      //-- Hay colisión. Cambiar el signo de la bola
      bola_vx = bola_vx * -1;
    }

    //-- Actualizar las posiciones de los objetos móviles
    //-- Actualizar coordenada x de la bola
    bola_x += bola_vx;

    //-- Borrar el canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //-- Dibujar el nuevo frame
    draw();

    //-- Mostrar actividad en la consola para demostrar que funciona aunque
    //--todavia no se mueva nada
    console.log("Frame!");
}

//-- Arrancar la animación
setInterval(()=>{
  animacion();
},16);

//-- Obtener el boton de saque
const sacar = document.getElementById("sacar");


//-- Botón de saque:
//-- Dar a la bola una velocidad inicial
//-- También restablecemos la posicion inicial
sacar.onclick = () => {
  bola_x = 50;
  bola_vx = 6;
  console.log("Saque!");
}

reset.onclick = () => {
  //-- Establecer posicion inicial de la bola
  bola_x = 50;
  bola_vx = 0;
  console.log("Reset!");
}
