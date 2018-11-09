import React, { Component } from 'react';
import ClothesData from './ClothesData';
import ScoreData from './ScoreData';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTempIndex: "",
      tempIndexCalculated: false
    };
  }

  getCurrentTempIndex = () => {

    const { currentTemp } = this.props;

    currentTemp >= 85
      ? this.setState({
          currentTempIndex: "hot"
        })
      : currentTemp < 85 && currentTemp >= 75
      ? this.setState({
          currentTempIndex: "warm"
        })
      : currentTemp < 75  && currentTemp >= 65
      ? this.setState({
          currentTempIndex: "neutral"
        })
      : currentTemp < 55 && currentTemp >=45
      ? this.setState({
          currentTempIndex: "chilly"
        })
      : currentTemp < 45
      ? this.setState({
          currentTempIndex: "cold"
        })
      : this.setState({
          currentTempIndex: ""
      });

      console.log(this.state.currentTempIndex);

      this.getUserWarmthPrefernce();

  }

  getUserWarmthPrefernce = () => {

    const { userWarmthPreference } = this.props;

    this.setState({
      currentTempIndex: userWarmthPreference
    })

    this.setState({
      tempIndexCalculated: true
    });

    console.log(this.state.currentTempIndex);


  }

  componentDidMount() {

    this.getCurrentTempIndex();

    console.log("Output component mounted", this.state);

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

    const { currentTempIndex, tempIndexCalculated } = this.state;

    return(

      <section id="outputContainer">

        <section id="dataOutput">

          { dataRequested ?
          
            <h2>Loading</h2>
            
          : dataReceived ?

            <ClothesData

              currentTempIndex={currentTempIndex}
              tempIndexCalculated={tempIndexCalculated}
              userWarmthPreference={userWarmthPreference}

            />

          :null}

          { dataRequested ?
          
            <h2>Loading</h2>
          
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
        
          <h2>Loading</h2>

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
