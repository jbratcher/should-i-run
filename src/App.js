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
    cityInput: "",
    stateInput: ""
  }

  stdRequest = `https://api.airvisual.com/v2/nearest_city?${apiKey}`;
  
  cityStateRequest = `https://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=USA&key=${apiKey}`;

  // Helper funtions

  fetchStd = () => {

    fetch(`http://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=USA&key=${apiKey}`)
      .then(res => res.json())
      .then(parsedJSON => this.setState({
          data: parsedJSON.data,
          airQuality : parsedJSON.data.current.pollution.aqius
      }))
      .catch(err => console.log('Error: ', err));
      
      this.setState({
        cityInput: "",
        stateInput: ""
      });
  }

  getData = (e) => {
    e.preventDefault();

    this.setState({
      cityInput: this.state.cityInput,
      stateinput: this.state.stateInput
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

  render() {
    console.log(this.state);
    console.log("This is the process.env", process.env.PUBLIC_URL);
    
    return (

      <div className="App">

        <Header />

        <Main

          cityInput={this.state.cityInput}
          stateInput={this.state.stateInput}
          getData={this.getData}
          handleCityInput={this.handleCityInput}
          handleStateInput={this.handleStateInput}
          data={this.state.data}
          airQuality={this.state.airQuality}
          
        />

        <Footer />

      </div>

    );
  }
}

export default App;
