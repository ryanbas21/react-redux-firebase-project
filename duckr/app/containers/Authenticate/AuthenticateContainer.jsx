import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { Authenticate } from 'components';
import { bindActionCreators } from 'redux';
import auth from '../helpers/auth';
import * as userActionCreators from 'redux/modules/users';

class AuthenticateContainer extends Component {

  constructor() {
    super();
    this.handleAuth = this.handleAuth.bind(this);
  }
  handleAuth() {
    this.props.fetchingUser()
    auth().then(user => {
      this.props.fetchingUserSuccess(user.uid,user,Date.now());
      this.props.authUser(user.uid);
      return user;
    }).catch(err => this.props.fetchingUserFailure(err));
  }
  render() {
    return (
      <div>
        <Authenticate
          isFetching={this.props.isFetching}
          error={this.props.error}
          onAuth={this.handleAuth}
        />
      </div>
    );
  }

}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchingUser: PropTypes.func.isRequired,
  fetchingUserFailure: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  authUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isFetching: state.isFetching,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
