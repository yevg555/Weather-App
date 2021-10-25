import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'

const mapBoxToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

const geoForward = async (apiCity, setLatt, setLong) => {
    if (apiCity) {
        const res = await geocoder.forwardGeocode({
            query: `${apiCity}`,
            limit: 1
        }).send()
        console.log(`Coords for (${apiCity}): ${res.body.features[0].geometry.coordinates[1]}, ${res.body.features[0].geometry.coordinates[0]} `)
        setLatt(res.body.features[0].geometry.coordinates[1])
        setLong(res.body.features[0].geometry.coordinates[0])
    }
}
const geoReverse = async (Latt, Long, setApiCity) => {
    const res = await geocoder.reverseGeocode({
        query: [Long, Latt]
    }).send()
    setApiCity(res.body.features[1].text)
    console.log(`Reversed: ${res.body.features[1].text}`)
}



export { geoForward, geoReverse };



