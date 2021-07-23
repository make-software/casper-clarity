const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawFinalitySignatureEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                signature: this.signature,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawFinalitySignatureEvent.init({
        sourceNodeId: DataTypes.TINYINT,
        apiVersionId: DataTypes.MEDIUMINT,
        signature: {
            type: DataTypes.STRING(130),
            primaryKey: true
        },
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        modelName: 'RawFinalitySignatureEvent',
        tableName: 'RawFinalitySignatureEvents',
        indexes: []
    });

    return RawFinalitySignatureEvent;
};