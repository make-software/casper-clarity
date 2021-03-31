const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Deploy extends Model {
        async toJSON() {
            return {
                "deployHash": this.deployHash,
                "blockHash": this.blockHash,
                "account": this.account,
                "cost": this.cost,
                "errorMessage": this.errorMessage,
                "timestamp": this.timestamp,
            };
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