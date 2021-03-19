const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Era extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
                "endBlockHeight": this.endBlockHeight,
                "endTimestamp": this.endTimestamp,
                "protocolVersion": this.protocolVersion,
            }
        }
    }

    Era.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        endBlockHeight: DataTypes.INTEGER,
        endTimestamp: DataTypes.DATE,
        protocolVersion: DataTypes.STRING(15),
    }, {
        sequelize,
        modelName: 'Era',
        indexes: []
    });
    
    return Era;
};