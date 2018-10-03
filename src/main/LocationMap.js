import React, {Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { gmapsApiKey } from '../secrets.js';

class Map extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
    
  }
  
  render() {
    
    const { currentLat, currentLong } = this.props;
    
    console.log('currentLat', currentLat);
    console.log('currentLong', currentLong);
    
    const LocationMap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        center={{ lat: currentLat, lng: currentLong}}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        defaultZoom={10}
      >
      
        <Marker
          position={{ lat: currentLat, lng: currentLong }}
        >
        
        </Marker>
        
      </GoogleMap>
    ));
    
    return(
    
      <LocationMap
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${gmapsApiKey}`}
        loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
        containerElement={<div style={{ height: `400px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%`, width: '100%' }} />}
      >

      </LocationMap>
      
    )
    
  }
  
}

export default Map;