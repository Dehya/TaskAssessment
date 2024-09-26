
const data = require('../../fixtures/data.json')

describe('Respond.io Login Test and Workflow API Test', () => {

    it('should login successfully and store idToken', () => {
        
        cy.login(data.validEmail,data.validPassword);
        
    });
});