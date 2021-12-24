import axios from 'axios'

const weatherFetch = async (Latt, Long, setTemp, setIsDark, setClouds, setHumidity, setWind, setDailyForecast, setHourlyForecast) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
        params: {
            lat: `${Latt}`,
            lon: `${Long}`,
            units: 'metric',
            exclude: 'minutely',
            appid: `${process.env.REACT_APP_OPENWEATHERMAP_TOKEN}`,
        },
    })
    console.log(`Getting Temprature: ${response.data.current.temp}`);
    setTemp(Math.round(response.data.current.temp));
    // set humidity
    console.log(`Getting Humidity: ${response.data.current.humidity}`);
    setHumidity(response.data.current.humidity);
    // fetch wind in m/s
    console.log(`Getting Wind: ${response.data.current.wind_speed}`);
    // convert wind from meters/s to km/h and set it to state
    setWind(Math.round(response.data.current.wind_speed * 3.6));
    // set clouds
    console.log(`Getting Clouds: ${response.data.current.clouds}`);
    setClouds(response.data.current.clouds);

    if (response.data.current.sunset - response.data.current.dt < 0) {
        setIsDark(true)
    }
    // fetch forecast for the next week, round the degrees

    const forecast = response.data.daily.map(day => {
        return {
            day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            temp: `${Math.round(day.temp.day)}°`,
            icon: day.weather[0].icon,
        }
    })
    console.log(forecast);
    setDailyForecast(forecast)

    // fetch hourly forecast
    const hourlyForecast = response.data.hourly.map(hour => {
        return {
            hour: new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
            temp: `${Math.round(hour.temp)}°`,
            icon: hour.weather[0].icon,
        }
    })
    // take only the next 12 hours of the forecast and set them to the state
    setHourlyForecast(hourlyForecast.slice(0, 13))
};

// get weather for the next 12 hours

export default weatherFetch;
