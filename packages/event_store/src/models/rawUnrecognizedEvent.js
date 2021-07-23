const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawUnrecognizedEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                eventType: this.eventType,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawUnrecognizedEvent.init({
        sourceNodeId: DataTypes.TINYINT,
        apiVersionId: DataTypes.MEDIUMINT,
        eventType: DataTypes.STRING(32),
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        modelName: 'RawUnrecognizedEvent',
        tableName: 'RawUnrecognizedEvents',
        indexes: []
    });

    return RawUnrecognizedEvent;
};