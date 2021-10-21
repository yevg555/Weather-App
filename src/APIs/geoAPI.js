import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'

const mapBoxToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const geoData = async (apiCity, setLong, setLatt) => {
    if (apiCity) {
        const res = await geocoder.forwardGeocode({
            query: `${apiCity}`,
            limit: 1
        }).send()
        console.log(apiCity)
        setLong(res.body.features[0].geometry.coordinates[1])
        setLatt(res.body.features[0].geometry.coordinates[0])
    }
}


export default geoData;



