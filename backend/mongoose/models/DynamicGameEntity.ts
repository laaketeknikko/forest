import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { ActionCardSchema } from "./ActionCard"

const DynamicGameEntitySchema =
   new mongoose.Schema<modelTypes.IDynamicGameEntityModel>({
      name: { type: String, required: false },
      spritePath: { type: String, required: false },
      health: { type: Number, required: false },
      baseActionDelay: { type: Number, required: false },
      currentActionDelay: { type: Number, required: false },
      cards: { type: [ActionCardSchema], required: false },
      position: { x: Number, y: Number, z: Number },
      strength: { type: Number, required: false },
   })

const DynamicGameEntityModel =
   mongoose.model<modelTypes.IDynamicGameEntityModel>(
      "DynamicGameEntity",
      DynamicGameEntitySchema
   )

export { DynamicGameEntityModel, DynamicGameEntitySchema }
