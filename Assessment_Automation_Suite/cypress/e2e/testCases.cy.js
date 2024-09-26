
const data = require('../resources/data.json')

describe('Respond.io', () => {
    beforeEach(() => {
        cy.visit('user/login');

        cy.get('#input-7').type(data.validEmail);
        cy.get('#input-9').type(data.validPassword);
        // cy.get('button[type="submit"]').click();
        cy.get('button:contains("Sign in")').first().click();
    });
    
    // First Test Case - Assertion to check if the User is logged in by checking the URL and seeing if the /dashboard is included in it. 
    it('User is Logged in', () => {
        cy.url().should('include', '/dashboard');
    })


    //Second test Case - User is able to Add Workflow from Scratch. 
    it('Add Workflow from Scratch', () => {
        cy.get('[href="/space/250699/workflows"] > .v-list-item__append').should('be.visible').click();
        // cy.wait(2000);
        cy.get('#radix-vue-dropdown-menu-trigger-1 > .v-btn').should('be.visible').click();
        // cy.wait(2000);
        cy.get('span:contains("Start From Scratch")').should('be.visible').first().click();
        // cy.wait(2000);
        cy.get('input[name="field_8').type(data.workflowName);
        cy.get('input[name="field_9"').type(data.workFlowDesc);

        // cy.wait(2000);
        cy.intercept('POST', '/api/v2/workflows/add').as('workFlowCreated'); 
        cy.get('button:contains("Create")').first().click();
        // cy.wait(2000);

        const statuss = false
        // cy.visit('/space/250699/workflows/templates')
        cy.wait(`@workFlowCreated`).then((intercept) => {
            if (intercept.response.status === "success" ){
                statuss = true;
            }
        }) 
        cy.wait(`span:contains('Workflow ${data.workflowName} added successfully.')`).should('be.visible');
        
    }); 
    
    //Third test Case - User is Not able to Add Workflow from Scratch. 
    it('Not able to Add Workflow from Scratch', () => {
        cy.get('[href="/space/250699/workflows"] > .v-list-item__append').should('be.visible').click();
        // cy.wait(2000);
        cy.get('#radix-vue-dropdown-menu-trigger-1 > .v-btn').should('be.visible').click();
        // cy.wait(2000);
        cy.get('span:contains("Start From Scratch")').should('be.visible').first().click();
        // cy.wait(2000);
        cy.get('input[name="field_8').type(data.workflowName);
        cy.get('input[name="field_9"').type(data.workFlowDesc);

        // cy.wait(2000);
        cy.intercept('POST', '/api/v2/workflows/add').as('workFlowCreated'); 
        cy.get('button:contains("Create")').first().click();
        // cy.wait(2000);

        cy.wait(`span:contains("Sorry there is already a workflow with this name!")`).should('be.visible');
    });  

    it('Test the Login and Workflow Creation APIs', () => {
        
    });


});



