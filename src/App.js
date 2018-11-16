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

    // Set scales for weather score calculations

    this.medianTemp = 55;
    this.stdDevTemp = 5;
    this.tempScale = 10;
    this.uvScale = 10;
    this.rainScale = 10;

    this.state = {
      airQuality: 0,
      cityInput: "Louisville",
      cityList: [],
      countryInput: "USA",
      countryList: [],
      currentWeatherIcon: "wi wi-sunny-day",
      currentLat: 38.2527,
      currentLng: -85.7585,
      currentHumidity: 0,
      currentPrecipProbability: 0,
      currentTemp: 0,
      currentUV: 0,
      data: {},
      dataReceived: false,
      dataRequested: false,
      mainPollutant: "",
      stateInput: "Kentucky",
      stateList: [],
      userTempScale: "f",
      userWarmthPreference: "neutral",
      weatherScore: 0
    };

  }

  // Calculate weather score

  calculateWeatherScore = () => {

    const {
      currentHumidity,
      currentPrecipProbability,
      currentTemp,
      currentUV
    } = this.state;

    // Calculate scores

    let humidityScore = currentHumidity * 10;
    let tempScore = this.tempScale - ((Math.abs(this.medianTemp - currentTemp)) / this.stdDevTemp);
    let uvScore = (this.uvScale - currentUV);
    let rainScore = (this.rainScale - (currentPrecipProbability * 10));

    // Combine scores and average

    let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);

    this.setState({
      weatherScore: totalScore,
      dataRequested: false,
      dataReceived: true
    });

  }

  // Fetch Dark Sky current weather conditions and calculate weather score

  fetchCurrentConditions = () => {

    const {currentLat, currentLng} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
        console.log("Fetch Current Conditions: ", parsedJSON);
        this.setState({
          currentHumidity: parsedJSON.currently.humidity,
          currentPrecipProbability: parsedJSON.currently.precipProbability,
          currentTemp: parsedJSON.currently.apparentTemperature,
          currentUV: parsedJSON.currently.uvIndex,
          currentWeatherIcon: parsedJSON.currently.icon,
          currentWeatherSummary: parsedJSON.currently.summary,
        });
        this.calculateWeatherScore();
      })
      .catch(error => console.log("fetchCurrentConditions in App component", error));

  }

  // Populate city, state and county select lists

  fetchCityList = e => {

    fetch(`https://api.airvisual.com/v2/cities?state=${e.target.value}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(city => {
        return this.setState({
          cityList: [...this.state.cityList, city.city],
          cityInput: this.state.cityList[0]
        });
      }))
      .catch(error => console.log("Fetch city list in App component", error));

  }

  fetchDefaultCityList = (state, country) => {

    fetch(`https://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(city => {
        return this.setState({
          cityList: [...this.state.cityList, city.city],
          cityInput: "Louisville"
        });
      }))
      .catch(error => console.log("Fetch city list in App component", error));

  }


  fetchStateList = e => {

    fetch(`https://api.airvisual.com/v2/states?country=${e.target.value}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(state => {
        return this.setState({
          stateList: [...this.state.stateList, state.state]
        });
      }))
      .catch(error => console.log("Fetch state list in App component", error));

  }

  fetchDefaultStateList = (country) => {

    fetch(`https://api.airvisual.com/v2/states?country=${country}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(state => {
        return this.setState({
          stateList: [...this.state.stateList, state.state],
          stateInput: "Kentucky"
        });
      }))
      .catch(error => console.log("Fetch state list in App component", error));

  }

  fetchCountryList = () => {

    fetch(`https://api.airvisual.com/v2/countries?key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(country => {
        return this.setState({
          countryList: [...this.state.countryList, country.country]
        });
      }))
      .catch(error => console.log("Fetch country list in App component", error)
    );

  }

  // Get IP based user location data from AirVisual API then fetch current weather conditions

  fetchLocation = () => {

    fetch(`https://api.airvisual.com/v2/nearest_city?key=${apiKey}`)
    .then(res => res.json())
    .then(parsedJSON => {
      this.setState({
        airQuality : parsedJSON.data.current.pollution.aqius,
        cityInput: parsedJSON.data.city,
        countryInput: parsedJSON.data.country,
        currentLat: parsedJSON.data.location.coordinates[1],
        currentLng: parsedJSON.data.location.coordinates[0],
        data: parsedJSON.data,
        dataRequested: true,
        mainPollutant: parsedJSON.data.current.pollution.mainus,
        stateInput: parsedJSON.data.state
      });
      this.fetchCurrentConditions();
    })
    .catch(error => console.log("fetchLocation in App component", error));

  }

  // Fetch user input location weather data fro AirVisual API then fetch current weather condiditons

  fetchStd = () => {

    fetch(`https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => {
        this.setState({
          currentLat: parsedJSON.data.location.coordinates[1],
          currentLng: parsedJSON.data.location.coordinates[0],
          dataRequested: true,
          data: parsedJSON.data,
          airQuality : parsedJSON.data.current.pollution.aqius,
          mainPollutant: parsedJSON.data.current.pollution.mainus
        });
        this.fetchCurrentConditions();
      })
      .catch(error => console.log("fetchStd in App component", error));

  }

  // Handle user input location form submission

  getData = e => {
    e.preventDefault();

    this.setState({
      cityInput: this.state.cityInput,
      stateinput: this.state.stateInput,
      countryInput: this.state.countryInput,
    });

    this.fetchStd();

  }

  // Handle button click for IP based user location

  getLocationData = e => {
    e.preventDefault();

    this.fetchLocation();

  }

  // Handle change in county, state, city select options and populate select options

  handleCityInput = e => {
    e.preventDefault();

    this.setState({
      cityInput: e.target.value
    });

  }

  loadDefaultCountry = () => {

    this.setState({
      countryInput: "USA",
    });
    this.fetchDefaultStateList("USA");
    this.loadDefaultState();

  }

  loadDefaultState = () => {

    this.setState({
      stateInput: "Kentucky"
    });

    this.fetchDefaultCityList("Kentucky", "USA");

    this.loadDefaultCity();

  }

  loadDefaultCity = () => {

    this.setState({
      cityInput: "Louisville"
    });

  }

  handleCountryInput = e => {
    e.preventDefault();

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
    e.preventDefault();

    this.setState({
      stateInput: e.target.value,
      cityInput: "",
      cityList: []
    });
    this.fetchCityList(e);

  }

  handleScaleChange = e => {
    this.setState({
      userTempScale: e.target.value
    });
  }

  handleWarmthPrefChange = e => {
    this.setState({
      userWarmthPreference: e.target.value
    });

  }


  // Populate selects with country, state, and city data

  componentDidMount() {

    this.fetchCountryList();

    this.loadDefaultCountry();

    console.log("App component mounted state:", this.state);

  }

  render() {

    const {
      airQuality,
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
      dataReceived,
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

        <Header/>

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
          dataReceived={dataReceived}
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
