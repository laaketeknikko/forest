import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Last encounter",
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
         enemyName: "Miinii",
         quantity: 1,
         startingPosition: {
            x: 10.5,
            z: 10.5,
         },
      },
      {
         enemyName: "Aulich",
         quantity: 1,
         startingPosition: {
            x: 20.5,
            z: 20.5,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 35.5,
         z: 35.5,
      },
      {
         x: 37.5,
         z: 37.5,
      },
      {
         x: 39.5,
         z: 39.5,
      },
      {
         x: 33.5,
         z: 33.5,
      },
      {
         x: 0.5,
         z: 0.5,
      },
      {
         x: 2.5,
         z: 2.5,
      },
      {
         x: 4.5,
         z: 4.5,
      },
      {
         x: 6.5,
         z: 6.5,
      },
   ],
   scenarioVictoryConditions: [
      {
         type: "enemy",
         status: "dead",
         enemyName: "Miinii",
         description: "Defeat the bird of prey Miinii",
      },
      {
         type: "enemy",
         status: "dead",
         enemyName: "Aulich",
         description: "Defeat the Aulich",
      },
   ],
   scenarioLossConditions: [
      {
         type: "party",
         status: "defeated",
         description: "All characters are defeated",
      },
   ],
   maxPartySize: 8,
   thumbNailPath: "sprites/thumbnails/scenarios/swuippo.png",
   unlockCondition: {
      type: "scenario",
      scenarioName: "First encounter",
      status: "completed",
   },
}

export { scenarioConfig }
