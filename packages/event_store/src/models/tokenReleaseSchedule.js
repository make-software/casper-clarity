const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TokenReleaseSchedule extends Model {
        static associate(models) {}

        toJSON() {
            return {
                "amount": this.amount,
                "date": this.date,
            }
        }
    }

    TokenReleaseSchedule.init({
        date: {
            type: DataTypes.DATE,
            primaryKey: true,
        },
        amount: DataTypes.BIGINT,
    }, {
        sequelize,
        timestamps: false,
        modelName: 'TokenReleaseSchedule',
        tableName: 'TokenReleaseSchedule',
        indexes: []
    });
    
    return TokenReleaseSchedule;
};