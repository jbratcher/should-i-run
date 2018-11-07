import React, { Component } from 'react';

class UserOptions extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {

    const {
      handleScaleChange,
      handleWarmthPrefChange,
      userTempScale,
      userWarmthPreference
    } = this.props;

    return(

        <section id="userOptions">

          <section className="column">
          
            <h3>Options</h3>

            <label>Temperature scale</label>

            <select 
              id="userTempScale" 
              value={userTempScale} 
              onChange={handleScaleChange}
              >
              <option value="f">Fahrenheit</option>
              <option value="c">Celcius</option>
              <option value="k">Kelvin</option>
            </select>

          </section>

          <section className="column">

            <label>Warmth Preference</label>

            <select 
              id="userWarmthPreference" 
              value={userWarmthPreference} 
              onChange={handleWarmthPrefChange}
            >
            
              <option value="hot">Mucher Cooler</option>
              <option value="warm">A Little Cooler</option>
              <option value="neutral">Neutral</option>
              <option value="chilly">A Little Warmer</option>
              <option value="cold">Much Warmer</option>
              
            </select>

          </section>

        </section>

    );

  }


}

export default UserOptions;
