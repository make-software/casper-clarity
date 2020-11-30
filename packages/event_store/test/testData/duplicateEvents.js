module.exports = {
    finalizedBlockEvent1: {
        "proto_block":{
            "hash":"aa25466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c55677",
            "deploys":[
                "deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
                "deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
            ],
            "random_bit":true
        },
        "timestamp":"2020-10-08T12:12:35.808Z",
        "era_end":null,
        "era_id":163,
        "height":1800,
        "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
    },

    finalizedBlockEvent2: {
        "proto_block":{
            "hash":"bb25466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c55677",
            "deploys":[
                "deploy3_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
            ],
            "random_bit":true
        },
        "timestamp":"2020-10-08T12:12:35.808Z",
        "era_end":null,
        "era_id":163,
        "height":1801,
        "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
    },

    finalizedBlockEvent3: {
        "proto_block":{
            "hash":"cc25466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c55677",
            "deploys":[
                "deploy4_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
            ],
            "random_bit":true
        },
        "timestamp":"2020-10-08T12:13:35.808Z",
        "era_end":null,
        "era_id":163,
        "height":1801,
        "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
    },

    deployProcessedEvent1: {
        "deploy_hash":"deploy1_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "cost":"11",
            "error_message":null
        }
    },

    deployProcessedEvent2: {
        "deploy_hash":"deploy2_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "cost":"12",
            "error_message":null
        }
    },

    deployProcessedEvent3: {
        "deploy_hash":"deploy3_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "010c801c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"aacd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "cost":"12",
            "error_message":null
        }
    },

    deployProcessedEvent4: {
        "deploy_hash":"deploy4_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3",
        "account": "1234501c47ed20a9ec40a899ddc7b51a15db2a6c55041313eb0201ae04ee9bf932",
        "block_hash":"abcd466409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "execution_result":{
            "cost":"12",
            "error_message":null
        }
    },

    blockAddedEvent1: {
        "block_hash":"block1_6409191316db2ad075bf005cba502e2a46f83102bceb736356a9c51111",
        "block_header":{
            "parent_hash":"16815a580c3c1005a7df485e77e31c89e5fb1dec4d57988ffb29f1e699977414",
            "global_state_hash":"cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
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
            "global_state_hash":"cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
            "body_hash":"da223b09967c5bd2110743307e0af6d39f61720aa7218a640a08eed12dd575c7",
            "deploy_hashes":[
                "deploy3_6fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
            ],
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
            "global_state_hash":"cc1b4d3c56f26c63b0683b5d0eb7e165226a05c12e189739c8b477e633582f47",
            "body_hash":"da223b09967c5bd2110743307e0af6d39f61720aa7218a640a08eed12dd575c7",
            "deploy_hashes":[
                "deploy4_0fb356b6d76d2f64a9500ed2cf1d3062ffcf03bb837003c8208602c5d3"
            ],
            "random_bit":true,
            "era_end":null,
            "timestamp":"2020-10-08T12:12:35.808Z",
            "era_id":163,
            "height":1802,
            "proposer":"01d28e8ac5e5a02512c134fecb5cde43755b59d4616e109a4afd6c4f908bf82606"
        }
    }
}

