import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const LossConditionSchema =
   new mongoose.Schema<modelTypes.IScenarioLossConditionModel>({
      type: { type: String, required: true },
      status: { type: String, required: true },
      description: { type: String, required: true },
   })

const LossConditionModel =
   mongoose.model<modelTypes.IScenarioLossConditionModel>(
      "LossCondition",
      LossConditionSchema
   )

export { LossConditionModel, LossConditionSchema }
