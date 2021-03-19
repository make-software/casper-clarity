const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class FinalitySignature extends Model {
        static associate(models) {}

        toJSON() {
            return {
                signature: this.signature,
                blockHash: this.blockHash,
                publicKey: this.publicKey,
                eraId: this.eraId,
            }
        }
    }

    FinalitySignature.init({
        signature: {
            type: DataTypes.STRING(130),
            primaryKey: true
        },
        blockHash: DataTypes.STRING(64),
        publicKey: DataTypes.STRING(66),
        eraId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'FinalitySignature',
        indexes: []
    });
    
    return FinalitySignature;
};