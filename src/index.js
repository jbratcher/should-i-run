import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Scheduler from './Scheduler';
import About from './About'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
                <Router basename={process.env.PUBLIC_URL}> 
                    <Switch>
                        <Route exact path="/" component={ App }/> 
                        <Route
                            exact path='/scheduler'
                            render={(props) => <Scheduler {...props} />}
                        />
                        <Route
                            exact path='/about'
                            render={(props) => <About {...props} />}
                        />
                    </Switch>
                </Router>, 
                document.getElementById('root'));

registerServiceWorker();
