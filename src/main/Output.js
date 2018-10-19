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
      currentLng,
      currentTemp,
      data,
      dataRequested,
      mainPollutant
    } = this.props;
    
    const convertedTemp = parseInt((currentTemp * (9/5)) + 32, 10);

    return(

      <section id="dataOutput">

        {dataRequested ?

        <section id="scoreData">
          <i id="weatherIcon" className="wi wi-day-sunny"></i>
          <span id="weatherText">Sunny</span>
          <span id="weatherScore">
            86
            <span id="weatherScoreRating">
              (Good)
            </span>
          </span>
          <span id="airQuality">
            {airQuality}
            <span id="mainParticulate">
              ({mainPollutant})
            </span>
          </span>
          <span id="temperature">{convertedTemp} &deg;F</span>
          <span id="cityOutput">{data.city}, {data.state}, {data.country}</span>

        </section>

        :null
        }

        <MapContainer

          currentLat={currentLat}
          currentLng={currentLng}

        />

      </section>

    );

  }

}

  export default Output;
