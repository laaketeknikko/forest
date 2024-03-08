import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Proof'O'c 2",
   shortDescription: "Second encounter with Miinii.",
   description:
      "They're still hunting mouses, and still you need to stop them. Luckily for you, it's just the Debug-Miinii again.",
   arena: {
      size: {
         width: 30,
         length: 30,
      },
   },
   enemies: [
      {
         enemyName: "Debug-Miinii",
         quantity: 1,
         startingPosition: {
            x: 15,
            z: 15,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 14.5,
         z: 14.5,
      },
      {
         x: 16.5,
         z: 16.5,
      },
      {
         x: 15.5,
         z: 14.5,
      },
      {
         x: 15.5,
         z: 16.5,
      },
   ],
   scenarioVictoryConditions: [
      {
         type: "enemy",
         status: "dead",
         enemyName: "Debug-Miinii",
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
   maxPartySize: 4,
   thumbNailPath: "sprites/thumbnails/scenarios/firstencounter.png",
   unlockCondition: {
      type: "scenario",
      scenarioName: "Proof'O'c 1",
      status: "completed",
   },
}

export { scenarioConfig }
