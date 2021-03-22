const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Deploy extends Model {
        static associate(models) {
            models.Deploy.Transfers = models.Deploy.hasMany(models.Transfer, {
                foreignKey: 'deployHash'
            });
        }

        async toJSON(skipTransfers = false) {
            let result = {
                "deployHash": this.deployHash,
                "blockHash": this.blockHash,
                "account": this.account,
                "cost": this.cost,
                "errorMessage": this.errorMessage,
                "timestamp": this.timestamp,
            };

            if (!skipTransfers) {
                let transfers = await this.getTransfers();
                result['transfers'] = transfers.map(transfer => {
                    return transfer.toJSON()
                });
            }

            return result;
        }
    }

    Deploy.init({
        deployHash: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        blockHash: DataTypes.STRING,
        account: DataTypes.STRING,
        cost: DataTypes.INTEGER,
        errorMessage: DataTypes.STRING,
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Deploy',
        indexes: [ 
            { fields: [ 'deployHash' ] },
            { fields: [ 'account' ] },
        ]
    });
    
    return Deploy;
};