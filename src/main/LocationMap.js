import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Map, GoogleApiWrapper} from 'google-maps-react';
import { gmapsApiKey } from '../secrets';

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;

    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }

  }

  loadMap() {

    if (this.props && this.props.google) {

      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

    }

  }

  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  render() {

    const { lat, lng } = this.state;

    return (

      <section ref="map" id="map">

        <Map
          google={this.props.google}
          center={{
            lat: lat,
            lng: lng
          }}
          zoom={13}
          onClick={this.onMapClicked}
        />

      </section>

    );
  }
}

export default GoogleApiWrapper({

  apiKey: gmapsApiKey

})(MapContainer)
