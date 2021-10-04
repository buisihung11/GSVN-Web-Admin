export const firebaseConfig = {
  apiKey: 'AIzaSyBiILTTsokhWJc_HQrY0waEMxuKp59ra9A',
  authDomain: 'gsvn-web.firebaseapp.com',
  projectId: 'gsvn-web',
  storageBucket: 'gsvn-web.appspot.com',
  messagingSenderId: '321253836442',
  appId: '1:321253836442:web:c29ad3607fd06e60c00123',
  measurementId: 'G-FLYC69ZVB7'
};

export const cognitoConfig = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
};

export const auth0Config = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;

export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;
