import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { gmapsApiKey } from '../secrets';

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    const { currentLat, currentLong } = this.props;

    this.state = {
      currentLocation: {
        lat: currentLat,
        lng: currentLong
      }
    }

  }

  componentWillUnmount() {

    const { currentLat, currentLong } = this.state;

    this.setState({
      currentLocation: {
        lat: currentLat,
        lng: currentLong
      }
    })
  }


  render() {

    const { currentLat, currentLong } = this.props;

    return (

      <section id="map">

        <Map
          center={{
            lat: currentLat,
            lng: currentLong
          }}
          initialCenter={{
            lat: 38.2527,
            lng: -85.7585
          }}
          google={this.props.google}
          zoom={10}>

          <Marker
            position={{lat: currentLat, lng: currentLong}}
           />

        </Map>

      </section>

    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: gmapsApiKey
  }
))(MapContainer)
