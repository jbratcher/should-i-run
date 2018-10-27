import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Clothing from '../data/Clothing';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTempIndex: ""

    };
  }

  getCurrentTempIndex = () => {

    const { currentTemp } = this.props;

    currentTemp >= 85
      ? this.setState({
          currentTempIndex: "hot"
        })
      : currentTemp < 85 && currentTemp >= 75
      ? this.setState({
          currentTempIndex: "warm"
        })
      : currentTemp < 75  && currentTemp >= 65
      ? this.setState({
          currentTempIndex: "neutral"
        })
      : currentTemp < 55 && currentTemp >=45
      ? this.setState({
          currentTempIndex: "chilly"
        })
      : currentTemp < 45
      ? this.setState({
          currentTempIndex: "cold"
        })
      : this.setState({
          currentTempIndex: ""
        });
      
  }

  getUserWarmthPrefernce = () => {

    const { userWarmthPreference } = this.props;
    

    userWarmthPreference === "maxCool"
      ? this.setState({
        currentTempIndex: "hot"
      })
      : userWarmthPreference === "modCool"
      ? this.setState({
        currentTempIndex: "warm"
      })
      : userWarmthPreference === "neutral"
      ? this.setState({
        currentTempIndex: "neutral"
      })
      : userWarmthPreference === "modWarmth"
      ? this.setState({
        currentTempIndex: "chilly"
      })
      : userWarmthPreference === "maxWarmth"
      ? this.setStae({
        currentTempIndex: "cold"
      })
      : this.setState({
        currentTempIndex: this.state.currentTempIndex
      });


  }

  componentDidMount() {

    this.getCurrentTempIndex();
    
    this.getUserWarmthPrefernce();

  }



  render() {

    const {
      airQuality,
      currentHumidity,
      currentLat,
      currentLng,
      currentTemp,
      currentUV,
      currentWeatherIcon,
      currentWeatherSummary,
      data,
      dataRequested,
      mainPollutant,
      userTempScale,
      weatherScore
    } = this.props;

    const { currentTempIndex } = this.state;

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
        : currentWeatherIcon ==="sunny" || currentWeatherIcon === "clear-day"
        ? "wi wi-day-sunny"
        : currentWeatherIcon === "clear-night"
        ? "wi wi-night-clear"
        : currentWeatherIcon === "partly-cloudy-night"
        ? "wi wi-night-partly-cloudy"
        : currentWeatherIcon === "cloudy"
        ? "wi wi-cloudy"
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

      <section id="outputContainer">

        <section id="dataOutput">

          {dataRequested ?

            <section id="clothesData">
              <ul id="clothing">
                <li id="head">
                  {Clothing[currentTempIndex].head.text ? 
                  <React.fragement>
                    <img alt="head" src={Clothing[currentTempIndex].head.imgsrc} />
                    <p>{Clothing[currentTempIndex].head.text}</p>
                  </React.fragement>
                  : null }
                </li>
                <li id="torso">
                  <img alt="torso" src={Clothing[currentTempIndex].torso.imgsrc} />
                  <p>{Clothing[currentTempIndex].torso.text}</p>
                </li>
                <li id="legs">
                  <img alt="legs" src={Clothing[currentTempIndex].legs.imgsrc} />
                  <p>{Clothing[currentTempIndex].legs.text}</p>
                </li>
                <li id="feet">
                  <img alt="feet" src={Clothing[currentTempIndex].feet.imgsrc} />
                  <p>{Clothing[currentTempIndex].feet.text}</p>
                </li>
              </ul>
            </section>

          :null
          }

          {dataRequested ?

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
            <p id="locationOutput">
              <span id="cityOutput">{data.city}</span>
              <span id="stateOutput">{data.state}</span>
              <span id="countryOutput">{data.country}</span>
            </p>

          </section>

          :null
          }

        </section>

        <MapContainer

          currentLat={currentLat}
          currentLng={currentLng}

        />

      </section>

    );

  }

}

  export default Output;
