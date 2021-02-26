const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventId extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
                "sourceNodeId": this.sourceNodeId,
            }
        }
    };

    EventId.init({
        sourceNodeId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    }, {
        sequelize,
        modelName: 'EventId',
        indexes: []
    });
    
    return EventId;
};