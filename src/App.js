// import './App.css';
import { withStyles } from "@material-ui/styles";
import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import weatherFetch from './APIs/weatherAPI'
import geoData from './APIs/geoAPI'

const styles = {
  App: {
    paddingTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  Container: {
    height: '90vh',
    width: '80%',
    background: 'linear-gradient(47.75deg, #EBEBEB 7.07%, #EEEEEE 97.3%)',
    textAlign: 'center',
    borderRadius: '10px'
  }
}
function App(props) {
  const [city, setCity] = useState('');
  const [apiCity, setApiCity] = useState('');
  const [Long, setLong] = useState('');
  const [Latt, setLatt] = useState('');
  const [temp, setTemp] = useState('');
  const { classes } = props;
  const clearCity = () => {
    setCity('')
  }

  const handleChange = (e) => {
    e.preventDefault()
    setCity(e.target.value)

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setApiCity(city)
    clearCity()
  };

  const getCurrLocation = () => {
    if (!apiCity && !Long && !Latt) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      function success(pos) {
        let crd = pos.coords;
        setLatt(crd.latitude)
        setLong(crd.longitude)
        console.log(`youre at: (${crd.latitude}, ${crd.longitude})`);
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      setApiCity(navigator.geolocation.getCurrentPosition(success, error, options))
    }
  }
  useEffect(() => {
    getCurrLocation()
    geoData(apiCity, setLong, setLatt)
    weatherFetch(Long, Latt, setTemp)
  }, [apiCity, Latt, Long]);


  return (
    <div className={classes.App}>
      <div className={classes.Container}>
        <h1>{apiCity}</h1>
        <div className={classes.Inner}>

          <p>please enter your location: </p>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onChange={handleChange}
            onSubmit={handleSubmit}

          >
            <TextField id="outlined-basic" label="Location" variant="outlined" value={city} />
          </Box>
          {temp ? <p>The temprature is: {temp} degrees</p> : null}
        </div>
      </div>
    </div >

  );
}

export default withStyles(styles)(App);
// export { city, setCity, temp, setTemp }
