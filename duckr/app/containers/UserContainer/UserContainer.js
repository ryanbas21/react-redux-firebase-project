import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { User } from '../../components';
import { bindActionCreators } from 'redux';
import * as usersActionCreators from '../../redux/modules/users';
import * as usersDucksActionCreators from '../../redux/modules/usersDucks';
import { staleUser, staleDucks } from '../helpers/utils';

class UserContainer extends Component {
  componentDidMount() {
    const uid = this.props.routeParams.uid;
    console.log(this.props);
    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid);
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdated)) {
      this.props.fetchAndHandleUsersDucks(uid);
    }
  }
  render() {
    const { noUser, name, isFetching, error, duckIds } = this.props;
    return (
      <User noUser={noUser} name={name} isFetching={isFetching} error={error} duckIds={duckIds} />
    );
  }
}

UserContainer.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
  fetchAndHandleUsersDucks: PropTypes.func.isRequired,
  fetchAndHandleUser: PropTypes.func.isRequired,
  routeParams: PropTypes.shape({ uid: PropTypes.string.isRequired }),
  lastUpdated: PropTypes.number.isRequired
};

const mapStateToProps = ({ users, usersDucks }, props) => {
  const specificUsersDucks = usersDucks[props.routeParams.uid];
  const user = users[props.routeParams.uid];
  const noUser = typeof user === 'undefined';
  const name = noUser ? '' : user.info.name;

  return {
    noUser,
    name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    lastUpdated: specificUsersDucks ? specificUsersDucks.lastUpdated : 0,
    duckIds: specificUsersDucks ? specificUsersDucks.duckIds : []
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...usersActionCreators, ...usersDucksActionCreators }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
