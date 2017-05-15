import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Duck } from '../../components';
import * as usersLikesActions from '../../redux/modules/userslikes';

const { func, bool, number, object } = PropTypes;

class DuckContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);

    this.goToProfile = ::this.goToProfile;
  }
  goToProfile(e) {
    e.stopPropagation();
    this.context.router.push(`/${this.props.duck.uid}`);
  }
  handleClick = (e) => {
    e.stopPropagation();
    this.context.router.push(`/duckDetail/${this.props.duck.duckId}`);
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(usersLikesActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DuckContainer);
