import axios from 'axios'

const weatherFetch = async (Latt, Long, setTemp) => {
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
    // console.log(response.data);
    setTemp(response.data.current.temp);

};


export default weatherFetch;
