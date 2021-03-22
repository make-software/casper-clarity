const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Block extends Model {
        static associate(models) {}

        async toJSON(deploys = null) {
            let result = {
                "blockHash": this.blockHash,
                "parentHash": this.parentHash,
                "timestamp": this.timestamp,
                "eraId": this.eraId,
                "proposer": this.proposer,
                "state": this.state,
                "deployCount": this.deployCount,
                "transferCount": this.transferCount,
                "height": this.blockHeight,
            };

            if (deploys) {
                result["deploys"] = deploys;
            }
            
            return result;
        }
    };

    // I can't use the validator.js fns as it reads strings as valid numbers.
    // We also can't use the in-built constraints like isDate because if false
    // it throws error which breaks the stream instead of just logging a warning
    Block.init({
        blockHeight: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {
                isHeightValid() {
                    if ( typeof(this.blockHeight) !== 'number' ) {
                        console.warn("\n\tWARN: invalid blockHeight for block at height: " + this.blockHeight + "\n");
                    }
                }
            }
        },
        blockHash: {
            type: DataTypes.STRING,
            validate: {
                isHashValid() {
                    if ( typeof(this.blockHash) !== 'string' ) {
                        console.warn("\n\tWARN: invalid blockHash for block at height: " + this.blockHeight + "\n");
                    }
                }
            }
        },
        parentHash: {
            type: DataTypes.STRING,
            validate: {
                isParentHashValid() {
                    if ( typeof(this.parentHash) !== 'string' ) {
                        console.warn("\n\tWARN: invalid parentHash for block at height: " + this.blockHeight + "\n");
                    }
                }
            }
        },
        timestamp: {
            type: DataTypes.DATE,       // George TODO: Check the date format
            validate: {
                isTimestampValid() {
                    //console.log(typeof(this.timestamp));
                    // if ( this.timestamp.prototype.toString.call(date) === '[object Date]') {
                        // console.warn("\n\tWARN: invalid timestamp for block at height: " + this.blockHeight + "\n");
                    // }
                }
            }
        },
        eraId: {
            type: DataTypes.INTEGER,
            validate: {
                isEraIdValid() {
                    if ( typeof(this.eraId) !== 'number' ) {
                        console.warn("\n\tWARN: invalid eraId for block at height: " + this.blockHeight + "\n");
                    }
                }
            }
        },
        state: {
            type: DataTypes.STRING,
            validate: {
                isStateValid() {
                    if (typeof this.blockHash !== 'string') {
                        console.warn(
                          '\n\tWARN: invalid state root hash for block at height: ' +
                          this.blockHeight +
                          '\n'
                        );
                    }
                }
            }
        },
        deployCount: {
            type: DataTypes.INTEGER,
            validate: {
                isDeployCountValid() {
                    if ( typeof(this.deployCount) !== 'number' ) {
                        console.warn("\n\tWARN: invalid deployCount for block at height: " + this.blockHeight + "\n");
                    }
                }
            }
        },
        transferCount: DataTypes.INTEGER,
        proposer: {
            type: DataTypes.STRING,
            validate: {
                isProposerValid() {
                    if ( typeof(this.proposer) !== 'string' ) {
                        console.warn("\n\tWARN: invalid proposer for block at height: " + this.blockHeight + "\n");
                    }
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Block',
        indexes: [
            { fields: [ 'blockHeight' ] },
            { fields: [ 'blockHash' ] }
        ]
    });

    return Block;
};
