import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Output from './Output';

const Main = props =>

    <main id="main">
    
      <section id="formSection">
    
        <section id="mainNav">
          <a href="#main"><i className="fas fa-angle-double-right" id="openNav"></i></a>
          <a href="#top"><i className="fas fa-angle-double-left" id="closeNav"></i></a>
        </section>
  
        <h2>Enter a Location</h2>
        
        <Form 
          cityInput={props.cityInput}
          handleCityInput={props.handleCityInput}
          stateInput={props.stateInput}
          handleStateInput={props.handleStateInput}
          countryInput={props.countryInput}
          handleCountryInput={props.handleCountryInput}
          getData={props.getData}
        />
      
      </section>
      
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
    handleCountryInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    stateInput:  PropTypes.string,
    countryInput: PropTypes.string
  };

  export default Main;
