const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ApiVersion extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "id": this.id,
                "version": this.version,
            }
        }
    };

    ApiVersion.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        version: DataTypes.STRING(32),
    }, {
        sequelize,
        modelName: 'ApiVersion',
        indexes: [
            {unique: true, fields: ['version']}
        ],
    });
    
    return ApiVersion;
};