import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  static propTypes = {
    getData: PropTypes.func.isRequired,
    handleCityInput: PropTypes.func.isRequired,
    handleStateInput: PropTypes.func.isRequired,
    handleCountryInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    stateInput:  PropTypes.string,
    countryInput: PropTypes.string,
    countryList: PropTypes.array.isRequired
  };
  
  render() {
    
    let list = this.props.countryList;

    return(
      
      <form>
        <label htmlFor="city">City</label>
        <input onChange={this.props.handleCityInput} value={this.props.cityInput} type="text" id="cityInput" name="city"></input>
        <label htmlFor="state">State</label>
        <input onChange={this.props.handleStateInput} value={this.props.stateInput} type="text" id="stateInput" name="state"></input>
        <label htmlFor="country">Country</label>
        <select>
          {list.map((country, i) => <option key={i} value={country}>{country}</option> )}
        </select>
        <button onClick={this.props.getData} type="submit" value="submit" name="submit">Get Data</button>
      </form>
      
    );
    
  }


      

  
  
}

  export default Form;

// <input onChange={this.props.handleCountryInput} value={this.props.countryInput} type="text" id="countryInput" name="country"></input>
