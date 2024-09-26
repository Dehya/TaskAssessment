// const { expect } = require('chai'); // Import chai assertions
const data = require('../../resources/data.json')

describe('Respond.io Login Test and Workflow API Test', () => {
    
    //let logintestpass = false; 

    beforeEach(() => {
        cy.login(data.validEmail,data.validPassword);
    });

    it('should add workflow successfully', () => {
        cy.get('@idToken').then((idToken) => {
        const workflowData = {
            description: 'This is an automated test workflow',
            name: 'Cypress Test Workflow',
            };
    
            cy.request({
            method: 'POST',
            url: 'https://app.respond.io/api/v2/workflows/add',
            headers: {
                Authorization: `Bearer ${idToken}`, // Include retrieved idToken
            },
            body: workflowData,
            })
            .then((response) => {
            expect(response.status).to.equal(200); // Assert status code
            expect(response.body.status).to.equal('success'); // Assert response body
    
            const workflow = response.body.data;
            expect(workflow.name).to.equal(workflowData.name); // Assert workflow name
            expect(workflow.description).to.equal(workflowData.description); // Assert description
            });
        })
        
    });

    it('should fail to add workflow with duplicate name', () => {
        cy.get('@idToken').then((idToken) => {
            const workflowData = {
                description: 'This is an automated test workflow',
                name: 'Cypress Test Workflow',
                };
        
                cy.request({
                method: 'POST',
                url: 'https://app.respond.io/api/v2/workflows/add',
                headers: {
                    Authorization: `Bearer ${idToken}`, // Include retrieved idToken
                },
                body: workflowData,
                })
                .then((response) => {
                expect(response.status).to.equal(200); // Assert status code
                expect(response.body.status).to.equal('success'); // Assert response body
        
                const workflow = response.body.data;
                expect(workflow.name).to.equal(workflowData.name); // Assert workflow name
                expect(workflow.description).to.equal(workflowData.description); // Assert description
                expect(response.body.message).to.equal('Sorry there is already a workflow with this name!'); // Assert error message
                });
            })
    });
});