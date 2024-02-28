import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "First encounter",
   shortDescription: "First encounter with Miinii.",
   description:
      "The bird of prey, Miinii, is hunting mouses in your forest. Stop them.",
   arena: {
      size: {
         width: 20,
         length: 20,
      },
   },
   enemies: [
      {
         enemyName: "Miinii",
         quantity: 1,
         startingPosition: {
            x: 7.5,
            z: 7.5,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 0.5,
         z: 0.5,
      },
      {
         x: 19.5,
         z: 19.5,
      },
      {
         x: 0.5,
         z: 19.5,
      },
      {
         x: 19.5,
         z: 0.5,
      },
   ],
   scenarioVictoryConditions: [
      {
         enemyName: "Miinii",
         type: "enemy",
         status: "dead",
         description: "Defeat Miinii",
      },
   ],
   scenarioLossConditions: [
      {
         type: "party",
         status: "defeated",
         description: "All characters are defeat",
      },
   ],
   maxPartySize: 4,
   thumbNailPath: "sprites/thumbnails/scenarios/firstencounter.png",
}

export { scenarioConfig }
