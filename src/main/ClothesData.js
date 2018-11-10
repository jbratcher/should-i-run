import React, { Component } from 'react';
import Clothing from '../data/Clothing';

class ClothesData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTempIndex: "neutral",
      tempIndexCalculated: false
    };
  }
  
  getCurrentTempIndex = () => {

    const { currentTemp } = this.props;
    
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
      
      this.setState({
      tempIndexCalculated: true
    });
      
  }
  
  calculateWarmthPrefernce = () => {

    const { userWarmthPreference } = this.props;
    
    const { currentTempIndex } = this.state;
    
    console.log(userWarmthPreference)

    this.setState({
      
      currentTempIndex: 
      
        userWarmthPreference === currentTempIndex
          ? currentTempIndex
          : userWarmthPreference === 'neutral'
          ? currentTempIndex
          : userWarmthPreference === 'cold'
          ? "cold"
          : userWarmthPreference === 'chilly'
          ? "chilly"
          : userWarmthPreference === 'warm'
          ? "warm"
          : userWarmthPreference === 'hot'
          ? "hot"
          : currentTempIndex
        
    });

    

    console.log(this.state.currentTempIndex);


  }
  
  componentDidMount() {
    
    this.getCurrentTempIndex();
    
    // this.calculateWarmthPrefernce();
    
  }

  render() {

    const { 
      currentTempIndex,
      tempIndexCalculated
    } = this.state;

    return(

      <section id="clothesData">
      
        <p>What to wear</p>
        
        <nav className="column">
        
          { tempIndexCalculated ? 
      
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
            
          : null }
        
        </nav>
        
      </section>
    );

  }

}

export default ClothesData;
