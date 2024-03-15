import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Testing-1",
   shortDescription: "Defeat Test-Miinii.",
   description:
      "The bird of prey, Miinii, is hunting mouses in your forest. Stop them.",
   arena: {
      size: {
         width: 10,
         length: 10,
      },
   },
   enemies: [
      {
         enemyName: "Test-Miinii",
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
         enemyName: "Test-Miinii",
         description: "Debug-Miinii is defeated",
      },
   ],
   scenarioLossConditions: [
      {
         type: "party",
         status: "defeated",
         description: "All player characters are defeated",
      },
   ],
   maxPartySize: 3,
   thumbNailPath: "sprites/thumbnails/scenarios/firstencounter.png",
}

export { scenarioConfig }
