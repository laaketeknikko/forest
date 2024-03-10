import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { ActionEffectSchema } from "./ActionEffect"

const ActionCardActionSchema =
   new mongoose.Schema<modelTypes.IActionCardActionModel>({
      name: { type: String, required: true },
      description: String,
      effects: [ActionEffectSchema],
   })

const ActionCardActionModel = mongoose.model<modelTypes.IActionCardActionModel>(
   "ActionCardAction",
   ActionCardActionSchema
)

export { ActionCardActionModel, ActionCardActionSchema }
