const { Provider } = require('../models');
const { provider1 } = require('../testdata/testdata');
const { log } = require('../lib');

const insertTestData = async () => {
  try {
    await Provider.create(provider1);
  } catch (error) {
    log.error(error);
    return;
  }
};

module.exports = insertTestData;