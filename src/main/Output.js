import React, { Component } from 'react';
import { gmapsApiKey } from '../secrets.js';
import Map from './LocationMap';

class Output extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    
    const { airQuality, data, mainPollutant } = this.props;
    
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
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${gmapsApiKey}`}
          loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
          containerElement={<div style={{ height: `400px`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%`, width: '100%' }} />}
        />
        
      </section>
    
    );
    
  }
  
}

  export default Output;
