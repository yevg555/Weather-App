import { React, memo } from 'react';
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar'
import classNames from "classnames";

const styles = {
    HourForecast: {
        width: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        position: 'relative',
        overflowX: 'auto',
        height: 'auto',
        overflowScrolling: 'touch',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
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
    Card_day: {
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
}

const DailyForecast = (props) => {
    const { classes, days } = props;


    // < PerfectScrollbar >
    //             < div className={classes.HourForecast} >
    //                 <h1>{day.day}</h1>
    //                 <h1>{day.max}</h1>
    //                 <h1>{day.min}</h1>
    //                 <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="" />
    //             </div>
    //         </PerfectScrollbar >

    return (
        // for every day in days array display day name, max temp, min temp, icon
        <PerfectScrollbar>
            <div className={classes.HourForecast}>
                {days.map((day, index) => {
                    return (
                        <div className={classes.Card} key={index}>
                            <div className={classes.Card_day}>{day.day}</div>
                            <div className={classes.Card_double}>
                                <img className={classes.Card_icon} src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="" />
                                <div className={classes.Card_temp}>{day.temp}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </PerfectScrollbar>
    )
}
// <PerfectScrollbar>
//     <div className={classes.HourForecast}>
//         <div className={classes.Card}><h2>Card</h2></div>
//     </div >
// </PerfectScrollbar>

//     )
// }

export default withStyles(styles)(memo(DailyForecast));