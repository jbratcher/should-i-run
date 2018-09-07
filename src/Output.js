import React from 'react';
import PropTypes from 'prop-types';

const Output = props =>
      
      <section id="dataOutput">
        {props.dataRequested ?
        <React.Fragment>
          <p>
            <b>Selected City:</b> 
            <span id="cityOutput">{props.data.city}</span>
          </p>
          <p>
            <b>Selected State:</b>
            <span id="stateOutput">{props.data.state}</span>
          </p>
          <p>
            <b>Selected Country:</b>
            <span id="countryOutput">{props.data.country}</span>
          </p>
          <p>
            <b>Current Air Quality:</b> 
            <span id="airQualityOutput">{props.airQuality}</span>
          </p>
          <p>
            <b>Main Pollutant:</b> 
            <span id="mainPollutantOutput">{props.mainPollutant}</span>
          </p>
        </React.Fragment>
        : null
        }
      </section>

  ;

  Output.propTypes = {
    airQuality: PropTypes.number,
    data: PropTypes.object,
    dataRequested: PropTypes.bool.isRequired,
    mainPollutant: PropTypes.string
  };

  export default Output;
