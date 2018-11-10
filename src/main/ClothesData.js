import React, { Component } from 'react';
import Clothing from '../data/Clothing';

class ClothesData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTempIndex: "neutral"
    };
  }
  
    getCurrentTempIndex = () => {

    const { currentTemp } = this.props;
    
    console.log(currentTemp);

    currentTemp >= 85
      ? this.setState({
          currentTempIndex: "hot"
        })
      : currentTemp < 85 && currentTemp >= 75
      ? this.setState({
          currentTempIndex: "warm"
        })
      : currentTemp < 75  && currentTemp >= 65
      ? this.setState({
          currentTempIndex: "neutral"
        })
      : currentTemp < 55 && currentTemp >=45
      ? this.setState({
          currentTempIndex: "chilly"
        })
      : currentTemp < 45
      ? this.setState({
          currentTempIndex: "cold"
        })
      : this.setState({
          currentTempIndex: "neutral"
      });
      

      console.log(this.state.currentTempIndex);

  }
  
  componentDidMount() {
    
    this.getCurrentTempIndex();
    
  }

  render() {

    const { currentTempIndex } = this.state;

    console.log(currentTempIndex);

    return(

            <section id="clothesData">
            
              <p>What to wear</p>
              
              <nav className="column">
            
                <ul id="clothing">
                  {Clothing[currentTempIndex].head.text ? 
                      <li id="head">
                        <img alt="head" src={Clothing[currentTempIndex].head.imgsrc} />
                        <p>{Clothing[currentTempIndex].head.text}</p>
                      </li>
                  : null }
                  <li id="torso">
                    <img alt="torso" src={Clothing[currentTempIndex].torso.imgsrc} />
                    <p>{Clothing[currentTempIndex].torso.text}</p>
                  </li>
                  <li id="legs">
                    <img alt="legs" src={Clothing[currentTempIndex].legs.imgsrc} />
                    <p>{Clothing[currentTempIndex].legs.text}</p>
                  </li>
                  <li id="feet">
                    <img alt="feet" src={Clothing[currentTempIndex].feet.imgsrc} />
                    <p>{Clothing[currentTempIndex].feet.text}</p>
                  </li>
                </ul>
              
              </nav>
              
            </section>
    );

  }

}

  export default ClothesData;
