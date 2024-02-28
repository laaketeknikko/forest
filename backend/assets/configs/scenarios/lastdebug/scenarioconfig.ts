import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Last Debug",
   shortDescription: "Final level of the game.",
   description:
      "Your last chance to protect the forest. Victory or defeat, you will probably die trying. Go with blessing, and glory.",
   arena: {
      size: {
         width: 40,
         length: 40,
      },
   },
   enemies: [
      {
         enemyName: "Debug-Miinii",
         quantity: 1,
         startingPosition: {
            x: 20.5,
            z: 20.5,
         },
      },
      {
         enemyName: "Debug-Aulich",
         quantity: 1,
         startingPosition: {
            x: 22.5,
            z: 22.5,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 19.5,
         z: 19.5,
      },
      {
         x: 19.5,
         z: 20.5,
      },
      {
         x: 23.5,
         z: 23.5,
      },
      {
         x: 23.5,
         z: 21.5,
      },
   ],
   scenarioVictoryConditions: [
      {
         type: "enemy",
         status: "dead",
         enemyName: "Debug-Miinii",
      },
      {
         type: "enemy",
         status: "dead",
         enemyName: "Debug-Aulich",
      },
   ],
   scenarioLossConditions: [
      {
         type: "party",
         status: "defeated",
      },
   ],
   maxPartySize: 8,
   thumbNailPath: "sprites/thumbnails/scenarios/swuippo.png",
   unlockCondition: {
      type: "scenario",
      scenarioName: "First Debug",
      status: "completed",
   },
}

export { scenarioConfig }
