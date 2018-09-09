import React, { Component } from 'react';

class Header extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    
    return(
      
      <header>
        <section id="brand">
          <h1>AQapi</h1>
        </section>
        <nav>
          <ul>
            <li><a href="#top">Air Quality</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </header>
        
    );
  }
  
  
}

export default Header;
