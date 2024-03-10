import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

const ActionEffectSchema = new mongoose.Schema<modelTypes.IActionEffectModel>({
   name: { type: String, required: false },
   powerMultiplier: { type: Number, required: false },
   actionDelayMultiplier: { type: Number, required: true },
   range: { type: Number, required: false },
   damageType: { type: String, required: false },
   type: { type: String, required: true },
})

const ActionEffectModel = mongoose.model<modelTypes.IActionEffectModel>(
   "ActionEffect",
   ActionEffectSchema
)

export { ActionEffectSchema, ActionEffectModel }
