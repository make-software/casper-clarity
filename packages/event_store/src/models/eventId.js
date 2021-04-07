const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventId extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
                "sourceNodeId": this.sourceNodeId,
                "apiVersionId": this.apiVersionId,
            }
        }
    };

    EventId.init({
        sourceNodeId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        apiVersionId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
    }, {
        sequelize,
        modelName: 'EventId',
        indexes: []
    });
    
    return EventId;
};