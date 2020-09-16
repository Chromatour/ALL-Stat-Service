const config = require('config');
const request = require('request-promise-native');
const { log, statusCodesToDefinition } = require('../../lib');
const { Provider, Tournament } = require('../../models');

const RIOTAPIKEY = config.get('riot.webApiKey');
const REGION = config.get('lolRegion');

const schema = {
  description: 'Create new tournament with latest providerID',
  summary: 'Create new tournament',
  tags: ['Tournament'],
  body: {
    type: 'object',
    properties: {
      tournamentName: {
        type: 'string',
        example: 'Academic Legends League',
      },
      year: {
        type: 'number',
        example: 2020,
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
  // Get providerID
  let provider;
  try {
    provider = await Provider.findOne().sort({ created_at: -1 });
  } catch (error) {
    log.error('Error finding a provider! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
    return;
  }

  if (!provider) {
    reply.status(404).send({
      status: 'ERROR',
      error: 'Not Found',
      message: 'ProviderID not found! Please, register a provider first!',
    });
    return;
  }

  const options = {
    uri: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/tournaments',
    method: 'POST',
    headers: {
      'X-Riot-Token': RIOTAPIKEY,
    },
    body: {
      name: REGION,
      providerId: provider.providerId,
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
    await Tournament.create({
      tournamentName: req.body.tournamentName,
      tournamentId: body,
      year: req.body.year,
    });
  } catch (error) {
    log.error('Error creating a tournament! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
    return;
  }

  reply.send({
    status: 'OK',
  });
};

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/create-tournament',
    handler,
    schema,
  });
};
