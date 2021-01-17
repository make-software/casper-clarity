module.exports = {
    deployProcessedEvent1: {
        "deploy_hash":"deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "Success": {
                "effect": {
                    "operations": [],
                    "transforms": [
                        {
                            "key": "account-hash-2a1f98a5b8074cdbbd46847766b29486fff48e186c65bb12a2dc6bab5190caf8",
                            "transform": "Identity"
                        },
                        {
                            "key": "transfer-9f8ec179be8b2d526ed44d077f8b23830f1f1d41eafe77a88bd245a9b5eb0258",
                            "transform": {
                                "WriteTransfer": {
                                    "deploy_hash": "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
                                    "from": "account-hash-8338671be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
                                    "to": "account-hash-bbbbbb1be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
                                    "source": "uref-f8f32523da86b93b40adee95a05c8b7229887e0d345641a914b1c09d5052563b-007",
                                    "target": "uref-ab9a01563bfd412cd63f03fa99de8c1a4bd573a79e0697229e1844fcf7bb9e04-004",
                                    "amount": "1000000000",
                                    "gas": "0",
                                    "id": "1233"
                                }
                            }
                        }
                    ]
                },
                "transfers": [
                    "transfer-9f8ec179be8b2d526ed44d077f8b23830f1f1d41eafe77a88bd245a9b5eb0258"
                ],
                "cost": "11"
            }
        }
    },

    deployProcessedEvent2: {
        "deploy_hash":"deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "Success": {
                "effect": {
                    "operations": [],
                    "transforms": [
                        {
                            "key": "account-hash-2a1f98a5b8074cdbbd46847766b29486fff48e186c65bb12a2dc6bab5190caf8",
                            "transform": "Identity"
                        },
                        {
                            "key": "transfer-123ec179be8b2d526ed44d077f8b23830f1f1d41eafe77a88bd245a9b5eb0aaa",
                            "transform": {
                                "WriteTransfer": {
                                    "deploy_hash": "deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
                                    "from": "account-hash-8338671be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
                                    "to": "account-hash-aaaaaa1be1687c522f6ac74c67867a7a042b3bd5c1d00d5c66a71c87f85323ef",
                                    "source": "uref-f8f32523da86b93b40adee95a05c8b7229887e0d345641a914b1c09d5052563b-007",
                                    "target": "uref-ffff01563bfd412cd63f03fa99de8c1a4bd573a79e0697229e1844fcf7bbffff-004",
                                    "amount": "40000000",
                                    "gas": "0",
                                    "id": null
                                }
                            }
                        }
                    ]
                },
                "transfers": [
                    "transfer-123ec179be8b2d526ed44d077f8b23830f1f1d41eafe77a88bd245a9b5eb0aaa"
                ],
                "cost": "12"
            }
        }
    },

    deployProcessedEvent3: {
        "deploy_hash":"deploy3_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "1234501c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"abcd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "Success": {
                "effect": {
                    "operations": [],
                    "transforms": []
                },
                "transfers": [],
                "cost": "13"
            }
        }
    },

    blockAddedEvent1: {
        "block_hash":"block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "block_header":{
            "parent_hash":"16815a580c3c1005a7df485e77e31c89e5fb1dec4d57988ffb29f1e699977414",
            "state_root_hash":"cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
            "body_hash":"da223b09967c5bd2110743307e0af6d39f61720aa7218a640a08eed12dd575c7",
            "deploy_hashes":[
                "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
                "deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
            ],
            "random_bit":true,
            "era_end":null,
            "timestamp":"2020-10-08T12:11:35.808Z",
            "era_id":163,
            "height":1800,
            "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
        }
    },

    blockAddedEvent2: {
        "block_hash":"block2_09191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "block_header":{
            "parent_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
            "state_root_hash":"cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
            "body_hash":"da223b09967c5bd2110743307e0af6d39f61720aa7218a640a08eed12dd575c7",
            "deploy_hashes":[],
            "random_bit":true,
            "era_end":null,
            "timestamp":"2020-10-08T12:12:35.808Z",
            "era_id":163,
            "height":1801,
            "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
        }
    },

    blockAddedEvent3: {
        "block_hash":"block3_09191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "block_header":{
            "parent_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
            "state_root_hash":"cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
            "body_hash":"da223b09967c5bd2110743307e0af6d39f61720aa7218a640a08eed12dd575c7",
            "deploy_hashes":[
                "deploy3_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
            ],
            "random_bit":true,
            "era_end":null,
            "timestamp":"2020-10-08T12:13:35.808Z",
            "era_id":163,
            "height":1802,
            "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
        }
    }
}

