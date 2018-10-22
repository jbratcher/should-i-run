import React, { Component } from 'react';
import MapContainer from './MapContainer';

const clothing = {
        cold: {
          head: "Beanie",
          torso: "Long-sleeve athletic shirt",
          legs: "Insulated track pants",
          feet: "Insulated socks"
        },
        chilly: {
          head: "Baseball cap",
          torso: "Short-sleeve athletic t-shirt",
          legs: "Athletic shorts",
          feet: "Insulated socks"
        },
        neutral: {
          head: "",
          torso: "Short-sleeve athletic t-shirt",
          legs: "Athletic Shorts",
          feet: "Padded socks"
        },
        warm: {
          head: "",
          torso: "Tank top",
          legs: "Athletic Shorts",
          feet: "Padded socks"
        },
        hot: {
          head: "",
          torso: "Tank top",
          legs: "Athletic Shorts",
          feet: "Padded socks"
        }
      };

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
  
  componentDidMount() {
    
    this.getCurrentTempIndex();
    
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
      weatherScore
    } = this.props;
    
    const { currentTempIndex } = this.state;
    
    const getWeatherIcon = 
    
      currentWeatherIcon === "partly-cloudy-day"
        ? "wi wi-day-sunny-overcast"
        : currentWeatherIcon === "wind"
        ? "wi wi-day-windy"
        : currentWeatherIcon ==="sunny" || currentWeatherIcon === "clear-day"
        ? "wi wi-day-sunny"
        : currentWeatherIcon === "clear-night"
        ? "wi wi-night-clear"
        : null;

    let covertedScore = weatherScore.toFixed(1);

    let convertedHumidity = currentHumidity * 100;

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
                {console.log(currentTempIndex)}
                <li id="head">
                  <img alt="head" src="https://via.placeholder.com/100x50" />                
                  <p>{clothing[currentTempIndex].head}</p>
                </li>
                <li id="torso">
                  <img alt="torso" src="https://via.placeholder.com/100x50" />
                  <p>{clothing[currentTempIndex].torso}</p>
                </li>
                <li id="legs">
                  <img alt="legs" src="https://via.placeholder.com/100x50" />
                  <p>{clothing[currentTempIndex].legs}</p>
                </li>
                <li id="feet">
                  <img alt="feet" src="https://via.placeholder.com/100x50" />
                  <p>{clothing[currentTempIndex].feet}</p>
                </li>
              </ul>
            </section>
          
          :null
          }
  
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
            <span id="currentHumidity">{convertedHumidity}% hum.</span>
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
