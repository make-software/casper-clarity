const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RawDeployAcceptedEvent extends Model {
        static associate(models) {}

        toJSON() {
            return {
                sourceNodeId: this.sourceNodeId,
                apiVersionId: this.apiVersionId,
                deployHash: this.deployHash,
                jsonBody: this.jsonBody,
            }
        }
    }

    RawDeployAcceptedEvent.init({
        sourceNodeId: DataTypes.TINYINT,
        apiVersionId: DataTypes.MEDIUMINT,
        deployHash: {
            type: DataTypes.STRING(64),
            primaryKey: true
        },
        jsonBody: DataTypes.TEXT('medium'),
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'created',
        updatedAt: false,
        modelName: 'RawDeployAcceptedEvent',
        tableName: 'RawDeployAcceptedEvents',
        indexes: []
    });

    return RawDeployAcceptedEvent;
};