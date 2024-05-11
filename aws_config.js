import { Amplify } from 'aws-amplify';

// Configure AWS to work with this web app
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_AWS_COGNITO_HOSTED_UI_DOMAIN,
          scopes: [
            'phone',
            'email',
            'openid',
          ],
          redirectSignIn: [process.env.NEXT_PUBLIC_OAUTH_SIGN_IN_REDIRECT_URL],
          redirectSignOut: [process.env.NEXT_PUBLIC_OAUTH_SIGN_OUT_REDIRECT_URL],
          responseType: 'code'
        }
      }
    }
  }
});

// You can get the current config object
// const awsConfig = Amplify.getConfig();