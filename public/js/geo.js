let map;
let marker;
let watchId;
let geoLoc;

function initMap() {
  const myLatLng = { lat: -25.354, lng: 131.044 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng
  });
  marker = new google.maps.Marker({
    position: myLatLng,
    map,
    tittle: "Aqui macotas"

  });
  getPosition()
};
function getPosition() {
  if (navigator.geolocation) {
    let options = { timeout: 60000 };
    geoLoc = navigator.geolocation;
    watchId = geoLoc.watchPosition(showLocationOnMap, errorHanlder, options);
  }
  else {
    alert('no soporta geolocalizacion');
  }
};
function showLocationOnMap(position) {
  let latitud = position.coords.latitude;
  let longitud = position.coords.longitude;
  this.longitud = longitud
  this.latitud = latitud
  const myLatLng = { lat: latitud, lng: longitud };
    marker.setPosition(myLatLng);
  map.setCenter(myLatLng);
};
function errorHanlder(err) {
  if (err.code == 1) {
    alert("Errror: Acceso denegado");
  } else if (err.code == 2) {
    alert("Error: Position no existe o no se encuentra");
  };
};







