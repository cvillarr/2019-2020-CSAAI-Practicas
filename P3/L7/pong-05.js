console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");

//-- Sus dimensiones las hemos fijado en el fichero
//-- HTML. Las imprimimos en la consola
console.log(`canvas: Anchura: ${canvas.width}, Altura: ${canvas.height}`);

//-- Obtener el contexto para pintar en el canvas
const ctx = canvas.getContext("2d");

function draw() {
      //----- Dibujar la Bola
      ctx.beginPath();
      ctx.fillStyle='red';

      //-- x,y, anchura, altura
      ctx.rect(100, 200, 20, 20);
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

function animation(){
    //-- Borrar el canvas
    ctx.clearRect(0,0, canvas.width, canvas.height);

    //-- Dibujar el nuevo frame
    draw();

    //-- Mostrar actividad en la consola
    console.log("Frame!");
}
