import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import apiKey from './secrets';
import './App.css';

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
      data: {},
      dataRequested: false,
      mainPollutant: "",
      stateInput: "",
      stateList: []
    };

  }

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
          countryList: [...this.state.countryList, country.country]
        });
      }))
      .catch(err => console.log(err));
  }


  fetchStd = () => {

    fetch(`https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => {
        this.setState({
          data: parsedJSON.data,
          airQuality : parsedJSON.data.current.pollution.aqius,
          mainPollutant: parsedJSON.data.current.pollution.mainus
        })})
      .catch(err => console.log('Error: ', err));

  }

  getData = (e) => {
    e.preventDefault();

    this.setState({
      cityInput: this.state.cityInput,
      stateinput: this.state.stateInput,
      countryInput: this.state.countryInput,
      dataRequested: true
    });

    this.fetchStd();
  }

  handleCityInput = e => {
    this.setState({
      cityInput: e.target.value
    });
  }

  handleStateInput = e => {
    this.setState({
      stateInput: e.target.value
    });
    this.fetchCityList(e);
  }

  handleCountryInput = e => {
    this.setState({
      countryInput: e.target.value
    });
    this.fetchStateList(e);
  }

  componentWillMount() {
    this.fetchCountryList();
  }

  render() {

    return (

      <div className="App">

        <Header />

        <Main

          cityInput={this.state.cityInput}
          cityList={this.state.cityList}
          stateInput={this.state.stateInput}
          stateList={this.state.stateList}
          countryInput={this.state.countryInput}
          countryList={this.state.countryList}
          getData={this.getData}
          handleCityInput={this.handleCityInput}
          handleStateInput={this.handleStateInput}
          handleCountryInput={this.handleCountryInput}
          data={this.state.data}
          dataRequested={this.state.dataRequested}
          airQuality={this.state.airQuality}
          mainPollutant={this.state.mainPollutant}

        />

        <Footer />

      </div>

    );
  }
}

export default App;
