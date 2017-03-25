import React, { Component, PropTypes } from 'react';
import { container, innerContainer } from './styles.css';
import { Navigation } from 'components';
import { connect } from 'react-redux';

class MainContainer extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed}/>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
};

export default connect( state => (
  { isAuthed: state.isAuthed }))(MainContainer);
