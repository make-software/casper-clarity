const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GenesisAccountTransfer extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "transferId": this.transferId,
                "deployHash": this.deployHash,
                "blockHash": this.blockHash,
                "sourcePurse": this.sourcePurse,
                "targetPurse": this.targetPurse,
                "amount": this.amount,
                "fromAccount": this.fromAccount,
                "toAccount": this.toAccount,
                "isInternal": this.isInternal,
                "isIgnored": this.isIgnored,
                "isReviewed": this.isReviewed,
                "timestamp": this.timestamp,
                "description": this.description,
            }
        }
    };

    GenesisAccountTransfer.init({
        transferId: DataTypes.BIGINT,
        deployHash: {
            type: DataTypes.STRING(64),
            primaryKey: true,
        },
        transferHash: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        blockHash: DataTypes.STRING(64),
        fromAccount: DataTypes.STRING(64),
        toAccount: DataTypes.STRING(64),
        sourcePurse: DataTypes.STRING,
        targetPurse: DataTypes.STRING,
        amount: DataTypes.BIGINT,
        isInternal: DataTypes.TINYINT,
        isIgnored: DataTypes.TINYINT,
        isReviewed: DataTypes.TINYINT,
        description: DataTypes.TEXT('medium'),
        timestamp: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'GenesisAccountTransfer',
        timestamps: false,
        indexes: [ 
            {
                name: 'search_idx',
                fields: [ 'fromAccount', 'isInternal', 'isIgnored', 'toAccount' ]
            },
        ]
    });

    GenesisAccountTransfer.removeAttribute('id');
    
    return GenesisAccountTransfer;
};