const config = require('config');

const fastify = require('fastify');
const fastifySwagger = require('fastify-swagger');
const routes = require('./routes');

const APPLICATION_PORT = config.get('port');
const ROUTE_PREFIX = config.get('routePrefix');
const FASTIFY_OPTIONS = config.get('fastifyOptions');

// Initialize swagger
const initSwagger = () => {
  const swaggerOptions = config.get('swagger');

  return {
    routePrefix: `${ROUTE_PREFIX}/documentation`,
    swagger: {
      info: {
        title: 'Project ALL/AKL Web Backend - ALL Stat Service',
        description: 'Project ALL/AKL Web Backend - ALL Stat Service',
        version: '1.0.0',
      },
      host: swaggerOptions.host,
      schemes: swaggerOptions.schemes,
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      security: [{
        bearerAuth: [],
      }],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        {
          name: 'Integration',
          description: '...',
        }, {
          name: 'Utility',
          description: 'Utility endpoints',
        }, {
          name: 'Result',
          description: 'CRUD endpoints related to Results',
        }, {
          name: 'Stats',
          description: 'CRUD endpoints related to Stats',
        },
      ],
    },
    exposeRoute: true,
  };
};

/**
 * Routes
 * There is try catch inside the loop, because if we want to authenticate
 * user, we must export route function instead of just options object.
 *
 * See routes/integration/login-email.js vs routes/integration/login-steam.js
 * for more information.
 */
const utilityRoute = async (server) => {
  Object.keys(routes.utility).forEach((key) => {
    try {
      server.route(routes.utility[key]);
    } catch (error) {
      routes.utility[key](server);
    }
  });
};

const tournamentRoute = async (server) => {
  Object.keys(routes.tournament).forEach((key) => {
    try {
      server.route(routes.tournament[key]);
    } catch (error) {
      routes.tournament[key](server);
    }
  });
};

const callbackRouterRoute = async (server) => {
  try {
    server.route(routes.callbackRouter);
  } catch (error) {
    routes.callbackRouter(server);
  }
};

const matchRoute = async (server) => {
  Object.keys(routes.match).forEach((key) => {
    try {
      server.route(routes.match[key]);
    } catch (error) {
      routes.match[key](server);
    }
  });
};

/**
 * Init server
 * @param {Object} options Optional.
 */
const initServer = async () => {
  const server = fastify({
    logger: FASTIFY_OPTIONS.logger,
    ignoreTrailingSlash: FASTIFY_OPTIONS.ignoreTrailingSlash,
    ajv: {
      customOptions: {
        removeAdditional: 'all',
      },
    },
  });

  // Register plugins and routes
  server
    .register(fastifySwagger, initSwagger())
    .register(utilityRoute, { prefix: `${ROUTE_PREFIX}/utility` })
    .register(callbackRouterRoute, { prefix: `${ROUTE_PREFIX}` })
    .register(tournamentRoute, { prefix: `${ROUTE_PREFIX}/tournament` })
    .register(matchRoute, { prefix: `${ROUTE_PREFIX}/match` });

  return {
    start: async () => {
      await server.listen(APPLICATION_PORT, '0.0.0.0');
      return server;
    },
  };
};

module.exports = {
  initServer,
};
