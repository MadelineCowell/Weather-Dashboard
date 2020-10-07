$(document).ready(function () {
    $("#search-button").on("click", function () {
        var searchCity = $("#searchCity").val()
        console.log(searchCity)
        $("#searchCity").val("")
        searchWeather(searchCity)
    })

    $("history").on("click", "li", function () {
    })

    function MakeRow(text) {
    }
    function searchWeather(searchCity) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=3da07c044a6ccc0a17374e50ca3ef82b&units=imperial",
            dataType: "JSON",
            success: function (response) {
                console.log(response)
                var cityName
                var card = $("<div>").addClass("card")
                var cardBody = $("<div>").addClass("card-body")
                var wind = $("<p>").addClass("card-text").text("Current wind speed is " + response.wind.speed)
                var humidity = $("<p>").addClass("card-text").text("Current humidity is " + response.main.humidity)
                // var uv
                var temp = $("<p>").addClass("card-text").text("Current temperature is " + response.main.temp)
                // var precip                
                var icon

                cardBody.append(wind, humidity, temp)
                card.append(cardBody)
                $("#today").append(card)

                getForecast(searchCity)
            }
        })

    }

    // Add in h city name and date
    // Add in city's weather icon
    // 

    function getForecast(searchCity) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=3da07c044a6ccc0a17374e50ca3ef82b&units=imperial",
            dataType: "JSON",
            success: function (response) {
                console.log(response)
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">")

                for (var i = 0; i < response.list.length; i++) {
                    if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                        var col = $("<div>").addClass("col-md-2")
                        var card = $("<div>").addClass("card bg-primary text-white")
                        var cardBody = $("<div>").addClass("card-body p-2")
                        var cityName
                        var date //date(), find date in response unixTime>convert to reg time
                        
                        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/"+ response.list[i].weather[0].icon + ".png")
                        var temp = $("<p>").addClass("card-text").text("Temp:" + response.list[i].main.temp)
                        var humidity = $("<p>").addClass("card-text").text("Humidity:" + response.list[i].main.humidity)

                        col.append(card.append(cardBody.append(temp, humidity))) //all vars

                        $("#forecast .row").append(col)
                    }

                }

            }
        })
    }

    function getUVIndex(lat, lon) {

    }

    // get current history, if any
    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length - 1]);
    }

    for (var i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }
})
