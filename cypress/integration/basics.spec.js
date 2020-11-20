/// <reference types='cypress' />

// import AuthService from '../../packages/ui/src/services/AuthService';

context('Basic Functionality', () => {

    let sideNavLinks;

    beforeEach(() => {
        cy.visit('https://clarity.casperlabs.io');
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

    it('Should search for block', () => {
        // Go to Search screen
        cy.get(sideNavLinks.Search)
            .click()

        // Get block hash from network highlight box
        cy.get('#mainNav > div.navbar-network-info.d-none.d-md-inline-block > p:nth-child(2) > span')
            .then(($span) => {
                // Enter block hash into search box
                cy.get('#id-search-hash-base16')
                    .type($span.get(0).innerText)
                    .wait(200)
                    .then(() => {
                        // Click submit
                        cy.get('#root > div > main > div > div > div > div > div.card-body > button')
                            .click()
                    })
                // Arbitrary time to wait for page to load - there are better ways to handle this
                cy.wait(10000)

                cy.get('#root > div > main > div > div > div > div:nth-child(1) > div.card-body > table > tbody > tr:nth-child(4) > td > a')
                    .should(($a) => {
                        assert.equal($span.get(0).innerText.trim(), $a.get(0).innerText.trim(), "Block Hashes match")
                    })
            })            
    })

    // it('Should deploy a contract', () => {

        // Login with custom command supplied with env variables
        // cy.login()
        //     .then((resp) => {
        //     return resp.body;
        // })
        // .then((body) => {
        //     const {access_token, expires_in, id_token} = body;
        //     const auth0State = {
        //         nonce: '',
        //         state: 'some-random-state'
        //     };
        //     const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${auth0State.state}`;
        //     cy.visit(callbackUrl, {
        //         onBeforeLoad(win) {
        //             win.document.cookie = 'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
        //         }
        //     });
        // })

        // Login using stubbed methods


        // Click on Deploy Contract tab in side nav
        // cy.get()
        //     .click() 
    // })
})
  