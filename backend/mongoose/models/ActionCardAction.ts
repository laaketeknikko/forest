import mongoose from "mongoose"

const ActionCardActionSchema = new mongoose.Schema({
   name: { type: String, required: true },
   description: String,
   powerMultiplier: Number,
   actionDelayMultiplier: { type: Number, required: true },
   range: Number,
   damageType: String,
   type: { type: String, required: true },
})

const ActionCardActionModel = mongoose.model(
   "ActionCardAction",
   ActionCardActionSchema
)

export { ActionCardActionModel, ActionCardActionSchema }
