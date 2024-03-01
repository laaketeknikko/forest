import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Many enemies",
   shortDescription: "There are quite a few of them.",
   description:
      "Your last chance to protect the forest. Victory or defeat, you will probably die trying. Go with blessing, and glory.",
   arena: {
      size: {
         width: 80,
         length: 80,
      },
   },
   enemies: [
      {
         enemyName: "Debug-Miinii",
         quantity: 1,
         startingPosition: {
            x: 24.5,
            z: 24.5,
         },
      },
      {
         enemyName: "Debug-Aulich",
         quantity: 1,
         startingPosition: {
            x: 28.5,
            z: 28.5,
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
         description: "Defeat the mice-eating beastie Miinii",
      },
      {
         type: "enemy",
         status: "dead",
         enemyName: "Debug-Aulich",
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
}

export { scenarioConfig }
