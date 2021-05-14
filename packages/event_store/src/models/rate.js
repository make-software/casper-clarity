const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rate extends Model {
        static associate(models) {}

        toJSON() {
            return {
                rate_source_id: this.rate_source_id,
                currency_id: this.currency_id,
                rate: this.rate,
                created: this.created,
            }
        }
    }

    Rate.init({
        rate_source_id: DataTypes.INTEGER,
        currency_id: DataTypes.INTEGER,
        rate: DataTypes.FLOAT,
        created: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'Rate',
        indexes: [],
        timestamps: false,
        tableName: 'rates'
    });
    
    return Rate;
};