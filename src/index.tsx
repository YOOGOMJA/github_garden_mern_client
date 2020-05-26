import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import MainScene from './scenes/MainScene';
import SideMenu from './components/SideMenu';
import UserDetailScene from './scenes/UserDetailScene';
import RegisterUserScene from './scenes/RegisterUserScene';
import NotFoundScene from './scenes/NotFoundScene';
import UserListScene from './scenes/UserListScene';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import rootReducer from './modules';

import './styles/userList.scss';
import UserListContent from './scenes/UserListScene/UserListContent';
import SettingScene from './scenes/SettingScene';
import InfoScene from './scenes/InfoScene';

import { isMobile } from 'react-device-detect';

const store = createStore(rootReducer, applyMiddleware(Thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div style={{ height: 'fit-content', }}>
        <Router>
          <SideMenu />
          <Switch>
            <Route exact path="/" component={MainScene} />
            <Route path="/register" component={RegisterUserScene} />
            <Route path="/users">
              {!isMobile ?
                <div className="users-contents-container">
                  <div className="user-list">
                    {/* 목록 페이지 */}
                    <Route path="/users" component={UserListScene} />
                  </div>
                  <div className="user-list-content">
                    <Switch>
                      <Route exact path="/users/" component={UserListContent} />
                      {/* 유저 404 페이지 */}
                      {/* <Route path="/users/" component={UserNotFoundScene} /> */}
                      {/* 유저별 상세 페이지  */}
                      <Route path="/users/:user_name" component={UserDetailScene} />
                    </Switch>
                  </div>
                </div>
                : <div className="users-contents-container">
                  <Switch>
                    {/* 목록 페이지 */}
                    <Route exact path="/users">
                      <div className="user-list">
                        <UserListScene />
                      </div>
                    </Route>
                    {/* 유저별 상세 페이지  */}
                    <Route path="/users/:user_name">
                      <div className="user-list-content">
                        <UserDetailScene />
                      </div>
                    </Route>
                  </Switch>
                </div>
              }
            </Route>
            <Route path="/info" component={InfoScene} />
            <Route path="/settings" component={SettingScene} />
            <Route path="*" component={NotFoundScene} />
          </Switch>

        </Router>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
