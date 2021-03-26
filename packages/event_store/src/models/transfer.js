const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transfer extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "deployHash": this.deployHash,
                "blockHash": this.blockHash,
                "sourcePurse": this.sourcePurse,
                "targetPurse": this.targetPurse,
                "amount": this.amount,
                "id": this.id,
                "fromAccount": this.fromAccount,
                "toAccount": this.toAccount
            }
        }
    };

    Transfer.init({
        transferHash: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        deployHash: DataTypes.STRING,
        blockHash: DataTypes.STRING(64),
        fromAccount: DataTypes.STRING,
        toAccount: DataTypes.STRING,
        sourcePurse: DataTypes.STRING,
        targetPurse: DataTypes.STRING,
        amount: DataTypes.STRING,
        id: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Transfer',
        indexes: [ 
            { fields: [ 'deployHash' ] },
            { fields: [ 'blockHash' ] },
            { fields: [ 'fromAccount' ] },
            { fields: [ 'toAccount' ] }
        ]
    });
    
    return Transfer;
};