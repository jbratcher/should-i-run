import React, { Component } from 'react';
import UserOptions from './UserOptions';
import LocationInput from './LocationInput';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    const {
      cityList,
      countryInput,
      countryList,
      handleCountryInput,
      handleScaleChange,
      handleWarmthPrefChange,
      getLocationData,
      stateList,
      userTempScale,
      userWarmthPreference
    } = this.props;

    return(

      <section id="formInputSection">

        <UserOptions 
        
          handleScaleChange={handleScaleChange}
          handleWarmthPrefChange={handleWarmthPrefChange}
          userTempScale={userTempScale}
          userWarmthPreference={userWarmthPreference}
          
        />

        
        <LocationInput
        
          cityList={cityList}
          countryInput={countryInput}
          countryList={countryList}
          handleCountryInput={handleCountryInput}
          getLocationData={getLocationData}
          stateList={stateList}
          
        />

      </section>

    );

  }


}

export default Form;
