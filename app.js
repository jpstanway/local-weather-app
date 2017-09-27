var latitude;
var longitude;

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
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    locOK(latitude, longitude);
  });
}

function locOK(latitude, longitude) {
  $.getJSON("https://fcc-weather-api.glitch.me/api/current?lon=" + longitude +
            "&lat=" + latitude, function(data) {

    city = data.name;
    country = data.sys.country;
    temp = Math.round(data.main.temp);
    hi_temp = Math.round(data.main.temp_max);
    lo_temp = Math.round(data.main.temp_min);
    condition = data.weather[0].main;
    icon = data.weather[0].icon;

    if (country === "US") {
      scale = "F";
      $('.info').html('<p><em>click temp for Celsius</em></p>');
    } else {
      scale = "C";
      $('.info').html('<p><em>click temp for Fahrenheit</em></p>');
    }

    if (condition === "Mist") {
      $('html').css('background-image', 'url(http://res.cloudinary.com/mtninja/image/upload/c_scale,w_2271/v1505159345/misty_z6wr3w.jpg)');
    } else if (condition === "Clear") {
      $('html').css('background-image', 'url(http://res.cloudinary.com/mtninja/image/upload/v1505159098/sunny_2_dbcx43.jpg)');
    } else if (condition === "Rain") {
      $('html').css('background-image', 'url(http://res.cloudinary.com/mtninja/image/upload/c_scale,w_2238/v1505076604/rain_e8jt8a.jpg)');
    } else if (condition === "Clouds") {
      $('html').css('background-image', 'url(http://res.cloudinary.com/mtninja/image/upload/v1505158921/cloudy_2_y5pglh.jpg)');
    } else if (condition === "Fog") {
      $('html').css('background-image', 'url(http://res.cloudinary.com/mtninja/image/upload/c_scale,w_2238/v1506535826/fog_mcnyag.jpg)')
    }

    $('#location').html(city + ", " + country);
    $('.conditions').html('<img src=' + icon + '>'
                            + '<p><em>' + condition + '</em></p>');

    setStats(temp, hi_temp, lo_temp, scale);

  });
}

function setStats(temp, hi_temp, lo_temp, scale) {

  $('.display').hide().html(temp + ' °' + scale).fadeIn(800);
  $('.hi-lo').hide().html('<p><strong>Hi:</strong> ' + hi_temp + ' °' + scale + '</p>'
                      + '<p><strong>Lo:</strong> ' + lo_temp + ' °' + scale + '</p>').fadeIn(800);

}

$('#main-temp').on('click', function() {

  if (scale === "C") {
    temp = Math.round(temp * 1.8 + 32);
    hi_temp = Math.round(hi_temp * 1.8 + 32);
    lo_temp = Math.round(lo_temp * 1.8 + 32);
    scale = "F";
    $('.info').html('<p><em>click temp for Celsius</em></p>');
  } else if (scale === "F") {
    temp = Math.round((temp - 32) / 1.8);
    hi_temp = Math.round((hi_temp - 32) / 1.8);
    lo_temp = Math.round((lo_temp - 32) / 1.8);
    scale = "C";
    $('.info').html('<p><em>click temp for Fahrenheit</em></p>');
  }

  setStats(temp, hi_temp, lo_temp, scale);
});
