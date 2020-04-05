import React, { Component } from 'react';
import ClothesData from './ClothesData';
import ScoreData from './ScoreData';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
      airQuality,
      currentHumidity,
      currentLat,
      currentLng,
      currentTemp,
      currentUV,
      currentWeatherIcon,
      currentWeatherSummary,
      data,
      dataReceived,
      dataRequested,
      mainPollutant,
      userTempScale,
      userWarmthPreference,
      weatherScore
    } = this.props;

    return(

      <section id="outputContainer">
      
      {/* Output section is rendered as loading once data is requested */}
      {/* then renders the clothing list, weather score, and map once data is received */}

        <section id="dataOutput">

          { dataRequested ?
          
            <h3>Loading</h3>
            
          : dataReceived ?

            <ClothesData
              
              currentTemp={currentTemp}
              userWarmthPreference={userWarmthPreference}

            />

          : <section id="no-data">
              <h3>You can use the menu to the right to get data</h3>
            </section>}

          { dataRequested ?
          
            <h3>Loading</h3>
          
          : dataReceived ?

            <ScoreData

              airQuality={airQuality}
              currentHumidity={currentHumidity}
              currentTemp={currentTemp}
              currentUV={currentUV}
              currentWeatherIcon={currentWeatherIcon}
              currentWeatherSummary={currentWeatherSummary}
              data={data}
              mainPollutant={mainPollutant}
              userTempScale={userTempScale}
              weatherScore={weatherScore}

            />

          :null}

        </section>

        { dataRequested ?
        
          <h3>Loading</h3>

        : dataReceived ?
        
          <MapContainer

            currentLat={currentLat}
            currentLng={currentLng}
  
          />

        :null}

      </section>

    );

  }

}

export default Output;
