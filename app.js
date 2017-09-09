var city = "";
var country = "";
var temp = 0;
var hi_temp = 0;
var lo_temp = 0;
var scale = "";
var condition = "";
var icon = "";


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

    city = data.name;
    country = data.sys.country;
    temp = Math.round(data.main.temp);
    hi_temp = Math.round(data.main.temp_max);
    lo_temp = Math.round(data.main.temp_min);
    condition = data.weather[0].main;
    icon = data.weather[0].icon;

    if (country === "US") {
      scale = "F";
    } else {
      scale = "C";
    }

    $('#location').html(city + ", " + country);
    $('.conditions').html('<img src=' + icon + '>'
                            + '<p><em>' + condition + '</em></p>');

    setStats(temp, hi_temp, lo_temp, scale);

  });
}

function setStats(temp, hi_temp, lo_temp, scale) {

  $('.display').html(temp + ' °' + scale);
  $('.hi-lo').html('<p><strong>Hi:</strong> ' + hi_temp + ' °' + scale + '</p>'
                      + '<p><strong>Lo:</strong> ' + lo_temp + ' °' + scale + '</p>');

}

$('#main-temp').on('click', function() {

  if (scale === "C") {
    temp = Math.round(temp * 1.8 + 32);
    hi_temp = Math.round(hi_temp * 1.8 + 32);
    lo_temp = Math.round(lo_temp * 1.8 + 32);
    scale = "F";
  } else if (scale === "F") {
    temp = Math.round((temp - 32) / 1.8);
    hi_temp = Math.round((hi_temp - 32) / 1.8);
    lo_temp = Math.round((lo_temp - 32) / 1.8);
    scale = "C";
  }

  setStats(temp, hi_temp, lo_temp, scale);
});
