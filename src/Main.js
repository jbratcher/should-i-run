import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Output from './Output';

const Main = props =>

    <main>

      <h2>Enter a Location</h2>
      
      <Form 
        cityInput={props.cityInput}
        handleCityInput={props.handleCityInput}
        stateInput={props.stateInput}
        handleStateInput={props.handleStateInput}
        getData={props.getData}
      />
      
      <Output
        airQuality={props.airQuality}
        data={props.data}
        dataRequested={props.dataRequested}
      />

    </main>

  ;

  Main.propTypes = {
    airQuality: PropTypes.number,
    data: PropTypes.object,
    dataRequested: PropTypes.bool.isRequired,
    getData: PropTypes.func.isRequired,
    handleCityInput: PropTypes.func.isRequired,
    handleStateInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    stateInput:  PropTypes.string,
  };

  export default Main;
