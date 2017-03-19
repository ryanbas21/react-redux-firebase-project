import React, {
  Component
} from 'react';
import { Authenticate } from 'components';
import auth from '../helpers/auth';

export default class AuthenticateContainer extends Component {
  constructor(){
    super();
    this.handleAuth = this.handleAuth.bind(this);
  }
  handleAuth() {
    auth().then((user) => {
      console.log('authed User', user);
    });
  }
  render() {
    return (
      <div>
        <Authenticate
          isFetching={false}
          error=''
          onAuth={this.handleAuth} />
      </div>
    );
  }

}
