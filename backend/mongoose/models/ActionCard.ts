import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { ActionCardActionSchema } from "./ActionCardAction"

const ActionCardSchema = new mongoose.Schema<modelTypes.IActionCardModel>({
   name: { type: String, required: true },
   description: String,
   actions: { type: [ActionCardActionSchema], required: true },
   nextActionId: String,
})

const ActionCardModel = mongoose.model<modelTypes.IActionCardModel>(
   "ActionCard",
   ActionCardSchema
)

export { ActionCardModel, ActionCardActionSchema }
