import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { gmapsApiKey } from '../secrets';

export class MapContainer extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
    
  }
  
  render() {
    
    return (
      
      <section id="map">
      
        <Map 
          google={this.props.google} 
          zoom={14}>
  
          <Marker 
            onClick={this.onMarkerClick}
            name={'Current location'} 
          />
  
          
        </Map>
        
      </section>
      
    );
  }
}

export default GoogleApiWrapper({
  
  apiKey: gmapsApiKey
  
})(MapContainer)