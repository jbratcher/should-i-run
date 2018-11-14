import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
import ScoreData from './main/ScoreData';
import Header from './header';
import Footer from './Footer';

class Forcast extends Component {

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
      forcastAveragedTemp: [],
      forcastDayNames: [],
      forcastHumidity: [],
      forcastPrecipProbability: [],
      forcastTempHigh: [],
      forcastTempLow: [],
      forcastTime: [],
      forcastUV: [],
      forcastWeatherIcons: [],
      forcastWeatherScores: [],
      forcastWeatherSummary: [],
      isDataReceived: false,
      isDataRequested: false,
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
    
    const averagedTempArray = [];

    for(let i = 0; i <= 7; i++) {

      let humidityScore = forcastHumidity[i] * 10;
      let averagedTemp = (forcastTempHigh[i] + forcastTempLow[i]) / 2;
      let tempScore = this.tempScale - ((Math.abs(this.medianTemp - averagedTemp)) / this.stdDevTemp);
      let uvScore = (this.uvScale - forcastUV[i]);
      let rainScore = (this.rainScale - (forcastPrecipProbability[i] * 10));

      let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);

      averagedTempArray.push(averagedTemp);

      scoresArray.push(totalScore);

    }

    this.setState({
        forcastWeatherScores: scoresArray,
        forcastAveragedTemp: averagedTempArray,
    });
    
    this.setState({
      isDataReceived: true,
      isDataRequested: false
    });
    
  }

  // Fetch forcast data, set day names array, and calculate weather scores

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
          forcastWeatherIcons: parsedJSON.daily.data.map(d => d.icon),
          forcastWeatherSummary: parsedJSON.daily.data.map(d => d.summary),
          isDataRequested: true
        });
        this.getForcastDayNames();
        this.calcuateWeatherScoresByDay();
      })
      .catch(error => console.log(`fetchForcast error in Scheduler: ${error}`));

  }
  
  // Create array of day names starting with the current day of the week
  
  getForcastDayNames = () => {
    
    const { forcastDayNames } = this.state;
    
    for(let i = 0; i < 7 ; i++) {
      forcastDayNames[i] = this.days[(this.d.getDay() + i)];
    }
    
  }
  
  getForcastScores = () => {
    
    const {
      forcastHumidity,
      forcastAveragedTemp,
      forcastUV,
      forcastWeatherIcons,
      forcastWeatherSummary,
      forcastDayNames,
      userTempScale,
      forcastWeatherScores
    } = this.state;
    
    let scoreBoard = [];
    
    let scoreData = [];
    
    for (let i = 0; i < 7; i++) {
      
      scoreData.push(
        
          <ScoreData
            key={i}
            currentHumidity={forcastHumidity[i]}
            currentTemp={forcastAveragedTemp[i]}
            currentUV={forcastUV[i]}
            currentWeatherIcon={forcastWeatherIcons[i]}
            currentWeatherSummary={forcastWeatherSummary[i]}
            forcastDayName={forcastDayNames[i]}
            userTempScale={userTempScale}
            weatherScore={forcastWeatherScores[i]}
          />
      )
      
    }
    
    scoreBoard.push(scoreData);
    
    return scoreBoard;
    
  }
  
  componentWillMount() {
    
    this.fetchForcast();

  }

  render() {
    
    const {
      isDataRequested,
      isDataReceived
    } = this.state;

    return(

        <section id="forcastSection">

            <Header/>

            <section id="sevenDayForcast" className="column">

                <h2>7 Day Forcast</h2>
                
                {/* Render ul once data is received */}

                { isDataRequested ?
                
                  <h3>Loading...</h3>
                
                : isDataReceived ?

                <ul>

                  {this.getForcastScores()}
                  
                </ul>

                : null }

            </section>

            <Footer / >

        </section>

    );

  }

}

  export default Forcast;
