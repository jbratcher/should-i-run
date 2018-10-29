import React, { Component } from 'react';
import Header from './header';
import Footer from './Footer';

class Scheduler extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
      
    return(
        
        <section id="schedulerSection">
        
            <Header 
                getLocationData={this.getLocationData}
            />
            
            <section id="scheduler" className="column">
            
                <h2>Scheduler</h2>
                
                <p>Pick a day to get information or find the best day in the next week</p>
                
                <label>Pick a day of the week</label>
                <select>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>
                
                <label>Find the best day of the week</label>
                <button>Go</button>
            
            </section>
            
            <Footer / >
        
        </section>
          
    );

  }

}

  export default Scheduler;
