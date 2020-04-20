console.log("Ejecutando JS...");

//----- Obtener elemento de video y configurarlo
const video1 = document.getElementById("video1")
video1.width = 200;  //-- Tamaño de la pantalla de video
video1.height = 100;
video1.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"

const video2 = document.getElementById("video2")
video2.width = 200;
video2.height = 100;
video2.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";

const video3 = document.getElementById("video3")
video3.width = 200;
video3.height = 100;
video3.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

const video4 = document.getElementById("video4")
video4.width = 800;
video4.height = 400;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
video1.poster = "https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";
video2.poster = "https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";
video3.poster = "https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";
video4.poster = "https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";

//-- Obtener los botones
const empezamos = document.getElementById("conectar camaras");
const play1 = document.getElementById("play1");
const play2 = document.getElementById("play2");
const play3 = document.getElementById("play3");

empezamos.onclick = () => {
  console.log("EMPEZAMOS");
  video1.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video1.play();
  video2.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
  video2.play();
  video3.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";
  video3.play();
};


//-- Función de retrollamada del botón de ver
play1.onclick = () => {
  console.log("VER VIDEO 1!");
  video4.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
  video4.play();
};

//-- Funcion de retrollamada del boton de parar
//stop1.onclick = () => {
  //video1.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  //video1.src = null;
//}

play2.onclick = () => {
  console.log("VER VIDEO 2!");
  video4.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
  video4.play();
};

//stop2.onclick = () => {
  //video2.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  //video2.src = null;
//}

play3.onclick = () => {
  console.log("VER VIDEO 3!");
  video4.src = "https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"
  video4.play();
};

//stop3.onclick = () => {
  //video3.pause();

  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  //video3.src = null;
//}
