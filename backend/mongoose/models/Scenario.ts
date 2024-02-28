import { LossConditionSchema } from "./LossCondition"
import { VictoryConditionSchema } from "./VictoryCondition"
import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const ScenarioSchema = new mongoose.Schema<modelTypes.IScenarioModel>({
   name: { type: String, required: true },
   shortDescription: { type: String, required: true },
   description: { type: String, required: true },
   arena: {
      size: {
         width: { type: Number, required: true },
         length: { type: Number, required: true },
      },
   },
   scenarioVictoryConditions: [VictoryConditionSchema],
   scenarioLossConditions: [LossConditionSchema],
   thumbNailPath: { type: String, required: true },
   maxPartySize: { type: Number, required: true },
})

const ScenarioModel = mongoose.model<modelTypes.IScenarioModel>(
   "Scenario",
   ScenarioSchema
)

export { ScenarioModel, ScenarioSchema }
