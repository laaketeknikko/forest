import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Testing-3",
   shortDescription: "Unlock condition chain 3.",
   description: "",
   arena: {
      size: {
         width: 60,
         length: 60,
      },
   },
   enemies: [
      {
         enemyName: "Test-Miinii",
         quantity: 1,
         startingPosition: {
            x: 30,
            z: 30,
         },
      },
   ],
   playerCharacterStartingPositions: [
      {
         x: 25,
         z: 25,
      },
      {
         x: 35,
         z: 25,
      },
      {
         x: 25,
         z: 35,
      },
      {
         x: 40,
         z: 40,
      },
      {
         x: 40,
         z: 25,
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
   maxPartySize: 5,
   thumbNailPath: "sprites/thumbnails/scenarios/swuippo.png",
   unlockCondition: {
      type: "scenario",
      scenarioName: "Testing-2",
      status: "completed",
   },
}

export { scenarioConfig }
