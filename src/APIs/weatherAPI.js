import axios from 'axios'

const weatherFetch = async (Latt, Long, setTemp, setIsDark) => {
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
    console.log(response.data.current.sunset - response.data.current.dt);
    setTemp(response.data.current.temp);
    if (response.data.current.sunset - response.data.current.dt < 0) {
        setIsDark(true)
    }

};


export default weatherFetch;
