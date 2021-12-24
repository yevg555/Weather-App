import { React, memo } from 'react';
import { withStyles } from "@material-ui/styles";
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import classNames from "classnames";

const styles = {
    HourlyForecast: {
        width: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        position: 'relative',

    },
    Card: {
        flex: '0 0 auto',
        background: 'inherit',
        //
        position: 'static',
        width: '10rem',
        height: '4.5rem',
        margin: '0 0.6rem 0 0.2rem',
        background: '#A7B4E0',
        borderRadius: 20,
    },
    Card_hour: {
        marginTop: '0.1rem',
        marginBottom: '0.2rem',
    },
    Card_double: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    Card_temp: {
        height: '100%',
        marginLeft: '1rem',
    },
    Card_icon: {
        alignSelf: 'flex-start',
    },
    SimpleBarScrollbar: {
        overflowY: 'hidden',
    },
}

const HourlyForecast = (props) => {
    const { classes, hours } = props;

    return (
        // for every day in days array display day name, max temp, min temp, icon
        <SimpleBar data-simplebar-direction='rtl' className={classes.SimpleBarScrollbar}>
            <div className={classes.HourlyForecast}>
                {hours.map((hour, index) => {
                    return (
                        <div className={classes.Card} key={index}>
                            <div className={classes.Card_hour}>{hour.hour}</div>
                            <div className={classes.Card_double}>
                                <img className={classes.Card_icon} src={`https://openweathermap.org/img/wn/${hour.icon}.png`} alt="" />
                                <div className={classes.Card_temp}>{hour.temp}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </SimpleBar >
    )
}
// <PerfectScrollbar>
//     <div className={classes.HourForecast}>
//         <div className={classes.Card}><h2>Card</h2></div>
//     </div >
// </PerfectScrollbar>

//     )
// }

export default withStyles(styles)(memo(HourlyForecast));