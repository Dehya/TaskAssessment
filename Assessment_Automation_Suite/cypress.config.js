const { defineConfig } = require('cypress')

module.exports = defineConfig({
  videos: true,
  screenshotsFolder: 'screenshots',
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://app.respond.io',
    specPattern: 'cypress/e2e',
    supportFile: false,
    defaultCommandTimeout: 20000,
    // reporter: "cypress-multi-reporters",
    // reporterOptions: {
    //     "configFile": "cypress.json",
    // }
  },
  
})
