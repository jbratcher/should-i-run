import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Output extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    
    return(
    
      <section id="dataOutput">
        {this.props.dataRequested ?
        <React.Fragment>
          <p>
            <b>Selected City:</b> 
            <span id="cityOutput">{this.props.data.city}</span>
          </p>
          <p>
            <b>Selected State:</b>
            <span id="stateOutput">{this.props.data.state}</span>
          </p>
          <p>
            <b>Selected Country:</b>
            <span id="countryOutput">{this.props.data.country}</span>
          </p>
          <p>
            <b>Current Air Quality:</b> 
            <span id="airQualityOutput">{this.props.airQuality}</span>
          </p>
          <p>
            <b>Main Pollutant:</b> 
            <span id="mainPollutantOutput">{this.props.mainPollutant}</span>
          </p>
        </React.Fragment>
        : null
        }
      </section>
    
    );
    
  }
      
      

  static propTypes = {
    airQuality: PropTypes.number,
    data: PropTypes.object,
    dataRequested: PropTypes.bool.isRequired,
    mainPollutant: PropTypes.string
  };
  
}

  export default Output;
