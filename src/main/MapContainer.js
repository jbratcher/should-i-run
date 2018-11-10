import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { gmapsApiKey } from '../secrets';

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    const { currentLat, currentLng } = this.props;

    this.state = {
      currentLocation: {
        lat: currentLat,
        lng: currentLng
      }
    };

  }

  componentDidMount() {

    const { currentLat, currentLng } = this.state;

    this.setState({
      currentLocation: {
        lat: currentLat,
        lng: currentLng
      }
    });
    
  }


  render() {

    const { currentLat, currentLng, loaded } = this.props;

    return (

      <section id="map">
      
        {loaded ?

        <Map
          center={{
            lat: currentLat,
            lng: currentLng
          }}
          initialCenter={{
            lat: 38.2527,
            lng: -85.7585
          }}
          google={this.props.google}
          zoom={12}>

          <Marker
            position={{
              lat: currentLat,
              lng: currentLng
            }}
          />

        </Map>
        
        : null }

      </section>

    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: gmapsApiKey,
  }
))(MapContainer);
