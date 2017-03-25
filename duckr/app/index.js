import React from 'react';
import { render } from 'react-dom';
import routes from './config/routes';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import users from './redux/modules/users';

const store = createStore(users)
render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app'));
