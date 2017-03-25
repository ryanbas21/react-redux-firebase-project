import auth from '../../containers/helpers/auth';
const AUTH_USER = 'AUTH_USER';
const UNAUTH_USER = 'UNAUTH_USER';
const FETCHING_USER = 'FETCHING_USER';
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS';
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE';

// actions
function authUser(uid) {
  return {
    type: AUTH_USER,
    uid,
  };
}

export function unauthUser() {
  return {
    type: UNAUTH_USER,
  };
}

function fetchingUser() {
  return {
    type: FETCHING_USER,
  };
}

function fetchingUserFailure(error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  };
}

export function fetchAndHandleAuthedUser() {
  return dispatch => {
    dispatch(fetchingUser())
    auth().then(user => {
      dispatch(fetchingUserSuccess(user.uid,user,Date.now()));
      dispatch(authUser(user.uid));
      return user;
    }).catch(err => this.props.fetchingUserFailure(err));
  }
}

function fetchingUserSuccess(uid, userSuccess, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    userSuccess,
    timestamp,
  };
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
};
export function user(state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      };
    default :
      return state;
  }
}

const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
};
export default function users(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      };
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      };
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action),
        };
    default :
      return state;
  }
}
