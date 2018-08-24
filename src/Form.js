import React from 'react';
import PropTypes from 'prop-types';

const Form = props =>


      <form>
        <label htmlFor="city">City</label>
        <input onChange={props.handleCityInput} value={props.cityInput} type="text" id="cityInput" name="city"></input>
        <label htmlFor="state">State</label>
        <input onChange={props.handleStateInput} value={props.stateInput} type="text" id="stateInput" name="state"></input>
        <button onClick={props.getData} type="submit" value="submit" name="submit">Get Data</button>
      </form>
      
  ;

  Form.propTypes = {
    getData: PropTypes.func.isRequired,
    handleCityInput: PropTypes.func.isRequired,
    handleStateInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    stateInput:  PropTypes.string,
  };

  export default Form;
