import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import Footer from './Footer';
import { apiKey, darkskyApiKey } from './secrets';
import './css/App.css';
import './css/weather-icons.min.css';

// App Component Main

class App extends Component {

  constructor() {
    super();

    this.state = {
      airQuality: 0,
      cityInput: "",
      cityList: [],
      countryInput: "",
      countryList: [],
      currentWeatherIcon: "wi wi-sunny-day",
      currentLat: 38.2527,
      currentLng: -85.7585,
      currentHumidity: 0,
      currentTemp: 0,
      currentUV: 0,
      data: {},
      dataRequested: false,
      isRaining: false,
      mainPollutant: "",
      stateInput: "",
      stateList: [],
      userTempScale: "f",
      userWarmthPreference: "neutral",
      weatherScore: 0
    };

  }

  // Calculate weather score

  calculateWeatherScore = () => {

    const { currentHumidity, currentTemp, currentUV } = this.state;

    // let humidityScale = 1;
    let medianTemp = 55;
    let stdDevTemp = 5;
    let tempScale = 10;
    let uvScale = 10;

    let humidityScore = currentHumidity * 10;
    let tempScore = tempScale - ((Math.abs(medianTemp - currentTemp)) / stdDevTemp);
    let uvScore = Math.abs(uvScale - currentUV);
    let rainScore = this.state.isRaining ? 0.7 : 1;

    let totalScore = ((tempScore + uvScore + humidityScore) * rainScore) / 3;

    this.setState({
      weatherScore: totalScore
    });

  }

  // Fetch Dark Sky current weather conditions

  fetchCurrentConditions = () => {

    const {currentLat, currentLng} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
        console.log(parsedJSON);
        this.setState({
          currentHumidity: parsedJSON.currently.humidity,
          currentTemp: parsedJSON.currently.apparentTemperature,
          currentUV: parsedJSON.currently.uvIndex,
          currentWeatherIcon: parsedJSON.currently.icon,
          currentWeatherSummary: parsedJSON.currently.summary,
        });
        this.calculateWeatherScore();
        console.log(this.state);
      })
      .catch(error => console.log(error));

  }

  // Populate city, state and county select lists

  fetchCityList = (e) => {

    fetch(`https://api.airvisual.com/v2/cities?state=${e.target.value}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(city => {
        return this.setState({
          cityList: [...this.state.cityList, city.city]
        });
      }))
      .catch(err => console.log(err));

  }

  fetchStateList = (e) => {

    fetch(`https://api.airvisual.com/v2/states?country=${e.target.value}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(state => {
        return this.setState({
          stateList: [...this.state.stateList, state.state]
        });
      }))
      .catch(err => console.log(err));

  }

  fetchCountryList = () => {

    fetch(`https://api.airvisual.com/v2/countries?key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(country => {
        return this.setState({
          countryList: [...this.state.countryList, country.country],
        });
      }))
      .catch(err => console.log(err));
  }

  fetchLocation = () => {

    fetch(`https://api.airvisual.com/v2/nearest_city?key=${apiKey}`)
    .then(res => res.json())
    .then(parsedJSON => {
      this.setState({
        data: parsedJSON.data,
        cityInput: parsedJSON.data.city,
        stateInput: parsedJSON.data.state,
        countryInput: parsedJSON.data.country,
        airQuality : parsedJSON.data.current.pollution.aqius,
        mainPollutant: parsedJSON.data.current.pollution.mainus,
        currentLat: parsedJSON.data.location.coordinates[1],
        currentLng: parsedJSON.data.location.coordinates[0]
      });
      this.fetchCurrentConditions();
    })
    .catch(err => console.log('Error: ', err));

  }

  fetchStd = () => {

    fetch(`https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => {
        this.setState({
          currentLat: parsedJSON.data.location.coordinates[1],
          currentLng: parsedJSON.data.location.coordinates[0],
          data: parsedJSON.data,
          airQuality : parsedJSON.data.current.pollution.aqius,
          mainPollutant: parsedJSON.data.current.pollution.mainus
        });
      })
      .catch(err => console.log('Error: ', err));

  }

  getData = e => {
    e.preventDefault();

    this.setState({
      cityInput: this.state.cityInput,
      stateinput: this.state.stateInput,
      countryInput: this.state.countryInput,
      dataRequested: true
    });

    this.fetchStd();
  }


  getLocationData = e => {
    e.preventDefault();

    this.setState({
      dataRequested: true
    });

    this.fetchLocation();

  }

  handleCityInput = e => {
    this.setState({
      cityInput: e.target.value
    });
  }

  handleCountryInput = e => {
    this.setState({
      countryInput: e.target.value,
      cityInput: "",
      cityList: [],
      stateInput: "",
      stateList: []
    });
    this.fetchStateList(e);
  }

  handleStateInput = e => {
    this.setState({
      stateInput: e.target.value,
      cityInput: "",
      cityList: []
    });
    this.fetchCityList(e);
  }

  handleScaleChange = (e) => {
    this.setState({
      userTempScale: e.target.value
    });
  }

  handleWarmthPrefChange = (e) => {
    this.setState({
      userWarmthPreference: e.target.value
    });
  }



  // Populate selects with country, state, and city data

  componentDidMount() {

    this.fetchCountryList();

    this.setState({
      countryInput: this.state.countryList[70]
    });

  }

  render() {

    const {
      airQuality ,
      cityInput,
      cityList,
      countryInput,
      countryList,
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
      stateInput,
      stateList,
      userTempScale,
      userWarmthPreference,
      weatherScore
    } = this.state;

    return (

      <div className="App">

        <Header

          getLocationData={this.getLocationData}

        />

        <Main

          airQuality={airQuality}
          cityInput={cityInput}
          cityList={cityList}
          countryInput={countryInput}
          countryList={countryList}
          currentHumidity={currentHumidity}
          currentLat={currentLat}
          currentLng={currentLng}
          currentTemp={currentTemp}
          currentUV={currentUV}
          currentWeatherIcon={currentWeatherIcon}
          currentWeatherSummary={currentWeatherSummary}
          data={data}
          dataRequested={dataRequested}
          getData={this.getData}
          getLocationData={this.getLocationData}
          handleCityInput={this.handleCityInput}
          handleCountryInput={this.handleCountryInput}
          handleStateInput={this.handleStateInput}
          handleScaleChange={this.handleScaleChange}
          handleWarmthPrefChange={this.handleWarmthPrefChange}
          mainPollutant={mainPollutant}
          stateInput={stateInput}
          stateList={stateList}
          userTempScale={userTempScale}
          userWarmthPreference={userWarmthPreference}
          weatherScore={weatherScore}

        />

        <Footer />

      </div>

    );
  }
}

export default App;
