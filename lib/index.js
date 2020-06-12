const log = require('./logger');
const handleRiotApiErrors = require('./handle-riot-api-errors');
const insertTestData = require('./insert-testdata');
const statusCodesToDefinition = require('./status-codes');

module.exports = {
  log,
  handleRiotApiErrors,
  insertTestData,
  statusCodesToDefinition,
};