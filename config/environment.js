/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'refugee-portrait-frontend',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'img-src': "'self' data: blob: *.mapbox.com",
      'child-src': "blob:",
      'media-src': "'self'",
      'font-src': "'self' data: fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
      'script-src': "'self' 'unsafe-eval' 'unsafe-inline' " +
        "apis.google.com",
      'connect-src': "'self' *.mapbox.com http://localhost:5000 ws://localhost:5000 wss://s-dal5-nss-22.firebaseio.com",
    },

    mapbox: {
      accessToken: 'pk.eyJ1Ijoia2VubnN0ZW5pY2h0IiwiYSI6ImNpZXBpMGZ5ejAwNHlzcGt1b3NwcWI1aWQifQ.SRy8JsaaUHRDdLGjKiE_kQ',
    },

    tuioTouchDebug: false,

    firebase: 'https://refugee-portrait.firebaseio.com/'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
