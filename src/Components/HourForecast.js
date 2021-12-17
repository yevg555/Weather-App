import { React, memo } from 'react';
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar'
import classNames from "classnames";

const styles = {
    HourForecast: {
        // make this div width of 100 of the container

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
        border: '2px solid $red',
        background: 'inherit',
        //
        position: 'static',
        width: 166,
        height: 85,
        left: 0,
        top: 0,
        margin: '0 0.6rem 0 0.2rem',
        background: '#A7B4E0',
        borderRadius: 30,
    }
}

const HourForecast = (props) => {
    const { classes } = props;

    return (

        <PerfectScrollbar>
            <div className={classes.HourForecast}>
                <div className={classes.Card}><h2>Card</h2></div>
                <div className={classes.Card}><h2>Card</h2></div>
                <div className={classes.Card}><h2>Card</h2></div>
                <div className={classes.Card}><h2>Card</h2></div>
                <div className={classes.Card}><h2>Card</h2></div>
                <div className={classes.Card}><h2>Card</h2></div>
                <div className={classes.Card}><h2>Card</h2></div>
            </div >
        </PerfectScrollbar>
    )
}

export default withStyles(styles)(memo(HourForecast));