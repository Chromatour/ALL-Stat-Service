const log = require('./logger');
const handleRiotApiErrors = require('./handle-riot-api-errors');
const insertTestData = require('./insert-testdata');
const statusCodesToDefinition = require('./status-codes');
const getChampionById = require('./data_dragon/get-champion-by-id');

module.exports = {
  log,
  handleRiotApiErrors,
  insertTestData,
  statusCodesToDefinition,
  getChampionById,
};
