import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Duck } from '../../components';

const { func, bool, number, object } = PropTypes;

class DuckContainer extends Component {
  constructor() {
    super();
    this.goToProfile = this.goToProfile.bind(this);
  }
  static defaultProps = {};
  goToProfile(e) {
    e.stopPropogation();
    this.context.router.push(`/${this.props.duck.uid}`);
  }
  handleClick(e) {
    e.stopPropogation();
    this.context.router.push(`/duckDetail${this.props.duck.duckId}`);
  }
  render() {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props}
      />
    );
  }
}
DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true
};

const mapStateToProps = ({ ducks, likeCount, usersLikes }, ownProps) => ({
  duck: ducks[ownProps.duckId],
  hideLikeCount: ownProps.hideLikeCount,
  hideReplyBtn: ownProps.hideReplyBtn,
  isLiked: usersLikes[ownProps.duckId] === true,
  numberOfLikes: likeCount[ownProps.duckId]
});

DuckContainer.propTypes = {
  duck: object.isRequired,
  numberOfLikes: number,
  isLiked: bool.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired
};
DuckContainer.contextTypes = {
  router: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(DuckContainer);
