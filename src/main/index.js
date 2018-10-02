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
      cityInput,
      cityList,
      countryInput,
      countryList,
      currentLat,
      currentLong,
      data,
      dataRequested,
      handleCityInput,
      handleCountryInput,
      handleStateInput,
      getData,
      mainPollutant,
      stateInput,
      stateList
    } = this.props;

    return(

      <main id="main">

        <section id="formSection">

          <section id="mainNav">
            <a href="#formSection"><i className="fas fa-angle-double-right fa-2x" id="openNav"></i></a>
            <a href="#top"><i className="fas fa-angle-double-left fa-2x" id="closeNav"></i></a>
          </section>

          <h2>Enter a Location</h2>

          <button id="getLocation" onClick={this.props.getLocationData}>Use my location</button>

          <Form
          
            cityInput={cityInput}
            cityList={cityList}
            countryInput={countryInput}
            countryList={countryList}
            currentLat={currentLat}
            currentLong={currentLong}
            handleCityInput={handleCityInput}
            handleCountryInput={handleCountryInput}
            handleStateInput={handleStateInput}
            getData={getData}
            stateInput={stateInput}
            stateList={stateList}
            
          />

        </section>

        <Output
          airQuality={airQuality}
          currentLat={currentLat}
          currentLong={currentLong}
          data={data}
          dataRequested={dataRequested}
          mainPollutant={mainPollutant}
        />

      </main>

    )

  }


}

export default Main;
