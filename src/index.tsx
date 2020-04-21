import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import MainScene from './scenes/MainScene';
import UserDetailScene from './scenes/UserDetailScene';
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Router>
    <Route exact path="/" component={ MainScene }/>
    <Route path="/users" component={ UserDetailScene }/>
    <Route path="/demo" component={ App }/>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
