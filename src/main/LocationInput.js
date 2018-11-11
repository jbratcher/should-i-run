import React, { Component } from 'react';

class LocationInput extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    const {
      cityList,
      cityInput,
      countryInput,
      countryList,
      getData,
      handleCityInput,
      handleCountryInput,
      handleStateInput,
      getLocationData,
      stateInput,
      stateList,
    } = this.props;

    return(

        <section id="formInput">

          <h3>Location</h3>
          
          {/* Get localized weather data data from closest weather station to your IP */}

          <button id="getLocation" onClick={getLocationData}>Use my location</button>

          <section className="column">

            <label id="formLabel">Enter a Location</label>
            
            {/* Select country, state, and city for user location input */}

            <form>

              <label htmlFor="country">Country</label>
              <select value={countryInput} onChange={handleCountryInput}>
                {countryList.map((country, i) => <option key={i} value={country}>{country}</option> )}
              </select>

              <label htmlFor="state">State</label>
              <select value={stateInput} onChange={handleStateInput}>
                {stateList.map((state, i) => <option key={i} value={state}>{state}</option> )}
              </select>

              <label htmlFor="city">City</label>
              <select value={cityInput} onChange={handleCityInput}>
                {cityList.map((city, i) => <option key={i} value={city}>{city}</option> )}
              </select>

              <button onClick={getData} type="submit" value="submit" name="submit">Get Data</button>

            </form>

          </section>

        </section>

    );

  }


}

export default LocationInput;
