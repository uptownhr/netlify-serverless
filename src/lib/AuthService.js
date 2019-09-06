import auth0 from 'auth0-js';
import auth0Lock from 'auth0-lock'
import EventEmitter from 'events';
import authConfig from './auth.config.json';

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  responseType: 'id_token',
  scope: 'openid profile email'
});

class AuthService extends EventEmitter {

  // Starts the user login flow
  login(customState) {
    webAuth.authorize({
      appState: customState
    });
  }

  getLock () {
    return new auth0Lock(authConfig.clientId,authConfig.domain)
  }

}

export default new AuthService();