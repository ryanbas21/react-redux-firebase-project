import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getRoutes from './config/routes';
import users from './redux/modules/users';

function checkAuth() {
  console.log(arguments);
}

const store = createStore(users, applyMiddleware(thunk))
render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app'));
