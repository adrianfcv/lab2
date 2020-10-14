document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=eddf8c1107098b072306967661792b48";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + "Temperature: " + json.main.temp + " &deg;F</h2>"
      results += "<p> Weather: "
      for (let i=0; i < json.weather.length; i++) {
      results += json.weather[i].description
      if (i !== json.weather.length - 1)
      results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });



    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=eddf8c1107098b072306967661792b48";
    fetch(url2)
    .then(function(response) {
    return response.json();
    }).then(function(json) {
    let forecast = "<table>";
    let location = 0;
    console.log(json.list[location]);
    for (let row=0; row<5; row++) {
      forecast+= "<tr>";
      for (let i=0; i < 8; i++) {
        forecast+="<td>";
        forecast += "<h2>" + moment(json.list[location].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "&deg;F" +"</p>";
        forecast += "<p>Humidity: " + json.list[i].main.humidity + "</p>";
        forecast += "<p>Wind Speed: " + json.list[i].wind.speed + "mi/h" +"</p>";
        forecast += "<p>Weather: " + json.list[i].weather[0].main + "</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
        forecast+="</td>";
        location=location+1;
      }
      forecast+= "</tr>";
    }
    document.getElementById("forecastResults").innerHTML = forecast;
    });
});
