const { helper, Sequelize, DataTypes } = require('../util/data-source-helper.js');

const FishCatch = helper.define('record', {
    // attributes
    referenceNumber: {
        type: Sequelize.STRING
    },
    catchId: {
        type: Sequelize.STRING
    },
    vesselName: {
        type: Sequelize.STRING
    },
    boatCaptain: {
        type: Sequelize.STRING
    },
    species: {
        type: Sequelize.STRING
    },
    weight: {
        type: Sequelize.STRING
    },
    latitude: {
        type: Sequelize.STRING
    },
    longitude: {
        type: Sequelize.STRING
    },
    catchDate: {
        type: Sequelize.STRING
    },
    verifiedBy: {
        type: Sequelize.STRING
    },
    verifiedDate: {
        type: Sequelize.STRING
    },
    isVerified: {
        type: DataTypes.BOOLEAN
    },
    datasource: {
        type: Sequelize.STRING
    }

}, {
    // options
});

//FishCatch.sync({force : true});

module.exports = FishCatch;