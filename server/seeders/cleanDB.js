const models = require('../models');
const db = require("../config/connection");

module.exports = async (modelName, collectionName) => {
    await db.dropCollection(collectionName);
}