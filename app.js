if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#data").html("latitude: " + position.coords.latitude
    + "<br>longitude: " + position.coords.longitude);
  });
}

$.getJSON("https://fcc-weather-api.glitch.me/", function(data) {

  

});
