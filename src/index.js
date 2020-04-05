import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Scheduler from './Scheduler';
import BestDay from './BestDay';
import Forecast from './Forecast';
import About from './About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
                <Router basename={process.env.PUBLIC_URL}> 
                    <Switch>
                        <Route exact path="/" component={ App }/> 
                        
                        {/* props passed to top level routes */ }
                        
                        <Route
                            exact path='/scheduler'
                            render={(props) => <Scheduler {...props} />}
                        />
                        <Route
                            exact path='/bestday'
                            render={(props) => <BestDay {...props} />}
                        />
                        <Route
                            exact path='/forecast'
                            render={(props) => <Forecast {...props} />}
                        />
                        <Route
                            exact path='/about'
                            render={(props) => <About {...props} />}
                        />
                    </Switch>
                </Router>, 
                document.getElementById('root'));

registerServiceWorker();
