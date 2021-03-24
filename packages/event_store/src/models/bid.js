const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bid extends Model {
        static associate(models) {}

        toJSON() {
            return {
                key: this.key,
                deployHash: this.deployHash,
                validatorPublicKey: this.validatorPublicKey,
                bondingPurse: this.bondingPurse,
                stakedAmount: this.stakedAmount,
                delegationRate: this.delegationRate,
                inactive: this.inactive,
                timestamp: this.timestamp,
            }
        }
    };

    Bid.init({
        deployHash: {
            type: DataTypes.STRING(64),
            primaryKey: true
        },
        key: {
            type: DataTypes.STRING(74),
            primaryKey: true
        },
        validatorPublicKey: DataTypes.STRING(67),
        bondingPurse: DataTypes.STRING(74),
        stakedAmount: DataTypes.BIGINT,
        delegationRate: DataTypes.INTEGER,
        inactive: DataTypes.BOOLEAN,
        vestingSchedule: DataTypes.JSON,
        delegators: DataTypes.JSON,
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Bid',
        indexes: [ 
            { fields: [ 'validatorPublicKey' ] },
        ]
    });
    
    return Bid;
};