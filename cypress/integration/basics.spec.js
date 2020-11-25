/// <reference types='cypress' />

import { Signer } from 'casper-client-sdk';

context('Basic Functionality', () => {

    let sideNavLinks;
    let contractArgTypes;

    beforeEach(() => {
        // cy.visit('https://clarity.casperlabs.io');
        cy.intercept('GET', '/block').as('getBlock')
        cy.visit('http://localhost:8000')

        cy.stub(Signer, "isConnected").returns(true)

        // Aliases for side nav tabs
        sideNavLinks = {
            'Accounts'        : '#exampleAccordion > li:nth-child(1) > a',
            'Faucet'          : '#exampleAccordion > li:nth-child(2) > a', 
            'DeployContract' : '#exampleAccordion > li:nth-child(3) > a',
            'Blocks'          : '#exampleAccordion > li:nth-child(4) > a',
            'Deploys'         : '#exampleAccordion > li:nth-child(5) > a',
            'Search'          : '#exampleAccordion > li:nth-child(6) > a',
            'ConnectedPeers' : '#exampleAccordion > li:nth-child(7) > a',
        }
        contractArgTypes = {
            'BOOL'  : '0',
            'I32'   : '1',
            'I64'   : '2',
            'U8'    : '3',
            'U32'   : '4',
            'U64'   : '5',
            'U128'  : '6',
            'U256'  : '7',
            'U512'  : '8',
            'STRING': '10',
            'KEY'   : '11',
            'UREF'  : '12',
            'Bytes' : 'Bytes',
            'Bytes (Fixed Length)' : 'Bytes (Fixed Length)',
            'Tuple' : 'Tuple',
            'Map'   : 'Map',
            'List'  : 'List',
            'FixedList' : 'FixedList'
        }
    })

    it('Should search for block', () => {
        // Go to Search screen
        cy.get(sideNavLinks.Search)
            .click()

        // Get block hash from network highlight box
        cy.get('#mainNav > div.navbar-network-info.d-none.d-md-inline-block > p:nth-child(2) > span')
            .should('not.contain.html', 'null')
            .then(($span) => {
                // Enter block hash into search box
                cy.get('#id-search-hash-base16')
                    .type($span.get(0).innerText)
                    .should('have.value', $span.get(0).innerText)
                    .wait(100)
                    .get('#root > div > main > div > div > div > div > div.card-body > button')
                    .click()
                    .wait('@getBlock')
                    .then(() => {
                        cy.get('#root > div > main > div > div > div > div:nth-child(1) > div.card-body > table > tbody > tr:nth-child(4) > td > a')
                        .should(($a) => {
                            assert.equal($span.get(0).innerText.trim(), $a.get(0).innerText.trim(), "Block Hashes match")
                        })    
                    })
            })            
    })

    it('Should deploy a contract', () => {

        cy.get('[style="padding-left: 1rem; padding-top: 0.3rem;"] > .btn')
            .should('have.text', 'Connect to Signer')
            .click()
            .wait(3000)

        //expect(Signer.isConnected()).to.be.true

        // Go to deploy contract screen
        cy.get(sideNavLinks.DeployContract)
            .click()

        // Fill out main form
        cy.get('#id-contract-type')
            .select('Name')
            .should('have.value', 'Name')
            .then(() => {
                cy.get('#id-contract-hash')
                    .type('erc20')
                    .should('have.value', 'erc20')
                    .then(() => {
                        cy.get('#deploy-table-accordion > div > form > div:nth-child(4) > div:nth-child(2) > input')
                            .should('have.value', 'call')
                            .clear()
                            .type('transfer')
                            .should('have.value', 'transfer')
                            .then(() => {
                                cy.get('#id-payment-amount')
                                    .clear()
                                    // Clearing leaves a 0 in the input box
                                    .type('10000')
                                    .should('have.value', '100000')
                            })
                    })
            })
        
        // For type codes inspect the dropdown in the Setting Arguments section
        let transferArguments = [
            {
                'name': 'recipient',
                'type': contractArgTypes.KEY,
                'value': '"0203bcabdaa562ea9468910577c38af78b744d6c42295bc552cabbb8162f08896a94"'
            },
            {
                'name': 'amount',
                'type': contractArgTypes.U256,
                'value': '200'
            }
        ]
        // Enter arguments for contract
        for (let row = 0; row < transferArguments.length; row++) {
            cy.log("ROW :: " + row)
            let argument = transferArguments[row];
            cy.deployContractAddArgument(
                argument.name,
                argument.type,
                argument.value,
                row
            )
        }
        // Save arguments
        cy.get('.float-right > .list-inline > :nth-child(2) > .btn')
            .click()

        // Sign
        cy.get('.mt-5 > .list-inline > :nth-child(1) > .btn')
            .click()

        // Sign & Deploy prompt
        cy.get('#id-sign-modal > div > div > div.modal-footer > button.btn.btn-primary')
            .click()
    })
})
  