import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"
import { CharacterSchema } from "./Character"
import { EnemySchema } from "./Enemy"
import { ScenarioSchema } from "./Scenario"
import { ScenarioStatisticsSchema } from "./ScenarioStatistics"

const SaveGameSchema = new mongoose.Schema<modelTypes.ISaveGameConfigModel>({
   characters: { type: [CharacterSchema], required: true },
   enemies: { type: [EnemySchema], required: true },
   scenario: { type: ScenarioSchema, required: false },
   scenarioStatistics: {
      type: [ScenarioStatisticsSchema],
      required: false,
   },
   isScenarioInProgress: { type: Boolean, required: true },
   keyString: { type: String, required: true },
})

const SaveGameModel = mongoose.model<modelTypes.ISaveGameConfigModel>(
   "SaveGame",
   SaveGameSchema
)

export { SaveGameModel }
