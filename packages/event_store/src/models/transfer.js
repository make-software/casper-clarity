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
                "fromAccount": this.fromAccount,
                "toAccount": this.toAccount
            }
        }
    };

    Transfer.init({
        transferHash: DataTypes.STRING,
        deployHash: DataTypes.STRING,
        blockHash: DataTypes.STRING(64),
        fromAccount: DataTypes.STRING,
        toAccount: DataTypes.STRING,
        sourcePurse: DataTypes.STRING,
        targetPurse: DataTypes.STRING,
        amount: DataTypes.STRING,
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

    Transfer.removeAttribute('id');
    
    return Transfer;
};