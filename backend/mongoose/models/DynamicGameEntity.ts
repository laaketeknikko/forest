import mongoose from "mongoose"

import { ActionCardActionSchema } from "./ActionCardAction"

const DynamicGameEntitySchema = new mongoose.Schema({
   name: { type: String, required: true },
   spritePath: { type: String, required: true },
   health: { type: Number, required: true },
   baseActionDelay: { type: Number, required: true },
   currentActionDelay: { type: Number, required: true },
   cards: { type: [ActionCardActionSchema], required: true },
   selectedCardId: { type: String, required: true },
   position: { x: Number, y: Number, z: Number },
})

const DynamicGameEntityModel = mongoose.model(
   "DynamicGameEntity",
   DynamicGameEntitySchema
)

export { DynamicGameEntityModel, DynamicGameEntitySchema }
