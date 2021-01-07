/// <reference types='cypress' />

context('Signer', () => {

    let sideNavLinks;
    let contractArgTypes;

    beforeEach(() => {
        // Alias block request to allow wait command to target the response
        cy.visit(Cypress.env('clarity'))

        cy.disconnectSigner();
        cy.checkVaultExists()
            .then((vault) => {
                if(vault) {
                    cy.resetExistingVault();
                }
            })

        // Aliases for side nav tabs
        sideNavLinks = {
            'Accounts'        : '#sideMenu > li:nth-child(1) > a',
            'Faucet'          : '#sideMenu > li:nth-child(2) > a', 
            'DeployContract' : '#sideMenu > li:nth-child(3) > a',
            'Blocks'          : '#sideMenu > li:nth-child(4) > a',
            'Deploys'         : '#sideMenu > li:nth-child(5) > a',
            'Search'          : '#sideMenu > li:nth-child(6) > a',
            'Validators'      : '#sideMenu > li:nth-child(7) > a',
            'ConnectedPeers' : '#sideMenu > li:nth-child(8) > a',
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

    it('Should error if Signer not connected', () => {
        
        // Create vault but don't connect
        cy.createTestVault('cypress')
        .then(() => {
            // This pause is required to allow the vault creation to complete prior to the account creation attempt
            cy.wait(1000);
            cy.createTestAccount(
                'Cypress',
                'TUM0Q0FRQXdCUVlESzJWd0JDSUVJUEQ3cFR5VEZZNXRJY0YwbDg4MEFCN3ZwZm5YTWdQeVRMWnVGVC9iYzYwTA=='
            );
        })

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
                'value': '"0147f0db236b9b76fcd28f1a20f183adead273fd41bb1b8a0f11f65eae96ae001d"'
            },
            {
                'name': 'amount',
                'type': contractArgTypes.U256,
                'value': '200'
            }
        ]
        // Enter arguments for contract
        for (let row = 0; row < transferArguments.length; row++) {
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
            .should('have.text', 'save')
            .click()

        // Sign
        cy.get('.mt-5 > .list-inline > :nth-child(1) > .btn')
            .should('have.text', 'Sign')
            .click()

        // Check warning on prompt
        cy.get('#id-sign-modal > div > div > div.modal-body > p')
            .should('contain.text', 'Please connect to the Signer first.')

        // Sign & Deploy prompt
        cy.get('#id-sign-modal > div > div > div.modal-footer > button.btn.btn-primary')
            .should('have.text', 'Sign & Deploy')
            .click()

        // Check error
        cy.get('#alert-message > div')
            .should('contain.text', 'Please install/connect the CasperLabs Signer extension first!')
    })

    it('Should error if no account created', () => {
        
        // Create vault, connect but don't create an account
        cy.createTestVault('cypress');
        cy.connectSigner();

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
                'value': '"0147f0db236b9b76fcd28f1a20f183adead273fd41bb1b8a0f11f65eae96ae001d"'
            },
            {
                'name': 'amount',
                'type': contractArgTypes.U256,
                'value': '200'
            }
        ]
        // Enter arguments for contract
        for (let row = 0; row < transferArguments.length; row++) {
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
            .should('have.text', 'save')
            .click()

        // Sign
        cy.get('.mt-5 > .list-inline > :nth-child(1) > .btn')
            .should('have.text', 'Sign')
            .click()

        // Check warning on prompt
        cy.get('#id-sign-modal > div > div > div.modal-body > p')
            .should('contain.text', ' We will use CasperLabs Signer extension to sign the deploy')

        // Sign & Deploy prompt
        cy.get('#id-sign-modal > div > div > div.modal-footer > button.btn.btn-primary')
            .should('have.text', 'Sign & Deploy')
            .click()

        // Check error
        cy.get('#alert-message > div')
            .should('contain.text', 'Please create an account in the Plugin first!')
    })


    // BUG: This is resulting in an error: Bad response format - needs investigating
    // Produces false positive test pass - although I think the function works when user does it.S
    it('Should deploy a contract', () => {
        
        // Create vault and connect
        cy.createTestVault('cypress')
        .then(() => {
            cy.connectSigner();
            // This pause is required to allow the vault creation to complete prior to the account creation attempt
            cy.wait(1000);
            cy.createTestAccount(
                'Cypress',
                'TUM0Q0FRQXdCUVlESzJWd0JDSUVJUEQ3cFR5VEZZNXRJY0YwbDg4MEFCN3ZwZm5YTWdQeVRMWnVGVC9iYzYwTA=='
            );
        })

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
                'value': '"0147f0db236b9b76fcd28f1a20f183adead273fd41bb1b8a0f11f65eae96ae001d"'
            },
            {
                'name': 'amount',
                'type': contractArgTypes.U256,
                'value': '200'
            }
        ]
        // Enter arguments for contract
        for (let row = 0; row < transferArguments.length; row++) {
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
            .should('have.text', 'save')
            .click()

        // Sign
        cy.get('.mt-5 > .list-inline > :nth-child(1) > .btn')
            .should('have.text', 'Sign')
            .click()

        // Sign & Deploy prompt
        cy.get('#id-sign-modal > div > div > div.modal-footer > button.btn.btn-primary')
            .should('have.text', 'Sign & Deploy')
            .click()

        cy.getMessageID()
            .then((msgId) => {
                cy.wait(2000)
                cy.signTestDeploy(msgId);
            });

    })

})
  
