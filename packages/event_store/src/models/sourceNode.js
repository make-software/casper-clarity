const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SourceNode extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
                "address": this.address,
            }
        }
    };

    SourceNode.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address: DataTypes.STRING(15),
    }, {
        sequelize,
        modelName: 'SourceNode',
        indexes: [
            {unique: true, fields: ['address']}
        ],
    });
    
    return SourceNode;
};