import React, { Component } from 'react';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    const {
      cityList,
      countryList,
      handleCountryInput,
      handleScaleChange,
      getLocationData,
      stateList,
      userTempScale
    } = this.props;

    return(

      <section id="formInputSection">

        <section id="userOptions">

          <section className="column">

            <label>Temperature scale</label>

            <select id="userTempScale" value={userTempScale} onChange={handleScaleChange}>
              <option value="f">Fahrenheit</option>
              <option value="c">Celcius</option>
              <option value="k">Kelvin</option>
            </select>

          </section>

          <section className="column">

            <label>Warmth Preference</label>

            <select id="userWarmthPreference">
              <option value="maxCool">Mucher Cooler</option>
              <option value="modCool">A Little Cooler</option>
              <option value="neutral">Neutral</option>
              <option value="modWarmth">A Little Warmer</option>
              <option value="maxWarmth">Much Warmer</option>
            </select>

          </section>

        </section>

        <section id="formInput">

          <button id="getLocation" onClick={getLocationData}>Use my location</button>

          <section className="column">

            <label id="formLabel">Enter a Location</label>

            <form>

              <label htmlFor="country">Country</label>
              <select onChange={handleCountryInput}>
                {countryList.map((country, i) => <option key={i} value={country}>{country}</option> )}
              </select>

              <label htmlFor="state">State</label>
              <select onChange={this.props.handleStateInput}>
                {stateList.map((state, i) => <option key={i} value={state}>{state}</option> )}
              </select>

              <label htmlFor="city">City</label>
              <select onChange={this.props.handleCityInput}>
                {cityList.map((city, i) => <option key={i} value={city}>{city}</option> )}
              </select>

              <button onClick={this.props.getData} type="submit" value="submit" name="submit">Get Data</button>

            </form>

          </section>

        </section>

      </section>

    );

  }


}

export default Form;
