import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Testing-1-2",
   shortDescription: "Defeat Test-Miinii.",
   description:
      "The bird of prey, Miinii, is hunting mouses in your forest. Stop them.",
   arena: {
      size: {
         width: 15,
         length: 15,
      },
   },
   enemies: [
      {
         enemyName: "Test-Miinii-2",
         quantity: 1,
         startingPosition: {
            x: 5,
            z: 5,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 4.5,
         z: 4.5,
      },
      {
         x: 6.5,
         z: 6.5,
      },
      {
         x: 5.5,
         z: 4.5,
      },
   ],
   scenarioVictoryConditions: [
      {
         type: "enemy",
         status: "dead",
         enemyName: "Test-Miinii-2",
         description: "Debug-Miinii is bested",
      },
   ],
   scenarioLossConditions: [
      {
         type: "party",
         status: "defeated",
         description: "Party defeated",
      },
   ],
   maxPartySize: 3,
   thumbNailPath: "sprites/thumbnails/scenarios/firstencounter.png",
}

export { scenarioConfig }
