const config = require('config');
const request = require('request-promise-native');
const { handleRiotApiErrors } = require('../../lib');
const Game = require('../../models/game');

const RIOTAPIKEY = config.get('riot.webApiKey');

const parseGameStats = async (matchId) => {
  // Retrieve data from Riot server
  const options = {
    uri: `https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments/${matchId}`,
    method: 'POST',
    headers: {
      'X-Riot-Token': RIOTAPIKEY,
    },
    resolveWithFullResponse: true,
    simple: false,
    json: true,
  };

  const { body, statusCode } = await request(options);

  if (statusCode === 200) {
    let gameStats;
    gameStats.gameDuration = body.gameDuration;
    const team1 = body.teams.find((team) => team.teamId === 100);
    const team2 = body.teams.find((team) => team.teamId === 200);

    if (team1.win === 'Win') {
      gameStats.winner = 'Blue';
    } else {
      gameStats.winner = 'Red';
    }

    // Simple team stats
    gameStats.team1Dragons = team1.dragonKills;
    gameStats.team1Turrets = team1.towerKills;
    gameStats.team1Heralds = team1.riftHeraldKills;
    gameStats.team1Barons = team1.baronKills;
    gameStats.team1Inhibitors = team1.inhibitorKills;
    gameStats.team1Bans = team1.bans;

    gameStats.team2Dragons = team2.dragonKills;
    gameStats.team2Turrets = team2.towerKills;
    gameStats.team2Heralds = team2.riftHeraldKills;
    gameStats.team2Barons = team2.baronKills;
    gameStats.team2Inhibitors = team2.inhibitorKills;
    gameStats.team2Bans = team2.bans;

    // Participant team stats
    const team1Players = body.participants.filter((player) => player.teamId === 100);
    const team2Players = body.participants.filter((player) => player.teamId === 200);

    gameStats.team1Gold = team1Players.reduce((prev, curr) => prev + curr.stats.goldEarned, 0);
    gameStats.team2Gold = team2Players.reduce((prev, curr) => prev + curr.stats.goldEarned, 0);

    await Game.create(gameStats);
    return;
  }

  throw await handleRiotApiErrors(statusCode, body.status.message);
};

module.exports = parseGameStats;
