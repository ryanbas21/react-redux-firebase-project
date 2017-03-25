import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import routes from './config/routes';

import users from './redux/modules/users';

const store = createStore(users, applyMiddleware(thunk))
render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app'));
