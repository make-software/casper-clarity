const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                eventType: this.eventType,
                primaryEntityHash: this.primaryEntityHash,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawEvent.init({
        sourceNodeId: DataTypes.INTEGER,
        apiVersionId: DataTypes.INTEGER,
        eventType: {
            type: DataTypes.STRING(32),
            primaryKey: true
        },
        primaryEntityHash: {
            type: DataTypes.STRING(130),
            primaryKey: true
        },
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        modelName: 'RawEvent',
        indexes: []
    });

    return RawEvent;
};