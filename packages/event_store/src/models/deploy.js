const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Deploy extends Model {
        static associate(models) {
            models.Deploy.Block = models.Deploy.belongsTo(models.Block, {
                foreignKey: 'blockHeight'
            });
            models.Deploy.Transfers = models.Deploy.hasMany(models.Transfer, {
                foreignKey: 'deployHash'
            });
        }

        async toJSON(skipTransfers = false) {
            let block = await this.getBlock();
            let result = {
                "deployHash": this.deployHash,
                "account": this.account,
                "state": this.state,
                "cost": this.cost,
                "errorMessage": this.errorMessage,
                "blockHash": block.blockHash
            }
            if (!skipTransfers) {
                let transfers = await this.getTransfers();
                result['transfers'] = transfers.map(transfer => {
                    return transfer.toJSON()
                })
            }
            return result;
        }
    };

    Deploy.init({
        deployHash: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        account: DataTypes.STRING,
        state: DataTypes.STRING,
        cost: DataTypes.INTEGER,
        errorMessage: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Deploy',
        indexes: [ 
            { fields: [ 'deployHash' ] },
            { fields: [ 'account' ] }
        ]
    });
    
    return Deploy;
};