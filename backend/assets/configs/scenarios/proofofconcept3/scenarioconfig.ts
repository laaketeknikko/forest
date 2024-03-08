import { ZScenarioConfig } from "../../../../../shared/types/types"

const scenarioConfig: ZScenarioConfig = {
   name: "Proof'O'c 3",
   shortDescription: "Miinii and an Aulich.",
   description:
      "The mouse-hunt still goes on. This time, though, an undead owl necromancer, an Aulich, needs their feathers ruffled as well.",
   arena: {
      size: {
         width: 60,
         length: 60,
      },
   },
   enemies: [
      {
         enemyName: "Debug-Miinii",
         quantity: 1,
         startingPosition: {
            x: 30,
            z: 30,
         },
      },
      {
         enemyName: "Debug-Aulich",
         quantity: 1,
         startingPosition: {
            x: 35,
            z: 35,
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
         enemyName: "Debug-Miinii",
         description: "Debug-Miinii is defeated",
      },
      {
         type: "enemy",
         status: "dead",
         enemyName: "Debug-Aulich",
         description: "Debug-Aulich is defeated",
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
      scenarioName: "Proof'O'c 2",
      status: "completed",
   },
}

export { scenarioConfig }
