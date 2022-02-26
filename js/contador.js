var contador = 30;

var timer = setInterval(function () {
  contador--;
  id = document.getElementById("contador");
  if (contador >= 0) {
    id.innerHTML = contador;
  }else{
  contador=30;
  getNuevo.click();
  id.innerHTML = contador;
  }
}, 1000);

