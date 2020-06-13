const championData = require('./champion-data');

const getChampionById = async (championId) => {
  const regexString = `/\"id\":\"(.*)\",\n\"key\":\"${championId}\"/`;
  const championRegex = new RegExp(regexString, 'g');
  const [champion] = championRegex.exec(championData);
  return champion;
};

module.exports = getChampionById;
