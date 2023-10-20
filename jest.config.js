const config = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|less|scss)$": "<rootDir>/src/Pages/Home/Home.js"
    },
    testEnvironmentOptions: {
      html: '<html lang="zh-cmn-Hant"></html>',
      url: 'https://jestjs.io/',
      userAgent: 'Agent/007',
    },
  };
  
  module.exports = config;