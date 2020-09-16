module.exports = {
  port: 3003,
  swagger: {
    host: 'localhost:3003',
    schemes: ['http', 'https'],
  },
  database: {
    mongo: {
      options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    },
  },
  createTestData: true,
  routePrefix: '/allstats',
  fastifyOptions: {
    logger: false,
    ignoreTrailingSlash: true,
  },
  // Valid values: BR, EUNE, EUW, JP, LAN, LAS, NA, OCE, PBE, RU, TR
  lolRegion: 'EUW',
};
