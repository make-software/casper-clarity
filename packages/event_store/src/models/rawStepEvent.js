const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawStepEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                eraId: this.eraId,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawStepEvent.init({
        sourceNodeId: DataTypes.TINYINT,
        apiVersionId: DataTypes.MEDIUMINT,
        eraId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        modelName: 'RawStepEvent',
        tableName: 'RawStepEvents',
        indexes: []
    });

    return RawStepEvent;
};