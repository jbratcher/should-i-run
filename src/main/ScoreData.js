import React, { Component } from 'react';

class ScoreData extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
      airQuality,
      currentHumidity,
      currentTemp,
      currentUV,
      currentWeatherIcon,
      currentWeatherSummary,
      data,
      mainPollutant,
      userTempScale,
      weatherScore
    } = this.props;

    // Number converstions

    let formattedTemperatureScale = userTempScale.toUpperCase();

    let convertedTemperature =

      userTempScale === "f"
        ? currentTemp
        : userTempScale === "c"
        ? ((currentTemp - 32) * (5/9))
        : userTempScale === "k"
        ? ((currentTemp - 32) *(5/9) + 273.15)
        : "";

    let formattedTemperature = `${parseInt(convertedTemperature, 10)} ° ${formattedTemperatureScale}`;

    let covertedScore = weatherScore.toFixed(1);

    let convertedHumidity = parseInt((currentHumidity * 100), 10);

    // calculate scores

    const getWeatherIcon =

      currentWeatherIcon === "partly-cloudy-day"
        ? "wi wi-day-sunny-overcast"
        : currentWeatherIcon === "wind"
        ? "wi wi-day-windy"
        : currentWeatherIcon === "sunny" || currentWeatherIcon === "clear-day"
        ? "wi wi-day-sunny"
        : currentWeatherIcon === "clear-night"
        ? "wi wi-night-clear"
        : currentWeatherIcon === "partly-cloudy-night"
        ? "wi wi-night-partly-cloudy"
        : currentWeatherIcon === "cloudy"
        ? "wi wi-cloudy"
        : currentWeatherIcon === "rain"
        ? "wi wi-rain"
        : currentWeatherIcon === "snow"
        ? "wi wi-snow"
        : currentWeatherIcon === "sleet"
        ? "wi wi-sleet"
        : currentWeatherIcon === "fog"
        ? "wi wi-fog"
        : null;
        
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

      <section id="scoreData">
        
        <i id="weatherIcon" className={getWeatherIcon}
        ></i>
        <span id="weatherSummary">
          {currentWeatherSummary}
        </span>
        <span id="weatherScore" className={getWeatherScoreRatingColor}>
          {covertedScore}
          <span id="weatherScoreRating">
            ({weatherScoreRating})
          </span>
        </span>
        <span id="currentUV">
          UV Index: {currentUV}
        </span>
        <span id="currentHumidity">
          {convertedHumidity}% hum.
        </span>
        <span id="airQuality">
          {airQuality}
          <span id="mainParticulate">
            ({mainPollutant})
          </span>
        </span>
        <span id="temperature">
          {formattedTemperature}
        </span>
        
        {data ?
        
        <p id="locationOutput">
          <span id="cityOutput">{data.city}</span>
          <span id="stateOutput">{data.state}</span>
          <span id="countryOutput">{data.country}</span>
        </p>
        
        : null
        }

      </section>

    );

  }

}

  export default ScoreData;
