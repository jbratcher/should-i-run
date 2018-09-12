import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import Output from './Output';

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return(

      <main id="main">

        <section id="formSection">

          <section id="mainNav">
            <a href="#formSection"><i className="fas fa-angle-double-right fa-2x" id="openNav"></i></a>
            <a href="#top"><i className="fas fa-angle-double-left fa-2x" id="closeNav"></i></a>
          </section>

          <h2>Enter a Location</h2>

          <Form
            cityInput={this.props.cityInput}
            handleCityInput={this.props.handleCityInput}
            stateInput={this.props.stateInput}
            stateList={this.props.stateList}
            handleStateInput={this.props.handleStateInput}
            countryInput={this.props.countryInput}
            countryList={this.props.countryList}
            handleCountryInput={this.props.handleCountryInput}
            getData={this.props.getData}
          />

        </section>

        <Output
          airQuality={this.props.airQuality}
          data={this.props.data}
          dataRequested={this.props.dataRequested}
          mainPollutant={this.props.mainPollutant}
        />

      </main>

    )

  }

  static propTypes = {
    airQuality: PropTypes.number,
    data: PropTypes.object,
    dataRequested: PropTypes.bool.isRequired,
    getData: PropTypes.func.isRequired,
    handleCityInput: PropTypes.func.isRequired,
    handleStateInput: PropTypes.func.isRequired,
    handleCountryInput: PropTypes.func.isRequired,
    cityInput: PropTypes.string,
    stateInput:  PropTypes.string,
    stateList: PropTypes.array,
    countryInput: PropTypes.string,
    countryList: PropTypes.array.isRequired,
    mainPollutant: PropTypes.string
  };


}

export default Main;
