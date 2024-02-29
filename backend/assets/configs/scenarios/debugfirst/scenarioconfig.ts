import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "First Debug",
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
         enemyName: "Debug-Miinii",
         quantity: 1,
         startingPosition: {
            x: 10.5,
            z: 10.5,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 9.5,
         z: 9.5,
      },
      {
         x: 11.5,
         z: 11.5,
      },
      {
         x: 9.5,
         z: 11.5,
      },
      {
         x: 11.5,
         z: 9.5,
      },
   ],
   scenarioVictoryConditions: [
      {
         enemyName: "Debug-Miinii",
         type: "enemy",
         status: "dead",
         description: "Defeat the mouses",
      },
   ],
   scenarioLossConditions: [
      {
         type: "party",
         status: "defeated",
         description: "All characters are defeated",
      },
   ],
   maxPartySize: 4,
   thumbNailPath: "sprites/thumbnails/scenarios/firstencounter.png",
}

export { scenarioConfig }
