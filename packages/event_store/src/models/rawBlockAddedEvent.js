const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawBlockAddedEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                blockHeight: this.blockHeight,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawBlockAddedEvent.init({
        sourceNodeId: DataTypes.TINYINT,
        apiVersionId: DataTypes.MEDIUMINT,
        blockHeight: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        modelName: 'RawBlockAddedEvent',
        tableName: 'RawBlockAddedEvents',
        indexes: []
    });

    return RawBlockAddedEvent;
};