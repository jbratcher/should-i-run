import React, { Component } from 'react';

class Footer extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    
    return(
    
      <footer>

        <span><a href="https://darksky.net/poweredby/">Powered by Dark Sky</a></span>
        <span>2018</span>
        <span><a href="#top">Github</a></span>

      </footer>
    
    );
    
  }
  
}

export default Footer;
