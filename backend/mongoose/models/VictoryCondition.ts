import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const VictoryConditionSchema =
   new mongoose.Schema<modelTypes.IScenarioVictoryConditionModel>({
      type: { type: String, required: true },
      status: { type: String, required: true },
      enemyName: { type: String, required: true },
   })

const VictoryConditionModel =
   mongoose.model<modelTypes.IScenarioVictoryConditionModel>(
      "VictoryCondition",
      VictoryConditionSchema
   )

export { VictoryConditionModel, VictoryConditionSchema }
