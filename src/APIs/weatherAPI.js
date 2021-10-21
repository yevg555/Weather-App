import axios from 'axios'

const weatherFetch = async (Long, Latt, setTemp) => {
    if (Long && Latt) {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
            params: {
                lat: `${Latt}`,
                lon: `${Long}`,
                units: 'metric',
                exclude: 'minutely',
                appid: `${process.env.REACT_APP_OPENWEATHERMAP_TOKEN}`,
            },
            headers: {

            }
        })
        console.log(response.data);
        setTemp(response.data.current.temp);
    } else {
        console.log('blablabla')
    }
};


export default weatherFetch;
