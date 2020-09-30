const { log } = require('../../lib');
const { Match, Team } = require('../../models');

const schema = {
  description: 'Increments winning teams win count in match database, and calls game parser to record stats',
  summary: 'Handles game callback coming from Riot Games',
  tags: ['Match'],
  body: {
    type: 'object',
    properties: {
      startTime: {
        type: 'number',
      },
      winningTeam: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            summonerName: {
              type: 'string',
            },
          },
        },
      },
      losingTeam: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            summonerName: {
              type: 'string',
            },
          },
        },
      },
      shortCode: {
        type: 'string',
      },
      metaData: {
        type: 'string',
      },
      gameId: {
        type: 'number',
      },
      gameName: {
        type: 'string',
      },
      gameType: {
        type: 'string',
      },
      gameMap: {
        type: 'number',
      },
      gameMode: {
        type: 'string',
      },
      region: {
        type: 'string',
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
  let winningTeam;
  try {
    winningTeam = await Team.findOne({
      players: {
        $in: req.body.winningTeam.map((summoner) => summoner.summonerName),
      },
    });
  } catch (error) {
    log.error('Error finding a team! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
  }

  if (!winningTeam) {
    reply.status(404).send({
      status: 'ERROR',
      error: 'Not Found',
      message: 'Team not found with winning team members! ',
    });
    return;
  }

  const metadata = JSON.parse(req.body.metaData);
  let team1Wins;
  let team2Wins;
  if (winningTeam.teamAbbreviation === metadata.team1) {
    team1Wins = 1;
    team2Wins = 0;
  } else {
    team1Wins = 0;
    team2Wins = 1;
  }

  let currentMatch;
  try {
    currentMatch = await Match.findOneAndUpdate({
      challongeMatchId: metadata.challongeMatchId,
    }, {
      $inc: {
        team1Wins,
        team2Wins,
      },
    });
  } catch (error) {
    log.error('Error finding a match! ', error);
    reply.status(500).send({
      status: 'ERROR',
      error: 'Internal Server Error',
    });
  }

  if (!currentMatch) {
    reply.status(404).send({
      status: 'ERROR',
      error: 'Not Found',
      message: 'Match not found.',
    });
  }

  // Call game parser

  reply.send({
    status: 'OK',
  });
};

module.exports = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/game-callback-handler',
    handler,
    schema,
  });
};
