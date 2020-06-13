const config = require('config');
const request = require('request-promise-native');
const { log, statusCodesToDefinition } = require('../../lib');
const { Provider } = require('../../models');

const HOST = config.get('host');
const ROUTEPREFIX = config.get('routePrefix');
const CALLBACKROUTERPREFIX = config.get('callbackRouterPrefix');
const RIOTAPIKEY = config.get('riot.webApiKey');
const REGION = config.get('lolRegion');

const schema = {
  description: 'Create new tournament provider (unique for api key)',
  summary: 'Create new tournament provider',
  tags: ['Tournament'],
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
  const callbackUrl = `${HOST}${ROUTEPREFIX}${CALLBACKROUTERPREFIX}`;
  const options = {
    uri: 'https://americas.api.riotgames.com/lol/tournament-stub/v4/providers',
    method: 'POST',
    headers: {
      'X-Riot-Token': RIOTAPIKEY,
    },
    body: {
      region: REGION,
      url: callbackUrl,
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
    await Provider.create({
      providerId: body,
      callbackUrl,
    });
  } catch (error) {
    log.error('Error creating a provider! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
  }

  reply.status(201).send({
    status: 'CREATED',
  });
};

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/create-tournament-provider',
    handler,
    schema,
  });
};
