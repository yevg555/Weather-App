import axios from 'axios'

const weatherFetch = async (Latt, Long, setTemp, setIsDark, setClouds, setHumidity, setWind) => {
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
    setTemp(response.data.current.temp);
    // set humidity
    console.log(`Getting Humidity: ${response.data.current.humidity}`);
    setHumidity(response.data.current.humidity);
    // set wind
    console.log(`Getting Wind: ${response.data.current.wind_speed}`);
    setWind(response.data.current.wind_speed);
    // set clouds
    console.log(`Getting Clouds: ${response.data.current.clouds}`);
    setClouds(response.data.current.clouds);

    if (response.data.current.sunset - response.data.current.dt < 0) {
        setIsDark(true)
    }
    // forecast for the next week (save for later)
    const forecast = response.data.daily.map((day) => {
        return {
            day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            max: day.temp.max,
            min: day.temp.min,
            icon: day.weather[0].icon,
        }
    })
    console.log(forecast);
    forecast.map(day => {
        <div>
            <h1>{day.day}</h1>
            <h1>{day.max}</h1>
            <h1>{day.min}</h1>
            <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="" />
        </div>
    })

};


export default weatherFetch;
