import React, { Component } from 'react';

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
      
        <label htmlFor="country">Country</label>
        <select onChange={this.props.handleCountryInput}>
          {listOfCountries.map((country, i) => <option key={i} value={country}>{country}</option> )}
        </select>
      
        <label htmlFor="state">State</label>
        <select onChange={this.props.handleStateInput}>
          {listOfStates.map((state, i) => <option key={i} value={state}>{state}</option> )}
        </select>
        
        <label htmlFor="city">City</label>
        <select onChange={this.props.handleCityInput}>
          {listOfCities.map((city, i) => <option key={i} value={city}>{city}</option> )}
        </select>
        
        
        <button onClick={this.props.getData} type="submit" value="submit" name="submit">Get Data</button>
      
      </form>

    );

  }


}

export default Form;