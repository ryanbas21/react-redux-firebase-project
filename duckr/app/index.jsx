import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import getRoutes from './config/routes';
import users from './redux/modules/users';
import { checkIfAuthed } from './containers/helpers/auth';


const store = createStore(users, compose(applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension(): f => f))

function checkAuth(nextState, replace) {
  if (store.getState().isFetching) {
    return;
  }

  const isAuthed = checkIfAuthed(store);
  const nextPathName = nextState.location.pathname;

  if (nextPathName === '/' || nextPathName === '/auth') {
    if (isAuthed === true) {
      replace('/feed');
    }
  } else {
    if (isAuthed !== true) {
      replace('/auth');
    }
  }
}

render(
  <Provider store={store}>
    {getRoutes(checkAuth)}
  </Provider>,
  document.getElementById('app'));
