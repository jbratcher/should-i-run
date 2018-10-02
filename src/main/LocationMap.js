import React, {Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { gmapsApiKey } from '../secrets.js';

class Map extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      currentLat: null,
      currentLng: null
    };
    
  }
  
  render() {
    
    const { currentLat, currentLong } = this.props;
    
    const LocationMap = withScriptjs(withGoogleMap((props) =>
      <GoogleMap
        defaultCenter={{ lat: currentLat, lng: currentLong }}
        defaultZoom={13}
      >
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