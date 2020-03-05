/////// empezar con un menos de numero negativo


console.log("Ejecutando JS.....");

resultado = document.getElementById("resultado")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
por = document.getElementById("por")
entre = document.getElementById("entre")
igual = document.getElementById("igual")
punto = document.getElementById("punto")
botonAC = document.getElementById("botonAC")
botonpa = document.getElementById("botonpa")
botonpc = document.getElementById("botonpc")

let numero = document.getElementsByClassName('numero')



//// Agrupamos los botones que se refieren a los digitos(0-9)
for (i = 0; i < numero.length; i++) {
  numero[i].onclick = (ev)=>{
    digito(ev.target);
  }
}


/////// funcion comun para todos//////
function digito(boton){
  if (resultado.innerHTML == numero){
      resultado.innerHTML = boton.value;
  }
  else {
    resultado.innerHTML += boton.value;
  }
}

suma.onclick = () => {
  resultado.innerHTML += suma.value;
}

resta.onclick = () => {
  resultado.innerHTML += resta.value;
}

por.onclick = () => {
  resultado.innerHTML += por.value;
}

entre.onclick = () => {
  resultado.innerHTML += entre.value;
}

igual.onclick = () => {
  resultado.innerHTML = eval(resultado.innerHTML);
}

punto.onclick = () => {
  resultado.innerHTML += (".");
}

botonpa.onclick = () => {
  resultado.innerHTML += ("(");
}

botonpc.onclick = () => {
  resultado.innerHTML += (")");
}

botonAC.onclick = () => {
  resultado.innerHTML = " ";
}
