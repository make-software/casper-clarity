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

import { Signer } from "casper-client-sdk";

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
    cy.get('button').contains('Add')
        .click()
        .then(() => {
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

/**
 * Signer method integrations
 */
Cypress.Commands.add('connectSigner', () => {
    Cypress.log({
        name: 'Connecting to Signer...'
    });
    Signer.forceConnection();
})
Cypress.Commands.add('checkVaultExists', () => {
    Cypress.log({
        name: 'Checking for existing vault...'
    });
    return Signer.hasCreatedVault();
})
Cypress.Commands.add('createTestVault', (password) => {
    Cypress.log({
        name: 'Creating test vault...',
        consoleProps: () => {
            return {
                'Password': password
            }
        }
    });
    Signer.createNewVault(password)
})
