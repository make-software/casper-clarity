const got = require('got');

class CasperClient {
    constructor(nodeAddress) {
        this.nodeAddress = nodeAddress;
        this.rpcUrl = 'http://' + this.nodeAddress + ':7777/rpc';
        this.requestId = 1;
    }

    async makeRpcRequest(method, params) {
        const response = await got.post(
            this.rpcUrl, {
                json: {
                    jsonrpc: "2.0",
                    id: this.requestId++,
                    method,
                    params
                },
                responseType: 'json'
            });

        if (response.body.error) {
            throw new Error(response.body.error.message);
        }

        return response.body;
    }

    async getEraInfoBySwitchBlockHeight(blockHeight) {
        const response = await this.makeRpcRequest('chain_get_era_info_by_switch_block', {
            block_identifier: {
                Height: blockHeight
            },
        });

        return response.result.era_summary;
    }

    async getLatestBlock() {
        const response = await this.makeRpcRequest('chain_get_block');

        return response.result.block;
    }

    async getStoredValue(stateRootHash, key) {
        const response = await this.makeRpcRequest('state_get_item', {
            state_root_hash: stateRootHash,
            key
        });

        return response.result.stored_value;
    }

    async getAuctionInfo() {
        const response = await this.makeRpcRequest('state_get_auction_info');

        return response.result.auction_state;
    }

}

module.exports = CasperClient;
