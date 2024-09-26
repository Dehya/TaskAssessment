// const { expect } = require('chai'); // Import chai assertions
const data = require('../../resources/data.json')

let idToken; // Store idToken from login test
describe('Respond.io Login Test and Workflow API Test', () => {
    
    //let logintestpass = false; 

    it('should login successfully and store idToken', () => {
        
        cy.login(data.validEmail,data.validPassword);
        
    });
});