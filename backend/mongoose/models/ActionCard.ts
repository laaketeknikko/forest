import mongoose from "mongoose"

import { ActionCardActionSchema } from "./ActionCardAction"

const ActionCardSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: String,
   actions: { type: [ActionCardActionSchema], required: true },
   nextActionId: String,
})

const ActionCardModel = mongoose.model("ActionCard", ActionCardSchema)

export { ActionCardModel, ActionCardActionSchema }
