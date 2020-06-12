const config = require('config');
const request = require('request-promise-native');
const { log, statusCodesToDefinition } = require('../../lib');
const { Tournament, Match } = require('../../models');

const HOST = config.get('host');
const ROUTEPREFIX = config.get('routePrefix');
const CALLBACKROUTERPREFIX = config.get('callbackRouterPrefix');
const RIOTAPIKEY = config.get('riot.webApiKey');
const REGION = config.get('lolRegion');

const schema = {
  description: 'Creates a new match in given tournament',
  summary: 'Create a match. Returns tournament codes for LoL matchmaking for given match',
  tags: ['Match'],
  body: {
    type: 'object',
    properties: {
      allowedSummonerIds: {
        type: 'array',
        summonerNames: {
          type: 'string'
        },
        example: null,
      },
      metadata: {
        type: 'string',
        example: '{"match": "13", "team1": "IGL", "team2": "MM"}',
      },
      bestOf: {
        type: 'number',
        example: '1',
      },
      challongeMatchId: {
        type: 'string',
        required: true,
        example: '3254462',
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
    tournament = await Tournament.findOne().sort({created_at: -1});
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

  const options = {
    uri: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/',
    qs: {
      'count': req.body.bestOf,
      'tournamentId': tournament.tournamentId,
    },
    method: 'POST',
    headers: {
      'X-Riot-Token': RIOTAPIKEY,
    },
    body: {
      'mapType': 'SUMMONERS_RIFT',
      'pickType': 'TOURNAMENT_DRAFT',
      'spectatorType': 'ALL',
      'teamSize': 5,
      'metadata': req.body.metadata,
    },
    resolveWithFullResponse: true,
    simple: false,
    json: true,
  };

  const { body, statusCode } = await request(options);

  if (statusCode !== 200) {
    console.log(body)
    reply.status(statusCode).send({
      status: 'ERROR',
      error: statusCodesToDefinition.get(statusCode),
      message: body.status.message,
    });
    return;
  };

  try {
    const match = await Match.create({
      challongeMatchId: req.body.challongeMatchId,
      tournamentId: body,
      year: req.body.year,
    })
  } catch (error) {
    log.error('Error creating a tournament! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
  };

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