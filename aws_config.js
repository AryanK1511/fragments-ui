import { Amplify, Auth } from 'aws-amplify';

// Configure AWS to work with this web app
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.AWS_COGNITO_POOL_ID,
      userPoolClientId: process.env.AWS_COGNITO_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: process.env.AWS_COGNITO_HOSTED_UI_DOMAIN,
          scopes: [
            'phone',
            'email',
            'openid',
          ],
          redirectSignIn: [process.env.OAUTH_SIGN_IN_REDIRECT_URL],
          redirectSignOut: [process.env.OAUTH_SIGN_OUT_REDIRECT_URL],
          responseType: 'code'
        }
      }
    }
  }
});

// You can get the current config object
// const awsConfig = Amplify.getConfig();