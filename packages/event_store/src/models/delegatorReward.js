const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DelegatorReward extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "eraId": this.eraId,
                "publicKey": this.publicKey,
                "validatorPublicKey": this.validatorPublicKey,
                "amount": this.amount,
            }
        }
    }

    DelegatorReward.init({
        publicKey: {
            type: DataTypes.STRING(68),
            primaryKey: true,
        },
        validatorPublicKey: {
            type: DataTypes.STRING(68),
            primaryKey: true,
        },
        eraId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        amount: DataTypes.BIGINT,
    }, {
        indexes: [
            { fields: [ 'validatorPublicKey' ] },
        ],
        sequelize,
        timestamps: false,
        modelName: 'DelegatorReward',
    });
    
    return DelegatorReward;
};