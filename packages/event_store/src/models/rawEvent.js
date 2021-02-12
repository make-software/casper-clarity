const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                eventHash: this.eventHash,
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
        eventType: DataTypes.STRING(32),
        primaryEntityHash: DataTypes.STRING(130),
        jsonBody: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'RawEvent',
        indexes: []
    });
    
    return RawEvent;
};