// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })\

Cypress.Commands.add('login', (email, password) => { 
    const user = {
        email,
        password
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
    })
 })