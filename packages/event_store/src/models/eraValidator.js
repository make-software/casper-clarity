const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EraValidator extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "eraId": this.eraId,
                "publicKeyHex": this.publicKeyHex,
                "weight": this.weight,
                "rewards": this.rewards,
                "hasEquivocation": this.hasEquivocation,
                "wasActive": this.wasActive,
            }
        }
    }

    EraValidator.init({
        eraId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        publicKeyHex: {
            type: DataTypes.STRING(68),
            primaryKey: true,
        },
        weight: DataTypes.BIGINT,
        rewards: DataTypes.BIGINT,
        hasEquivocation: DataTypes.BOOLEAN,
        wasActive: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'EraValidator',
        indexes: []
    });
    
    return EraValidator;
};