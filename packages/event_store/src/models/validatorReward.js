const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ValidatorReward extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "eraId": this.eraId,
                "publicKey": this.publicKey,
                "amount": this.amount,
                "timestamp": this.timestamp,
            }
        }
    }

    ValidatorReward.init({
        publicKey: {
            type: DataTypes.STRING(68),
            primaryKey: true,
        },
        eraId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        amount: DataTypes.BIGINT,
        timestamp: DataTypes.DATE,
    }, {
        sequelize,
        timestamps: false,
        modelName: 'ValidatorReward',
        indexes: []
    });
    
    return ValidatorReward;
};