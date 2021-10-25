// import './App.css';
import { withStyles } from "@material-ui/styles";
import { React, useState, useEffect, useRef, memo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import weatherFetch from './APIs/weatherAPI'
import { geoForward, geoReverse } from './APIs/geoAPI'
import capitalize from './Helpers/capitalize'

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
  const [isReversed, setIsReversed] = useState(false);
  const [newCity, setNewCity] = useState('');
  const [apiCity, setApiCity] = useState('');
  const [Long, setLong] = useState();
  const [Latt, setLatt] = useState();
  const [temp, setTemp] = useState();
  const { classes } = props;

  // helpers:
  const useMountEffect = (func) => useEffect(func, []);
  const previousValues = useRef({ Long, Latt })

  const clearCity = () => {
    setNewCity('')
  }

  const handleChange = (e) => {
    e.preventDefault()
    setNewCity(e.target.value)

  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCity && newCity !== apiCity) {
      setApiCity(capitalize(newCity))
      clearCity()
      setIsReversed(false)
    }
  };

  const getCurrLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    function success(pos) {
      let crd = pos.coords;
      setLatt(crd.latitude)
      setLong(crd.longitude)
      console.log(`Curr Location: (${crd.latitude}, ${crd.longitude})`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    setApiCity(navigator.geolocation.getCurrentPosition(success, error, options))
  }

  // Get Coords for current location,(Runs only on first Render)
  useMountEffect(getCurrLocation);

  // get city name off of current coords
  useEffect(() => {
    if (!apiCity && Latt && Long) {
      geoReverse(Latt, Long, setApiCity)
      setIsReversed(true)
    };
  }, [Latt, Long])

  // Get Coords for new city
  useEffect(() => {
    if (!isReversed) {
      geoForward(apiCity, setLatt, setLong)
    }
  }, [apiCity]);

  // Get Temprature
  useEffect(() => {
    if (previousValues.current.Long !== Long &&
      previousValues.current.Latt !== Latt
    ) {
      // execute logic
      weatherFetch(Latt, Long, setTemp)
      // update to curr values
      previousValues.current = { Long, Latt }
    };
  })



  return (
    <div className={classes.App}>
      <div className={classes.Container}>
        <h1>{apiCity}</h1>
        <div className={classes.Inner}>
          {!apiCity ? <p>please enter your location: </p> : ''}
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
            <TextField id="outlined-basic" label="Location" variant="outlined" value={newCity} />
          </Box>
          {temp ? <p>The temprature is: {temp} degrees</p> : null}
        </div>
      </div>
    </div >

  );
}

export default withStyles(styles)(memo(App));
