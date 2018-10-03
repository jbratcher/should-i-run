import React, { Component } from 'react';
import Header from './Header';
import Main from './main';
import Footer from './Footer';
import { apiKey, gmapsApiKey } from './secrets';
import './css/App.css';

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
      currentLong: -85.7585,
      data: {},
      dataRequested: false,
      mainPollutant: "",
      stateInput: "",
      stateList: []
    };

  }
  
  fetchGeoLocation = () => {
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLat},${this.state.currentLong}&key=${gmapsApiKey}`)
      .then(response => response.json())
      .then(parsedJSON => console.log(parsedJSON));
      
      console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.currentLat},${this.state.currentLong}&key=${gmapsApiKey}`);
      
  }

  fetchCityList = (e) => {

    fetch(`https://api.airvisual.com/v2/cities?state=${e.target.value}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(city => {
        return this.setState({
          cityList: [...this.state.cityList, city.city]
        });
      }))
      .then(() => {
        return this.setState({
          cityInput: this.state.cityList[0]
        });
      })
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
      .then(() => {
        return this.setState({
          stateInput: this.state.stateList[0]
        });
      })
      .catch(err => console.log(err));

  }

  fetchCountryList = () => {

    fetch(`https://api.airvisual.com/v2/countries?key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.data.map(country => {
        return this.setState({
          countryList: [...this.state.countryList, country.country]
        });
      }))
      .then(data => {
        return this.setState({
          countryInput: this.state.countryList[77]
        });
      })
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
        currentLat: parsedJSON.data.location.coordinates[0],
        currentLong: parsedJSON.data.location.coordinates[1]
      });
      console.log(parsedJSON);
      console.log('lat: ', this.state.currentLat);
      console.log("long: ", this.state.currentLong);
    })
    .catch(err => console.log('Error: ', err));
    
    
    

  }

  fetchStd = () => {

    fetch(`https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => {
        this.setState({
          currentLat: parsedJSON.data.location.coordinates[0],
          currentLong: parsedJSON.data.location.coordinates[1],
          data: parsedJSON.data,
          airQuality : parsedJSON.data.current.pollution.aqius,
          mainPollutant: parsedJSON.data.current.pollution.mainus
          
        })})
      .catch(err => console.log('Error: ', err));
      
      this.fetchGeoLocation();
      
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
  
  componentDidMount() {
    
    this.fetchCountryList();
    
  }

  render() {
    
    const { 
      airQuality ,
      cityInput,
      cityList,
      countryInput,
      countryList,
      currentLat,
      currentLong,
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
          currentLong={currentLong}
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
