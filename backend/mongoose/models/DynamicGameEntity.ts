import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { ActionCardSchema } from "./ActionCard"

const DynamicGameEntitySchema =
   new mongoose.Schema<modelTypes.IDynamicGameEntityModel>({
      name: { type: String, required: true },
      spritePath: { type: String, required: true },
      health: { type: Number, required: true },
      maxHealth: { type: Number, required: true },
      baseActionDelay: { type: Number, required: true },
      currentActionDelay: { type: Number, required: false },
      cards: { type: [ActionCardSchema], required: true },
      position: { x: Number, y: Number, z: Number },
      strength: { type: Number, required: true },
   })

const DynamicGameEntityModel =
   mongoose.model<modelTypes.IDynamicGameEntityModel>(
      "DynamicGameEntity",
      DynamicGameEntitySchema
   )

export { DynamicGameEntityModel, DynamicGameEntitySchema }
