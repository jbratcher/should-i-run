import React, { Component } from 'react';
import Form from './Form';
import Output from './Output';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const {
      airQuality,
      cityList,
      countryList,
      currentWeatherIcon,
      currentWeatherSummary,
      currentLat,
      currentLng,
      currentTemp,
      data,
      dataRequested,
      handleCityInput,
      handleCountryInput,
      handleStateInput,
      getData,
      getLocationData,
      mainPollutant,
      stateList,
      weatherScore
    } = this.props;

    return(

      <main id="main">

        <section id="formSection">

          <section id="mainNav">
            <a href="#formSection"><i className="fas fa-angle-double-right fa-2x" id="openNav"></i></a>
            <a href="#top"><i className="fas fa-angle-double-left fa-2x" id="closeNav"></i></a>
          </section>

          <h2>Enter a Location</h2>

          <button id="getLocation" onClick={getLocationData}>Use my location</button>

          <Form

            cityList={cityList}
            countryList={countryList}
            handleCityInput={handleCityInput}
            handleCountryInput={handleCountryInput}
            handleStateInput={handleStateInput}
            getData={getData}
            stateList={stateList}

          />

        </section>

        <Output
          airQuality={airQuality}
          currentWeatherIcon={currentWeatherIcon}
          currentWeatherSummary={currentWeatherSummary}
          currentLat={currentLat}
          currentLng={currentLng}
          currentTemp={currentTemp}
          data={data}
          dataRequested={dataRequested}
          mainPollutant={mainPollutant}
          weatherScore={weatherScore}
        />

      </main>

    );

  }


}

export default Main;
