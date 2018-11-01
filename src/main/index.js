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
      countryInput,
      countryList,
      currentHumidity,
      currentLat,
      currentLng,
      currentTemp,
      currentUV,
      currentWeatherIcon,
      currentWeatherSummary,
      data,
      dataRequested,
      handleCityInput,
      handleCountryInput,
      handleStateInput,
      handleScaleChange,
      handleWarmthPrefChange,
      getData,
      getLocationData,
      mainPollutant,
      stateList,
      userTempScale,
      userWarmthPreference,
      weatherScore
    } = this.props;

    return(

      <main id="main">

        <section id="formSection">

          <section id="mainNav">
            <a href="#formSection"><i className="fas fa-angle-double-right fa-2x" id="openNav"></i></a>
            <a href="#top"><i className="fas fa-angle-double-left fa-2x" id="closeNav"></i></a>
          </section>

          <Form

            cityList={cityList}
            countryInput={countryInput}
            countryList={countryList}
            handleCityInput={handleCityInput}
            handleCountryInput={handleCountryInput}
            handleScaleChange={handleScaleChange}
            handleStateInput={handleStateInput}
            handleWarmthPrefChange={handleWarmthPrefChange}
            getData={getData}
            getLocationData={getLocationData}
            stateList={stateList}
            userTempScale={userTempScale}
            userWarmthPreference={userWarmthPreference}

          />

        </section>

        <Output
          airQuality={airQuality}
          currentHumidity={currentHumidity}
          currentLat={currentLat}
          currentLng={currentLng}
          currentTemp={currentTemp}
          currentUV={currentUV}
          currentWeatherIcon={currentWeatherIcon}
          currentWeatherSummary={currentWeatherSummary}
          data={data}
          dataRequested={dataRequested}
          mainPollutant={mainPollutant}
          userTempScale={userTempScale}
          userWarmthPreference={userWarmthPreference}
          weatherScore={weatherScore}
        />

      </main>

    );

  }


}

export default Main;
