import React, { Component, PropTypes } from 'react';
import { container, innerContainer } from './styles.css';
import { Navigation } from 'components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../redux/modules/users';
import { firebaseAuth } from '../../config/constants';
import { formatUserInfo } from '../../containers/helpers/utils';

class MainContainer extends Component {
  componentDidMount() {
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        const userData = user.providerData[0];
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid);
        this.props.authUser(user.uid);
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now());
        if (this.props.location.pathname === '/') {
          this.context.router.replace('feed');
        }
      } else {
        console.log('remove fetching user');
        this.props.removeFetchingUser();
      }
    });
  }
  render() {
    return this.props.isFetching === true
      ? null
      : <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>;
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  removeFetchingUser: PropTypes.func.isRequired
};

MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  ({ users }) => ({ isAuthed: users.isAuthed, isFetching: users.isFetching }),
  dispatch => bindActionCreators(userActionCreators, dispatch)
)(MainContainer);
