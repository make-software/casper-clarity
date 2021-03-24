const { Model } = require('sequelize');

/* @todo Figure out the primary key for this entity
{
  "key": "withdraw-46dba8a2efb349e0171b402ed3fd461e07f959bf0ae9b058538207b173fe8031",
  "transform": {
    "WriteWithdraw": [
      {
        "bonding_purse": "uref-b29f1b1eb735076b9adf3f2755466b2b4de9d8110e3a0cc90996ee6fdc402802-007",
        "validator_public_key": "0100cd28cec3dd6d29b959ae7b36a8201c92fe6af75fa44d5fa84b7d2e417ca940",
        "unbonder_public_key": "0202c436d422737f2470b92882ae6268cf4fb3547a8837fba778aea0bc42580a30a1",
        "era_of_creation": 67,
        "amount": "250000000"
      },
      {
        "bonding_purse": "uref-b29f1b1eb735076b9adf3f2755466b2b4de9d8110e3a0cc90996ee6fdc402802-007",
        "validator_public_key": "0100cd28cec3dd6d29b959ae7b36a8201c92fe6af75fa44d5fa84b7d2e417ca940",
        "unbonder_public_key": "0202c436d422737f2470b92882ae6268cf4fb3547a8837fba778aea0bc42580a30a1",
        "era_of_creation": 68,
        "amount": "1"
      },
      {
        "bonding_purse": "uref-b29f1b1eb735076b9adf3f2755466b2b4de9d8110e3a0cc90996ee6fdc402802-007",
        "validator_public_key": "0100cd28cec3dd6d29b959ae7b36a8201c92fe6af75fa44d5fa84b7d2e417ca940",
        "unbonder_public_key": "0202c436d422737f2470b92882ae6268cf4fb3547a8837fba778aea0bc42580a30a1",
        "era_of_creation": 68,
        "amount": "0"
      },
      {
        "bonding_purse": "uref-b29f1b1eb735076b9adf3f2755466b2b4de9d8110e3a0cc90996ee6fdc402802-007",
        "validator_public_key": "0100cd28cec3dd6d29b959ae7b36a8201c92fe6af75fa44d5fa84b7d2e417ca940",
        "unbonder_public_key": "0202c436d422737f2470b92882ae6268cf4fb3547a8837fba778aea0bc42580a30a1",
        "era_of_creation": 68,
        "amount": "250000000"
      },
      {
        "bonding_purse": "uref-b29f1b1eb735076b9adf3f2755466b2b4de9d8110e3a0cc90996ee6fdc402802-007",
        "validator_public_key": "0100cd28cec3dd6d29b959ae7b36a8201c92fe6af75fa44d5fa84b7d2e417ca940",
        "unbonder_public_key": "0202c436d422737f2470b92882ae6268cf4fb3547a8837fba778aea0bc42580a30a1",
        "era_of_creation": 68,
        "amount": "250000000"
      }
    ]
  }
},
 */
module.exports = (sequelize, DataTypes) => {
    class Withdrawal extends Model {
        static associate(models) {}

        toJSON() {
            return {
                key: this.key,
                deployHash: this.deployHash,
                validatorPublicKey: this.validatorPublicKey,
                unbonderPublicKey: this.unbonderPublicKey,
                bondingPurse: this.bondingPurse,
                amount: this.amount,
                eraOfCreation: this.eraOfCreation,
                timestamp: this.timestamp,
            }
        }
    };

    Withdrawal.init({
        deployHash: {
            type: DataTypes.STRING(64),
            primaryKey: true
        },
        key: {
            type: DataTypes.STRING(74),
            primaryKey: true
        },
        validatorPublicKey: DataTypes.STRING(67),
        unbonderPublicKey: DataTypes.STRING(67),
        bondingPurse: DataTypes.STRING(74),
        amount: DataTypes.BIGINT,
        eraOfCreation: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Withdrawal',
        indexes: [ 
            { fields: [ 'validatorPublicKey' ] },
        ]
    });
    
    return Withdrawal;
};