
let getNuevo = document.getElementById("getPersonaje");

const people = "https://starwars-visualguide.com/assets/img/characters/";
const vehiculosURL = "https://starwars-visualguide.com/assets/img/vehicles/";
const navesURL = "https://starwars-visualguide.com/assets/img/starships/";
const especiesURL = "https://starwars-visualguide.com/assets/img/species/";
const peliculasURL = "https://starwars-visualguide.com/assets/img/films/";

getNuevo.addEventListener("click", getInfo);

function getInfo() {
  let random = Math.floor(Math.random() * 83 + 1);
  if(random==17){
    random+=1;
  }
  const Api_URL = "https://swapi.dev/api/people/" + random;

  fetch(Api_URL)
    .then(checkStatus)
    .then((Response) => Response.json())
    .then((data) => {
      var per = personaje(data);

      ////////////////////////////////////////////////////////////
      let imgPersonaje = document.getElementById("imagen");

      let img = document.createElement("img");
      img.src = people + random + ".jpg";
      img.className = "card-img-top cardsPageSearch";
      img.setAttribute("onerror", "this.src='img/noFound.jpg'");


      imgPersonaje.replaceChildren(img);

      //////////////////////////////////////////////////////////////
      let nombre = document.getElementById("nombre");

      let nom = document.createElement("h4");
      nom.style.color = "white";
      nom.appendChild(document.createTextNode(per.name));
      nombre.replaceChildren(nom);

      clearCards();

      let imgNoData = document.createElement("img");
      imgNoData.src = "img/noData.png";

      per.vehicles.length > 0
        ? getData(per.vehicles, "vehiculos", vehiculosURL)
        : noData("vehiculos");
      per.films.length > 0 
      ? getData(per.films, "peliculas", peliculasURL) 
      : noData("peliculas");
      per.starships.length > 0
        ? getData(per.starships, "naves", navesURL)
        : noData("naves");
      per.species.length > 0
        ? getData(per.species, "especies", especiesURL)
        : noData("especies");
    })
    .catch((err) => {
      console.log("Se produjo un error", err);
    });
}

function noData(id){
  let elemento = document.getElementById(id);

  let divElem = document.createElement("div");
  divElem.className = "col-md-6 col-12 offset-md-3";

  let cardElem = document.createElement("div");
  cardElem.className = "card cardsPageSearch";

  let imgElem = document.createElement("img");
  imgElem.src ="img/noData.png";
  imgElem.className = "card-img-top";
  imgElem.setAttribute("onerror", "this.src='img/noFound.jpg'");

  let cardBodyElem = document.createElement("div");
  cardBodyElem.className = "card-body cardBodyWhite";

  let cardTitleElem = document.createElement("div");
  cardTitleElem.className = "card-title";

  cardBodyElem.appendChild(cardTitleElem);
  cardElem.appendChild(imgElem);
  cardElem.appendChild(cardBodyElem);
  divElem.appendChild(cardElem);

  elemento.appendChild(divElem);
}

function clearCards() {
  let card1 = document.getElementById("vehiculos");
  while (card1.lastElementChild) {
    card1.removeChild(card1.lastElementChild);
  }
  let card2 = document.getElementById("naves");
  while (card2.lastElementChild) {
    card2.removeChild(card2.lastElementChild);
  }
  let card3 = document.getElementById("especies");
  while (card3.lastElementChild) {
    card3.removeChild(card3.lastElementChild);
  }
  let card4 = document.getElementById("peliculas");
  while (card4.lastElementChild) {
    card4.removeChild(card4.lastElementChild);
  }
}

function getData(data, id, url) {
  let elemento = document.getElementById(id);
  data.forEach((element) => {
    fetch(element)
      .then((res) => res.json())
      .then((data) => {

        let divElem = document.createElement("div");
        divElem.className = "col-md-3 col-3";

        let cardElem = document.createElement("div");
        id == "vehiculos" || id == "naves"
          ? (cardElem.className = "card cardDark cardsPageSearch")
          : (cardElem.className = "card cardWhite cardsPageSearch");

        let imgElem = document.createElement("img");
        imgElem.src =
          url +
          data.url
            .substring(data.url.lastIndexOf("/") - 2, data.url.lastIndexOf("/"))
            .replace("/", "") +
          ".jpg";
        imgElem.className = "card-img-top";
        imgElem.setAttribute("onerror", "this.src='img/noFound.jpg'");

        let cardBodyElem = document.createElement("div");
        id == "vehiculos" || id == "naves"
          ? (cardBodyElem.className = "card-body cardBodyDark")
          : (cardBodyElem.className = "card-body cardBodyWhite");

        let cardTitleElem = document.createElement("div");
        cardTitleElem.className = "card-title";

        let nomElem = document.createElement("h5");
        id == "peliculas"
          ? nomElem.appendChild(document.createTextNode(data.title))
          : nomElem.appendChild(document.createTextNode(data.name));

        cardTitleElem.appendChild(nomElem);
        cardBodyElem.appendChild(cardTitleElem);
        cardElem.appendChild(imgElem);
        cardElem.appendChild(cardBodyElem);
        divElem.appendChild(cardElem);

        elemento.appendChild(divElem);
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
