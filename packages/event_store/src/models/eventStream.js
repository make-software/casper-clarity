const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EventStream extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
                "path": this.path,
            }
        }
    };

    EventStream.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        path: DataTypes.STRING(16),
    }, {
        sequelize,
        modelName: 'EventStream',
        indexes: [
            {unique: true, fields: ['path']}
        ],
    });

    return EventStream;
};