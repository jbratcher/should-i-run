import React, { Component } from 'react';
import MapContainer from './MapContainer';

const clothing = {
        cold: {
          head: {
              text: "Beanie",
              imgsrc: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1533851320-everlane-1533851313.jpg"
          },
          torso: {
            text: "Long-sleeve athletic shirt",
            imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqcsbsQ30ATXDyrEMidoBC4PGQvzDGqlXyehQLyjqHiTJOzxFu"
          },
          legs: {
            text: "Insulated track pants" ,
            imgsrc: "https://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw6af579dc/images/hi-res/24102_BLK.jpg?sw=300&sh=300&sfrm=png"
          },
          feet: {
            text: "Insulated socks",
            imgsrc: "https://www.verywellfit.com/thmb/Wox_s1mhrS095uy3_IQCjjcK1Pw=/1001x1001/filters:no_upscale()/darntoughvermontsocks-56a83a963df78cf7729d2a76.jpg"
          }
        },
        chilly: {
          head: {
            text: "Baseball cap",
            imgsrc: "https://images-na.ssl-images-amazon.com/images/I/81vqBRNIuKL._UX522_.jpg"
          },
          torso: {
            text: "Short-sleeve athletic t-shirt",
            imgsrc: "https://alltopguide.com/wp-content/uploads/2016/08/B01AQR03N0.jpg"
          },
          legs: {
            text: "Athletic shorts",
            imgsrc: "https://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbe64c536/images/hi-res/24632_BLK.jpg?sw=750&sh=750&sm=fit&sfrm=png"
          },
          feet: {
            text: "Insulated socks",
            imgsrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqcsbsQ30ATXDyrEMidoBC4PGQvzDGqlXyehQLyjqHiTJOzxFu"
          }
        },
        neutral: {
          head: {
            text: "",
            imgsrc: "https://via.placeholder.com/1x1"
          },
          torso: {
            text: "Short-sleeve athletic t-shirt",
            imgsrc: "https://alltopguide.com/wp-content/uploads/2016/08/B01AQR03N0.jpg"
          },
          legs: {
            text: "Athletic shorts",
            imgsrc: "https://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbe64c536/images/hi-res/24632_BLK.jpg?sw=750&sh=750&sm=fit&sfrm=png"
          },
          feet: {
            text: "Padded socks",
            imgsrc: "https://images-na.ssl-images-amazon.com/images/I/91KJNYH1pVL._SX355_.jpg"
          }
        },
        warm: {
          head: {
            text: "",
            imgsrc: "https://via.placeholder.com/1x1"
          },
          torso: {
            text: "Tank top",
            imgsrc: "http://d3d71ba2asa5oz.cloudfront.net/62001083/images/jn305-royalwhite.jpg"
          },
          legs: {
            text: "Athletic shorts",
            imgsrc: "https://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbe64c536/images/hi-res/24632_BLK.jpg?sw=750&sh=750&sm=fit&sfrm=png"
          },
          feet: {
            text: "Padded socks",
            imgsrc: "https://images-na.ssl-images-amazon.com/images/I/91KJNYH1pVL._SX355_.jpg"
          }
        },
        hot: {
          head: {
            text: "",
            imgsrc: "https://via.placeholder.com/1x1"
          },
          torso: {
            text: "Tank top",
            imgsrc: "http://d3d71ba2asa5oz.cloudfront.net/62001083/images/jn305-royalwhite.jpg"
          },
          legs: {
            text: "Athletic shorts",
            imgsrc: "https://www.patagonia.com/dis/dw/image/v2/ABBM_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbe64c536/images/hi-res/24632_BLK.jpg?sw=750&sh=750&sm=fit&sfrm=png"
          },
          feet: {
            text: "Padded socks",
            imgsrc: "https://images-na.ssl-images-amazon.com/images/I/91KJNYH1pVL._SX355_.jpg"
          }
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
                  <img alt="head" src={clothing[currentTempIndex].head.imgsrc} />
                  <p>{clothing[currentTempIndex].head.text}</p>
                </li>
                <li id="torso">
                  <img alt="torso" src={clothing[currentTempIndex].torso.imgsrc} />
                  <p>{clothing[currentTempIndex].torso.text}</p>
                </li>
                <li id="legs">
                  <img alt="legs" src={clothing[currentTempIndex].legs.imgsrc} />
                  <p>{clothing[currentTempIndex].legs.text}</p>
                </li>
                <li id="feet">
                  <img alt="feet" src={clothing[currentTempIndex].feet.imgsrc} />
                  <p>{clothing[currentTempIndex].feet.text}</p>
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
