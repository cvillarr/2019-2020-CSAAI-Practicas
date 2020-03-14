console.log("Ejecutando js....."); //lo pongo siempre para saber que me está funcionando

const test = document.getElementById('test'); //es mejor nombrar el identificador igual que la variable

test.onclick = () => {
  console.log("click!!");

  if (test.style.backgroundColor == "") {
    test.style.backgroundColor = "yellow"; //cada vez que le de click cambie de backgroundColor
  } //las llaves del if si solo tengo una funcion no hace falta ponerlas
  else {
    test.style.backgroundColor = "";
  }
}
