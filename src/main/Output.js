import React, { Component } from 'react';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {
      weatherScore: 0
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
      currentUV,
      weatherScore
    } = this.props;

    const getWeatherIcon = currentWeatherIcon === "partly-cloudy-day"
      ? "wi wi-day-sunny-overcast"
      : currentWeatherIcon === "wind"
      ? "wi wi-day-windy"
      : currentWeatherIcon ==="sunny" || currentWeatherIcon === "clear-day"
      ? "wi wi-day-sunny"
      : currentWeatherIcon === "clear-night"
      ? "wi wi-night-clear"
      : null;

    let covertedScore = weatherScore.toFixed(1);

    const weatherScoreRating =

      covertedScore >= 7.5
        ? 'Good'
        : covertedScore >= 5 && covertedScore < 7.5
        ? 'Average'
        : covertedScore >= 2.5 && covertedScore < 5
        ? 'Poor'
        : covertedScore >= 0 && covertedScore < 2.5
        ? 'Miserable'
        : null;

    const getWeatherScoreRatingColor =

      weatherScoreRating === 'Good'
        ? 'green'
        : weatherScoreRating === 'Average'
        ? 'blue'
        : weatherScoreRating === 'Poor'
        ? 'yellow'
        : weatherScoreRating === 'Miserable'
        ? 'red'
        : null;

    return(

      <section id="dataOutput">

        {dataRequested ?

        <section id="scoreData">
          <i id="weatherIcon" className={getWeatherIcon}
          ></i>
          <span id="weatherSummary">{currentWeatherSummary}</span>
          <span id="weatherScore" className={getWeatherScoreRatingColor}>
            {covertedScore}
            <span id="weatherScoreRating">
              ({weatherScoreRating})
            </span>
          </span>
          <span id="currentUV">UV Index: {currentUV}</span>
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
