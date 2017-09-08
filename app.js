

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

    $('#location').html(data.name + ", " + data.sys.country);
    $('.temp-display').append('<p>' + Math.floor(data.main.temp) + ' ° </p>'
                              + '<img src=' + data.weather[0].icon + '>'
                              + '<p><em>' + data.weather[0].main + '</em></p>');
  });
}
