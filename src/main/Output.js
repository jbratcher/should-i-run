import React, { Component } from 'react';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
      airQuality,
      currentLat,
      currentLong,
      data,
      dataRequested,
      mainPollutant
    } = this.props;

    return(

      <section id="dataOutput">
        {dataRequested ?
        <React.Fragment>
          <p>
            <b>City:</b>
            <span id="cityOutput">{data.city}</span>
          </p>
          <p>
            <b>Selected State:</b>
            <span id="stateOutput">{data.state}</span>
          </p>
          <p>
            <b>Selected Country:</b>
            <span id="countryOutput">{data.country}</span>
          </p>
          <p>
            <b>Current Air Quality:</b>
            <span id="airQualityOutput">{airQuality}</span>
          </p>
          <p>
            <b>Main Pollutant:</b>
            <span id="mainPollutantOutput">{mainPollutant}</span>
          </p>
        </React.Fragment>
        : null
        }

        <MapContainer

          currentLat={currentLat}
          currentLong={currentLong}
          style={{position: "absolute", top: 0, left: 0}}

        />

      </section>

    );

  }

}

  export default Output;
