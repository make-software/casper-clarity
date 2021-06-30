const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GenesisAccount extends Model {
        static TYPE_VALIDATOR = 'validator';
        static TYPE_DELEGATOR = 'delegator';
        static TYPE_ACCOUNT = 'account';

        static associate(models) {}

        toJSON() {
            return {
                "publicKey": this.publicKeyHex,
                "accountHash": this.accountHash,
                "balance": this.balance,
                "type": this.type,
            }
        }
    }

    GenesisAccount.init({
        publicKey: {
            type: DataTypes.STRING(68),
            primaryKey: true,
        },
        accountHash: DataTypes.STRING(64),
        type: DataTypes.STRING(9),
        balance: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'GenesisAccount',
        timestamps: false,
        indexes: []
    });

    return GenesisAccount;
};