let getNuevo = document.getElementById("getPersonaje");

let s = "https://starwars-visualguide.com/assets/img/characters/9.jpg";

getNuevo.addEventListener("click", getInfo);

function getInfo() {
  let random = Math.floor(Math.random() * 83 + 1);
  let Api_URL = "https://swapi.dev/api/people/" + random;

  fetch(Api_URL)
    .then(checkStatus)
    .then((Response) => Response.json())
    .then((data) => {
      var per = personaje(data);

      let element = document.getElementById("personaje");


 ////////////////////////////////////////////////////////////
      let imgPersonaje = document.getElementById("imagen");

      let img = document.createElement("img");
      img.src = "https://starwars-visualguide.com/assets/img/characters/"+random+".jpg";
      img.className = "card-img-top";

      imgPersonaje.replaceChildren(img);  



//////////////////////////////////////////////////////////////
      let nombre = document.getElementById("nombre");

      let nom = document.createElement("h4");
      nom.style.color = "white";
      nom.appendChild(document.createTextNode(per.name));
      nombre.replaceChildren(nom);  



//////////////////////////////////////////////////////////////

/*
      element.innerHTML =
        ` <div class="col-md-8"> 
        <div class="card">
    <img src="https://starwars-visualguide.com/assets/img/characters/` +
        random +
        `.jpg" class="rounded" alt="Cinque Terre">
      <div class="card-body">
        <h4 class="card-title"> 
        <p>${per.name}</p> </h4>
        <p  style="color:#FF0000" >Vehiculos</p>
        <p id="vehiculos" ></p>
        <p style="color:#FF0000">Naves</p>
        <p class="card-text" id="naves" ></p>
        <p style="color:#FF0000">Peliculas</p>
        <p class="card-text" id="peliculas" ></p>
        <p style="color:#FF0000">Especies</p>
        <p class="card-text" id="especies" ></p>
      </div>
    </div>            
    </div>
    `;
*/
      per.vehicles.length > 0
        ? getData(per.vehicles, "vehiculos")
        : per.films.length > 0
        ? getPeliculas(per.films)
        : null;
      per.starships.length > 0
        ? getData(per.starships, "naves")
        : per.species.length > 0
        ? getData(per.species, "especies")
        : null;
    })
    .catch((err) => {
      console.log("Se produjo un error", err);
    });
}

function getData(data, id) {
  let elemento = document.getElementById(id);
  console.log(data);
  data.forEach((element) => {
    fetch(element)
      .then((res) => res.json())
      .then((data) => {
        elemento.innerHTML += ` <p>${data.name}</p> `;
      })
      .catch((err) => {
        console.log("Se produjo un error", err);
      });
  });
}

function getPeliculas(data) {
  let elemento = document.getElementById("peliculas");

  data.forEach((element) => {
    fetch(element)
      .then((res) => res.json())
      .then((data) => {
        elemento.innerHTML += ` <p>${data.title}</p> `;
      })
      .catch((err) => {
        console.log("Se produjo un error", err);
      });
  });
}

function checkStatus(Response) {
  if (Response.ok) {
    return Response;
  }

  let error = new Error(Response.statusText);
  error.Response = Response;
  return Promise.reject(error);
}
