console.log("Ejecutando JS...");

display = document.getElementById("display")
boton1 = document.getElementById("boton1")
boton2 = document.getElementById("boton2")
suma = document.getElementById("suma")
igual = document.getElementById("igual")
clear = document.getElementById("clear")


// -- Insertar digito 1
boton1.onclick = () => {
  display.innerHTML += "1";
  console.log("1");
}

//-- Insertar digito 2
boton2.onclick = () => {
  display.innerHTML += "2";
  console.log("2");
}

//-- Insertar simbolo de sumar
suma.onclick = () => {
  display.innerHTML += "+";
  console.log("+");
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
  console.log("=");
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}
