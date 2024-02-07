import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const ActionCardActionSchema =
   new mongoose.Schema<modelTypes.IActionCardActionModel>({
      name: { type: String, required: true },
      description: String,
      powerMultiplier: Number,
      actionDelayMultiplier: { type: Number, required: true },
      range: Number,
      damageType: String,
      type: { type: String, required: true },
   })

const ActionCardActionModel = mongoose.model<modelTypes.IActionCardActionModel>(
   "ActionCardAction",
   ActionCardActionSchema
)

export { ActionCardActionModel, ActionCardActionSchema }
