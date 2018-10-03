import React, { Component } from 'react';
import Map from './LocationMap';

class Output extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    
    const { 
      airQuality,
      currentLat,
      currentLong,
      data, 
      mainPollutant 
    } = this.props;
    
    return(
    
      <section id="dataOutput">
        {this.props.dataRequested ?
        <React.Fragment>
          <p>
            <b>City:</b> 
            <span id="cityOutput">{data.city}</span>
          </p>
          <p>
            <b>Selected State:</b>
            <span id="stateOutput">{data.state}</span>
          </p>
          <p>
            <b>Selected Country:</b>
            <span id="countryOutput">{data.country}</span>
          </p>
          <p>
            <b>Current Air Quality:</b> 
            <span id="airQualityOutput">{airQuality}</span>
          </p>
          <p>
            <b>Main Pollutant:</b> 
            <span id="mainPollutantOutput">{mainPollutant}</span>
          </p>
        </React.Fragment>
        : null
        }
        
        <Map
          
          currentLat={currentLat}
          currentLong={currentLong}
          
        />
        
      </section>
    
    );
    
  }
  
}

  export default Output;
