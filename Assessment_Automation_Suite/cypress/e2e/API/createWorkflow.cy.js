const data = require('../../fixtures/data.json')

describe('Respond.io Login Test and Workflow API Test', () => { 
    beforeEach(() => {
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

    it('should add workflow successfully', () => {
        cy.get('@idToken').then((idToken) => {
        const workflowData = {
            description: data.workFlowDesc,
            name: data.workflowName,
            };
    
            cy.request({
            method: 'POST',
            url: 'https://app.respond.io/api/v2/workflows/add',
            headers: {
                Authorization: `Bearer ${idToken}`, // Include retrieved idToken
                Accept: 'application/json; charset=utf-8',
                // Content-length: 352,
                Baggage: 'sentry-environment=prod,sentry-release=91f7867e14a7a77b47412f3a4d2a94757f48919d,sentry-public_key=763ba9cb115448a3a0a4ab04a668a4f8,sentry-trace_id=76ef83d3cfd140f8886cacf306b99d1d,sentry-sample_rate=0.025,sentry-transaction=%2Fspace%2F%3Cdigits%3E%2Fworkflows,sentry-sampled=false'
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
                description: data.workFlowDesc,
                name: data.workflowName,
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
                expect(response.status).to.equal(403); // Assert status code
        
                const workflow = response.body.data;
                expect(workflow.message).to.equal('Sorry there is already a workflow with this name!'); // Assert error message
                });
            })
    });
});