const knex = require("knex");

require("dotenv").config();

const knexConfig = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

const connectionConfig = knexConfig[environment];

const connection = knex(connectionConfig);

module.exports = connection;
