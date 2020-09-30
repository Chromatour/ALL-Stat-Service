const config = require('config');
const request = require('request-promise-native');
const bent = require('bent');
const { handleRiotApiErrors, log } = require('../../lib');
const { Game, Participant } = require('../../models');

const RIOTAPIKEY = config.get('riot.webApiKey');
const AKL_CORE_BACKEND_URL = config.get('coreBackendUrl');

const getUser = bent(AKL_CORE_BACKEND_URL, 'GET', 'json', 200);

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
    const team1PlayersStats = body.participants.filter((player) => player.teamId === 100);
    const team2PlayersStats = body.participants.filter((player) => player.teamId === 200);

    gameStats.team1Gold = team1PlayersStats.reduce((prev, curr) => prev + curr.stats.goldEarned, 0);
    gameStats.team2Gold = team2PlayersStats.reduce((prev, curr) => prev + curr.stats.goldEarned, 0);

    // Loop through participants to get summonerNames
    const players = [];
    body.participants.map((player) => player.participantId).forEach((Id) => {
      const found = body.participantIdentities.find((part) => part.participantId === Id);
      if (found) {
        players.push({ summonerName: found.player.summonerName, participantId: Id });
      }
    });

    const promises = [];
    players.forEach((player) => {
      promises.push(getUser(`/user/riot-username/${player.summonerName}`));
    });

    let results;
    try {
      results = await Promise.all(promises.map((p) => p.catch((e) => e)));
    } catch (error) {
      log.error('Looking for all the players failed! ', error);
      return;
    }

    players.forEach((player) => {
      const corePlayer = results.find((result) => result.riot.summonerName === player.summonerName);
      // eslint-disable-next-line no-param-reassign
      player.corePlayerId = corePlayer._id;
    });

    const bulkWritePayload = [];
    body.participants.forEach((participant) => {
      const editPlayer = players
        .find((player) => player.participantId === participant.participantId);
      editPlayer.stats.championId = participant.championId;
      editPlayer.stats.goldEarned = participant.stats.goldEarned;
      editPlayer.stats.totalDamageTaken = participant.stats.totalDamageTaken;
      editPlayer.stats.totalDamageDealtToChampions = participant.stats.totalDamageDealtToChampions;
      editPlayer.stats.CS = participant.stats.totalMinionsKilled;
      editPlayer.stats.visionScore = participant.stats.visionScore;
      editPlayer.stats.CCScore = participant.stats.championId;
      editPlayer.stats.kills = participant.stats.kills;
      editPlayer.stats.deaths = participant.stats.deaths;
      editPlayer.stats.assists = participant.stats.assists;
      delete editPlayer.participantId;
      bulkWritePayload.push(editPlayer);
    });

    try {
      await Participant.bulkWrite(bulkWritePayload);
    } catch (error) {
      log.error('Error writing participant stats to db! ', error);
      return;
    }

    try {
      await Game.create(gameStats);
    } catch (error) {
      log.error('Error writing game results to db! ', error);
    }
    return;
  }

  throw await handleRiotApiErrors(statusCode, body.status.message);
};

module.exports = {
  parseGameStats,
};
