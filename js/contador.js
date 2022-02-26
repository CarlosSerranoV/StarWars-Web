var contador = 30;
var timer = setInterval(function () {
  contador--;
  if (contador >= 0) {
    id = document.getElementById("contador");
    id.innerHTML = contador;
  }else{
      //contador=31;
  clearInterval(timer);
  getNuevo.click();
  }
}, 1000);
