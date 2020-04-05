import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
import ScoreData from './main/ScoreData';
import Header from './header';
import Footer from './Footer';

class Forecast extends Component {

  constructor(props) {
    super(props);

    this.d = new Date();

    // repeated days to get 7 days out from any selected day (i.e. Saturday to Sunday)
    
    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
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
      forecastAveragedTemp: [],
      forecastDayNames: [],
      forecastHumidity: [],
      forecastPrecipProbability: [],
      forecastTempHigh: [],
      forecastTempLow: [],
      forecastTime: [],
      forecastUV: [],
      forecastWeatherIcons: [],
      forecastWeatherScores: [],
      forecastWeatherSummary: [],
      isDataReceived: false,
      isDataRequested: false,
      userTempScale: 'f'

    };
  }

  // Calculate each day's weather score and push to array then find the best day to run

  calcuateWeatherScoresByDay = () => {

    const {
      forecastHumidity,
      forecastTempHigh,
      forecastTempLow,
      forecastUV,
      forecastPrecipProbability
    } = this.state;

    const scoresArray = [];
    
    const averagedTempArray = [];

    for(let i = 0; i <= 7; i++) {

      let humidityScore = forecastHumidity[i] * 10;
      let averagedTemp = (forecastTempHigh[i] + forecastTempLow[i]) / 2;
      let tempScore = this.tempScale - ((Math.abs(this.medianTemp - averagedTemp)) / this.stdDevTemp);
      let uvScore = (this.uvScale - forecastUV[i]);
      let rainScore = (this.rainScale - (forecastPrecipProbability[i] * 10));

      let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);

      averagedTempArray.push(averagedTemp);

      scoresArray.push(totalScore);

    }

    this.setState({
      forecastWeatherScores: scoresArray,
      forecastAveragedTemp: averagedTempArray,
      isDataRequested: false,
      isDataReceived: true
    });
    
  }

  // Fetch forecast data, set day names array, and calculate weather scores

  fetchForecast = () => {

    const {currentLat, currentLng} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
        this.setState({
          forecastHumidity: parsedJSON.daily.data.map(d => d.humidity),
          forecastPrecipProbability: parsedJSON.daily.data.map(d => d.precipProbability),
          forecastTempHigh: parsedJSON.daily.data.map(d => d.apparentTemperatureHigh),
          forecastTempLow: parsedJSON.daily.data.map(d => d.apparentTemperatureLow),
          forecastUV: parsedJSON.daily.data.map(d => d.uvIndex),
          forecastIsRaning: parsedJSON.daily.data.map(d => d.precipProbability),
          forecastTime: parsedJSON.daily.data.map(d => d.sunriseTime),
          forecastWeatherIcons: parsedJSON.daily.data.map(d => d.icon),
          forecastWeatherSummary: parsedJSON.daily.data.map(d => d.summary),
          isDataRequested: true
        });
        this.getForecastDayNames();
        this.calcuateWeatherScoresByDay();
      })
      .catch(error => console.log(`fetchForecast error in Scheduler: ${error}`));

  }
  
  // Create array of day names starting with the current day of the week
  
  getForecastDayNames = () => {
    
    const { forecastDayNames } = this.state;
    
    for(let i = 0; i < 7 ; i++) {
      forecastDayNames[i] = this.days[(this.d.getDay() + i)];
    }
    
  }
  
  getForecastScores = () => {
    
    const {
      forecastHumidity,
      forecastAveragedTemp,
      forecastUV,
      forecastWeatherIcons,
      forecastWeatherSummary,
      forecastDayNames,
      userTempScale,
      forecastWeatherScores
    } = this.state;
    
    let scoreBoard = [];
    
    let scoreData = [];
    
    for (let i = 0; i < 7; i++) {
      
      scoreData.push(
        
          <ScoreData
            key={i}
            currentHumidity={forecastHumidity[i]}
            currentTemp={forecastAveragedTemp[i]}
            currentUV={forecastUV[i]}
            currentWeatherIcon={forecastWeatherIcons[i]}
            currentWeatherSummary={forecastWeatherSummary[i]}
            forecastDayName={forecastDayNames[i]}
            userTempScale={userTempScale}
            weatherScore={forecastWeatherScores[i]}
          />
      )
      
    }
    
    scoreBoard.push(scoreData);
    
    return scoreBoard;
    
  }
  
  componentWillMount() {
    
    this.fetchForecast();

  }

  render() {
    
    const {
      isDataRequested,
      isDataReceived
    } = this.state;

    return(

        <section id="forecastSection">

            <Header/>

            <section id="sevenDayForecast" className="column">

                <h2>7 Day Forecast</h2>
                
                {/* Render ul once data is received */}

                { isDataRequested ?
                
                  <h3>Loading...</h3>
                
                : isDataReceived ?

                <ul>

                  {this.getForecastScores()}
                  
                </ul>

                : null }

            </section>

            <Footer / >

        </section>

    );

  }

}

  export default Forecast;
