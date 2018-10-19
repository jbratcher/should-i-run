import React, { Component } from 'react';
import Header from './header';
import Main from './main';
import Footer from './Footer';
import { apiKey } from './secrets';
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
      currentLat: 38.2527,
      currentLng: -85.7585,
      currentTemp: 0,
      data: {},
      dataRequested: false,
      mainPollutant: "",
      stateInput: "",
      stateList: []
    };

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
        currentTemp: parsedJSON.data.current.weather.tp,
        currentLat: parsedJSON.data.location.coordinates[1],
        currentLng: parsedJSON.data.location.coordinates[0]
      });
      console.log(parsedJSON);
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

  handleStateInput = e => {
    this.setState({
      stateInput: e.target.value,
      cityInput: "",
      cityList: []
    });
    this.fetchCityList(e);
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

  // Populate selects with country, state, and city data

  componentDidMount() {

    this.fetchCountryList();

    this.setState({
      countryInput: this.state.countryList[70]
    });

    console.log(this.state.countryInput);

  }

  render() {

    const {
      airQuality ,
      cityInput,
      cityList,
      countryInput,
      countryList,
      currentLat,
      currentLng,
      currentTemp,
      data,
      dataRequested,
      mainPollutant,
      stateInput,
      stateList
    } = this.state;

    return (

      <div className="App">

        <Header />

        <Main

          airQuality={airQuality}
          cityInput={cityInput}
          cityList={cityList}
          countryInput={countryInput}
          countryList={countryList}
          currentLat={currentLat}
          currentLng={currentLng}
          currentTemp={currentTemp}
          data={data}
          dataRequested={dataRequested}
          getData={this.getData}
          getLocationData={this.getLocationData}
          handleCityInput={this.handleCityInput}
          handleStateInput={this.handleStateInput}
          handleCountryInput={this.handleCountryInput}
          mainPollutant={mainPollutant}
          stateInput={stateInput}
          stateList={stateList}

        />

        <Footer />

      </div>

    );
  }
}

export default App;
