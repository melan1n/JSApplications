function attachEvents() {
    $('#submit').on('click', getWeather);

    async function getWeather() {
        try {
            let locationName = $('#location').val();
            $('#location').empty();
            const baseUrl = `https://judgetests.firebaseio.com/locations.json`;

            let codeResponse = await $.get(baseUrl);

            let codeArr = codeResponse.filter(location => (location.name === locationName));
            let code = codeArr[0].code;
            console.log(code);

            let currentWeatherUrl = `https://judgetests.firebaseio.com/forecast/today/${code}.json `
            let currentWeather = await $.get(currentWeatherUrl);

            console.log(currentWeather);
            console.log(currentWeather['forecast']['condition']);

            let upcomingWeatherUrl = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;

            let threeDayWeather = await $.get(upcomingWeatherUrl)

            console.log(threeDayWeather);

            $('#forecast').css('display', 'block');

            let todaySpan = $(`
            <span class='condition symbol'>${getWeatherSymbol(currentWeather.forecast.condition)}</span>
            <span class='condition'>
              <span class='forecast-data'>${currentWeather.name}</span>
              <span class='forecast-data'>${currentWeather.forecast.low}&#176;/${currentWeather.forecast.high}&#176;</span>
              <span class='forecast-data'>${currentWeather.forecast.condition}</span>
            </span>
            `);

            $('#current').append(todaySpan);

            for (let day of threeDayWeather.forecast) {
                let daySpan = $(`
            <span class='upcoming'>
              <span class='symbol'>${getWeatherSymbol(day.condition)}</span>
              <span class='forecast-data'>${day.low}&#176;/${day.high}&#176;</span>
              <span class='forecast-data'>${day.condition}</span>
            </span>   
            `);
                $('#upcoming').append(daySpan);
            }

            function getWeatherSymbol(weatherCode) {
                switch (weatherCode) {
                    case "Sunny": return '&#x2600;';
                    case "Partly sunny": return "&#x26C5;";
                    case "Overcast": return '&#x2601;';
                    case "Rain": return "&#x2614;";
                    case "Degrees": return "&#176;";
                }
            }
        } 
        catch(error) {
            $('#current').css("display", 'none');
            $('#upcoming').css("display", 'none');
            $('#forecast').css("display", 'block');

            let p = $('<p>');
            p.text('Error');
            $('#forecast').append(p);
            console.log("Error")
        }
    }
}