import React from 'react'


const HourForecast = (props) => {


    return (
        <div>
            {props.hours.map(hour => {
                <span> hour </span>
            })}
        </div >
    )
}

export default HourForecast;