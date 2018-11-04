import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
import ScoreData from './main/ScoreData';
import Header from './header';
import Footer from './Footer';

class Scheduler extends Component {

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
      selectedDayName: this.days[this.d.getDay()],
      selectedDayIndex: 0,
      deltaSelectedDay: 0,
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
      .catch(error => console.log(`fetchForcast error in Scheduler: ${error}`));

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
          selectedDayWeatherSummary: parsedJSON.daily.data[selectedDayIndex].summary,
          isDaySelected: true
        });
        this.calculateWeatherScore();
      })
      .catch(error => console.log(`fetchForcastBySelectedDay error in Scheduler: ${error}`));

  }

  handleDayChange = e => {
    e.preventDefault();
    
    let selectedDayIndex = e.target.value === "Sunday"
      ? 0
      : e.target.value === "Monday"
      ? 1
      : e.target.value === "Tuesday"
      ? 2
      : e.target.value === "Wednesday"
      ? 3
      : e.target.value === "Thursday"
      ? 4
      : e.target.value === "Friday"
      ? 5
      : e.target.value === "Saturday"
      ? 6
      : null;
        
    this.setState({
      selectedDayName: e.target.value,
      selectedDayIndex: selectedDayIndex,
    });
    
    this.getDeltaSelectedDay();

  }
  
  
  // Get difference in index between selected day and current day to find index to get data
  // selected day index in data array is relative to current day of index 0
  
  getDeltaSelectedDay = () => {
    
    const { selectedDayIndex, currentDayIndex } = this.state;
    
    let dayScale = 7;
    
    this.setState({
      
      deltaSelectedDay: currentDayIndex < selectedDayIndex
      ? (selectedDayIndex - currentDayIndex)
      : currentDayIndex > selectedDayIndex
      ? (dayScale - (currentDayIndex - selectedDayIndex))
      : currentDayIndex === selectedDayIndex
      ? 0
      : null
      
    },
    this.fetchForcastBySelectedDay()
    );
    
  }

  componentDidMount() {
    console.log("Scheduler component mount state: ", this.state);
  }

  render() {

    const {
      isDaySelected,
      selectedDayName,
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

            <Header
                getLocationData={this.getLocationData}
            />

            <section id="scheduler" className="column">

                <h2>Scheduler</h2>

                <p>Pick a day to get information or find the best day in the next week</p>

                <label>Pick a day of the week</label>
                <select value={selectedDayName} onChange={this.handleDayChange}>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
                
                {isDaySelected ?
                  
                    <ScoreData
                  
                      airQuality={selectedDayAQ}
                      currentHumidity={selectedDayHumidity}
                      currentTemp={selectedDayAveragedTemp}
                      currentUV={selectedDayUV}
                      currentWeatherIcon={selectedDayWeatherIcon}
                      currentWeatherSummary={selectedDayWeatherSummary}
                      data={selectedDayData}
                      mainPollutant={selectedDayMainPollutant}
                      selectedDayName={selectedDayName}
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

  export default Scheduler;
