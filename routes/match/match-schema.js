const schema = {
  description: 'Parses match stats and saves them to database',
  summary: 'Parse match stats',
  tags: ['Match'],
  body: {
    type: 'object',
    properties: {
      gameId: {
        type: 'number',
      },
      platformId: {
        type: 'string',
        example: 'EUW1',
      },
      gameCreation: {
        type: 'number',
      },
      gameDuration: {
        type: 'number',
      },
      queueId: {
        type: 'number',
      },
      mapId: {
        type: 'number',
      },
      seasonId: {
        type: 'number',
      },
      gameVersion: {
        type: 'string',
      },
      gameMode: {
        type: 'string',
      },
      gameType: {
        type: 'string',
      },
      teams: {
        type: 'array',
        teamId: {
          type: 'number',
        },
        win: {
          type: 'string',
          enum: ['Win', 'Fail'],
        },
        firstBlood: {
          type: 'bool',
        },
        firstTower: {
          type: 'bool',
        },
        firstInhibitor: {
          type: 'bool',
        },
        firstBaron: {
          type: 'bool',
        },
        firstDragon: {
          type: 'bool',
        },
        firstRiftHerald: {
          type: 'bool',
        },
        towerKills: {
          type: 'number',
        },
        inhibitorKills: {
          type: 'number',
        },
        baronKills: {
          type: 'number',
        },
        dragonKills: {
          type: 'number',
        },
        vilemawKills: {
          type: 'number',
        },
        riftHeraldKills: {
          type: 'number',
        },
        dominionVictoryScore: {
          type: 'number',
        },
        bans: {
          type: 'array',
          championId: {
            type: 'number',
          },
          pickTurn: {
            type: 'number',
          },
        },
      },
      participants: {
        type: 'array',
        participantId: {
          type: 'number',
        },
        teamId: {
          type: 'number',
        },
        championId: {
          type: 'number',
        },
        spell1Id: {
          type: 'number',
        },
        spell2Id: {
          type: 'number',
        },
        stats: {
          type: 'array',
          participantId: {
            type: 'number',
          },
          win: {
            type: 'bool',
          },
          item0: {
            type: 'number',
          },
          item1: {
            type: 'number',
          },
          item2: {
            type: 'number',
          },
          item3: {
            type: 'number',
          },
          item4: {
            type: 'number',
          },
          item5: {
            type: 'number',
          },
          item6: {
            type: 'number',
          },
          kills: {
            type: 'number',
          },
          deaths: {
            type: 'number',
          },
          assists: {
            type: 'number',
          },
          largestKillingSpree: {
            type: 'number',
          },
          largestMultiKill: {
            type: 'number',
          },
          killingSprees: {
            type: 'number',
          },
          longestTimeSpentLiving: {
            type: 'number',
          },
          doubleKills: {
            type: 'number',
          },
          tripleKills: {
            type: 'number',
          },
          quadraKills: {
            type: 'number',
          },
          pentaKills: {
            type: 'number',
          },
          unrealKills: {
            type: 'number',
          },
          totalDamageDealt: {
            type: 'number',
          },
          magicDamageDealt: {
            type: 'number',
          },
          physicalDamageDealt: {
            type: 'number',
          },
          trueDamageDealt: {
            type: 'number',
          },
          largestCriticalStrike: {
            type: 'number',
          },
          totalDamageDealtToChampions: {
            type: 'number',
          },
          magicDamageDealtToChampions: {
            type: 'number',
          },
          physicalDamageDealtToChampions: {
            type: 'number',
          },
          trueDamageDealtToChampions: {
            type: 'number',
          },
          totalHeal: {
            type: 'number',
          },
          totalUnitsHealed: {
            type: 'number',
          },
          damageSelfMitigated: {
            type: 'number',
          },
          damageDealtToObjectives: {
            type: 'number',
          },
          damageDealtToTurrets: {
            type: 'number',
          },
          visionScore: {
            type: 'number',
          },
          timeCCingOthers: {
            type: 'number',
          },
          totalDamageTaken: {
            type: 'number',
          },
          magicalDamageTaken: {
            type: 'number',
          },
          physicalDamageTaken: {
            type: 'number',
          },
          trueDamageTaken: {
            type: 'number',
          },
          goldEarned: {
            type: 'number',
          },
          goldSpent: {
            type: 'number',
          },
          turretKills: {
            type: 'number',
          },
          inhibitorKills: {
            type: 'number',
          },
          totalMinionsKilled: {
            type: 'number',
          },
          neutralMinionsKilled: {
            type: 'number',
          },
          neutralMinionsKilledTeamJungle: {
            type: 'number',
          },
          neutralMinionsKilledEnemyJungle: {
            type: 'number',
          },
          totalTimeCrowdControlDealt: {
            type: 'number',
          },
          champLevel: {
            type: 'number',
          },
          visionWardsBoughtInGame: {
            type: 'number',
          },
          sightWardsBoughtInGame: {
            type: 'number',
          },
          wardsPlaced: {
            type: 'number',
          },
          wardsKilled: {
            type: 'number',
          },
          firstBloodKill: {
            type: 'bool',
          },
          firstBloodAssist: {
            type: 'bool',
          },
          firstTowerKill: {
            type: 'bool',
          },
          firstTowerAssist: {
            type: 'bool',
          },
          firstInhibitorKill: {
            type: 'bool',
          },
          firstInhibitorAssist: {
            type: 'bool',
          },
          combatPlayerScore: {
            type: 'number',
          },
          objectivePlayerScore: {
            type: 'number',
          },
          totalPlayerScore: {
            type: 'number',
          },
          totalScoreRank: {
            type: 'number',
          },
          playerScore0: {
            type: 'number',
          },
          playerScore1: {
            type: 'number',
          },
          playerScore2: {
            type: 'number',
          },
          playerScore3: {
            type: 'number',
          },
          playerScore4: {
            type: 'number',
          },
          playerScore5: {
            type: 'number',
          },
          playerScore6: {
            type: 'number',
          },
          playerScore7: {
            type: 'number',
          },
          playerScore8: {
            type: 'number',
          },
          playerScore9: {
            type: 'number',
          },
          perk0: {
            type: 'number',
          },
          perk0Var1: {
            type: 'number',
          },
          perk0Var2: {
            type: 'number',
          },
          perk0Var3: {
            type: 'number',
          },
          perk1: {
            type: 'number',
          },
          perk1Var1: {
            type: 'number',
          },
          perk1Var2: {
            type: 'number',
          },
          perk1Var3: {
            type: 'number',
          },
          perk2: {
            type: 'number',
          },
          perk2Var1: {
            type: 'number',
          },
          perk2Var2: {
            type: 'number',
          },
          perk2Var3: {
            type: 'number',
          },
          perk3: {
            type: 'number',
          },
          perk3Var1: {
            type: 'number',
          },
          perk3Var2: {
            type: 'number',
          },
          perk3Var3: {
            type: 'number',
          },
          perk4: {
            type: 'number',
          },
          perk4Var1: {
            type: 'number',
          },
          perk4Var2: {
            type: 'number',
          },
          perk4Var3: {
            type: 'number',
          },
          perk5: {
            type: 'number',
          },
          perk5Var1: {
            type: 'number',
          },
          perk5Var2: {
            type: 'number',
          },
          perk5Var3: {
            type: 'number',
          },
          perkPrimaryStyle: {
            type: 'number',
          },
          perkSubStyle: {
            type: 'number',
          },
          statPerk0: {
            type: 'number',
          },
          statPerk1: {
            type: 'number',
          },
          statPerk2: {
            type: 'number',
          },
        },
        timeline: {
          type: 'array',
          participantId: {
            type: 'number',
          },
          creepsPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          xpPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          goldPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          csDiffPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          xpDiffPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          damageTakenPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          damageTakenDiffPerMinDeltas: {
            type: 'array',
            '10-20': {
              type: 'number',
            },
            '0-10': {
              type: 'number',
            },
            '20-30': {
              type: 'number',
            },
          },
          role: {
            type: 'string',
          },
          lane: {
            type: 'string',
          },
        },
      },
      participantIdentities: {
        type: 'array',
        participantId: {
          type: 'number',
        },
        player: {
          type: 'array',
          platformId: {
            type: 'string',
          },
          accountId: {
            type: 'string',
          },
          summonerName: {
            type: 'string',
          },
          summonerId: {
            type: 'string',
          },
          currentPlatformId: {
            type: 'string',
          },
          currentAccountId: {
            type: 'string',
          },
          matchHistoryUri: {
            type: 'string',
          },
          profileIcon: {
            type: 'number',
          },
        },
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

module.exports = schema;
