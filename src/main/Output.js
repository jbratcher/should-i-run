import React, { Component } from 'react';
import ClothesData from './ClothesData';
import ScoreData from './ScoreData';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  

  // getUserWarmthPrefernce = () => {

  //   const { userWarmthPreference } = this.props;

  //   this.setState({
  //     currentTempIndex: userWarmthPreference
  //   })

  //   this.setState({
  //     tempIndexCalculated: true
  //   });

  //   console.log(this.state.currentTempIndex);


  // }

  componentDidMount() {

    console.log("Output component mounted", this.state);

  }



  render() {

    const {
      airQuality,
      currentHumidity,
      currentLat,
      currentLng,
      currentTemp,
      currentTempIndex,
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

        <section id="dataOutput">

          { dataRequested ?
          
            <h5>Loading</h5>
            
          : dataReceived ?

            <ClothesData

              currentTempIndex={currentTempIndex}
              userWarmthPreference={userWarmthPreference}

            />

          :null}

          { dataRequested ?
          
            <h5>Loading</h5>
          
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
        
          <h5>Loading</h5>

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
