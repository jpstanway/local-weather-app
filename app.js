

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    locOK(latitude, longitude);
  });
}

function locOK(latitude, longitude) {
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + longitude +
            "&lat=" + latitude, function(data) {

    console.log(data);
  });
}
