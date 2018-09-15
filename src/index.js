import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
                <Router basename={process.env.PUBLIC_URL}> 
                    <Route exact path="/" component={ App }/> 
                </Router>, 
                document.getElementById('root'));

registerServiceWorker();