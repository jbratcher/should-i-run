import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
import Header from './header';
import Footer from './Footer';

class Scheduler extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bestDay: '',
      bestDayFound: false,
      currentLat: 38.2527,
      currentLng: -85.7585,
      forcastHumidity: [],
      forcastTempHigh: [],
      forcastTempLow: [],
      forcastTime: [],
      forcastUV: [],
      forcastPrecipProbability: [],
      forcastWeatherScores: []
    };
  }
  
  findBestDayToRun = () => {
    
    const {
      forcastTime,
      forcastWeatherScores
    } = this.state;
    
    let index = forcastWeatherScores.indexOf(Math.max(...forcastWeatherScores));
    
    let date = new Date(forcastTime[index] * 1000);
    
    let convertedDate = new Date(date);
    
    let bestDayIndex = convertedDate.getDay();
    
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
        bestDayFound: true
      });
      
  }
    
  
  calcuateWeatherScoresByDay = () => {
    
    const { 
      forcastHumidity, 
      forcastPrecipProbability, 
      forcastTempHigh,
      forcastTempLow,
      forcastUV,
    } = this.state;
    
    const scoresArray = [];

    let medianTemp = 55;
    let stdDevTemp = 5;
    let tempScale = 10;
    let uvScale = 10;
    let rainScale = 10;
    
    for(let i=0; i <=7; i++) {
      
      let humidityScore = forcastHumidity[i] * 10;
      let averagedTemp = (forcastTempHigh[i] + forcastTempLow[i]) / 2;
      let tempScore = tempScale - ((Math.abs(medianTemp - averagedTemp)) / stdDevTemp);
      let uvScore = (uvScale - forcastUV[i]);
      let rainScore = (rainScale - (forcastPrecipProbability[i] * 10));

      let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);
      
      scoresArray.push(totalScore);
      
    }
    
    this.setState({
        forcastWeatherScores: scoresArray
      });
    
    this.findBestDayToRun();
    
  }
  
  
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
          forcastTime: parsedJSON.daily.data.map(d => d.sunriseTime)
        });
        this.calcuateWeatherScoresByDay();
        console.log(this.state);
      })
      .catch(error => console.log(error));

  }

  render() {
    
    const {
      bestDay,
      bestDayFound
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
                <select>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>
                
                <label>Find the best day of the week</label>
                <button
                  onClick={this.fetchForcast}
                >
                  Go
                </button>
                
                {bestDayFound ?
                
                  <p>
                    {`The best day to run is ${bestDay}`}
                  </p>
                  
                : null
                
                }
            
            </section>
            
            <Footer / >
        
        </section>
          
    );

  }

}

  export default Scheduler;
