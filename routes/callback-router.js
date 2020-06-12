const config = require('config');

const { log } = require('../lib');

const CALLBACK_ROUTER_PREFIX = config.get('callbackRouterPrefix');

const schema = {
  description: 'Route different methods according to metadata',
  summary: 'Route all methods',
  tags: ['Routing'],
  body: {
    type: 'object',
    properties: {
      metaData: {
        type: 'string',
        example: '{"test": "Router working!"}',
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
        message: {
          type: 'string',
        }
      },
    },
  },
};

const handler = async (req, reply) => {
  const metaData = JSON.parse(req.body.metaData)

  // Routing happens with looking into metaData keys
  // if ('key' in metaData)

  if ('test' in metaData) {
    reply.send({
      status: 'OK',
      message: metaData.test,
    })
    return;
  }

  if ('match' in metaData) {
    // TODO: Reroute match data
    log.info(metaData.match)
  }
  else if ('title' in metaData) {
    log.info(metaData.title)
  }
  reply.send({ status: 'OK' });
};


module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: CALLBACK_ROUTER_PREFIX,
    handler,
    schema,
  });
};