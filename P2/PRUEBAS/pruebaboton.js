console.log("probando que funciona el js....");

const test = document.getElementById("test");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const n1 = 1;
const n2 = 2;

test.onclick = () => {
  console.log("CLICK!");
if(test.style.background == ""){
  test.style.backgroundColor = "yellow";
}
else {
  test.style.backgroundColor = "";
}
}


boton1.onclick = () => {
  console.log("CLICK!"); // para que muestre en la consola cada vez que le damos
  //la palabra CLICK pero no tiene funcionalidad como tal en lo que queremos que haga el programa
  test.innerHTML += n1; //innerHTML se usa para que me cambie por ese texto que le he puestos

}
boton2.onclick = () => {
  console.log("CLICK2!");
  test.innerHTML += n2;
}
