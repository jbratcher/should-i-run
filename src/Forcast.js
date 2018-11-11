import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
// import ScoreData from './main/ScoreData';
import Header from './header';
import Footer from './Footer';

class Forcast extends Component {

  constructor(props) {
    super(props);

    this.d = new Date();

    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    this.medianTemp = 55;
    this.stdDevTemp = 5;
    this.tempScale = 10;
    this.uvScale = 10;
    this.rainScale = 10;

    this.state = {
      currentDayName: this.days[this.d.getDay()],
      currentDayIndex: this.d.getDay(),
      currentLat: 38.2527,
      currentLng: -85.7585,
      forcastHumidity: [],
      forcastPrecipProbability: [],
      forcastTempHigh: [],
      forcastTempLow: [],
      forcastAveragedTemp: [],
      forcastTime: [],
      forcastUV: [],
      forcastWeatherIcons: [],
      forcastWeatherScores: [],
      forcastWeatherSummary: [],
      isDataReceived: false,
      userTempScale: 'f'

    };
  }

  // Calculate each day's weather score and push to array then find the best day to run

  calcuateWeatherScoresByDay = () => {

    const {
      forcastHumidity,
      forcastTempHigh,
      forcastTempLow,
      forcastUV,
      forcastPrecipProbability
    } = this.state;

    const scoresArray = [];

    for(let i=0; i <=7; i++) {

      let humidityScore = forcastHumidity[i] * 10;
      let averagedTemp = (forcastTempHigh[i] + forcastTempLow[i]) / 2;
      let tempScore = this.tempScale - ((Math.abs(this.medianTemp - averagedTemp)) / this.stdDevTemp);
      let uvScore = (this.uvScale - forcastUV[i]);
      let rainScore = (this.rainScale - (forcastPrecipProbability[i] * 10));

      let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);

      scoresArray.push(totalScore);

    }

    this.setState({
        forcastWeatherScores: scoresArray,
        forcastAveragedTemp: this.averagedTemp,
        isDataReceived: true
    });

  }

  // Fetch forcast data and call weather score calculator

  fetchForcast = () => {

    const {currentLat, currentLng} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
        console.log(parsedJSON);
        this.setState({
          forcastHumidity: parsedJSON.daily.data.map(d => d.humidity),
          forcastPrecipProbability: parsedJSON.daily.data.map(d => d.precipProbability),
          forcastTempHigh: parsedJSON.daily.data.map(d => d.apparentTemperatureHigh),
          forcastTempLow: parsedJSON.daily.data.map(d => d.apparentTemperatureLow),
          forcastUV: parsedJSON.daily.data.map(d => d.uvIndex),
          forcastIsRaning: parsedJSON.daily.data.map(d => d.precipProbability),
          forcastTime: parsedJSON.daily.data.map(d => d.sunriseTime),
          forcastWeatherIcon: parsedJSON.daily.data.map(d => d.icon),
          forcastWeatherSummary: parsedJSON.daily.data.map(d => d.summary)
        });
        this.calcuateWeatherScoresByDay();
      })
      .catch(error => console.log(`fetchForcast error in Scheduler: ${error}`));

  }
  componentDidMount() {
    console.log("Forcast component mount state: ", this.state);
    this.fetchForcast();
  }

  render() {

    return(

        <section id="forcastSection">

            <Header
                getLocationData={this.getLocationData}
            />

            <section id="sevenDayForcast" className="column">

                <h2>7 Day Forcast</h2>

                {isDataReceived ?

                <ul>

                  <scoreData

                    currentHumidity={forcastHumidity[1]}
                    currentTemp={forcastAveragedTemp[1]}
                    currentUV={forcastUV[1]}
                    currentWeatherIcon={forcastWeatherIcons[1]}
                    currentWeatherSummary={forcastWeatherSummary[1]}
                    weatherScore={forcastWeatherScores[1]}

                  />

                </ul>

                : null }

            </section>

            <Footer / >

        </section>

    );

  }

}

  export default Forcast;
