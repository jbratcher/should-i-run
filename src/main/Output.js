import React, { Component } from 'react';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherScore: null
    };
  }
  
  

  render() {

    const {
      airQuality,
      currentWeatherIcon,
      currentWeatherSummary,
      currentLat,
      currentLng,
      currentTemp,
      data,
      dataRequested,
      mainPollutant,
      weatherScore
    } = this.props;
    
    const getWeatherIcon = (currentWeatherIcon === "partly-cloudy-day")
      ? "wi wi-day-sunny-overcast"
      : currentWeatherIcon === "wind"
      ? "wi wi-day-windy"
      : currentWeatherIcon ==='sunny'
      ? "wi wi-day-sunny"
      : null;
      
    
    return(

      <section id="dataOutput">

        {dataRequested ?

        <section id="scoreData">
          <i id="weatherIcon" className={getWeatherIcon}
          ></i>
          <span id="weatherSummary">{currentWeatherSummary}</span>
          <span id="weatherScore">
            {weatherScore}
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
          <span id="temperature">{parseInt(currentTemp, 10)} &deg;F</span>
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
