import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import apiKey from './secrets';
import './App.css';

// App Component Main

class App extends Component {

  state = {
    data: null,
    cityInput: "",
    stateInput: ""
  }

  stdRequest = `http://api.airvisual.com/v2/nearest_city?${apiKey}`;
  cityStateRequest = `http://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=USA&key=${apiKey}`;

  // Helper funtions

  fetchStd = () => {

    fetch(`http://api.airvisual.com/v2/city?city=${this.state.cityInput}&state=${this.state.stateInput}&country=USA&key=${apiKey}`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('Error: ', err))

      console.log(this.state.cityInput, this.state.stateInput)
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
    })
    console.log(this.state.cityInput);
  }

  handleStateInput = e => {
    this.setState({
      stateInput: e.target.value
    })
    console.log(this.state.stateInput);
  }

  render() {
    return (

      <div className="App">

        <Header />

        <Main

          cityInput={this.state.cityInput}
          stateInput={this.state.stateInput}
          getData={this.getData}
          handleCityInput={this.handleCityInput}
          handleStateInput={this.handleStateInput}

        />

        <Footer />

      </div>

    );
  }
}

export default App;
