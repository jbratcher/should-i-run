import React from 'react';
import PropTypes from 'prop-types';

const Main = props =>

    <main>

      <h2>Enter a Location</h2>
      <form>
        <label htmlFor="city">City</label>
        <input onChange={props.handleCityInput} value={props.cityInput} type="text" id="cityInput" name="city"></input>
        <label htmlFor="state">State</label>
        <input onChange={props.handleStateInput} value={props.stateInput} type="text" id="stateInput" name="state"></input>
        <button onClick={props.getData} type="submit" value="submit" name="submit">Get Data</button>
      </form>
      
      <section id="dataOutput">
        {props.dataRequested ?
        <React.Fragment>
          <p>Selected City: {props.data.city}</p>
          <p>Selected State: {props.data.state}</p>
          <p>Current Air Quality: {props.airQuality}</p>
        </React.Fragment>
        : null
        }
      </section>

    </main>

  ;

  Main.propTypes = {
    airQuality: PropTypes.number,
    data: PropTypes.object,
    dataRequested: PropTypes.bool.isRequired,
    getData: PropTypes.func.isRequired,
    handleCityInput: PropTypes.func.isRequired,
    handleStateInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    stateInput:  PropTypes.string,
  };

  export default Main;
