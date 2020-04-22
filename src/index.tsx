import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import MainScene from './scenes/MainScene';
import SideMenu from './components/SideMenu';
import UserDetailScene from './scenes/UserDetailScene';
import RegisterUserScene from './scenes/RegisterUserScene';
import { BrowserRouter as Router, Route } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <div style={ { height : 'fit-content', } }>
      <Router>
        <SideMenu />
        <Route exact path="/" component={MainScene} />
        <Route path="/users" component={UserDetailScene} />
        <Route path="/register" component={RegisterUserScene} />
        {/* <Route path="/users" component={UserDetailScene} /> */}
        <Route path="/demo" component={App} />
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
