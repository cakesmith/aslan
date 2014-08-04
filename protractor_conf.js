// An example configuration file.
exports.config = {
  // Do not start a Selenium Standalone sever - only run this using chrome.
  chromeOnly       : true,
  chromeDriver     : './node_modules/protractor/selenium/chromedriver',
  seleniumServerJar: '/node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',

// Uncomment this line to connect to an already running Selenium server
  seleniumAddress  : 'http://0.0.0.0:4444/wd/hub',

//  Capabilities to be passed to the webdriver instance.
  capabilities     : {
    'browserName': 'chrome'
  },

//  capabilities: {
//  'browserName': 'phantomjs'
//  },

  baseUrl        : 'http://localhost:3000',
//  rootElement: 'body',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs          : ['test/e2e/**/*_test.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true
//    defaultTimeoutInterval: 30000
  },

  allScriptsTimeout: 7 * 60 * 1000 // 7 minutes
};
