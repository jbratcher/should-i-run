import React, { Component } from 'react';

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    
    const { getLocationData } = this.props;

    return(


      <header>
        <section id ="mainHeader">
          <section id="brand">
            <h1>ShouldIRun?</h1>
          </section>
          <button id="getDataButton" onClick={getLocationData}>Should I?</button>
        </section>
        <section id="subheader">
          <p>Get a rating on current weather conditions for your run</p>
        </section>
      </header>

    );
  }


}

export default Header;
