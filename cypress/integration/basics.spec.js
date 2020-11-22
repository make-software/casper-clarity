/// <reference types='cypress' />

// import AuthService from '../../packages/ui/src/services/AuthService';

context('Basic Functionality', () => {

    let sideNavLinks;

    beforeEach(() => {
        // cy.visit('https://clarity.casperlabs.io');
        cy.visit('http://localhost:8000')
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
    })

    // it('Should search for block', () => {
    //     // Go to Search screen
    //     cy.get(sideNavLinks.Search)
    //         .click()

    //     // Get block hash from network highlight box
    //     cy.get('#mainNav > div.navbar-network-info.d-none.d-md-inline-block > p:nth-child(2) > span')
    //         .then(($span) => {
    //             // Enter block hash into search box
    //             cy.get('#id-search-hash-base16')
    //                 .type($span.get(0).innerText)
    //                 .wait(200)
    //                 .then(() => {
    //                     // Click submit
    //                     cy.get('#root > div > main > div > div > div > div > div.card-body > button')
    //                         .click()
    //                 })
    //             // Arbitrary time to wait for page to load - there are better ways to handle this
    //             cy.wait(10000)

    //             cy.get('#root > div > main > div > div > div > div:nth-child(1) > div.card-body > table > tbody > tr:nth-child(4) > td > a')
    //                 .should(($a) => {
    //                     assert.equal($span.get(0).innerText.trim(), $a.get(0).innerText.trim(), "Block Hashes match")
    //                 })
    //         })            
    // })

    it('Should deploy a contract', () => {
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
        
        /**
         *   Arg Values / Text
         * 
         *      0 / BOOL    1 / I32     2 / I64     3 / U8
         * 
         *      4 / U32     5 / U64     6 / U128    7 / U256
         * 
         *      8 / U512    10 / STRING 11 / KEY    12 / UREF
         * 
         *      Bytes / Bytes   Bytes (Fixed Length) / Bytes (Fixed Length)
         * 
         *      Tuple / Tuple   Map / Map   List / List
         */
        
        let transferArguments = [
            {
                'name': 'amount',
                'type': '7',
                'value': '200'
            },
            {
                'name': 'target',
                'type': 'Bytes',
                'value': 'testBytes1234568'
            }
        ]
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
    })
})
  