const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transfer extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "deployHash": this.deployHash,
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
            { fields: [ 'sourcePurse' ] },
            { fields: [ 'targetPurse' ] },
            { fields: [ 'fromAccount' ] },
            { fields: [ 'toAccount' ] }
        ]
    });
    
    return Transfer;
};