context('Clarity', () => {

    let sideNavLinks;

    beforeEach(() => {
        // Alias block request to allow wait command to target the response
        cy.intercept('GET', '/block').as('getBlock')
        cy.visit(Cypress.env('clarity'))

        // Aliases for side nav tabs
        sideNavLinks = {
            'Accounts'        : '#sideMenu > li:nth-child(1) > a',
            'Faucet'          : '#sideMenu > li:nth-child(2) > a', 
            'DeployContract' : '#sideMenu > li:nth-child(3) > a',
            'Blocks'          : '#sideMenu > li:nth-child(4) > a',
            'Deploys'         : '#sideMenu > li:nth-child(5) > a',
            'Search'          : '#sideMenu > li:nth-child(6) > a',
            'Validators'      : '#sideMenu > li:nth-child(7) > a',
            'ConnectedPeers' : '#sideMenu > li:nth-child(8) > a',
        }
    })

    // BUG: This is getting a Network Error response when searching
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
                    .wait(200)
                    .get('#root > div > main > div > div > div > div > div.card-body > button')
                    .click()
                    .wait('@getBlock')
                    .then(() => {
                        cy.get('#root > div > main > div > div > div > div:nth-child(1) > div.card-body > div > table > tbody > tr:nth-child(4) > td > a')
                        .should(($a) => {
                            assert.equal($span.get(0).innerText.trim(), $a.get(0).innerText.trim(), "Block Hashes match")
                        })    
                    })
            })            
    })

    it('Should check the Validators tab', () => {
        cy.get(sideNavLinks.Validators)
            .click()
        
        cy.get('#validator-tabs')
            .children()
            .should('have.length', 5)
            .then(($tabs) => {
                let currentEra = $tabs[1].innerText.split(" ")[1];
                let currentEraNumber = parseInt(currentEra, 10);

                let actualTabs = [];
                $tabs.toArray().forEach((element) => {
                    actualTabs.push(element.innerText);
                })

                let expectedTabs = [
                    "Bids",
                    `Era ${currentEra} (current)`,
                    `Era ${(currentEraNumber + 1)}`,
                    `Era ${(currentEraNumber + 2)}`,
                    `Era ${(currentEraNumber + 3)}`
                ];

                console.log(actualTabs);
                console.log(expectedTabs);

                assert.deepEqual(actualTabs, expectedTabs)
                
            })
        
        cy.get('#validators-bids-tab > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1)')
            .should('not.be.null')
    })

    it('Should check the Peers tab', () => {

        cy.get(sideNavLinks.ConnectedPeers)
            .click()

        cy.get('#root > div > main > div > div > div > div.card-body > div > table > tbody')
            .children()
            .should('not.be.null')
    })
})
  