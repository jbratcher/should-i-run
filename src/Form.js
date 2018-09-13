import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    let listOfCountries = this.props.countryList;
    let listOfStates = this.props.stateList;
    let listOfCities = this.props.cityList;

    return(

      <form>
        <label htmlFor="city">City</label>
        <select onChange={this.props.handleCityInput}>
          {listOfCities.map((city, i) => <option key={i} value={city}>{city}</option> )}
        </select>
        <label htmlFor="state">State</label>
        <select onChange={this.props.handleStateInput}>
          {listOfStates.map((state, i) => <option key={i} value={state}>{state}</option> )}
        </select>
        <label htmlFor="country">Country</label>
        <select onChange={this.props.handleCountryInput}>
          {listOfCountries.map((country, i) => <option key={i} value={country}>{country}</option> )}
        </select>
        <button onClick={this.props.getData} type="submit" value="submit" name="submit">Get Data</button>
      </form>

    );

  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    handleCityInput: PropTypes.func.isRequired,
    handleStateInput: PropTypes.func.isRequired,
    handleCountryInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    cityList: PropTypes.array,
    stateInput:  PropTypes.string,
    stateList: PropTypes.array,
    countryInput: PropTypes.string,
    countryList: PropTypes.array.isRequired
  };

}

  export default Form;

// <input onChange={this.props.handleCountryInput} value={this.props.countryInput} type="text" id="countryInput" name="country"></input>
