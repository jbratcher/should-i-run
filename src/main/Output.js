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
      data,
      dataRequested,
      mainPollutant
    } = this.props;

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
          <span id="temperature">56 &deg;</span>
        
        </section>
        
        :null
        }


        {dataRequested ?
        
        <section id="locationData">
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
        </section>

        : null
        }

        <MapContainer

          currentLat={currentLat}
          currentLng={currentLng}
          style={{position: "absolute", top: 0, left: 0}}

        />

      </section>

    );

  }

}

  export default Output;
