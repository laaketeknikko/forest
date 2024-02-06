import mongoose from "mongoose"

const ScenarioSchema = new mongoose.Schema({
   name: { type: String, required: true },
   shortDescription: { type: String, required: true },
   description: { type: String, required: true },
   arena: {
      size: {
         width: { type: Number, required: true },
         length: { type: Number, required: true },
      },
   },
   thumbNailPath: { type: String, required: true },
   maxPartySize: { type: Number, required: true },
})

const ScenarioModel = mongoose.model("Scenario", ScenarioSchema)

export { ScenarioModel, ScenarioSchema }
