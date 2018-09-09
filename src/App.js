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
      countryInput: "",
      countryList: [],
      data: {},
      dataRequested: false,
      mainPollutant: "",
      stateInput: ""
    };
    
    this.stdRequest = `https://api.airvisual.com/v2/nearest_city?${apiKey}`;
    
    this.cityStateRequest = `https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=USA&key=${apiKey}`;

    this.globalRequest = `https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`;
    
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
        });
          console.log(parsedJSON);  
        }
      )
      .catch(err => console.log('Error: ', err));
      
    this.setState({
      cityInput: "",
      stateInput: "",
      countryInput: ""
    });
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
  }
  
  handleCountryInput = e => {
    this.setState({
      countryInput: e.target.value
    });
  }
  
  componentWillMount() {
    this.fetchCountryList();
    // add city and state list
    // how to handle conditional rendering for city => state => country cascade
  }

  render() {
    
    return (

      <div className="App">

        <Header />

        <Main

          cityInput={this.state.cityInput}
          stateInput={this.state.stateInput}
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
