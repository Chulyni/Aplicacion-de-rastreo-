/*Variables */

const search = document.querySelector(".arrow")
const inputSearch = document.querySelector(".input__search");
const box__ip = document.querySelector(".ip")
const box__location = document.querySelector(".location")
const box__timezone = document.querySelector(".timezone")
const box__isp = document.querySelector(".isp")
const information = document.querySelector(".information")
const ocultar = document.querySelector(".ocultar")
const mapa = document.querySelector("#map")
const key = "at_7HBe4t6qRxhka5P8Rob11HkmH06RM";
const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}`;

/*Inicializacion*/
document.addEventListener("DOMContentLoaded", () =>{
    //Codigo para cargar ip actual
    fetch(url)
    .then(respuesta =>  respuesta.json())
    .then(respuesta => busquedaDefault(respuesta))
    .catch(respuesta => console.log("Error inesperado : " + respuesta) )

})
/*AddeventListener */
search.addEventListener("click", () => ejecutarBusqueda(inputSearch.value))
ocultar.addEventListener("click", () => information.classList.toggle("d-none"))
/*Funciones */
function busquedaDefault({ip,location,isp}){
    const{city,country,timezone,lat,lng} = location;
    box__ip.lastElementChild.textContent = ip
    box__location.lastElementChild.textContent = city +"," +country
    box__timezone.lastElementChild.textContent = "UTC"+ timezone
    box__isp.lastElementChild.textContent = isp
    buscarMapa(lat,lng)
}
function ejecutarBusqueda(informacion){
    let urlBusqueda;
    if(validateIp(informacion)){
         urlBusqueda = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${informacion}`;

    }else{
         urlBusqueda = `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&domain=${informacion}`;

    }
    fetch(urlBusqueda)
    .then(respuesta =>  respuesta.json())
    .then(respuesta => imprmirDatos(respuesta))
    .catch(respuesta => console.log("Error inesperado : " + respuesta) )

}
function validateIp(informacion){
    var patronIp = new RegExp("^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$");
    var valores;
  
    if(informacion.search(patronIp) !== 0) {
      return false
    }
  
    valores = informacion.split("."); 
  
    return valores[0] <= 255 && valores[1] <= 255 && valores[2] <= 255 && valores[3] <= 255
  }
  
function imprmirDatos( informacion){
    const {ip,location,isp} = informacion;
    const{city,country,timezone,lat,lng} = location;
    box__ip.lastElementChild.textContent = ip
    box__location.lastElementChild.textContent = city +"," +country
    box__timezone.lastElementChild.textContent = "UTC"+ timezone
    box__isp.lastElementChild.textContent = isp
    //Resetear mapa 
    map.remove()
    const divMap = document.createElement("div");
    divMap.classList.add("map");
    divMap.setAttribute("id","map")
    document.querySelector("body").appendChild(divMap)
    buscarMapa(lat,lng)
}

function buscarMapa(altitud,longitud){
   
    var map = L.map('map').setView([altitud, longitud], 15);
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.marker([altitud, longitud]).addTo(map);

}


