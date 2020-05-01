console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizadorR = document.getElementById('deslizadorR');
const deslizadorG = document.getElementById('deslizadorG');
const deslizadorB = document.getElementById('deslizadorB');
//-- Valor del deslizador
const range_valueR = document.getElementById('range_valueR');
const range_valueG = document.getElementById('range_valueG');
const range_valueB = document.getElementById('range_valueB');
//-- Inicializamos el botón para la escala de botongrises

const grises = document.getElementById('grises');
const original = document.getElementById('original');
const rotacion = document.getElementById('rotacion');
const colores = document.getElementById('colores');



//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

//FUNCION GENERAL RGB
function filtroRGB() {
      //-- Mostrar el nuevo valor del deslizador rojo
      range_valueR.innerHTML = deslizadorR.value;
      //-- Mostrar el nuevo valor del deslizador verde
      range_valueG.innerHTML = deslizadorG.value;
      //-- Mostrar el nuevo valor del deslizador azul
      range_valueB.innerHTML = deslizadorB.value;

      //-- Situar la imagen original en el canvas
      //-- No se han hecho manipulaciones todavia
      ctx.drawImage(img, 0,0);

      //-- Obtener la imagen del canvas en pixeles
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      //-- Obtener el array con todos los píxeles
      let data = imgData.data

      //-- Obtener los umbrales de los deslizadores
      umbralR = deslizadorR.value;
      umbralG = deslizadorG.value;
      umbralB = deslizadorB.value;

      //-- Filtrar la imagen según el nuevo umbral
      for (let i = 0; i < data.length; i+=4) {
        if (data[i] > umbralR)
          data[i] = umbralR;
        if (data[i+1] > umbralG)
          data[i+1] = umbralG;
        if (data[i+2] > umbralB)
          data[i+2] = umbralB;
      }
      //--Poner la imagen modificada en el canvas
      ctx.putImageData(imgData, 0, 0);
};

colores.onclick = () => {
  //--Funcion de retrollamada deslizadorR
  deslizadorR.oninput = () => {
    filtroRGB();
  }
  //--Funcion de retrollamada deslizadorG
  deslizadorG.oninput = () => {
    filtroRGB();
  }
  //--Funcion de retrollamada deslizadorB
  deslizadorB.oninput = () => {
    filtroRGB();
  }
  console.log("colores");
};

//-- Filtro escala de grises
grises.onclick = () => {
  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data;

  //-- Filtrar la imagen según el nuevo umbral
  for (var i = 0; i < data.length; i+=4){
      R = data[i];
      G = data[i+1];
      B = data[i+2];

  let brillo = (3 * R + 4 * G + B)/8
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
  }

  ctx.putImageData(imgData, 0, 0);
  console.log("gris");
};
//--Rotar la imagen, ponerla boca abajo
function rotar(){
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;

  ctx.translate(0,2*(img.height)/2);
  ctx.scale(1, -1);
  ctx.putImageData(imgData, 0, 0);
};

rotacion.onclick = () => {
    rotar();
    console.log("rotar");
};

//-- Recuperar la imagen original
original.onclick = () => {
  ctx.drawImage(img, 0,0);
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  ctx.putImageData(imgData, 0, 0);
  console.log("original");
};


console.log("Fin...");
