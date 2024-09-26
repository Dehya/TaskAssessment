
const data = require('../../fixtures/data.json')

describe('Respond.io Login Test', () => {

    it('should login successfully and store idToken', () => {
        
        // cy.login(data.validEmail,data.validPassword);
        const user = {
            email: data.validEmail,
            password: data.validPassword
        };
    
        cy.request({
            method: 'POST',
            url: 'https://app.respond.io/auth/login',
            body: user,
        })
        .then((response) => {
            expect(response.status).to.equal(200); // Assert status code
            expect(response.body.status).to.equal('success'); // Assert response body
    
            // Store idToken for later use
            const idToken = response.body.data.idToken;
            cy.wrap(idToken).as('idToken');
        
        });
    });
});