import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Authenticate } from 'components';
import { bindActionCreators } from 'redux';
import * as userActionCreators from '../../redux/modules/users';

class AuthenticateContainer extends Component {
  constructor() {
    super();
    this.handleAuth = this.handleAuth.bind(this);
  }
  handleAuth(e) {
    e.preventDefault();
    this.props
      .fetchAndHandleAuthedUser()
      .then(() => this.context.router.replace('feed'))
      .catch(err => err);
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
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
};
AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps({ users }) {
  return {
    isFetching: users.isFetching,
    error: users.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer);
