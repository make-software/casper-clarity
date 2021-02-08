const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventId extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
            }
        }
    };

    EventId.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'EventId',
        indexes: []
    });
    
    return EventId;
};