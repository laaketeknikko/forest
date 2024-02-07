import * as modelTypes from "./modelTypes"

import mongoose from "mongoose"

import { DynamicGameEntitySchema } from "./DynamicGameEntity"

const CharacterSchema = new mongoose.Schema<modelTypes.ICharacterModel>()

CharacterSchema.add(DynamicGameEntitySchema)

const CharacterModel = mongoose.model<modelTypes.ICharacterModel>(
   "Character",
   CharacterSchema
)

export { CharacterModel, CharacterSchema }
