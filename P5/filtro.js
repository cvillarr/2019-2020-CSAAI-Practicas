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
};

//--Funcion de retrollamada deslizadorR
deslizadorR.oninput = () => {
  filtroRGB();
  ctx.drawImage(img, 0, 0);

}
//--Funcion de retrollamada deslizadorG
deslizadorG.oninput = () => {
  filtroRGB();
  ctx.drawImage(img, 0, 0);
}
//--Funcion de retrollamada deslizadorB
deslizadorB.oninput = () => {
  filtroRGB();
  ctx.drawImage(img, 0, 0);
}

console.log("Fin...");
