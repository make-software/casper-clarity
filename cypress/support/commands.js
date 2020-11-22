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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (overrides = {}) => {
    Cypress.log({
        name: 'loginViaAuth0',
    });

    const options = {
        method: 'POST',
        url: Cypress.env('auth_url'),
        body: {
            grant_type: 'password',
            username: Cypress.env('auth_username'),
            password: Cypress.env('auth_password'),
            audience: Cypress.env('auth_audience'),
            scope: 'openid profile email',
            client_id: Cypress.env('auth_client_id'),
            client_secret: Cypress.env('auth_client_secret'),
            },
        };
    cy.request(options);
})

Cypress.Commands.add('deployContractAddArgument', (argName, argType, argValue, argRow) => {
    Cypress.log({
        name: 'Adding arguments for deploy'
    });

    // Add arguments for transfer
    cy.get('.mt-3 > .list-inline > .list-inline-item > .btn')
        .click()
        .then(() => {
            cy.log("argROW :: " + argRow)
            // Name
            cy.get(`#argument-editing-${argRow}-name`)
                .type(argName)
                .should('have.value', argName)
            // Type
            cy.get(`:nth-child(${(argRow + 1)}) > :nth-child(2) > .row > .col > .form-control`)
                .select(argType)
                .should('have.value', argType)
            // Value
            cy.get(`#arguments-table > div > div > table > tbody > tr:nth-child(${(argRow + 1)}) > td:nth-child(3) > div > input`)
                .type(argValue)
                .should('have.value', argValue)
        })
})