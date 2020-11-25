const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Deploy extends Model {
        static associate(models) {
            models.Deploy.Block = models.Deploy.belongsTo(models.Block, {
                foreignKey: 'blockHeight'
            });
        }

        async toJSON() {
            let block = await this.getBlock();
            return {
                "deployHash": this.deployHash,
                "account": this.account,
                "state": this.state,
                "cost": this.cost,
                "errorMessage": this.errorMessage,
                "blockHash": block.blockHash
            }
        }
    };

    Deploy.init({
        deployHash: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        account: DataTypes.STRING,
        state: DataTypes.STRING,
        cost: DataTypes.INTEGER,
        errorMessage: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Deploy'
    });
    
    return Deploy;
};