import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
import ScoreData from './main/ScoreData';
import Header from './header';
import Footer from './Footer';

class BestDay extends Component {

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
      bestDay: null,
      bestDayIndex: null,
      bestDayFound: false,
      currentDayName: this.days[this.d.getDay()],
      currentDayIndex: this.d.getDay(),
      selectedDayIndex: null,
      deltaSelectedDay: null,
      currentLat: 38.2527,
      currentLng: -85.7585,
      forcastHumidity: [],
      forcastTempHigh: [],
      forcastTempLow: [],
      forcastTime: [],
      forcastUV: [],
      forcastPrecipProbability: [],
      forcastWeatherScores: [],
      forcastWeatherIcon: "wi wi-na",
      forcastWeatherSummary: "",
      isDaySelected: false,
      selectedDayAQ: 0,
      selectedDayHumidity: 0,
      selectedDayIsRaning: 0,
      selectedDayTempHigh: 0,
      selectedDayTempLow: 0,
      selectedDayAveragedTemp: 0,
      selectedDayUV: 0,
      selectedDayWeatherSummary: "",
      selectedDayData: false,
      selectedDayMainPollutant: "",
      selectedDayUserTempScale: "f",
      selectedDayWeatherIcon: "wi wi-na",
      selectedDayWeatherScore: 0

    };
  }

  // Calculate weather score

  calculateWeatherScore = () => {

    const {
      selectedDayHumidity,
      selectedDayPrecipProbability,
      selectedDayTempHigh,
      selectedDayTempLow,
      selectedDayUV
    } = this.state;

    // Set scales and defaults

    // Normalize data for display

    let humidityScore = selectedDayHumidity * 10;
    let averagedTemp = (selectedDayTempHigh + selectedDayTempLow) / 2;
    let tempScore = this.tempScale - ((Math.abs(this.medianTemp - averagedTemp)) / this.stdDevTemp);
    let uvScore = (this.uvScale - selectedDayUV);
    let rainScore = (this.rainScale - (selectedDayPrecipProbability * 10));

    let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);

    this.setState({
      selectedDayWeatherScore: totalScore,
      selectedDayAveragedTemp: averagedTemp
    });

  }

  findBestDayToRun = () => {

    const {
      forcastTime,
      forcastWeatherScores
    } = this.state;

    // Get highest score in 7 day range from api data

    let index = forcastWeatherScores.indexOf(Math.max(...forcastWeatherScores));

    // Convert millisecond time to date then to day of week index

    let date = new Date(forcastTime[index] * 1000);

    let convertedDate = new Date(date);

    let bestDayIndex = convertedDate.getDay();

    // Get day name from index

    let bestDay =

      bestDayIndex === 0
      ? 'Sunday'
      : bestDayIndex === 1
      ? 'Monday'
      : bestDayIndex === 2
      ? 'Tuesday'
      : bestDayIndex === 3
      ? 'Wednesday'
      : bestDayIndex === 4
      ? 'Thursday'
      : bestDayIndex === 5
      ? 'Friday'
      : bestDayIndex === 6
      ? 'Saturday'
      : null;

      this.setState({
        bestDay: bestDay,
        bestDayIndex: bestDayIndex,
        bestDayFound: true,
      });

      this.getDeltaBestDay();

      this.fetchForcastBySelectedDay();

  }

  // Calculate each day's weather score and push to array then find the best day to run

  calcuateWeatherScoresByDay = () => {

    const {
      forcastHumidity,
      forcastPrecipProbability,
      forcastTempHigh,
      forcastTempLow,
      forcastUV,
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
        forcastWeatherScores: scoresArray
      });

    this.findBestDayToRun();

  }

  // Fetch forcast data and call weather score calculator

  fetchForcast = () => {

    const {currentLat, currentLng} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
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
      .catch(error => console.log(`fetchForcas error in Best Day: ${error}`));

  }

  // Fetch day data and then call weather score calculator

  fetchForcastBySelectedDay = () => {

    const {currentLat, currentLng, selectedDayIndex} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
        this.setState({
          selectedDayHumidity: parsedJSON.daily.data[selectedDayIndex].humidity,
          selectedDayPrecipProbability: parsedJSON.daily.data[selectedDayIndex].precipProbability,
          selectedDayTempHigh: parsedJSON.daily.data[selectedDayIndex].apparentTemperatureHigh,
          selectedDayTempLow: parsedJSON.daily.data[selectedDayIndex].apparentTemperatureLow,
          selectedDayUV: parsedJSON.daily.data[selectedDayIndex].uvIndex,
          selectedDayIsRaning: parsedJSON.daily.data[selectedDayIndex].precipProbability,
          selectedDayWeatherIcon: parsedJSON.daily.data[selectedDayIndex].icon,
          selectedDayWeatherSummary: parsedJSON.daily.data[selectedDayIndex].summary
        });
        this.calculateWeatherScore();
      })
      .catch(error => console.log(`fetchForcastBySelectedDay error in Best Day: ${error}`));

  }

  // Get difference in index between best day and current day to find index to get data
  // best day index in data array is relative to current day of index 0

  getDeltaBestDay = () => {

    const { bestDayIndex, currentDayIndex } = this.state;

    let deltaBestDay = (bestDayIndex - currentDayIndex);

    this.setState({
      selectedDayIndex: deltaBestDay
    });

  }


  componentDidMount() {
    console.log("Best Day mounted state: ", this.state);
  }

  render() {

    const {
      bestDay,
      bestDayFound,
      selectedDayAQ,
      selectedDayHumidity,
      selectedDayAveragedTemp,
      selectedDayUV,
      selectedDayWeatherIcon,
      selectedDayWeatherSummary,
      selectedDayData,
      selectedDayMainPollutant,
      selectedDayUserTempScale,
      selectedDayWeatherScore
    } = this.state;

    return(

        <section id="schedulerSection">

            <Header />

            <section id="bestDay" className="column">

              <h2>Best Day</h2>

              <p>Find the best day to run in the next 7 days</p>


              <label>Find the best day of the week</label>
              <button
                onClick={this.fetchForcast}
              >
                Go
              </button>

              {bestDayFound ?

                  <ScoreData

                    airQuality={selectedDayAQ}
                    bestDay={bestDay}
                    currentHumidity={selectedDayHumidity}
                    currentTemp={selectedDayAveragedTemp}
                    currentUV={selectedDayUV}
                    currentWeatherIcon={selectedDayWeatherIcon}
                    currentWeatherSummary={selectedDayWeatherSummary}
                    data={selectedDayData}
                    mainPollutant={selectedDayMainPollutant}
                    userTempScale={selectedDayUserTempScale}
                    weatherScore={selectedDayWeatherScore}
                  />

              : null

              }

            </section>

            <Footer / >

        </section>

    );

  }

}

  export default BestDay;
