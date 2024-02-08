import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { ActionCardActionSchema } from "./ActionCardAction"

const ActionCardSchema = new mongoose.Schema<modelTypes.IActionCardModel>({
   name: { type: String, required: false },
   description: String,
   nextActionId: String,
   actions: { type: [ActionCardActionSchema], required: false },
})

const ActionCardModel = mongoose.model<modelTypes.IActionCardModel>(
   "ActionCard",
   ActionCardSchema
)

export { ActionCardModel, ActionCardSchema }
