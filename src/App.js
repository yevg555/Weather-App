// import './App.css';
import { withStyles } from "@material-ui/styles";
import { React, useState, useEffect, useRef, memo } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import weatherFetch from './APIs/weatherAPI'
import { geoForward, geoReverse } from './APIs/geoAPI'
import capitalize from './Helpers/capitalize'
import classNames from "classnames";
import Celcius from './images/c-new.js'
import TempIcon from './images/tempIcon'
import DailyForecast from "./Components/DailyForecast";
import HourlyForecast from "./Components/HourlyForecast";

const styles = {
  App: {
    overflowX: 'auto',
    overflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    paddingTop: '2rem',
    display: 'flex',
    justifyContent: 'center',

  },
  Container: {
    height: '90vh',
    width: '80%',
    textAlign: 'center',
    borderRadius: '10px',
    color: '#FFFFFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px 10px 0px 0px',
    "& p": {
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    }
  },
  Headers: {
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    padding: 0,

    "& h1": {
      fontSize: '30px',
      fontStyle: 'normal',
      fontWeight: 500,
      marginTop: '2rem',
      marginBottom: '0px',


    },
    "& p": {
      fontSize: '0.7rem',
      fontStyle: 'normal',
      fontWeight: 300,
      marginTop: '0px',
      color: 'rgba(255, 255, 255, 0.75)'


    }
  },
  TempIcon: {
    display: 'inline-block',
    height: '4em',
    lineHeight: '1em',
    marginTop: '2em',
    /* just for vertical alignment as svg don't have descenders like fonts */
    // verticalAlign: '-0.3em',
  },
  TempOuter: {
    textAlign: 'center',
  },
  Span: {
    height: '1em',
    fontWeight: 500,
    fontSize: '2rem',
    paddingLeft: '0.95rem',

  },
  SVG: {
    display: 'inline-block',
    height: '1em',
    lineHeight: '1em',
    marginLeft: '0.14em',
    /* just for vertical alignment as svg don't have descenders like fonts */
    verticalAlign: '-0.25em',
  },

  Dark: {
    background: 'linear-gradient(47.75deg, #082276 7.07%, #030F34 97.3%)',
    color: '#FFFFFF',
  },
  Light: {
    background: '#828CAE',
    // background: 'linear-gradient(47.75deg, #EBEBEB 7.07%, #EEEEEE 97.3%)'
  },
  // put all Elements in one div called 'Bar' and space them evenly with the values below elements accordingly
  Bar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1rem',
    // make span fontSize 15px
    "& span": {
      fontSize: '0.7rem',
      fontWeight: 300,
    },
    // make text inside div size of 26px
    "& p": {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },

  TodayReport: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    fontWeight: 300,
    marginTop: '1rem',
    marginBottom: '1.5rem',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
  },
  ViewReport: {
    "&:hover": {
      color: '#002688',
      cursor: 'pointer'
    },
  },

  BottomMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10vh',
    padding: '16px 16px 16px 5px',

  }
}

function App(props) {
  const [newCity, setNewCity] = useState('');
  const [apiCity, setApiCity] = useState('');
  const [Long, setLong] = useState();
  const [Latt, setLatt] = useState();
  const [temp, setTemp] = useState();
  const [clouds, setClouds] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [date, setDate] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const { classes } = props;


  // helpers:
  const useMountEffect = (func) => useEffect(func, []);

  const previousValues = useRef({ Long, Latt })

  const clearCity = () => {
    setNewCity('')
  }
  // changers:
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
  // function that returns the current month verbly, day, and year
  const getDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const date = new Date()
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const dateString = `${month} ${day}, ${year}`
    setDate(dateString)
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
  useMountEffect(getDate);

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
      weatherFetch(Latt, Long, setTemp, setIsDark, setClouds, setHumidity, setWind, setDailyForecast, setHourlyForecast)
      // update to curr values
      previousValues.current = { Long, Latt }
    };
  })

  return (
    <div className={classes.App}>
      <div className={classNames(classes.Container, {
        [classes.Dark]: isDark,
        [classes.Light]: !isDark
      })} >
        {apiCity ?
          <div className={classes.Headers}>
            <h1>{apiCity}</h1>
            <p>{date}</p>
          </div>
          : ''
        }

        <div className={classes.Inner}>
          <TempIcon classNameTempIcon={classes.TempIcon} />
          {/* {!apiCity ? <p>please enter your location: </p> : ''} */}
          {/* <Box
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
          </Box> */}
          {temp ?
            <p className={classes.TempOuter}>
              <span className={classes.Span}>
                {temp}
                < Celcius temp={temp} classNameSVG={classes.SVG} />
              </span>
            </p>
            : null}
        </div>
        {temp ?
          <div className={classes.Bar}>
            <div className={classes.BarElement1}>
              <span>Cloudiness</span><div>{`${Math.floor(clouds)}%`}</div>
            </div>
            <div className={classes.BarElement2}>
              <span>Humidity</span><div>{`${humidity}%`}</div>
            </div>
            <div className={classes.BarElement3}>
              <span>Wind</span><div>{`${Math.floor(wind)}km/h`}</div>
            </div>
          </div>
          : ''}
        <div className={classes.TodayReport}>
          <div className={classes.Today}>Today</div>
          <div className={classes.ViewReport}>View Report</div>
        </div>
        < HourlyForecast hours={hourlyForecast} />
        <div className={classes.BottomMenu}></div>
      </div >
    </div >

  );
}

export default withStyles(styles)(memo(App));
