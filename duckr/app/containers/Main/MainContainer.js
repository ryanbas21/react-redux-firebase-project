import React, { Component } from 'react';
import { container, innerContainer } from './styles.css';
import { Navigation } from 'components';

class MainContainer extends Component {
  render() {
    return (
      <div className={container}>
        <Navigation />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MainContainer;
