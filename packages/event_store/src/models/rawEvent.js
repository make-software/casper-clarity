const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                eventHash: this.eventHash,
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                eventType: this.eventType,
                primaryEntityHash: this.primaryEntityHash,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawEvent.init({
        eventHash: {
            type: DataTypes.STRING(64),
            primaryKey: true
        },
        sourceNodeId: DataTypes.INTEGER,
        apiVersionId: DataTypes.INTEGER,
        eventType: DataTypes.STRING(32),
        primaryEntityHash: DataTypes.STRING(130),
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        modelName: 'RawEvent',
        indexes: []
    });
    
    return RawEvent;
};