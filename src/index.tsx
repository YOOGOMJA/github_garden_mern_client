import React from 'react';
import ReactDOM, { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import MainScene from './scenes/MainScene';
import SideMenu from './components/SideMenu';
import UserDetailScene from './scenes/UserDetailScene';
import RegisterUserScene from './scenes/RegisterUserScene';
import NotFoundScene from './scenes/NotFoundScene';
import UserListScene from './scenes/UserListScene';
import UserNotFoundScene from './scenes/UserNotFoundScene';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <div style={ { height : 'fit-content', } }>
      <Router>
        <SideMenu />
        <Switch>
          <Route exact path="/" component={MainScene} />
          <Route path="/register" component={RegisterUserScene} />
          <Route path="/users">
            <Switch>
              {/* 목록 페이지 */}
              <Route exact path="/users/" component={UserListScene}/>
              {/* 유저 404 페이지 */}
              <Route exact path="/users/404-not-found" component={ UserNotFoundScene } />
              {/* 유저별 상세 페이지  */}
              <Route path="/users/:user_name" component={ UserDetailScene }/>
            </Switch>
          </Route>
          <Route path="*" component={NotFoundScene}/>
        </Switch>
        
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
