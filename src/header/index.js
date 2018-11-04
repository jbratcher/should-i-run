import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/">
              <h1>ShouldIRun?</h1>
            </Link>
          </section>
          <button id="getDataButton" onClick={getLocationData}>Should I?</button>
          
          <a href="#mainHeaderNav" id="menu-toggle" className="toggle">
            <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
          </a>

          <nav id="mainHeaderNav">
            <ul>
              <li>
                <a id="nav-close" className="toggle" href="#top">
                  <i className="fa fa-times fa-2x"></i>
                </a>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/scheduler">Scheduler</Link>
              </li>
              <li>
                <Link to="/bestday">Best Day</Link>
              </li>
              <li>
                <Link to="/about">About</Link> 
              </li>
            </ul>
          </nav>

        </section>
        <section id="subheader">
          <p>Get a rating on current weather conditions for your run</p>
        </section>
      </header>

    );
  }


}

export default Header;
