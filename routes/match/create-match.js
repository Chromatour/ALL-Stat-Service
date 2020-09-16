const config = require('config');
const request = require('request-promise-native');
const { log, statusCodesToDefinition } = require('../../lib');
const { Tournament, Match } = require('../../models');

const RIOTAPIKEY = config.get('riot.webApiKey');

const schema = {
  description: 'Creates a new match in given tournament',
  summary: 'Create a match. Returns tournament codes for LoL matchmaking for given match',
  tags: ['Match'],
  body: {
    type: 'object',
    properties: {
      tournamentName: {
        type: 'string',
      },
      allowedSummonerIds: {
        type: 'array',
        summonerNames: {
          type: 'string',
        },
        example: [null],
      },
      team1: {
        type: 'string',
        example: 'IGL',
      },
      team2: {
        type: 'string',
        example: 'MM',
      },
      matchNumber: {
        type: 'number',
        example: '13',
      },
      bestOf: {
        type: 'number',
        example: '1',
      },
      challongeMatchId: {
        type: 'string',
        example: '3254sfds462',
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
      },
    },
  },
};

const handler = async (req, reply) => {
  // Get tournamentId
  let tournament;
  try {
    tournament = await Tournament.findOne({
      tournamentName: req.body.tournamentName,
    });
  } catch (error) {
    log.error('Error finding a tournament! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
  }

  if (!tournament) {
    reply.status(404).send({
      status: 'ERROR',
      error: 'Not Found',
      message: 'TournamentId not found! Please, register a provider first!',
    });
  }

  const metadata = `{"challongeMatchId": "${req.body.challongeMatchId}", "team1": "${req.body.team1}", "team2": "${req.body.team2}"}`;

  const options = {
    uri: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/codes',
    qs: {
      count: req.body.bestOf,
      tournamentId: tournament.tournamentId,
    },
    method: 'POST',
    headers: {
      'X-Riot-Token': RIOTAPIKEY,
    },
    body: {
      mapType: 'SUMMONERS_RIFT',
      pickType: 'TOURNAMENT_DRAFT',
      spectatorType: 'ALL',
      teamSize: 5,
      metadata,
    },
    resolveWithFullResponse: true,
    simple: false,
    json: true,
  };

  const { body, statusCode } = await request(options);

  if (statusCode !== 200) {
    reply.status(statusCode).send({
      status: 'ERROR',
      error: statusCodesToDefinition.get(statusCode),
      message: body.status.message,
    });
    return;
  }

  try {
    await Match.create({
      challongeMatchId: req.body.challongeMatchId,
      team1: req.body.team1,
      team2: req.body.team2,
      numberOfGames: req.body.bestOf,
      tournamentCodes: body,
    });
  } catch (error) {
    log.error('Error creating a match! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
  }

  reply.send({
    status: 'OK',
  });
};

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/create-match',
    handler,
    schema,
  });
};
