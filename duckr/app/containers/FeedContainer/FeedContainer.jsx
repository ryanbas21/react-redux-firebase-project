import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as feedActionCreators from '../../redux/modules/feed';
import { Feed } from '../../components';

class FeedContainer extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.setAndHandleFeedListener();
  }
  render() {
    return (
      <div>
        <Feed
          newDucksAvailable={this.props.newDucksAvailable}
          error={this.props.error}
          isFetching={this.props.isFetching}
          resetNewDucksAvailable={this.props.resetNewDucksAvailable}
          duckIds={this.props.duckIds}
        />
      </div>
    );
  }
}

function mapStateToProps({ feed }) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed;
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(feedActionCreators, dispatch);
}

FeedContainer.propTypes = {
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
