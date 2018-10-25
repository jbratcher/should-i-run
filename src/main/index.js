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
      getData,
      getLocationData,
      mainPollutant,
      stateList,
      userTempScale,
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
            countryList={countryList}
            handleCityInput={handleCityInput}
            handleCountryInput={handleCountryInput}
            handleScaleChange={handleScaleChange}
            handleStateInput={handleStateInput}
            getData={getData}
            getLocationData={getLocationData}
            stateList={stateList}

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
          weatherScore={weatherScore}
        />

      </main>

    );

  }


}

export default Main;
