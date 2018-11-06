import React, { Component } from 'react';
import Clothing from '../data/Clothing';

class ClothesData extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };
    
  }
    
  

  render() {

    const { currentTempIndex, tempIndexCalculated } = this.props;


    return(

            <section id="clothesData">
            
              <p>What to wear</p>
              
              <nav className="column">
              
              {tempIndexCalculated ?
              
                <ul id="clothing">
                
                  <li id="head">
                    {Clothing[currentTempIndex].head.text ? 
                    <React.fragement>
                      <img alt="head" src={Clothing[currentTempIndex].head.imgsrc} />
                      <p>{Clothing[currentTempIndex].head.text}</p>
                    </React.fragement>
                    : null }
                  </li>
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
                
                :null }

              </nav>
              
            </section>
    );

  }

}

  export default ClothesData;
