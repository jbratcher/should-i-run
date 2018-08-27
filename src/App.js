import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import apiKey from './secrets';
import './App.css';

// App Component Main

class App extends Component {

  state = {
    airQuality: 0,
    data: {},
    dataRequested: false,
    cityInput: "",
    stateInput: "",
    countryInput: ""
  }

  stdRequest = `https://api.airvisual.com/v2/nearest_city?${apiKey}`;
  
  cityStateRequest = `https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=USA&key=${apiKey}`;
  
  globalRequest = `https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`;

  // Helper funtions

  fetchStd = () => {

    fetch(`https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=${this.state.countryInput}&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => this.setState({
          data: parsedJSON.data,
          airQuality : parsedJSON.data.current.pollution.aqius
      }))
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
    
    

    this.fetchStd(e);
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

  render() {
    
    return (

      <div className="App">

        <Header />

        <Main

          cityInput={this.state.cityInput}
          stateInput={this.state.stateInput}
          countryInput={this.state.countryInput}
          getData={this.getData}
          handleCityInput={this.handleCityInput}
          handleStateInput={this.handleStateInput}
          handleCountryInput={this.handleCountryInput}
          data={this.state.data}
          dataRequested={this.state.dataRequested}
          airQuality={this.state.airQuality}
          
        />

        <Footer />

      </div>

    );
  }
}

export default App;
